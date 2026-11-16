import type { Metadata } from "next";
import { PhotoCard } from "@/components/cards/PhotoCard";
import { InsightsPreview } from "@/components/insights/InsightsPreview";
import { JsonLd } from "@/components/seo/JsonLd";
import { Hero } from "@/components/sections/Hero";
import { NextStep } from "@/components/sections/NextStep";
import { ProblemStory } from "@/components/sections/ProblemStory";
import { StatementBand } from "@/components/sections/StatementBand";
import { WorkingWithUs } from "@/components/sections/WorkingWithUs";
import { WorkShowcase } from "@/components/sections/WorkShowcase";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DashboardMock, OptionsMock, PipelineDiagram, SpreadsheetMock, WorkflowDiagram } from "@/components/visuals";
import { InContext } from "@/components/visuals/InContext";
import { photos } from "@/content/media/photos";
import { challenges, credibilityEvidence, hero, nextStep, problem, servicePhotos, servicesIntro, showcase, statement, workingWithUs } from "@/content/home";
import { services } from "@/content/services";
import { getPublishableInsights } from "@/lib/content/insights";
import { filterPublishable } from "@/lib/content/status";
import { getSiteUrl } from "@/lib/env";
import { siteConfig } from "@/lib/site";
import { pageMetadata } from "@/lib/seo/page";
import { organizationJsonLd } from "@/lib/seo/structured-data";

export const metadata: Metadata = pageMetadata({ description: siteConfig.description, path: "/" });

const showcaseVisuals = {
  pipeline: <PipelineDiagram />,
  workflow: <WorkflowDiagram />,
  options: <OptionsMock />,
} as const;

/**
 * Homepage (V4): hero (dashboard in its setting), problem (spreadsheet, tags, field note), where the data
 * comes from (photo strip), services, what the work looks like, statement, working with us, closing.
 */
export default function HomePage() {
  const evidence = filterPublishable(credibilityEvidence).map((e) => e.data);
  const latestInsights = getPublishableInsights().slice(0, 3);
  const siteUrl = getSiteUrl();

  return (
    <>
      {siteUrl ? <JsonLd data={organizationJsonLd(siteUrl)} /> : null}
      <Hero
        {...hero}
        visual={
          <InContext photo={photos.colleaguesLaptop} priority>
            <DashboardMock />
          </InContext>
        }
      />

      <ProblemStory {...problem} visual={<SpreadsheetMock />} tags={challenges.items.map((c) => c.title)} note={hero.note} />

      {/* <WhereDataLives {...dataPlaces} /> */}

      <Section id="services" labelledBy="services-heading">
        <SectionHeading id="services-heading" eyebrow={servicesIntro.eyebrow} heading={servicesIntro.heading} lead={servicesIntro.lead} />
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {services.map((s, i) => (
            <li key={s.slug}>
              <PhotoCard photo={servicePhotos[s.slug]!} folio={String(i + 1).padStart(2, "0")} title={s.title} text={s.summary} href={s.href} />
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="mist" labelledBy="showcase-heading">
        <SectionHeading id="showcase-heading" eyebrow={showcase.eyebrow} heading={showcase.heading} lead={showcase.lead} />
        <WorkShowcase items={showcase.items.map((item) => ({ ...item, visual: showcaseVisuals[item.key] }))} />
      </Section>

      <StatementBand {...statement} />

      <WorkingWithUs
        eyebrow={workingWithUs.eyebrow}
        heading={evidence.length > 0 ? "What we have done." : workingWithUs.heading}
        items={evidence.length > 0 ? evidence : workingWithUs.items}
      />

      {/* Renders only when publishable articles exist (production: approved only). */}
      <InsightsPreview items={latestInsights} tone="surface" />

      <NextStep {...nextStep} />
    </>
  );
}
