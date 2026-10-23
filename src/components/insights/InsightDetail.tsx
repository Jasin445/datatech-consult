import { Breadcrumb } from "@/components/sections/Breadcrumb";
import { NextStep } from "@/components/sections/NextStep";
import { PageHero } from "@/components/sections/PageHero";
import { RelatedServices } from "@/components/services/RelatedServices";
import { Container } from "@/components/ui/Container";
import { SampleNotice, statusLabel } from "@/components/ui/SampleNotice";
import { Mark } from "@/components/ui/Mark";
import { Panel } from "@/components/ui/Panel";
import { Photo } from "@/components/ui/Photo";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { statusPillClass } from "@/components/ui/styles";
import { nextStep } from "@/content/home";
import type { Insight } from "@/content/insights/types";
import { formatPublishedDate, readingTimeMinutes } from "@/lib/content/insights";
import type { ContentStatus } from "@/lib/content/status";

/** Template for /insights/[slug]. Optional parts (author, cover, takeaways, bullets, related services) are omitted when empty. */
export function InsightDetail({ status, insight }: { status: ContentStatus; insight: Insight }) {
  const p = `insight-${insight.slug}`;
  const hasTakeaways = insight.keyTakeaways.length > 0;
  const hasRelated = insight.relatedServices.length > 0;

  return (
    <>
      <PageHero
        above={<Breadcrumb items={[{ label: "Insights", href: "/insights" }, { label: insight.title }]} />}
        eyebrow="Insight"
        heading={insight.title}
        lead={insight.summary}
      />

      <Container className="py-(--section-space)">
        <h2 id={`${p}-details`} className="sr-only">
          Article details
        </h2>
        <div className="mb-10 flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-charcoal/15 pb-6 text-muted">
          <time dateTime={insight.publishedOn}>{formatPublishedDate(insight.publishedOn)}</time>
          <span aria-hidden="true" className="text-gold">·</span>
          <span>{readingTimeMinutes(insight)} min read</span>
          {insight.author && (
            <>
              <span aria-hidden="true" className="text-gold">·</span>
              <span>By {insight.author}</span>
            </>
          )}
          {status !== "approved" && <span className={statusPillClass}>{statusLabel(status)}</span>}
        </div>
        {status !== "approved" && (
          <div className="mb-10">
            <SampleNotice>This article is a fictional example used to preview the site. The author, date and content are illustrative.</SampleNotice>
          </div>
        )}

        {insight.cover && (
          <div className="relative mb-14 aspect-[21/9] overflow-hidden">
            <Photo photo={insight.cover} fill sizes="(min-width: 1280px) 1200px, 100vw" />
          </div>
        )}

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <article className="lg:col-span-8">
            {insight.sections.map((section, i) => (
              <section key={section.heading} aria-labelledby={`${p}-s${i}`} className="mt-12 first:mt-0">
                <h2 id={`${p}-s${i}`} className="text-3xl">
                  {section.heading}
                </h2>
                <div
                  className={`max-w-(--reading-max) text-lg [&_p]:mb-5 [&_p:last-child]:mb-0 ${
                    i === 0 ? "[&>p:first-child]:first-letter:float-left [&>p:first-child]:first-letter:mt-1 [&>p:first-child]:first-letter:mr-3 [&>p:first-child]:first-letter:font-display [&>p:first-child]:first-letter:text-7xl [&>p:first-child]:first-letter:leading-[0.8] [&>p:first-child]:first-letter:text-gold" : ""
                  }`}
                >
                  {section.paragraphs.map((text) => (
                    <p key={text}>{text}</p>
                  ))}
                </div>
                {section.bullets && section.bullets.length > 0 && (
                  <ul className="mt-6 max-w-(--reading-max) border-t border-charcoal/15">
                    {section.bullets.map((item) => (
                      <li key={item} className="flex items-baseline gap-4 border-b border-charcoal/15 py-3 text-lg">
                        <Mark variant="bullet" className="size-3 shrink-0 text-gold" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </article>

          {hasTakeaways && (
            <aside aria-labelledby={`${p}-takeaways`} className="lg:col-span-4">
              <div className="lg:sticky lg:top-[calc(var(--header-height)+2rem)]">
                <Panel tone="white" compact>
                  <h2 id={`${p}-takeaways`} className="mb-5 font-sans text-sm font-semibold text-gold">
                    Key takeaways
                  </h2>
                  <ul className="grid gap-4">
                    {insight.keyTakeaways.map((item) => (
                      <li key={item} className="flex items-baseline gap-3 font-display text-xl leading-snug text-charcoal">
                        <Mark variant="bullet" className="size-3 shrink-0 text-gold" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Panel>
              </div>
            </aside>
          )}
        </div>
      </Container>

      {hasRelated && (
        <Section tone="surface" labelledBy={`${p}-related`}>
          <SectionHeading id={`${p}-related`} eyebrow="Related" heading="Related services" />
          <RelatedServices slugs={insight.relatedServices} />
        </Section>
      )}

      <NextStep id={`${p}-cta`} eyebrow={nextStep.eyebrow} heading="Want to talk this through for your organisation?" lead="Describe the challenge and we’ll reply with questions or a suggested next step." options={nextStep.options} />
    </>
  );
}
