import type { Metadata } from "next";
import type { ReactNode } from "react";
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
import { fit, servicesPage } from "@/content/services-overview";
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
            <ButtonLink size="lg" href={ctas.consultation.href}>{ctas.consultation.label}</ButtonLink>
            <ButtonLink size="lg" href="#fit-heading" variant="secondary">
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

      <EngagementShapes id="how-we-work" tone="surface" />

      <NextStep id="services-next-heading" eyebrow={nextStep.eyebrow} heading="Not sure which service you need?" lead="Describe the challenge and we’ll reply with questions or a suggested next step." options={nextStep.options} />
    </>
  );
}
