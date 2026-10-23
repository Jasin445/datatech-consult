import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/page";
import { notFound } from "next/navigation";
import { InsightCard } from "@/components/insights/InsightCard";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHeader } from "@/components/sections/PageHeader";
import { DevNotice } from "@/components/ui/DevNotice";
import { Section } from "@/components/ui/Section";
import { insightsPage } from "@/content/insights/page";
import { getPublishableInsights } from "@/lib/content/insights";
import { DUMMY_MARKER, isIndexable } from "@/lib/content/status";

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
      <PageHeader heading={insightsPage.heading} lead={insightsPage.lead} />

      <Section labelledBy="insights-list">
        <h2 id="insights-list" className="sr-only">
          All articles
        </h2>
        {hasUnapproved && (
          <div className="mb-6">
            <DevNotice>{DUMMY_MARKER}. Unapproved articles are hidden in production.</DevNotice>
          </div>
        )}
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {items.map(({ status, data }) => (
            <li key={data.slug}>
              <InsightCard status={status} insight={data} />
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand />
    </>
  );
}
