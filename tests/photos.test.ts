import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { photos } from "@/content/media/photos";

const dir = path.resolve(import.meta.dirname, "../public/images/photos");
const registered = Object.values(photos);

describe("photo registry", () => {
  it("registers every file in public/images/photos", () => {
    const files = fs.readdirSync(dir).filter((f) => !f.startsWith("."));
    const srcs = new Set(registered.map((p) => path.basename(p.src)));
    expect(files.filter((f) => !srcs.has(f))).toEqual([]);
  });

  it("points every entry at an existing file", () => {
    for (const p of registered) expect(fs.existsSync(path.join(dir, path.basename(p.src))), p.src).toBe(true);
  });

  it("records licence, source and meaningful alt text for every photo", () => {
    for (const p of registered) {
      expect(p.license).toBe("Unsplash License");
      expect(p.sourceUrl).toMatch(/^https:\/\/unsplash\.com\/photos\//);
      expect(p.alt.length).toBeGreaterThan(15);
      expect(p.width).toBeGreaterThan(0);
      expect(p.height).toBeGreaterThan(0);
    }
  });

  it("never implies the people shown are our team or clients", () => {
    for (const p of registered) expect(p.alt.toLowerCase()).not.toMatch(/datatechhub|our team|our client|our consultant/);
  });
});
