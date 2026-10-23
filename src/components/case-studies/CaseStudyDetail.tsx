import type { ReactNode } from "react";
import { Breadcrumb } from "@/components/sections/Breadcrumb";
import { NextStep } from "@/components/sections/NextStep";
import { PageHero } from "@/components/sections/PageHero";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { ReportSection } from "@/components/sections/ReportSection";
import { RelatedServices } from "@/components/services/RelatedServices";
import { Container } from "@/components/ui/Container";
import { DevNotice } from "@/components/ui/DevNotice";
import { Mark } from "@/components/ui/Mark";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { statusPillClass } from "@/components/ui/styles";
import { projectTypeLabels, type CaseStudy } from "@/content/case-studies/types";
import { nextStep } from "@/content/home";
import { services } from "@/content/services";
import { DUMMY_MARKER, type ContentStatus } from "@/lib/content/status";
import { CaseCover } from "./CaseCover";

function Prose({ paragraphs }: { paragraphs: readonly string[] }) {
  return (
    <div className="max-w-(--reading-max) text-lg [&_p]:mb-5 [&_p:last-child]:mb-0">
      {paragraphs.map((p) => (
        <p key={p}>{p}</p>
      ))}
    </div>
  );
}

function Bullets({ items }: { items: readonly string[] }) {
  return (
    <ul className="max-w-(--reading-max) border-t border-charcoal/15">
      {items.map((item) => (
        <li key={item} className="flex items-baseline gap-4 border-b border-charcoal/15 py-4 text-lg">
          <Mark variant="bullet" className="size-3 shrink-0 text-gold" />
          {item}
        </li>
      ))}
    </ul>
  );
}

type Block = { key: string; heading: string; lead?: string; hasContent: boolean; body: ReactNode; wide?: boolean };

/** Template for /case-studies/[slug], laid out like a report. Sections with no content are omitted, never padded. */
export function CaseStudyDetail({ status, study, index = 0 }: { status: ContentStatus; study: CaseStudy; index?: number }) {
  const label = projectTypeLabels[study.projectType];
  const relatedNames = services.filter((s) => study.relatedServices.includes(s.slug)).map((s) => s.title);
  const allBlocks: Block[] = [
    { key: "challenge", hasContent: study.challenge.length > 0, heading: "The challenge", body: <Prose paragraphs={study.challenge} /> },
    { key: "objectives", hasContent: study.objectives.length > 0, heading: "Objectives", body: <Bullets items={study.objectives} /> },
    { key: "contribution", hasContent: study.contribution.length > 0, heading: "Our contribution", body: <Prose paragraphs={study.contribution} /> },
    { key: "approach", hasContent: study.approach.length > 0, heading: "Approach", body: <ProcessSteps steps={study.approach} />, wide: true },
    { key: "solution", hasContent: study.solution.length > 0, heading: "The solution", body: <Prose paragraphs={study.solution} /> },
    { key: "deliverables", hasContent: study.deliverables.length > 0, heading: "Deliverables", body: <Bullets items={study.deliverables} /> },
    {
      key: "results",
      hasContent: study.results.length > 0,
      heading: "Verified results",
      lead: "Only outcomes that have been confirmed are listed here.",
      body: (
        <div className="border-l-4 border-gold bg-gold-tint p-6 lg:p-8">
          <Bullets items={study.results} />
        </div>
      ),
    },
    { key: "lessons", hasContent: study.lessons.length > 0, heading: "Lessons learned", body: <Prose paragraphs={study.lessons} /> },
  ];
  const blocks = allBlocks.filter((b) => b.hasContent);
  const p = `cs-${study.slug}`;

  return (
    <>
      <PageHero
        above={<Breadcrumb items={[{ label: "Case studies", href: "/case-studies" }, { label: study.title }]} />}
        eyebrow={`Case study · ${label}`}
        heading={study.title}
        lead={study.summary}
      />

      <section aria-labelledby={`${p}-sheet`} className="bg-surface py-10 lg:py-14">
        <Container className="grid gap-8 lg:grid-cols-12 lg:items-stretch">
          <h2 id={`${p}-sheet`} className="sr-only">
            At a glance
          </h2>
          <CaseCover number={String(index + 1).padStart(2, "0")} label={label} className="min-h-56 lg:col-span-4" />
          <div className="flex flex-col justify-center gap-6 lg:col-span-8">
            <dl className="grid gap-x-10 gap-y-5 sm:grid-cols-2">
              <div>
                <dt className="mb-1 text-xs font-semibold tracking-[0.18em] text-gold uppercase">Project type</dt>
                <dd className="m-0 font-display text-2xl text-charcoal">{label}</dd>
              </div>
              {relatedNames.length > 0 && (
                <div>
                  <dt className="mb-1 text-xs font-semibold tracking-[0.18em] text-gold uppercase">Services involved</dt>
                  <dd className="m-0 text-charcoal">{relatedNames.join(" · ")}</dd>
                </div>
              )}
            </dl>
            {status !== "approved" && (
              <div className="grid gap-3">
                <p className="mb-0">
                  <span className={statusPillClass}>{status === "dummy" ? "Dummy data" : "Draft"}</span>
                </p>
                <DevNotice>{DUMMY_MARKER}. This case study is hidden in production until it is approved.</DevNotice>
              </div>
            )}
          </div>
        </Container>
      </section>

      <Container className="pb-(--section-space)">
        {blocks.map((block, i) =>
          block.wide ? (
            <section key={block.key} aria-labelledby={`${p}-${block.key}`} className="border-t border-charcoal/15 py-12 lg:py-16">
              <p aria-hidden="true" className="mb-3 font-display text-4xl leading-none text-gold italic">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h2 id={`${p}-${block.key}`} className="mb-10 text-3xl">
                {block.heading}
              </h2>
              {block.body}
            </section>
          ) : (
            <ReportSection key={block.key} id={`${p}-${block.key}`} folio={String(i + 1).padStart(2, "0")} heading={block.heading} lead={block.lead}>
              {block.body}
            </ReportSection>
          ),
        )}
      </Container>

      {study.relatedServices.length > 0 && (
        <Section tone="surface" labelledBy={`${p}-related`}>
          <SectionHeading id={`${p}-related`} eyebrow="Services involved" heading="Related services" />
          <RelatedServices slugs={study.relatedServices} />
        </Section>
      )}

      <NextStep id={`${p}-cta`} eyebrow={nextStep.eyebrow} heading="Facing a similar challenge?" lead="Tell us what you’re dealing with and we’ll tell you honestly whether and how we can help." options={nextStep.options} />
    </>
  );
}
