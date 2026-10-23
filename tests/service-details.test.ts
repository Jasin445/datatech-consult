import { describe, expect, it } from "vitest";
import { services } from "@/content/services";
import { dataAnalytics } from "@/content/service-details/data-analytics";
import { dataInfrastructure } from "@/content/service-details/data-infrastructure";
import type { ServiceDetail } from "@/content/service-details/types";

const details: ServiceDetail[] = [dataAnalytics, dataInfrastructure];
const slugs = new Set(services.map((s) => s.slug));

describe.each(details)("service detail: $slug", (d) => {
  it("matches a confirmed service", () => {
    expect(slugs.has(d.slug)).toBe(true);
  });

  it("has content in every section", () => {
    expect(d.intro.length).toBeGreaterThan(0);
    for (const s of [d.problems, d.capabilities, d.deliverables, d.considerations]) expect(s.items.length).toBeGreaterThan(0);
    expect(d.approach.steps.length).toBeGreaterThanOrEqual(3);
    expect(d.value.items.length).toBeGreaterThan(0);
  });

  it("links related services that exist and never to itself", () => {
    expect(d.related.length).toBeGreaterThan(0);
    for (const r of d.related) {
      expect(slugs.has(r)).toBe(true);
      expect(r).not.toBe(d.slug);
    }
  });

  it("does not promise guaranteed outcomes", () => {
    const text = JSON.stringify(d).toLowerCase();
    expect(text).not.toMatch(/guarantee[ds]?\b(?! specific)/);
    expect(d.value.lead.toLowerCase()).toContain("can’t guarantee");
  });
});

describe("service pages are distinct", () => {
  it("do not share section copy", () => {
    const texts = details.flatMap((d) => [d.heading, d.lead, ...d.problems.items.map((i) => i.title), ...d.capabilities.items.map((i) => i.title)]);
    expect(new Set(texts).size).toBe(texts.length);
  });
});

describe("data infrastructure scope", () => {
  it("does not assume every client needs a warehouse or migration", () => {
    const c = dataInfrastructure.considerations.items.map((i) => i.text).join(" ");
    expect(c).toMatch(/worth considering only when/);
    expect(c).toMatch(/doing less/);
  });
});
