import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/page";
import { notFound } from "next/navigation";
import { CaseStudyDetail } from "@/components/case-studies/CaseStudyDetail";
import { getCaseStudyBySlug, getCaseStudySlugs } from "@/lib/content/case-studies";
import { isIndexable } from "@/lib/content/status";

type Props = { params: Promise<{ slug: string }> };

/** Only publishable case studies are pre-rendered; any other slug is a 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return getCaseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getCaseStudyBySlug(slug);
  if (!item) return { title: "Case study not found" };
  return pageMetadata({
    title: item.data.title,
    description: item.data.metaDescription,
    path: `/case-studies/${item.data.slug}`,
    // Dummy and draft items are never indexable, in any environment.
    noindex: !isIndexable(item.status),
  });
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const item = getCaseStudyBySlug(slug);
  if (!item) notFound();
  return <CaseStudyDetail status={item.status} study={item.data} />;
}
