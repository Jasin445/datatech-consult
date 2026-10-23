import { describe, expect, it } from "vitest";
import { engagement, STAGE_LABELS } from "@/content/engagement";
import { process } from "@/content/home";

describe("engagement model", () => {
  it("uses the same five stages, in the same order, as the process", () => {
    expect(STAGE_LABELS).toHaveLength(process.steps.length);
    STAGE_LABELS.forEach((label, i) => expect(process.steps[i]!.title.startsWith(label)).toBe(true));
  });

  it("covers every stage with at least one way of working", () => {
    const covered = new Set(engagement.shapes.flatMap((s) => s.stages));
    expect([...covered].sort()).toEqual([0, 1, 2, 3, 4]);
  });

  it("publishes no invented prices or durations", () => {
    const text = JSON.stringify(engagement);
    expect(text).not.toMatch(/₦|\$|£|€|\d+\s*(?:day|week|month)s?\b|per hour|hourly/i);
  });
});
