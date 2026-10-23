import type { TitledItem } from "../home";

/**
 * What kind of work the case study describes. Always shown to visitors so that a prototype or
 * internal demonstration is never presented as completed client work.
 */
export type ProjectType = "completed-work" | "prototype" | "internal-demonstration" | "ongoing";

export const PROJECT_TYPES: readonly ProjectType[] = ["completed-work", "prototype", "internal-demonstration", "ongoing"];

export const projectTypeLabels: Record<ProjectType, string> = {
  "completed-work": "Completed work",
  prototype: "Prototype",
  "internal-demonstration": "Internal demonstration",
  ongoing: "Ongoing project",
};

/** Shape of one case study. Every field must be factually verified before the item is marked "approved". */
export type CaseStudy = {
  /** Unique, lowercase kebab-case. Becomes the URL: /case-studies/<slug> */
  slug: string;
  title: string;
  /** One or two sentences for the index card and the page introduction. */
  summary: string;
  metaDescription: string;
  projectType: ProjectType;
  challenge: string[];
  objectives: string[];
  /** What Datatechhub Consulting actually did. No claims beyond real involvement. */
  contribution: string[];
  approach: TitledItem[];
  solution: string[];
  deliverables: string[];
  /** Verified outcomes only. Leave empty if none are verified. Never estimate or guarantee. */
  results: string[];
  lessons: string[];
  /** Slugs from src/content/services.ts */
  relatedServices: string[];
};
