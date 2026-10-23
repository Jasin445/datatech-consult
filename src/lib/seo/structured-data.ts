import type { Insight } from "@/content/insights/types";
import { siteConfig } from "@/lib/site";
import { absoluteUrl } from "./metadata";

/** Organization: name, URL and the official logo only. Nothing else is verified yet. */
export function organizationJsonLd(siteUrl: string): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: absoluteUrl(siteUrl, "/"),
    logo: absoluteUrl(siteUrl, "/logos/datatechhub-logo.png"),
  };
}

/** Article: approved items only (the caller checks). Author is included only when a verified name exists. */
export function articleJsonLd(siteUrl: string, insight: Insight): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: insight.title,
    description: insight.metaDescription,
    datePublished: insight.publishedOn,
    url: absoluteUrl(siteUrl, `/insights/${insight.slug}`),
    mainEntityOfPage: absoluteUrl(siteUrl, `/insights/${insight.slug}`),
    publisher: { "@type": "Organization", name: siteConfig.name },
    ...(insight.author ? { author: { "@type": "Person", name: insight.author } } : {}),
  };
}
