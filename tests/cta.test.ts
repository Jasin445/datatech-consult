import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { conversionWarnings, resolveConversionPaths } from "@/lib/conversion";
import { ctas, primaryCta } from "@/lib/site";

const ALTERNATIVE_LABELS = [
  "Discuss a business challenge", "Start in writing", "Pick a time", "Get in touch", "Contact us", "Enquire now",
  "Talk to us", "Schedule a call", "Book a call", "Book now", "Request a consultation", "Make an enquiry",
];

function sourceFiles(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const full = path.join(dir, e.name);
    return e.isDirectory() ? sourceFiles(full) : /\.(ts|tsx)$/.test(e.name) ? [full] : [];
  });
}

describe("call-to-action vocabulary", () => {
  it("defines exactly two actions", () => {
    expect(ctas).toEqual({
      enquiry: { label: "Send an enquiry", href: "/contact" },
      consultation: { label: "Book a consultation", href: "/book-consultation" },
    });
    expect(primaryCta).toBe(ctas.consultation);
  });

  it("uses no alternative labels for those actions anywhere in the source", () => {
    const src = path.resolve(import.meta.dirname, "../src");
    for (const file of sourceFiles(src)) {
      const text = fs.readFileSync(file, "utf8");
      const found = ALTERNATIVE_LABELS.filter((l) => text.includes(l));
      expect(found, path.relative(src, file)).toEqual([]);
    }
  });
});

describe("conversion paths", () => {
  it("reports no working path when nothing is configured", () => {
    const p = resolveConversionPaths({ formAvailable: false, bookingUrl: null, publicEmail: null });
    expect(p.any).toBe(false);
    expect(conversionWarnings(p).at(-1)).toMatch(/LAUNCH BLOCKER/);
  });

  it("treats any single working channel as a path", () => {
    expect(resolveConversionPaths({ formAvailable: false, bookingUrl: null, publicEmail: "a@example.com" }).any).toBe(true);
    expect(resolveConversionPaths({ formAvailable: false, bookingUrl: "https://cal.example.com/x", publicEmail: null }).booking).toBe(true);
    expect(resolveConversionPaths({ formAvailable: true, bookingUrl: null, publicEmail: null }).any).toBe(true);
  });

  it("has no warnings when everything is configured", () => {
    expect(conversionWarnings(resolveConversionPaths({ formAvailable: true, bookingUrl: "https://cal.example.com/x", publicEmail: "a@example.com" }))).toEqual([]);
  });
});
