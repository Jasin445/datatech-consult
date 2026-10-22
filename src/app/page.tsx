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
import { filterPublishable } from "@/lib/content/status";

export default function HomePage() {
  const evidence = filterPublishable(credibilityEvidence).map((e) => e.data);
  const credibility = evidence.length > 0 ? { ...credibilityFallback, items: evidence } : credibilityFallback;

  return (
    <>
      <Hero {...hero} />

      <Section tone="surface" labelledBy="challenges-heading">
        <SectionHeading id="challenges-heading" heading={challenges.heading} lead={challenges.lead} />
        <ItemGrid items={challenges.items} columns={3} variant="plain" />
      </Section>

      <Section id="services" labelledBy="services-heading">
        <SectionHeading id="services-heading" heading={servicesIntro.heading} lead={servicesIntro.lead} />
        <div className="card-grid">
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

      {/* Insights preview renders only when approved articles exist. Implemented in Checkpoint 10. */}

      <CtaBand />
    </>
  );
}
