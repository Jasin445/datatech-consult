import { describe, expect, it } from "vitest";
import {
  filterPublishable,
  findStatusViolations,
  isIndexable,
  isPublishable,
  type ManagedContent,
} from "@/lib/content/status";
import { getPrimaryNav } from "@/lib/site";

const items: ManagedContent<{ id: string }>[] = [
  { status: "dummy", data: { id: "a" } },
  { status: "draft", data: { id: "b" } },
  { status: "approved", data: { id: "c" } },
];

describe("content status", () => {
  it("publishes only approved content in production", () => {
    expect(filterPublishable(items, true).map((i) => i.data.id)).toEqual(["c"]);
  });

  it("shows dummy and draft content in development", () => {
    expect(filterPublishable(items, false)).toHaveLength(3);
    expect(isPublishable("dummy", false)).toBe(true);
  });

  it("never indexes unapproved content", () => {
    expect(isIndexable("dummy")).toBe(false);
    expect(isIndexable("draft")).toBe(false);
    expect(isIndexable("approved")).toBe(true);
  });

  it("reports invalid or missing statuses with the item id", () => {
    const violations = findStatusViolations({ good: "approved", bad: "published", missing: undefined });
    expect(violations.map((v) => v.id)).toEqual(["bad", "missing"]);
    expect(violations[0]?.message).toContain('"bad"');
  });
});

describe("primary navigation", () => {
  it("hides Case Studies and Insights when there is no approved content", () => {
    const labels = getPrimaryNav({ showCaseStudies: false, showInsights: false }).map((i) => i.label);
    expect(labels).toEqual(["Services", "About", "Contact"]);
  });

  it("shows them when enabled", () => {
    const labels = getPrimaryNav({ showCaseStudies: true, showInsights: true }).map((i) => i.label);
    expect(labels).toContain("Case Studies");
    expect(labels).toContain("Insights");
  });
});
