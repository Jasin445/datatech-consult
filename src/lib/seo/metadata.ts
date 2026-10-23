import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

/**
 * Page metadata rules (pure; the site URL is passed in so this can be unit-tested).
 *
 * Indexing policy: a page is indexable only when the verified production URL (NEXT_PUBLIC_SITE_URL)
 * is configured AND the page itself is public, approved content. Without a site URL there are no
 * canonical URLs and every page is noindex, so an unconfigured or preview deployment is never indexed.
 */
export type PageSeo = {
  /** Page title; the root layout template appends the site name. Omit for the homepage default. */
  title?: string;
  description: string;
  /** Path beginning with "/", e.g. "/services/data-analytics". */
  path: string;
  /** Force noindex (unapproved content, drafts, not-found states). */
  noindex?: boolean;
  type?: "website" | "article";
  /** ISO date, article pages only. */
  publishedTime?: string;
  /** Verified author names, article pages only. */
  authors?: string[];
};

export function absoluteUrl(siteUrl: string, path: string): string {
  return new URL(path, `${siteUrl}/`).toString();
}

/**
 * Default share image (src/app/opengraph-image.tsx). Set explicitly because a page-level `openGraph`
 * object replaces the inherited one, image included.
 */
export const DEFAULT_SHARE_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${siteConfig.name}: ${siteConfig.parentTagline}`,
} as const;

export function buildPageMetadata(seo: PageSeo, siteUrl: string | null): Metadata {
  const indexable = Boolean(siteUrl) && !seo.noindex;
  const url = siteUrl ? absoluteUrl(siteUrl, seo.path) : undefined;
  const shareTitle = seo.title ? `${seo.title} | ${siteConfig.name}` : siteConfig.name;

  return {
    ...(seo.title ? { title: seo.title } : {}),
    description: seo.description,
    ...(url ? { alternates: { canonical: url } } : {}),
    openGraph: {
      siteName: siteConfig.name,
      title: shareTitle,
      description: seo.description,
      ...(url ? { url } : {}),
      images: [DEFAULT_SHARE_IMAGE],
      ...(seo.type === "article"
        ? { type: "article", ...(seo.publishedTime ? { publishedTime: seo.publishedTime } : {}), ...(seo.authors?.length ? { authors: seo.authors } : {}) }
        : { type: "website" }),
    },
    twitter: { card: "summary_large_image", title: shareTitle, description: seo.description, images: [DEFAULT_SHARE_IMAGE.url] },
    ...(indexable ? {} : { robots: { index: false, follow: true } }),
  };
}
