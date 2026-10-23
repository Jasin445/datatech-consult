import { describe, expect, it } from "vitest";
import { insights } from "@/content/insights";
import { insightsPage } from "@/content/insights/page";
import type { Insight } from "@/content/insights/types";
import {
  formatPublishedDate,
  getInsightBySlug,
  getInsightSlugs,
  getPublishableInsights,
  isValidIsoDate,
  readingTimeMinutes,
  validateInsights,
} from "@/lib/content/insights";
import { DUMMY_MARKER, type ManagedContent } from "@/lib/content/status";

const make = (
  status: ManagedContent<Insight>["status"],
  overrides: Partial<Insight> = {},
): ManagedContent<Insight> => ({
  status,
  data: {
    slug: `a-${status}`,
    title: "Title",
    summary: "A verified summary.",
    metaDescription: "A verified description.",
    publishedOn: "2026-03-10",
    keyTakeaways: ["Takeaway."],
    sections: [{ heading: "Heading", paragraphs: ["Paragraph."] }],
    relatedServices: ["data-analytics"],
    ...overrides,
  },
});

describe("insight publishing rules", () => {
  it("hides dummy and draft articles in production", () => {
    const items = [make("dummy"), make("draft"), make("approved")];
    expect(getPublishableInsights(items, true, false).map((i) => i.status)).toEqual(["approved"]);
  });

  it("publishes nothing in production while only dummy entries exist, when samples are switched off", () => {
    expect(getPublishableInsights(insights, true, false)).toEqual([]);
    expect(getInsightSlugs(insights, true, false)).toEqual([]);
  });

  it("shows dummy samples in production when samples are switched on", () => {
    expect(getInsightSlugs(insights, true, true).length).toBe(insights.filter((i) => i.status === "dummy").length);
  });

  it("shows the dummy entry in development", () => {
    expect(getInsightSlugs(insights, false)).toContain("sample-article");
  });

  it("does not resolve unapproved slugs in production", () => {
    expect(getInsightBySlug("sample-article", insights, true, false)).toBeUndefined();
    expect(getInsightBySlug("does-not-exist", insights, false)).toBeUndefined();
  });

  it("ships only dummy or draft entries until the business approves them", () => {
    expect(insights.every((i) => i.status !== "approved")).toBe(true);
    expect(validateInsights(insights)).toEqual([]);
  });

  it("orders articles newest first", () => {
    const items = [
      make("approved", { slug: "older", publishedOn: "2026-01-05" }),
      make("approved", { slug: "newer", publishedOn: "2026-04-20" }),
    ];
    expect(getInsightSlugs(items, true)).toEqual(["newer", "older"]);
  });
});

describe("insight validation", () => {
  it("blocks an approved article that still contains the placeholder marker", () => {
    const sneaky = make("approved", { sections: [{ heading: "H", paragraphs: [`${DUMMY_MARKER}. Pending.`] }] });
    expect(() => getPublishableInsights([sneaky], true)).toThrow(/placeholder/);
  });

  it("flags an invalid status with the item id", () => {
    const bad = { ...make("draft"), status: "published" } as unknown as ManagedContent<Insight>;
    expect(() => getPublishableInsights([bad], true)).toThrow(/insights\/a-draft/);
  });

  it("flags bad slugs, duplicates, unknown services, bad dates and empty bodies", () => {
    const items = [
      make("draft", { slug: "Bad Slug" }),
      make("draft", { slug: "dup" }),
      make("draft", { slug: "dup", relatedServices: ["nope"] }),
      make("draft", { slug: "dated", publishedOn: "2026-02-31" }),
      make("draft", { slug: "empty", sections: [] }),
      make("draft", { slug: "thin", sections: [{ heading: "", paragraphs: [] }] }),
    ];
    const messages = validateInsights(items).map((v) => v.message).join("\n");
    expect(messages).toMatch(/kebab-case/);
    expect(messages).toMatch(/Duplicate/);
    expect(messages).toMatch(/unknown service/);
    expect(messages).toMatch(/invalid publishedOn/);
    expect(messages).toMatch(/no body sections/);
    expect(messages).toMatch(/no heading or no paragraphs/);
  });

  it("accepts only real calendar dates", () => {
    expect(isValidIsoDate("2026-03-10")).toBe(true);
    expect(isValidIsoDate("2024-02-29")).toBe(true);
    expect(isValidIsoDate("2026-02-30")).toBe(false);
    expect(isValidIsoDate("10/03/2026")).toBe(false);
    expect(isValidIsoDate("2026-3-1")).toBe(false);
  });
});

describe("insight helpers", () => {
  it("formats dates in UTC without shifting the day", () => {
    expect(formatPublishedDate("2026-03-10")).toBe("10 March 2026");
    expect(formatPublishedDate("2026-12-31")).toBe("31 December 2026");
  });

  it("estimates reading time with a minimum of one minute", () => {
    expect(readingTimeMinutes(make("draft").data)).toBe(1);
    const long = make("draft", { sections: [{ heading: "H", paragraphs: [Array(900).fill("word").join(" ")] }] });
    expect(readingTimeMinutes(long.data)).toBe(5);
  });
});

describe("insights index copy", () => {
  it("does not invent authors, results, counts or guarantees", () => {
    const text = JSON.stringify(insightsPage).toLowerCase();
    expect(text).not.toMatch(/\d+%|trusted by|award|guarantee|expert authors?|our team of/);
  });
});

describe("navigation flag", () => {
  it("hides the Insights link in production while nothing is approved", async () => {
    const { getPrimaryNav } = await import("@/lib/site");
    const hidden = getPrimaryNav({ showCaseStudies: false, showInsights: getPublishableInsights(insights, true, false).length > 0 });
    expect(hidden.some((n) => n.href === "/insights")).toBe(false);
    const shown = getPrimaryNav({ showCaseStudies: false, showInsights: getPublishableInsights(insights, false).length > 0 });
    expect(shown.some((n) => n.href === "/insights")).toBe(true);
  });
});
