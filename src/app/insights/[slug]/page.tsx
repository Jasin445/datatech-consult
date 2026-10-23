import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InsightDetail } from "@/components/insights/InsightDetail";
import { getInsightBySlug, getInsightSlugs } from "@/lib/content/insights";
import { isIndexable } from "@/lib/content/status";

type Props = { params: Promise<{ slug: string }> };

/** Only publishable articles are pre-rendered; any other slug is a 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return getInsightSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getInsightBySlug(slug);
  if (!item) return { title: "Article not found", robots: { index: false } };
  return {
    title: item.data.title,
    description: item.data.metaDescription,
    // Dummy and draft items are never indexable, in any environment.
    ...(isIndexable(item.status) ? {} : { robots: { index: false, follow: false } }),
  };
}

export default async function InsightPage({ params }: Props) {
  const { slug } = await params;
  const item = getInsightBySlug(slug);
  if (!item) notFound();
  return <InsightDetail status={item.status} insight={item.data} />;
}
