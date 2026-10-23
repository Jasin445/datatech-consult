import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { InsightsPreview } from "@/components/insights/InsightsPreview";
import { Hero } from "@/components/sections/Hero";
import { ItemGrid } from "@/components/sections/ItemGrid";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { CtaBand } from "@/components/sections/CtaBand";
import { ServiceCard } from "@/components/services/ServiceCard";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  audiences,
  challenges,
  credibilityEvidence,
  credibilityFallback,
  hero,
  principles,
  process,
  servicesIntro,
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

      <Section tone="surface" labelledBy="challenges-heading">
        <SectionHeading id="challenges-heading" heading={challenges.heading} lead={challenges.lead} />
        <ItemGrid items={challenges.items} columns={3} variant="plain" />
      </Section>

      <Section id="services" labelledBy="services-heading">
        <SectionHeading id="services-heading" heading={servicesIntro.heading} lead={servicesIntro.lead} />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </Section>

      <Section tone="surface" labelledBy="principles-heading">
        <SectionHeading id="principles-heading" heading={principles.heading} lead={principles.lead} />
        <ItemGrid items={principles.items} columns={2} variant="plain" />
      </Section>

      <Section labelledBy="process-heading">
        <SectionHeading id="process-heading" heading={process.heading} lead={process.lead} />
        <ProcessSteps steps={process.steps} />
      </Section>

      <Section tone="surface" labelledBy="credibility-heading">
        <SectionHeading id="credibility-heading" heading={credibility.heading} lead={credibility.lead} />
        <ItemGrid items={credibility.items} columns={4} variant="card" />
      </Section>

      <Section labelledBy="audiences-heading">
        <SectionHeading id="audiences-heading" heading={audiences.heading} lead={audiences.lead} />
        <ItemGrid items={audiences.items} columns={4} variant="card" />
      </Section>

      {/* Renders only when publishable articles exist (production: approved only). */}
      <InsightsPreview items={latestInsights} tone="surface" />

      <CtaBand />
    </>
  );
}
