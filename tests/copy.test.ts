import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

/**
 * Copy guard for everything visitors read (src/content). Blocks generic marketing filler and
 * unsupported claims so edits keep the plain, specific voice. Comments in the files are ignored.
 */
const BANNED = [
  "seamless", "leverage", "unlock", "cutting-edge", "state-of-the-art", "robust", "innovative", "journey",
  "game-changer", "game changer", "synergy", "world-class", "revolutionise", "revolutionize", "next-level",
  "best-in-class", "holistic", "supercharge", "in today’s", "fast-paced", "delve", "one-stop", "trusted partner",
  "passionate", "proven", "years of experience", "industry-leading", "award-winning",
];

function contentFiles(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const full = path.join(dir, e.name);
    return e.isDirectory() ? contentFiles(full) : full.endsWith(".ts") ? [full] : [];
  });
}

/** String literals only (comments stripped), so documentation notes don't trip the guard. */
function visibleText(source: string): string {
  const noComments = source.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
  return (noComments.match(/(["`])(?:\\.|(?!\1).)*\1/g) ?? []).join(" ").toLowerCase();
}

const root = path.resolve(import.meta.dirname, "../src/content");

describe("site copy", () => {
  it.each(contentFiles(root).map((f) => [path.relative(root, f), f]))("%s avoids filler phrases", (_name, file) => {
    const text = visibleText(fs.readFileSync(file, "utf8"));
    const found = BANNED.filter((word) => text.includes(word));
    expect(found).toEqual([]);
  });

  it("only uses 'guarantee' to disclaim guarantees", () => {
    for (const file of contentFiles(root)) {
      const text = visibleText(fs.readFileSync(file, "utf8")).replaceAll("can’t guarantee", "");
      expect(text, path.relative(root, file)).not.toContain("guarantee");
    }
  });
});
