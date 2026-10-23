import { getPublishableCaseStudies } from "./case-studies";
import { getPublishableInsights } from "./insights";

/**
 * Case studies and Insights are conditional sections: navigation links and homepage sections
 * appear only when something is publishable (production: approved items only).
 */
export function hasPublishableCaseStudies(): boolean {
  return getPublishableCaseStudies().length > 0;
}

export function hasPublishableInsights(): boolean {
  return getPublishableInsights().length > 0;
}
