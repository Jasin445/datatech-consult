import type { Metadata } from "next";
import { FolioCard } from "@/components/cards/FolioCard";
import { PhotoCard } from "@/components/cards/PhotoCard";
import { InsightsPreview } from "@/components/insights/InsightsPreview";
import { JsonLd } from "@/components/seo/JsonLd";
import { AudienceMosaic } from "@/components/sections/AudienceMosaic";
import { Commitments } from "@/components/sections/Commitments";
import { Hero } from "@/components/sections/Hero";
import { NextStep } from "@/components/sections/NextStep";
import { ProblemStory } from "@/components/sections/ProblemStory";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { StatementBand } from "@/components/sections/StatementBand";
import { Ornament } from "@/components/ui/Ornament";
import { Photo } from "@/components/ui/Photo";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  audiences,
  challenges,
  credibilityEvidence,
  credibilityFallback,
  hero,
  nextStep,
  principles,
  problem,
  process,
  servicePhotos,
  servicesIntro,
  statement,
} from "@/content/home";
import { services } from "@/content/services";
import { getPublishableInsights } from "@/lib/content/insights";
import { filterPublishable } from "@/lib/content/status";
import { getSiteUrl } from "@/lib/env";
import { siteConfig } from "@/lib/site";
import { pageMetadata } from "@/lib/seo/page";
import { organizationJsonLd } from "@/lib/seo/structured-data";

export const metadata: Metadata = pageMetadata({ description: siteConfig.description, path: "/" });

export default function HomePage() {
  const evidence = filterPublishable(credibilityEvidence).map((e) => e.data);
  const credibility = evidence.length > 0 ? { ...credibilityFallback, items: evidence } : credibilityFallback;
  const latestInsights = getPublishableInsights().slice(0, 3);
  const siteUrl = getSiteUrl();

  return (
    <>
      {siteUrl ? <JsonLd data={organizationJsonLd(siteUrl)} /> : null}
      <Hero {...hero} />

      <ProblemStory folio="01" {...problem} />

      <section aria-labelledby="challenges-heading" className="border-y border-border bg-white py-10">
        <div className="mx-auto flex w-full max-w-[calc(var(--container-max)+2*var(--gutter))] flex-col gap-5 px-(--gutter) lg:flex-row lg:items-center lg:gap-10">
          <h2 id="challenges-heading" className="mb-0 shrink-0 text-2xl">
            {challenges.heading}
          </h2>
          <ul className="flex flex-wrap gap-x-6 gap-y-3" aria-label="Common challenges">
            {challenges.items.map((c) => (
              <li key={c.title} className="flex items-center gap-2 text-charcoal">
                <Ornament className="size-3 text-gold" />
                {c.title}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Section id="services" labelledBy="services-heading">
        <SectionHeading id="services-heading" folio="02" eyebrow={servicesIntro.eyebrow} heading={servicesIntro.heading} lead={servicesIntro.lead} />
        <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {services.map((s, i) => (
            <li key={s.slug}>
              <PhotoCard photo={servicePhotos[s.slug]!} folio={String(i + 1).padStart(2, "0")} title={s.title} text={s.summary} href={s.href} />
            </li>
          ))}
        </ul>
      </Section>

      <StatementBand {...statement} />

      <Section tone="surface" labelledBy="principles-heading">
        <SectionHeading id="principles-heading" folio="03" eyebrow={principles.eyebrow} heading={principles.heading} lead={principles.lead} />
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {principles.items.map((p, i) => (
            <li key={p.title}>
              <FolioCard folio={["i.", "ii.", "iii.", "iv."][i]} title={p.title} text={p.text} featured={i === 0} tone="surface" />
            </li>
          ))}
        </ul>
      </Section>

      <Section labelledBy="process-heading">
        <div className="mb-14 grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionHeading id="process-heading" folio="04" eyebrow={process.eyebrow} heading={process.heading} lead={process.lead} />
          </div>
          <div className="relative aspect-[16/9] overflow-hidden lg:col-span-6 lg:mb-14">
            <Photo photo={process.photo} fill sizes="(min-width: 1024px) 50vw, 100vw" />
          </div>
        </div>
        <ProcessSteps steps={process.steps} />
      </Section>

      <Section tone="surface" labelledBy="audiences-heading">
        <SectionHeading id="audiences-heading" folio="05" eyebrow={audiences.eyebrow} heading={audiences.heading} lead={audiences.lead} />
        <AudienceMosaic items={audiences.items} />
      </Section>

      <Commitments folio="06" eyebrow={credibility.eyebrow} heading={credibility.heading} lead={credibility.lead} items={credibility.items} photo={credibility.photo} />

      {/* Renders only when publishable articles exist (production: approved only). */}
      <InsightsPreview items={latestInsights} tone="surface" />

      <NextStep {...nextStep} />
    </>
  );
}
