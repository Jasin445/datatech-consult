import type { MetadataRoute } from "next";
import type { CaseStudy } from "@/content/case-studies/types";
import type { Insight } from "@/content/insights/types";
import { services } from "@/content/services";
import { getPublishableCaseStudies } from "@/lib/content/case-studies";
import { getPublishableInsights } from "@/lib/content/insights";
import type { ManagedContent } from "@/lib/content/status";
import { absoluteUrl } from "./metadata";

/** Public pages that always exist. Conditional sections and the privacy notice are added by buildSitemap. */
export const STATIC_PUBLIC_PATHS: readonly string[] = [
  "/",
  "/services",
  ...services.map((s) => s.href),
  "/about",
  "/contact",
  "/book-consultation",
];

export type SitemapSources = {
  caseStudies: readonly ManagedContent<CaseStudy>[];
  insights: readonly ManagedContent<Insight>[];
  privacyApproved: boolean;
};

/**
 * Sitemap entries. Empty without a verified site URL (sitemaps need absolute URLs).
 * Content is always filtered as in production (approved only), whatever the environment,
 * and validated first, so a critical content violation fails the build here too.
 */
export function buildSitemap(siteUrl: string | null, sources: SitemapSources): MetadataRoute.Sitemap {
  if (!siteUrl) return [];
  // Approved only: samples shown on the live site are never placed in the sitemap.
  const caseStudies = getPublishableCaseStudies(sources.caseStudies, true, false);
  const insights = getPublishableInsights(sources.insights, true, false);

  const entry = (path: string, lastModified?: string): MetadataRoute.Sitemap[number] => ({
    url: absoluteUrl(siteUrl, path),
    ...(lastModified ? { lastModified } : {}),
  });

  return [
    ...STATIC_PUBLIC_PATHS.map((p) => entry(p)),
    ...(caseStudies.length ? [entry("/case-studies"), ...caseStudies.map((c) => entry(`/case-studies/${c.data.slug}`))] : []),
    ...(insights.length ? [entry("/insights"), ...insights.map((i) => entry(`/insights/${i.data.slug}`, i.data.publishedOn))] : []),
    ...(sources.privacyApproved ? [entry("/privacy")] : []),
  ];
}

/** Crawling is allowed only on a production build with a verified site URL. */
export function buildRobots(siteUrl: string | null, production: boolean): MetadataRoute.Robots {
  if (!siteUrl || !production) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: absoluteUrl(siteUrl, "/sitemap.xml"),
  };
}
