import { Breadcrumb } from "@/components/sections/Breadcrumb";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHeader } from "@/components/sections/PageHeader";
import { RelatedServices } from "@/components/services/RelatedServices";
import { DevNotice } from "@/components/ui/DevNotice";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { statusPillClass, valueItemClass } from "@/components/ui/styles";
import type { Insight } from "@/content/insights/types";
import { formatPublishedDate, readingTimeMinutes } from "@/lib/content/insights";
import { DUMMY_MARKER, type ContentStatus } from "@/lib/content/status";

/** Template for /insights/[slug]. Optional parts (author, takeaways, bullets, related services) are omitted when empty. */
export function InsightDetail({ status, insight }: { status: ContentStatus; insight: Insight }) {
  const p = `insight-${insight.slug}`;
  const hasTakeaways = insight.keyTakeaways.length > 0;
  const hasRelated = insight.relatedServices.length > 0;

  return (
    <>
      <PageHeader
        heading={insight.title}
        lead={insight.summary}
        above={<Breadcrumb items={[{ label: "Insights", href: "/insights" }, { label: insight.title }]} />}
      />

      <Section labelledBy={`${p}-details`}>
        <h2 id={`${p}-details`} className="sr-only">
          Article details
        </h2>
        <div className="grid max-w-(--reading-max) gap-4">
          <p className="mb-0 flex flex-wrap items-center gap-x-3 gap-y-2 text-muted">
            <time dateTime={insight.publishedOn}>{formatPublishedDate(insight.publishedOn)}</time>
            <span aria-hidden="true">·</span>
            <span>{readingTimeMinutes(insight)} min read</span>
            {insight.author && (
              <>
                <span aria-hidden="true">·</span>
                <span>By {insight.author}</span>
              </>
            )}
            {status !== "approved" && <span className={statusPillClass}>{status === "dummy" ? "Dummy data" : "Draft"}</span>}
          </p>
          {status !== "approved" && (
            <DevNotice>{DUMMY_MARKER}. This article is hidden in production until it is approved.</DevNotice>
          )}
        </div>
      </Section>

      {hasTakeaways && (
        <Section tone="surface" labelledBy={`${p}-takeaways`}>
          <SectionHeading id={`${p}-takeaways`} heading="Key takeaways" />
          <ul className="grid max-w-(--reading-max) gap-3">
            {insight.keyTakeaways.map((item) => (
              <li key={item} className={valueItemClass}>
                {item}
              </li>
            ))}
          </ul>
        </Section>
      )}

      <Section tone={hasTakeaways ? "default" : "surface"}>
        <article className="max-w-(--reading-max)">
          {insight.sections.map((section, i) => (
            <section key={section.heading} aria-labelledby={`${p}-s${i}`} className="mt-10 first:mt-0">
              <h2 id={`${p}-s${i}`}>{section.heading}</h2>
              <div className="[&_p]:text-lg [&_p:last-child]:mb-0">
                {section.paragraphs.map((text) => (
                  <p key={text}>{text}</p>
                ))}
              </div>
              {section.bullets && section.bullets.length > 0 && (
                <ul className="mt-4 grid gap-3">
                  {section.bullets.map((item) => (
                    <li key={item} className={valueItemClass}>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </article>
      </Section>

      {hasRelated && (
        <Section tone={hasTakeaways ? "surface" : "default"} labelledBy={`${p}-related`}>
          <SectionHeading id={`${p}-related`} heading="Related services" />
          <RelatedServices slugs={insight.relatedServices} />
        </Section>
      )}

      <CtaBand
        id={`${p}-cta`}
        heading="Want to talk this through for your organisation?"
        body="Tell us what you’re dealing with and we’ll tell you honestly whether and how we can help."
      />
    </>
  );
}
