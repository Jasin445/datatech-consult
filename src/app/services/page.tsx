import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { FolioCard } from "@/components/cards/FolioCard";
import { EngagementShapes } from "@/components/sections/EngagementShapes";
import { NextStep } from "@/components/sections/NextStep";
import { PageHero } from "@/components/sections/PageHero";
import { FitList } from "@/components/services/FitList";
import { ServiceFeature } from "@/components/services/ServiceFeature";
import { ButtonLink } from "@/components/ui/Button";
import { DashboardMock, OptionsMock, PipelineDiagram, WorkflowDiagram } from "@/components/visuals";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { nextStep } from "@/content/home";
import { services } from "@/content/services";
import { fit, servicesPage, together } from "@/content/services-overview";
import { pageMetadata } from "@/lib/seo/page";
import { ctas } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: servicesPage.title,
  description: servicesPage.metaDescription,
  path: "/services",
});

const serviceVisuals: Record<string, ReactNode> = {
  "data-analytics": <DashboardMock />,
  "data-infrastructure": <PipelineDiagram />,
  "ai-automation": <WorkflowDiagram />,
  "business-technology-consulting": <OptionsMock />,
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow={servicesPage.eyebrow}
        heading={servicesPage.heading}
        lead={servicesPage.lead}
        photo={servicesPage.photo}
        actions={
          <>
            <ButtonLink href={ctas.consultation.href}>{ctas.consultation.label}</ButtonLink>
            <ButtonLink href="#fit-heading" variant="secondary">
              Find your starting point
            </ButtonLink>
          </>
        }
      />

      <Section labelledBy="service-areas-heading">
        <SectionHeading id="service-areas-heading" eyebrow={servicesPage.areas.eyebrow} heading={servicesPage.areas.heading} />
        <ul className="grid gap-20 lg:gap-28">
          {services.map((service, i) => (
            <li key={service.slug}>
              <ServiceFeature service={service} visual={serviceVisuals[service.slug]} index={i} />
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="surface" labelledBy="fit-heading">
        <SectionHeading id="fit-heading" eyebrow={fit.eyebrow} heading={fit.heading} lead={fit.lead} />
        <FitList items={fit.items} />
      </Section>

      <Section labelledBy="together-heading">
        <SectionHeading id="together-heading" eyebrow={together.eyebrow} heading={together.heading} lead={together.lead} />
        <ul className="grid gap-6 lg:grid-cols-3">
          {together.items.map((item, i) => (
            <li key={item.title}>
              <FolioCard folio={["i.", "ii.", "iii."][i]} title={item.title} text={item.text} tone="white">
                <p className="mt-auto mb-0 flex flex-wrap gap-x-4 gap-y-2 border-t border-border pt-5 text-sm">
                  {item.slugs.map((slug) => {
                    const s = services.find((x) => x.slug === slug)!;
                    return (
                      <Link key={slug} href={s.href} className="font-semibold">
                        {s.title}
                      </Link>
                    );
                  })}
                </p>
              </FolioCard>
            </li>
          ))}
        </ul>
      </Section>

      <EngagementShapes id="how-we-work" tone="surface" />

      <NextStep id="services-next-heading" eyebrow={nextStep.eyebrow} heading="Not sure which service you need?" lead="Describe the challenge and we’ll tell you honestly whether and how we can help." options={nextStep.options} />
    </>
  );
}
