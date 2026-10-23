import { insights } from "@/content/insights";
import type { Insight } from "@/content/insights/types";
import { services } from "@/content/services";
import {
  assertContentValid,
  filterPublishable,
  validateManagedItems,
  type ContentViolation,
  type ManagedContent,
} from "./status";

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

function textOf(a: Insight): string {
  return [
    a.title,
    a.summary,
    a.metaDescription,
    a.author ?? "",
    ...a.keyTakeaways,
    ...a.sections.flatMap((s) => [s.heading, ...s.paragraphs, ...(s.bullets ?? [])]),
  ].join(" ");
}

/** True for a real calendar date written as YYYY-MM-DD (rejects 2026-02-31 and similar). */
export function isValidIsoDate(value: string): boolean {
  if (!DATE_PATTERN.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

/** Status/placeholder checks plus structural checks: slug, duplicates, date, body, related services. */
export function validateInsights(items: readonly ManagedContent<Insight>[]): ContentViolation[] {
  const violations = validateManagedItems(
    items.map((i) => ({ id: `insights/${i.data.slug}`, status: i.status, text: textOf(i.data) })),
  );
  const seen = new Set<string>();
  for (const { data } of items) {
    const id = `insights/${data.slug}`;
    if (!SLUG_PATTERN.test(data.slug)) {
      violations.push({ id, message: `Insight slug "${data.slug}" must be lowercase kebab-case (letters, digits, hyphens).` });
    }
    if (seen.has(data.slug)) {
      violations.push({ id, message: `Duplicate insight slug "${data.slug}".` });
    }
    seen.add(data.slug);
    if (!isValidIsoDate(data.publishedOn)) {
      violations.push({ id, message: `Insight "${data.slug}" has an invalid publishedOn date (${String(data.publishedOn)}). Use a real date as YYYY-MM-DD.` });
    }
    if (data.sections.length === 0) {
      violations.push({ id, message: `Insight "${data.slug}" has no body sections.` });
    }
    for (const section of data.sections) {
      if (!section.heading.trim() || section.paragraphs.length === 0) {
        violations.push({ id, message: `Insight "${data.slug}" has a section with no heading or no paragraphs.` });
      }
    }
    for (const related of data.relatedServices) {
      if (!services.some((s) => s.slug === related)) {
        violations.push({ id, message: `Insight "${data.slug}" references unknown service "${related}".` });
      }
    }
  }
  return violations;
}

/** Articles that may appear, newest first. Production: approved only. Throws on critical violations (fails the build). */
export function getPublishableInsights(
  items: readonly ManagedContent<Insight>[] = insights,
  production?: boolean,
): ManagedContent<Insight>[] {
  assertContentValid(validateInsights(items));
  return filterPublishable(items, production)
    .slice()
    .sort((a, b) => b.data.publishedOn.localeCompare(a.data.publishedOn));
}

export function getInsightBySlug(
  slug: string,
  items: readonly ManagedContent<Insight>[] = insights,
  production?: boolean,
): ManagedContent<Insight> | undefined {
  return getPublishableInsights(items, production).find((i) => i.data.slug === slug);
}

/** Slugs to pre-render. Never includes unapproved items in production. */
export function getInsightSlugs(
  items: readonly ManagedContent<Insight>[] = insights,
  production?: boolean,
): string[] {
  return getPublishableInsights(items, production).map((i) => i.data.slug);
}

/** Human-readable date, fixed to UTC so the same string renders on server and client. */
export function formatPublishedDate(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(
    new Date(`${iso}T00:00:00Z`),
  );
}

/** Estimated reading time in whole minutes (minimum 1) at 200 words per minute. */
export function readingTimeMinutes(a: Insight): number {
  const words = textOf({ ...a, author: undefined }).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
