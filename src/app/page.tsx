import type { Metadata } from "next";
import { PhotoCard } from "@/components/cards/PhotoCard";
import { InsightsPreview } from "@/components/insights/InsightsPreview";
import { JsonLd } from "@/components/seo/JsonLd";
import { Hero } from "@/components/sections/Hero";
import { NextStep } from "@/components/sections/NextStep";
import { ProblemStory } from "@/components/sections/ProblemStory";
import { StatementBand } from "@/components/sections/StatementBand";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DashboardMock, SpreadsheetMock } from "@/components/visuals";
import { InContext } from "@/components/visuals/InContext";
import { photos } from "@/content/media/photos";
import { challenges, hero, nextStep, problem, servicePhotos, servicesIntro, statement } from "@/content/home";
import { services } from "@/content/services";
import { getPublishableInsights } from "@/lib/content/insights";
import { getSiteUrl } from "@/lib/env";
import { siteConfig } from "@/lib/site";
import { pageMetadata } from "@/lib/seo/page";
import { organizationJsonLd } from "@/lib/seo/structured-data";

export const metadata: Metadata = pageMetadata({ description: siteConfig.description, path: "/" });

/**
 * Homepage (V4): hero (dashboard in its setting), problem (spreadsheet, tags, field note), where the data
 * comes from (photo strip), services, statement, closing. The showcase and working-with-us sections are
 * commented out below (information overload) — restore them by uncommenting.
 */
export default function HomePage() {
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

      {/* Commented out 2026-11-16 (information overload): the showcase re-sells the services
          already listed above. Restore by uncommenting.
      <Section tone="mist" labelledBy="showcase-heading">
        <SectionHeading id="showcase-heading" eyebrow={showcase.eyebrow} heading={showcase.heading} lead={showcase.lead} />
        <WorkShowcase items={showcase.items.map((item) => ({ ...item, visual: showcaseVisuals[item.key] }))} />
      </Section>
      */}

      <StatementBand {...statement} />

      {/* Commented out 2026-11-16 (information overload): the four principles restate the hero,
          the problem story and the engagement shapes. Restore by uncommenting.
      <WorkingWithUs
        eyebrow={workingWithUs.eyebrow}
        heading={evidence.length > 0 ? "What we have done." : workingWithUs.heading}
        items={evidence.length > 0 ? evidence : workingWithUs.items}
      />
      */}

      {/* Renders only when publishable articles exist (production: approved only). */}
      <InsightsPreview items={latestInsights} tone="surface" />

      <NextStep {...nextStep} />
    </>
  );
}
