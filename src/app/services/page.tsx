import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/page";
import { PageHeader } from "@/components/sections/PageHeader";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { CtaBand } from "@/components/sections/CtaBand";
import { ServiceCard } from "@/components/services/ServiceCard";
import { FitList } from "@/components/services/FitList";
import { ConnectionList } from "@/components/services/ConnectionList";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { process } from "@/content/home";
import { services } from "@/content/services";
import { engagement, fit, servicesPage, together } from "@/content/services-overview";

export const metadata: Metadata = pageMetadata({
  title: servicesPage.title,
  description: servicesPage.metaDescription,
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHeader heading={servicesPage.heading} lead={servicesPage.lead} />

      <Section labelledBy="service-areas-heading">
        <SectionHeading id="service-areas-heading" heading="Our four service areas" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </Section>

      <Section tone="surface" labelledBy="fit-heading">
        <SectionHeading id="fit-heading" heading={fit.heading} lead={fit.lead} />
        <FitList items={fit.items} />
      </Section>

      <Section labelledBy="together-heading">
        <SectionHeading id="together-heading" heading={together.heading} lead={together.lead} />
        <ConnectionList items={together.items} />
      </Section>

      <Section tone="surface" labelledBy="engagement-heading">
        <SectionHeading id="engagement-heading" heading={engagement.heading} lead={engagement.lead} />
        <ProcessSteps steps={process.steps} />
        <div className="mt-8 max-w-(--reading-max) [&_p:last-child]:mb-0">
          {engagement.notes.map((note) => (
            <p key={note}>{note}</p>
          ))}
        </div>
      </Section>

      <CtaBand
        heading="Not sure which service you need?"
        body="Describe the challenge and we’ll tell you honestly whether and how we can help."
      />
    </>
  );
}
