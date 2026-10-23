import { describe, expect, it } from "vitest";
import { aboutPage } from "@/content/about";
import { leadershipProfiles, type LeadershipProfile } from "@/content/leadership/profiles";
import { getPublishableLeadership, validateLeadership } from "@/lib/content/leadership";
import { DUMMY_MARKER, assertContentValid, validateManagedItems, type ManagedContent } from "@/lib/content/status";

const profile = (status: ManagedContent<LeadershipProfile>["status"], bio = "A verified biography."): ManagedContent<LeadershipProfile> => ({
  status,
  data: { id: `p-${status}`, name: "Name", role: "Role", bio },
});

describe("leadership publishing rules", () => {
  it("hides dummy and draft profiles in production", () => {
    const items = [profile("dummy"), profile("draft"), profile("approved")];
    expect(getPublishableLeadership(items, true).map((p) => p.status)).toEqual(["approved"]);
  });

  it("shows no leadership in production when nothing is approved", () => {
    expect(getPublishableLeadership(leadershipProfiles, true)).toEqual([]);
  });

  it("shows dummy profiles in development", () => {
    expect(getPublishableLeadership(leadershipProfiles, false).length).toBeGreaterThan(0);
  });

  it("keeps every shipped profile marked as dummy or draft until the business approves it", () => {
    expect(validateLeadership(leadershipProfiles)).toEqual([]);
  });
});

describe("critical content validation", () => {
  it("flags an invalid status with the item id", () => {
    const bad = { status: "published", data: { id: "x", name: "N", role: "R", bio: "B" } } as unknown as ManagedContent<LeadershipProfile>;
    const v = validateLeadership([bad]);
    expect(v[0]?.id).toBe("leadership/x");
    expect(() => getPublishableLeadership([bad], true)).toThrow(/leadership\/x/);
  });

  it("blocks an approved item that still contains the placeholder marker", () => {
    const sneaky = profile("approved", `${DUMMY_MARKER}. Pending.`);
    expect(() => getPublishableLeadership([sneaky], true)).toThrow(/placeholder/);
  });

  it("allows an empty registry", () => {
    expect(() => assertContentValid(validateManagedItems([]))).not.toThrow();
  });
});

describe("about page copy", () => {
  it("does not invent company facts", () => {
    const text = JSON.stringify(aboutPage).toLowerCase();
    expect(text).not.toMatch(/founded|since (?:19|20)\d\d|incorporated|registered|limited|ltd|certified|accredited|partner(?:ed|ship)|our mission|years of experience/);
  });
});
