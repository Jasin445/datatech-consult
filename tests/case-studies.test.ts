import { describe, expect, it } from "vitest";
import { caseStudies } from "@/content/case-studies";
import { projectTypeLabels, PROJECT_TYPES, type CaseStudy } from "@/content/case-studies/types";
import { caseStudiesPage } from "@/content/case-studies/page";
import {
  getCaseStudyBySlug,
  getCaseStudySlugs,
  getPublishableCaseStudies,
  validateCaseStudies,
} from "@/lib/content/case-studies";
import { DUMMY_MARKER, type ManagedContent } from "@/lib/content/status";

const make = (
  status: ManagedContent<CaseStudy>["status"],
  overrides: Partial<CaseStudy> = {},
): ManagedContent<CaseStudy> => ({
  status,
  data: {
    slug: `cs-${status}`,
    title: "Title",
    summary: "A verified summary.",
    metaDescription: "A verified description.",
    projectType: "completed-work",
    challenge: ["Challenge."],
    objectives: ["Objective."],
    contribution: ["Contribution."],
    approach: [{ title: "Step", text: "Text." }],
    solution: ["Solution."],
    deliverables: ["Deliverable."],
    results: [],
    lessons: ["Lesson."],
    relatedServices: ["data-analytics"],
    ...overrides,
  },
});

describe("case study publishing rules", () => {
  it("hides dummy and draft case studies in production", () => {
    const items = [make("dummy"), make("draft"), make("approved")];
    expect(getPublishableCaseStudies(items, true).map((i) => i.status)).toEqual(["approved"]);
  });

  it("publishes nothing in production while only the dummy entry exists", () => {
    expect(getPublishableCaseStudies(caseStudies, true)).toEqual([]);
    expect(getCaseStudySlugs(caseStudies, true)).toEqual([]);
  });

  it("shows the dummy entry in development", () => {
    expect(getCaseStudySlugs(caseStudies, false)).toContain("sample-case-study");
  });

  it("does not resolve unapproved slugs in production", () => {
    expect(getCaseStudyBySlug("sample-case-study", caseStudies, true)).toBeUndefined();
    expect(getCaseStudyBySlug("does-not-exist", caseStudies, false)).toBeUndefined();
  });

  it("ships only dummy or draft entries until the business approves them", () => {
    expect(caseStudies.every((c) => c.status !== "approved")).toBe(true);
    expect(validateCaseStudies(caseStudies)).toEqual([]);
  });
});

describe("case study validation", () => {
  it("blocks an approved case study that still contains the placeholder marker", () => {
    const sneaky = make("approved", { challenge: [`${DUMMY_MARKER}. Pending.`] });
    expect(() => getPublishableCaseStudies([sneaky], true)).toThrow(/placeholder/);
  });

  it("flags an invalid status with the item id", () => {
    const bad = { ...make("draft"), status: "published" } as unknown as ManagedContent<CaseStudy>;
    expect(() => getPublishableCaseStudies([bad], true)).toThrow(/case-studies\/cs-draft/);
  });

  it("flags bad slugs, duplicates, unknown services and invalid project types", () => {
    const items = [
      make("draft", { slug: "Bad Slug" }),
      make("draft", { slug: "dup" }),
      make("draft", { slug: "dup", relatedServices: ["nope"] }),
      make("draft", { slug: "typed", projectType: "client-win" as never }),
    ];
    const messages = validateCaseStudies(items).map((v) => v.message).join("\n");
    expect(messages).toMatch(/kebab-case/);
    expect(messages).toMatch(/Duplicate/);
    expect(messages).toMatch(/unknown service/);
    expect(messages).toMatch(/invalid projectType/);
  });

  it("labels every project type", () => {
    for (const type of PROJECT_TYPES) expect(projectTypeLabels[type]).toBeTruthy();
  });
});

describe("case studies index copy", () => {
  it("does not invent clients, results or counts", () => {
    const text = JSON.stringify(caseStudiesPage).toLowerCase();
    expect(text).not.toMatch(/\d+%|clients? (?:include|such as)|trusted by|award|guarantee/);
  });
});

describe("navigation flag", () => {
  it("hides the Case Studies link in production while nothing is approved", async () => {
    const { getPrimaryNav } = await import("@/lib/site");
    const hidden = getPrimaryNav({ showCaseStudies: getPublishableCaseStudies(caseStudies, true).length > 0, showInsights: false });
    expect(hidden.some((n) => n.href === "/case-studies")).toBe(false);
    const shown = getPrimaryNav({ showCaseStudies: getPublishableCaseStudies(caseStudies, false).length > 0, showInsights: false });
    expect(shown.some((n) => n.href === "/case-studies")).toBe(true);
  });
});
