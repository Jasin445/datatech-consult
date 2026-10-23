import Link from "next/link";
import { ArrowRight } from "@/components/ui/Ornament";
import { InsightCard } from "@/components/insights/InsightCard";
import { DevNotice } from "@/components/ui/DevNotice";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { insightsPage } from "@/content/insights/page";
import type { Insight } from "@/content/insights/types";
import { DUMMY_MARKER, type ManagedContent } from "@/lib/content/status";

/** Homepage preview of the latest articles. Renders nothing when there is nothing publishable. */
export function InsightsPreview({ items, tone = "surface" }: { items: readonly ManagedContent<Insight>[]; tone?: "default" | "surface" }) {
  if (items.length === 0) return null;
  const hasUnapproved = items.some((i) => i.status !== "approved");

  return (
    <Section tone={tone} labelledBy="insights-heading">
      <SectionHeading id="insights-heading" folio="07" eyebrow={insightsPage.previewEyebrow} heading={insightsPage.previewHeading} lead={insightsPage.previewLead} />
      {hasUnapproved && (
        <div className="mb-6">
          <DevNotice>{DUMMY_MARKER}. Unapproved articles are hidden in production.</DevNotice>
        </div>
      )}
      <ul className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
        {items.map(({ status, data }) => (
          <li key={data.slug}>
            <InsightCard status={status} insight={data} />
          </li>
        ))}
      </ul>
      <p className="mt-8 mb-0">
        <Link className="group inline-flex min-h-11 items-center gap-2 font-display text-xl text-charcoal italic" href="/insights">
          View all insights
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </p>
    </Section>
  );
}
