import { describe, expect, it } from "vitest";
import { privacyNotice, type PrivacyNotice } from "@/content/privacy";
import { getPrivacyNotice, mayCollectPersonalData, missingPrivacyFacts, validatePrivacyNotice } from "@/lib/content/privacy";
import { DUMMY_MARKER, type ContentStatus, type ManagedContent } from "@/lib/content/status";

const completeFacts: PrivacyNotice["facts"] = {
  controllerName: "Example Legal Name Ltd",
  postalAddress: "1 Example Street",
  privacyContactEmail: "privacy@example.com",
  enquiryRetention: "for up to 24 months",
  hostingProvider: "Example Host",
  effectiveDate: "2026-11-01",
};

const withStatus = (status: ContentStatus, facts = privacyNotice.data.facts): ManagedContent<PrivacyNotice> => ({
  status,
  data: { ...privacyNotice.data, facts },
});

describe("privacy notice governance", () => {
  it("ships as a draft, not approved", () => {
    expect(privacyNotice.status).toBe("draft");
    expect(validatePrivacyNotice(privacyNotice)).toEqual([]);
  });

  it("does not invent business facts", () => {
    expect(missingPrivacyFacts(privacyNotice.data.facts)).toEqual([
      "controllerName",
      "postalAddress",
      "privacyContactEmail",
      "enquiryRetention",
      "hostingProvider",
      "effectiveDate",
    ]);
  });

  it("fails when approved with facts missing, naming them", () => {
    const violations = validatePrivacyNotice(withStatus("approved"));
    expect(violations).toHaveLength(1);
    expect(violations[0]?.message).toContain("privacyContactEmail");
    expect(() => getPrivacyNotice(withStatus("approved"))).toThrow(/privacy notice/);
  });

  it("accepts an approved notice with every fact supplied", () => {
    expect(validatePrivacyNotice(withStatus("approved", completeFacts))).toEqual([]);
  });

  it("rejects an invalid effective date and an approved placeholder", () => {
    expect(validatePrivacyNotice(withStatus("approved", { ...completeFacts, effectiveDate: "2026-13-40" }))).toHaveLength(1);
    const placeholder: ManagedContent<PrivacyNotice> = {
      status: "approved",
      data: { facts: completeFacts, sections: [{ id: "x", heading: "X", paragraphs: [DUMMY_MARKER] }] },
    };
    expect(validatePrivacyNotice(placeholder).length).toBeGreaterThan(0);
  });

  it("blocks personal-data collection in production until the notice is approved", () => {
    expect(mayCollectPersonalData(true, withStatus("draft"))).toBe(false);
    expect(mayCollectPersonalData(false, withStatus("draft"))).toBe(true);
    expect(mayCollectPersonalData(true, withStatus("approved", completeFacts))).toBe(true);
  });

  it("does not claim practices the site does not have", () => {
    const text = JSON.stringify(privacyNotice.data.sections).toLowerCase();
    expect(text).toContain("does not set cookies");
    for (const phrase of ["google analytics", "newsletter", "we store your enquiry in our database", "fully compliant"]) {
      expect(text).not.toContain(phrase);
    }
  });
});
