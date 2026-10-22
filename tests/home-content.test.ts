import { describe, expect, it } from "vitest";
import { services } from "@/content/services";
import { audiences, challenges, credibilityEvidence, process } from "@/content/home";
import { filterPublishable } from "@/lib/content/status";
import { services as navServices } from "@/lib/site";

describe("homepage content", () => {
  it("lists exactly the four confirmed services with the required detail routes", () => {
    expect(services.map((s) => s.href)).toEqual([
      "/services/data-analytics",
      "/services/data-infrastructure",
      "/services/ai-automation",
      "/services/business-technology-consulting",
    ]);
    for (const s of services) {
      expect(s.helpsWith.length).toBeGreaterThan(0);
      expect(s.href).toBe(`/services/${s.slug}`);
    }
  });

  it("keeps navigation services in sync with service content", () => {
    expect(navServices.map((s) => s.href)).toEqual(services.map((s) => s.href));
  });

  it("covers the required challenges, process stages and audiences", () => {
    expect(challenges.items).toHaveLength(5);
    expect(process.steps.map((s) => s.title)).toEqual([
      "Understand",
      "Diagnose",
      "Design",
      "Implement, where agreed",
      "Support and improve, where agreed",
    ]);
    expect(audiences.items).toHaveLength(4);
  });

  it("publishes no credibility evidence unless approved", () => {
    expect(filterPublishable(credibilityEvidence, true)).toEqual([]);
  });
});
