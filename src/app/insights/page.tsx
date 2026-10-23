import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InsightCard } from "@/components/insights/InsightCard";
import { NextStep } from "@/components/sections/NextStep";
import { PageHero } from "@/components/sections/PageHero";
import { SampleNotice } from "@/components/ui/SampleNotice";
import { Section } from "@/components/ui/Section";
import { nextStep } from "@/content/home";
import { insightsPage } from "@/content/insights/page";
import { getPublishableInsights } from "@/lib/content/insights";
import { isIndexable } from "@/lib/content/status";
import { pageMetadata } from "@/lib/seo/page";

export function generateMetadata(): Metadata {
  const items = getPublishableInsights();
  // The route 404s when nothing is publishable: no canonical or share URL for a missing page.
  if (items.length === 0) return { title: insightsPage.title };
  return pageMetadata({
    title: insightsPage.title,
    description: insightsPage.metaDescription,
    path: "/insights",
    // Indexable only when at least one approved item is listed.
    noindex: !items.some((i) => isIndexable(i.status)),
  });
}

export default function InsightsPage() {
  const items = getPublishableInsights();
  // Nothing approved: the route does not exist in production (no fake articles, no empty page).
  if (items.length === 0) notFound();

  const hasUnapproved = items.some((i) => i.status !== "approved");

  return (
    <>
      <PageHero eyebrow={insightsPage.eyebrow} heading={insightsPage.heading} lead={insightsPage.lead} />

      <Section labelledBy="insights-list">
        <h2 id="insights-list" className="sr-only">
          All articles
        </h2>
        {hasUnapproved && (
          <div className="mb-6">
            <SampleNotice>The articles on this page are fictional examples used to preview this section. Authors, dates and figures are illustrative.</SampleNotice>
          </div>
        )}
        <ul className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {items.map(({ status, data }) => (
            <li key={data.slug}>
              <InsightCard status={status} insight={data} />
            </li>
          ))}
        </ul>
      </Section>

      <NextStep id="insights-next-heading" {...nextStep} />
    </>
  );
}
