import { caseStudies } from "@/content/case-studies";
import { PROJECT_TYPES, type CaseStudy } from "@/content/case-studies/types";
import { services } from "@/content/services";
import {
  assertContentValid,
  filterPublishable,
  validateManagedItems,
  type ContentViolation,
  type ManagedContent,
} from "./status";
import { SHOW_SAMPLE_CONTENT_IN_PRODUCTION } from "./preview";

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function textOf(c: CaseStudy): string {
  return [
    c.title,
    c.summary,
    c.metaDescription,
    ...c.challenge,
    ...c.objectives,
    ...c.contribution,
    ...c.approach.flatMap((s) => [s.title, s.text]),
    ...c.solution,
    ...c.deliverables,
    ...c.results,
    ...c.lessons,
  ].join(" ");
}

/** Status/placeholder checks plus structural checks: slug format, duplicates, project type, related services. */
export function validateCaseStudies(items: readonly ManagedContent<CaseStudy>[]): ContentViolation[] {
  const violations = validateManagedItems(
    items.map((i) => ({ id: `case-studies/${i.data.slug}`, status: i.status, text: textOf(i.data) })),
  );
  const seen = new Set<string>();
  for (const { data } of items) {
    const id = `case-studies/${data.slug}`;
    if (!SLUG_PATTERN.test(data.slug)) {
      violations.push({ id, message: `Case study slug "${data.slug}" must be lowercase kebab-case (letters, digits, hyphens).` });
    }
    if (seen.has(data.slug)) {
      violations.push({ id, message: `Duplicate case study slug "${data.slug}".` });
    }
    seen.add(data.slug);
    if (!(PROJECT_TYPES as readonly string[]).includes(data.projectType)) {
      violations.push({ id, message: `Case study "${data.slug}" has an invalid projectType (${String(data.projectType)}).` });
    }
    for (const related of data.relatedServices) {
      if (!services.some((s) => s.slug === related)) {
        violations.push({ id, message: `Case study "${data.slug}" references unknown service "${related}".` });
      }
    }
  }
  return violations;
}

/** Case studies that may appear. Production: approved only. Throws on critical violations (fails the build). */
export function getPublishableCaseStudies(
  items: readonly ManagedContent<CaseStudy>[] = caseStudies,
  production?: boolean,
  allowSample: boolean = SHOW_SAMPLE_CONTENT_IN_PRODUCTION,
): ManagedContent<CaseStudy>[] {
  assertContentValid(validateCaseStudies(items));
  return filterPublishable(items, production, allowSample);
}

export function getCaseStudyBySlug(
  slug: string,
  items: readonly ManagedContent<CaseStudy>[] = caseStudies,
  production?: boolean,
  allowSample: boolean = SHOW_SAMPLE_CONTENT_IN_PRODUCTION,
): ManagedContent<CaseStudy> | undefined {
  return getPublishableCaseStudies(items, production, allowSample).find((i) => i.data.slug === slug);
}

/** Slugs to pre-render. Never includes unapproved items in production. */
export function getCaseStudySlugs(
  items: readonly ManagedContent<CaseStudy>[] = caseStudies,
  production?: boolean,
  allowSample: boolean = SHOW_SAMPLE_CONTENT_IN_PRODUCTION,
): string[] {
  return getPublishableCaseStudies(items, production, allowSample).map((i) => i.data.slug);
}
