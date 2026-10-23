import { photos } from "@/content/media/photos";
import { DUMMY_MARKER, type ManagedContent } from "@/lib/content/status";
import type { Insight } from "./types";

/**
 * Insights articles. No real articles have been supplied yet.
 * The single entry below is fictional development data (status "dummy"): shown only outside production,
 * with visible warnings, and excluded from production output, routes, navigation and any future sitemap.
 * Add a real article only with business approval and verified facts, and set status to "approved"
 * only once every claim, the publication date and the author credit are confirmed.
 */
export const insights: ManagedContent<Insight>[] = [
  {
    status: "dummy",
    data: {
      slug: "sample-article",
      title: "Sample article: choosing what to measure first",
      summary: `${DUMMY_MARKER}. Fictional entry used to test the article layout. Not real guidance.`,
      metaDescription: `${DUMMY_MARKER}. Fictional article.`,
      publishedOn: "2026-01-01",
      keyTakeaways: ["Placeholder takeaway one.", "Placeholder takeaway two."],
      sections: [
        {
          heading: "Placeholder section one",
          paragraphs: [`${DUMMY_MARKER}. Placeholder paragraph describing the first idea.`, "A second placeholder paragraph."],
        },
        {
          heading: "Placeholder section two",
          paragraphs: ["Placeholder paragraph introducing a short list."],
          bullets: ["Placeholder point one", "Placeholder point two"],
        },
      ],
      relatedServices: ["data-analytics", "business-technology-consulting"],
      cover: photos.marketAerial,
    },
  },
];
