import { describe, expect, it } from "vitest";
import { services } from "@/content/services";
import { fit } from "@/content/services-overview";

const slugs = new Set(services.map((s) => s.slug));

describe("services overview content", () => {
  it("maps every situation to an existing service, covering all four", () => {
    expect(fit.items.every((i) => slugs.has(i.slug))).toBe(true);
    expect(new Set(fit.items.map((i) => i.slug))).toEqual(slugs);
  });
});
