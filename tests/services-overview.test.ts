import { describe, expect, it } from "vitest";
import { services } from "@/content/services";
import { fit, together } from "@/content/services-overview";

const slugs = new Set(services.map((s) => s.slug));

describe("services overview content", () => {
  it("maps every situation to an existing service, covering all four", () => {
    expect(fit.items.every((i) => slugs.has(i.slug))).toBe(true);
    expect(new Set(fit.items.map((i) => i.slug))).toEqual(slugs);
  });

  it("links connections only to existing services", () => {
    for (const c of together.items) {
      expect(c.slugs.length).toBeGreaterThan(1);
      expect(c.slugs.every((s) => slugs.has(s))).toBe(true);
    }
  });
});
