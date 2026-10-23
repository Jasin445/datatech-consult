import type { ReactNode } from "react";
import { Breadcrumb } from "@/components/sections/Breadcrumb";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHeader } from "@/components/sections/PageHeader";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { RelatedServices } from "@/components/services/RelatedServices";
import { DevNotice } from "@/components/ui/DevNotice";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pillClass, statusPillClass, valueItemClass } from "@/components/ui/styles";
import { projectTypeLabels, type CaseStudy } from "@/content/case-studies/types";
import { DUMMY_MARKER, type ContentStatus } from "@/lib/content/status";

const proseClass = "max-w-(--reading-max) [&_p]:text-lg [&_p:last-child]:mb-0";

function Prose({ paragraphs }: { paragraphs: readonly string[] }) {
  return (
    <div className={proseClass}>
      {paragraphs.map((p) => (
        <p key={p}>{p}</p>
      ))}
    </div>
  );
}

function Bullets({ items }: { items: readonly string[] }) {
  return (
    <ul className="grid max-w-(--reading-max) gap-3">
      {items.map((item) => (
        <li key={item} className={valueItemClass}>
          {item}
        </li>
      ))}
    </ul>
  );
}

type Block = { key: string; heading: string; lead?: string; hasContent: boolean; body: ReactNode };

/** Template for /case-studies/[slug]. Sections with no content are omitted, never padded. */
export function CaseStudyDetail({ status, study }: { status: ContentStatus; study: CaseStudy }) {
  const allBlocks: Block[] = [
    { key: "challenge", hasContent: study.challenge.length > 0, heading: "The challenge", body: <Prose paragraphs={study.challenge} /> },
    { key: "objectives", hasContent: study.objectives.length > 0, heading: "Objectives", body: <Bullets items={study.objectives} /> },
    { key: "contribution", hasContent: study.contribution.length > 0, heading: "Our contribution", body: <Prose paragraphs={study.contribution} /> },
    { key: "approach", hasContent: study.approach.length > 0, heading: "Approach", body: <ProcessSteps steps={study.approach} /> },
    { key: "solution", hasContent: study.solution.length > 0, heading: "The solution", body: <Prose paragraphs={study.solution} /> },
    { key: "deliverables", hasContent: study.deliverables.length > 0, heading: "Deliverables", body: <Bullets items={study.deliverables} /> },
    {
      key: "results",
      hasContent: study.results.length > 0,
      heading: "Verified results",
      lead: "Only outcomes that have been confirmed are listed here.",
      body: <Bullets items={study.results} />,
    },
    { key: "lessons", hasContent: study.lessons.length > 0, heading: "Lessons learned", body: <Prose paragraphs={study.lessons} /> },
  ];
  const blocks = allBlocks.filter((b) => b.hasContent);

  const p = `cs-${study.slug}`;

  return (
    <>
      <PageHeader
        heading={study.title}
        lead={study.summary}
        above={<Breadcrumb items={[{ label: "Case studies", href: "/case-studies" }, { label: study.title }]} />}
      />

      <Section labelledBy={`${p}-type`}>
        <h2 id={`${p}-type`} className="sr-only">
          Project type
        </h2>
        <div className="grid max-w-(--reading-max) gap-4">
          <p className="mb-0 flex flex-wrap gap-2">
            <span className={pillClass}>{projectTypeLabels[study.projectType]}</span>
            {status !== "approved" && <span className={statusPillClass}>{status === "dummy" ? "Dummy data" : "Draft"}</span>}
          </p>
          {status !== "approved" && (
            <DevNotice>{DUMMY_MARKER}. This case study is hidden in production until it is approved.</DevNotice>
          )}
        </div>
      </Section>

      {blocks.map((block, i) => (
        <Section key={block.key} tone={i % 2 === 0 ? "surface" : "default"} labelledBy={`${p}-${block.key}`}>
          <SectionHeading id={`${p}-${block.key}`} heading={block.heading} lead={block.lead} />
          {block.body}
        </Section>
      ))}

      {study.relatedServices.length > 0 && (
        <Section tone={blocks.length % 2 === 0 ? "surface" : "default"} labelledBy={`${p}-related`}>
          <SectionHeading id={`${p}-related`} heading="Related services" />
          <RelatedServices slugs={study.relatedServices} />
        </Section>
      )}

      <CtaBand
        id={`${p}-cta`}
        heading="Facing a similar challenge?"
        body="Tell us what you’re dealing with and we’ll tell you honestly whether and how we can help."
      />
    </>
  );
}
