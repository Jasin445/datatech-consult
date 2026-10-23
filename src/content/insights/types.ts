import type { Photo } from "../media/photos";

/** One headed section of an article body. Bullets are optional and render after the paragraphs. */
export type InsightSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

/** Shape of one Insights article. Every claim must be verified before the item is marked "approved". */
export type Insight = {
  /** Unique, lowercase kebab-case. Becomes the URL: /insights/<slug> */
  slug: string;
  title: string;
  /** One or two sentences for the index card and the page introduction. */
  summary: string;
  metaDescription: string;
  /** Publication date as ISO YYYY-MM-DD. Must be the real date the article is published. */
  publishedOn: string;
  /** A real, approved author name. Omit rather than guess; never attribute an article to someone who has not approved it. */
  author?: string;
  /** Short points a busy reader can take away. Optional. */
  keyTakeaways: string[];
  sections: InsightSection[];
  /** Slugs from src/content/services.ts */
  relatedServices: string[];
  /** Optional licensed cover image from src/content/media/photos.ts (illustrative only). */
  cover?: Photo;
};
