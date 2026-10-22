import { filterPublishable, type ManagedContent } from "./status";

/**
 * Case studies and Insights are conditional sections.
 * Typed registries are added in Checkpoints 9 and 10. Until then they are empty,
 * so navigation links and homepage sections stay hidden.
 */
const caseStudies: ManagedContent<{ slug: string }>[] = [];
const insights: ManagedContent<{ slug: string }>[] = [];

export function hasPublishableCaseStudies(): boolean {
  return filterPublishable(caseStudies).length > 0;
}

export function hasPublishableInsights(): boolean {
  return filterPublishable(insights).length > 0;
}
