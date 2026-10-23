import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyCard } from "@/components/case-studies/CaseStudyCard";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHeader } from "@/components/sections/PageHeader";
import { DevNotice } from "@/components/ui/DevNotice";
import { Section } from "@/components/ui/Section";
import { caseStudiesPage } from "@/content/case-studies/page";
import { getPublishableCaseStudies } from "@/lib/content/case-studies";
import { DUMMY_MARKER } from "@/lib/content/status";

export const metadata: Metadata = {
  title: caseStudiesPage.title,
  description: caseStudiesPage.metaDescription,
};

export default function CaseStudiesPage() {
  const items = getPublishableCaseStudies();
  // Nothing approved: the route does not exist in production (no fake projects, no empty page).
  if (items.length === 0) notFound();

  const hasUnapproved = items.some((i) => i.status !== "approved");

  return (
    <>
      <PageHeader heading={caseStudiesPage.heading} lead={caseStudiesPage.lead} />

      <Section labelledBy="case-studies-list">
        <h2 id="case-studies-list" className="sr-only">
          All case studies
        </h2>
        {hasUnapproved && (
          <div className="mb-6">
            <DevNotice>{DUMMY_MARKER}. Unapproved case studies are hidden in production.</DevNotice>
          </div>
        )}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {items.map(({ status, data }) => (
            <CaseStudyCard key={data.slug} status={status} study={data} />
          ))}
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
