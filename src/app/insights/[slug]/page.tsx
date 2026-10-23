import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/page";
import { notFound } from "next/navigation";
import { InsightDetail } from "@/components/insights/InsightDetail";
import { getInsightBySlug, getInsightSlugs } from "@/lib/content/insights";
import { JsonLd } from "@/components/seo/JsonLd";
import { isIndexable } from "@/lib/content/status";
import { getSiteUrl } from "@/lib/env";
import { articleJsonLd } from "@/lib/seo/structured-data";

type Props = { params: Promise<{ slug: string }> };

/** Only publishable articles are pre-rendered; any other slug is a 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return getInsightSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getInsightBySlug(slug);
  if (!item) return { title: "Article not found" };
  return pageMetadata({
    title: item.data.title,
    description: item.data.metaDescription,
    path: `/insights/${item.data.slug}`,
    // Dummy and draft items are never indexable, in any environment.
    noindex: !isIndexable(item.status),
    type: "article",
    publishedTime: item.data.publishedOn,
    ...(item.data.author ? { authors: [item.data.author] } : {}),
  });
}

export default async function InsightPage({ params }: Props) {
  const { slug } = await params;
  const item = getInsightBySlug(slug);
  if (!item) notFound();
  const siteUrl = getSiteUrl();
  return (
    <>
      {siteUrl && isIndexable(item.status) ? <JsonLd data={articleJsonLd(siteUrl, item.data)} /> : null}
      <InsightDetail status={item.status} insight={item.data} />
    </>
  );
}
