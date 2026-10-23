import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InsightCard } from "@/components/insights/InsightCard";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHeader } from "@/components/sections/PageHeader";
import { DevNotice } from "@/components/ui/DevNotice";
import { Section } from "@/components/ui/Section";
import { insightsPage } from "@/content/insights/page";
import { getPublishableInsights } from "@/lib/content/insights";
import { DUMMY_MARKER } from "@/lib/content/status";

export const metadata: Metadata = {
  title: insightsPage.title,
  description: insightsPage.metaDescription,
};

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
