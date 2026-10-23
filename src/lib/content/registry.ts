import { getPublishableCaseStudies } from "./case-studies";
import { filterPublishable, type ManagedContent } from "./status";

/**
 * Case studies and Insights are conditional sections: navigation links and homepage sections
 * appear only when something is publishable. Case studies are real (Checkpoint 9).
 * The Insights registry is added in Checkpoint 10; until then it is empty.
 */
const insights: ManagedContent<{ slug: string }>[] = [];

export function hasPublishableCaseStudies(): boolean {
  return getPublishableCaseStudies().length > 0;
}

export function hasPublishableInsights(): boolean {
  return filterPublishable(insights).length > 0;
}
