import type { ReactNode } from "react";
import Link from "next/link";
import { FolioCard } from "@/components/cards/FolioCard";
import { Breadcrumb } from "@/components/sections/Breadcrumb";
import { ContentsList } from "@/components/sections/ContentsList";
import { EngagementLink } from "@/components/sections/EngagementLink";
import { NextStep } from "@/components/sections/NextStep";
import { PageHero } from "@/components/sections/PageHero";
import { ProblemStory } from "@/components/sections/ProblemStory";
import { ButtonLink } from "@/components/ui/Button";
import { Mark } from "@/components/ui/Mark";
import { Photo } from "@/components/ui/Photo";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DashboardMock, OptionsMock, PipelineDiagram, WorkflowDiagram } from "@/components/visuals";
import { nextStep } from "@/content/home";
import { services } from "@/content/services";
import type { ServiceDetail } from "@/content/service-details/types";
import { ctas } from "@/lib/site";

/** Each service is illustrated by its own mockup in the hero. */
const heroVisuals: Record<string, ReactNode> = {
  "data-analytics": <DashboardMock />,
  "data-infrastructure": <PipelineDiagram />,
  "ai-automation": <WorkflowDiagram />,
  "business-technology-consulting": <OptionsMock />,
};

/**
 * Shared template for the four service pages (V3 fixes). Order: hero, the service's mockup full width,
 * problem story with the problems as tags, one "what we do" list, what you get with the
 * page's single disclaimer, before we start, how engagements work, closing with related links.
 */
export function ServiceDetailPage({ detail }: { detail: ServiceDetail }) {
  const index = services.findIndex((s) => s.slug === detail.slug);
  const service = services[index];
  const crumbLabel = service?.title ?? detail.metaTitle;
  const p = detail.slug;
  const related = services.filter((s) => detail.related.includes(s.slug));

  return (
    <>
      <PageHero
        above={<Breadcrumb items={[{ label: "Services", href: "/services" }, { label: crumbLabel }]} />}
        eyebrow={`Service ${String(index + 1).padStart(2, "0")}`}
        heading={detail.heading}
        lead={detail.lead}
        actions={
          <>
            <ButtonLink href={ctas.consultation.href}>{ctas.consultation.label}</ButtonLink>
            <ButtonLink href={ctas.enquiry.href} variant="secondary">
              {ctas.enquiry.label}
            </ButtonLink>
          </>
        }
      />

      {/* The service's mockup, full width (it was cramped at half width in the hero). */}
      <section aria-label={`What ${service?.shortName ?? "the work"} looks like`} className="pb-(--section-space)">
        <div className="mx-auto w-full max-w-[calc(64rem+2*var(--gutter))] px-(--gutter)">{heroVisuals[detail.slug]}</div>
      </section>

      <ProblemStory eyebrow="Sound familiar?" {...detail.v2.hook} tags={detail.problems.items.map((i) => i.title)} />
      <Section labelledBy={`${p}-capabilities`}>
        <SectionHeading id={`${p}-capabilities`} eyebrow="What we do" heading={detail.capabilities.heading} lead={detail.intro[1] ?? detail.capabilities.lead} />
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {detail.capabilities.items.map((item, i) => (
            <li key={item.title}>
              <FolioCard title={item.title} text={item.text} featured={i === 0} tone="white" titleStyle="serif" />
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="surface" labelledBy={`${p}-deliverables`}>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHeading id={`${p}-deliverables`} eyebrow="What you get" heading={detail.deliverables.heading} lead={detail.deliverables.lead} />
            <ContentsList items={detail.deliverables.items} />
            <p className="mt-6 mb-0 text-sm text-muted">{detail.disclaimer}</p>
          </div>
          <div className="relative hidden lg:col-span-5 lg:block">
            <div className="sticky top-[calc(var(--header-height)+2rem)] aspect-[3/4] overflow-hidden">
              <Photo photo={detail.v2.deliverablesPhoto} fill sizes="40vw" />
            </div>
          </div>
        </div>
      </Section>

      <Section labelledBy={`${p}-considerations`}>
        <SectionHeading id={`${p}-considerations`} eyebrow="Before we start" heading={detail.considerations.heading} lead={detail.considerations.lead} />
        <ul className="grid gap-x-10 gap-y-8 border-t border-charcoal/15 pt-8 md:grid-cols-2 lg:grid-cols-3">
          {detail.considerations.items.map((item) => (
            <li key={item.title}>
              <h3 className="mb-2 flex items-center gap-3 text-2xl">
                <Mark variant="bullet" className="size-4 shrink-0 text-gold" />
                {item.title}
              </h3>
              <p className="mb-0 text-muted">{item.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      <EngagementLink />

      <NextStep id={`${p}-cta`} eyebrow={nextStep.eyebrow} heading={detail.cta.heading} lead={detail.cta.body} options={nextStep.options} />
      <nav aria-label="Related services" className="bg-charcoal pb-16 text-footer-text">
        <div className="mx-auto flex w-full max-w-[calc(var(--container-max)+2*var(--gutter))] flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-white/15 px-(--gutter) pt-8 text-sm">
          <span className="font-semibold tracking-[0.18em] text-gold-soft uppercase">Works well with</span>
          {related.map((s) => (
            <Link key={s.slug} href={s.href} className="text-white">
              {s.title}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
