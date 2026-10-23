import { privacyNotice, type PrivacyFacts, type PrivacyNotice } from "@/content/privacy";
import { assertContentValid, isProduction, validateManagedItems, type ContentViolation, type ManagedContent } from "./status";

const FACT_LABELS: Record<keyof PrivacyFacts, string> = {
  controllerName: "controllerName (legal name of the data controller)",
  postalAddress: "postalAddress",
  privacyContactEmail: "privacyContactEmail",
  enquiryRetention: "enquiryRetention",
  hostingProvider: "hostingProvider",
  effectiveDate: "effectiveDate",
};

export function missingPrivacyFacts(facts: PrivacyFacts): (keyof PrivacyFacts)[] {
  return (Object.keys(FACT_LABELS) as (keyof PrivacyFacts)[]).filter((key) => !facts[key]?.trim());
}

/**
 * Critical checks: invalid status, placeholder marker in an approved notice, and an approved notice
 * with any business fact still missing or an invalid effective date.
 */
export function validatePrivacyNotice(notice: ManagedContent<PrivacyNotice>): ContentViolation[] {
  const text = notice.data.sections.flatMap((s) => [s.heading, ...s.paragraphs, ...(s.bullets ?? [])]).join(" ");
  const violations = validateManagedItems([{ id: "privacy-notice", status: notice.status, text }]);
  if (notice.status !== "approved") return violations;

  const missing = missingPrivacyFacts(notice.data.facts);
  if (missing.length > 0) {
    violations.push({
      id: "privacy-notice",
      message: `The privacy notice is marked "approved" but these facts are missing in src/content/privacy.ts: ${missing.map((k) => FACT_LABELS[k]).join(", ")}.`,
    });
  }
  const date = notice.data.facts.effectiveDate;
  if (date && (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(Date.parse(`${date}T00:00:00Z`)))) {
    violations.push({ id: "privacy-notice", message: `The privacy notice effectiveDate "${date}" must be a real date in YYYY-MM-DD format.` });
  }
  return violations;
}

/** The notice to render. Throws (failing the build) on critical violations. */
export function getPrivacyNotice(notice: ManagedContent<PrivacyNotice> = privacyNotice): ManagedContent<PrivacyNotice> {
  assertContentValid(validatePrivacyNotice(notice));
  return notice;
}

export function isPrivacyNoticeApproved(notice: ManagedContent<PrivacyNotice> = privacyNotice): boolean {
  return getPrivacyNotice(notice).status === "approved";
}

/**
 * Personal data may only be collected in production under an approved notice.
 * Development is always allowed so the form can be built and tested.
 */
export function mayCollectPersonalData(production: boolean = isProduction(), notice: ManagedContent<PrivacyNotice> = privacyNotice): boolean {
  return !production || isPrivacyNoticeApproved(notice);
}
