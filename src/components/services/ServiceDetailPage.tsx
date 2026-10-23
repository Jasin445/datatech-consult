import { Breadcrumb } from "@/components/sections/Breadcrumb";
import { CtaBand } from "@/components/sections/CtaBand";
import { ItemGrid } from "@/components/sections/ItemGrid";
import { PageHeader } from "@/components/sections/PageHeader";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { RelatedServices } from "@/components/services/RelatedServices";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/content/services";
import type { ServiceDetail } from "@/content/service-details/types";

/** Shared template for the four dedicated service pages. Content comes from src/content/service-details. */
export function ServiceDetailPage({ detail }: { detail: ServiceDetail }) {
  const service = services.find((s) => s.slug === detail.slug);
  const crumbLabel = service?.title ?? detail.metaTitle;
  const p = detail.slug;

  return (
    <>
      <PageHeader
        heading={detail.heading}
        lead={detail.lead}
        above={<Breadcrumb items={[{ label: "Services", href: "/services" }, { label: crumbLabel }]} />}
      />

      <Section labelledBy={`${p}-intro`}>
        <h2 id={`${p}-intro`} className="visually-hidden">
          Overview
        </h2>
        <div className="prose-intro">
          {detail.intro.map((para) => (
            <p key={para}>{para}</p>
          ))}
        </div>
      </Section>

      <Section tone="surface" labelledBy={`${p}-problems`}>
        <SectionHeading id={`${p}-problems`} heading={detail.problems.heading} lead={detail.problems.lead} />
        <ItemGrid items={detail.problems.items} columns={3} variant="plain" />
      </Section>

      <Section labelledBy={`${p}-capabilities`}>
        <SectionHeading id={`${p}-capabilities`} heading={detail.capabilities.heading} lead={detail.capabilities.lead} />
        <ItemGrid items={detail.capabilities.items} columns={3} variant="card" />
      </Section>

      {detail.useCases && (
        <Section tone="surface" labelledBy={`${p}-use-cases`}>
          <SectionHeading id={`${p}-use-cases`} heading={detail.useCases.heading} lead={detail.useCases.lead} />
          <ItemGrid items={detail.useCases.items} columns={3} variant="plain" />
        </Section>
      )}

      <Section tone={detail.useCases ? "default" : "surface"} labelledBy={`${p}-deliverables`}>
        <SectionHeading id={`${p}-deliverables`} heading={detail.deliverables.heading} lead={detail.deliverables.lead} />
        <ItemGrid items={detail.deliverables.items} columns={2} variant="plain" />
      </Section>

      <Section tone={detail.useCases ? "surface" : "default"} labelledBy={`${p}-considerations`}>
        <SectionHeading id={`${p}-considerations`} heading={detail.considerations.heading} lead={detail.considerations.lead} />
        <ItemGrid items={detail.considerations.items} columns={3} variant="card" />
      </Section>

      <Section tone={detail.useCases ? "default" : "surface"} labelledBy={`${p}-approach`}>
        <SectionHeading id={`${p}-approach`} heading={detail.approach.heading} lead={detail.approach.lead} />
        <ProcessSteps steps={detail.approach.steps} />
      </Section>

      <Section tone={detail.useCases ? "surface" : "default"} labelledBy={`${p}-value`}>
        <SectionHeading id={`${p}-value`} heading={detail.value.heading} lead={detail.value.lead} />
        <ul className="value-list">
          {detail.value.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Section>

      <Section tone={detail.useCases ? "default" : "surface"} labelledBy={`${p}-related`}>
        <SectionHeading id={`${p}-related`} heading="Related services" />
        <RelatedServices slugs={detail.related} />
      </Section>

      <CtaBand id={`${p}-cta`} heading={detail.cta.heading} body={detail.cta.body} />
    </>
  );
}
