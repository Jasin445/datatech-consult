import { FolioCard } from "@/components/cards/FolioCard";
import { OrnamentCard } from "@/components/cards/OrnamentCard";
import { PhotoCard } from "@/components/cards/PhotoCard";
import { Breadcrumb } from "@/components/sections/Breadcrumb";
import { ContentsList } from "@/components/sections/ContentsList";
import { NextStep } from "@/components/sections/NextStep";
import { PageHero } from "@/components/sections/PageHero";
import { ProblemStory } from "@/components/sections/ProblemStory";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { ButtonLink } from "@/components/ui/Button";
import { Ornament } from "@/components/ui/Ornament";
import { Photo } from "@/components/ui/Photo";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { nextStep, servicePhotos } from "@/content/home";
import { services } from "@/content/services";
import type { ServiceDetail } from "@/content/service-details/types";
import { ctas } from "@/lib/site";

/** Shared V2 template for the four dedicated service pages. Content comes from src/content/service-details. */
export function ServiceDetailPage({ detail }: { detail: ServiceDetail }) {
  const index = services.findIndex((s) => s.slug === detail.slug);
  const service = services[index];
  const crumbLabel = service?.title ?? detail.metaTitle;
  const p = detail.slug;
  const related = services.filter((s) => detail.related.includes(s.slug));
  // Section folios follow page order; use cases appear only on some pages.
  let n = 1;
  const folio = () => String(++n).padStart(2, "0");

  return (
    <>
      <PageHero
        above={<Breadcrumb items={[{ label: "Services", href: "/services" }, { label: crumbLabel }]} />}
        eyebrow={`Service ${String(index + 1).padStart(2, "0")}`}
        heading={detail.heading}
        lead={detail.lead}
        photo={detail.v2.heroPhoto}
        actions={
          <>
            <ButtonLink href={ctas.enquiry.href}>{ctas.enquiry.label}</ButtonLink>
            <ButtonLink href={ctas.consultation.href} variant="secondary">
              {ctas.consultation.label}
            </ButtonLink>
          </>
        }
      />

      <ProblemStory folio="01" eyebrow="Sound familiar?" {...detail.v2.hook} />

      <section aria-labelledby={`${p}-problems`} className="border-b border-border bg-white py-10">
        <div className="mx-auto flex w-full max-w-[calc(var(--container-max)+2*var(--gutter))] flex-col gap-5 px-(--gutter) lg:flex-row lg:items-start lg:gap-10">
          <h2 id={`${p}-problems`} className="mb-0 shrink-0 text-2xl lg:max-w-[14ch]">
            {detail.problems.heading}
          </h2>
          <ul className="grid flex-1 gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
            {detail.problems.items.map((item) => (
              <li key={item.title} className="flex gap-3">
                <Ornament className="mt-1.5 size-3 shrink-0 text-gold" />
                <span>
                  <strong className="block font-semibold text-charcoal">{item.title}</strong>
                  <span className="text-sm text-muted">{item.text}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Section labelledBy={`${p}-capabilities`}>
        <SectionHeading id={`${p}-capabilities`} folio={folio()} eyebrow="What we do" heading={detail.capabilities.heading} lead={detail.intro[1] ?? detail.capabilities.lead} />
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {detail.capabilities.items.map((item, i) => (
            <li key={item.title}>
              <FolioCard title={item.title} text={item.text} featured={i === 0} tone="white" />
            </li>
          ))}
        </ul>
      </Section>

      {detail.useCases && (
        <Section tone="charcoal" labelledBy={`${p}-use-cases`}>
          <SectionHeading id={`${p}-use-cases`} folio={folio()} eyebrow="Where it fits" heading={detail.useCases.heading} lead={detail.useCases.lead} onDark />
          <ol className="grid gap-x-10 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {detail.useCases.items.map((item, i) => (
              <li key={item.title} className="border-t border-gold-soft/40 pt-6">
                <p aria-hidden="true" className="mb-3 font-display text-4xl leading-none text-gold-soft italic">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mb-2 text-2xl text-white">{item.title}</h3>
                <p className="mb-0">{item.text}</p>
              </li>
            ))}
          </ol>
        </Section>
      )}

      <Section tone="surface" labelledBy={`${p}-deliverables`}>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHeading id={`${p}-deliverables`} folio={folio()} eyebrow="What you get" heading={detail.deliverables.heading} lead={detail.deliverables.lead} />
            <ContentsList items={detail.deliverables.items} />
          </div>
          <div className="relative hidden lg:col-span-5 lg:block">
            <div className="sticky top-[calc(var(--header-height)+2rem)] aspect-[3/4] overflow-hidden">
              <Photo photo={detail.v2.deliverablesPhoto} fill sizes="40vw" />
            </div>
          </div>
        </div>
      </Section>

      <Section tone="charcoal" labelledBy={`${p}-considerations`}>
        <SectionHeading id={`${p}-considerations`} folio={folio()} eyebrow="Before we start" heading={detail.considerations.heading} lead={detail.considerations.lead} onDark align="center" />
        <ul className={`mx-auto grid gap-6 md:grid-cols-2 ${detail.considerations.items.length % 3 === 0 ? "lg:grid-cols-3" : "max-w-[60rem]"}`}>
          {detail.considerations.items.map((item) => (
            <li key={item.title}>
              <OrnamentCard title={item.title} text={item.text} />
            </li>
          ))}
        </ul>
      </Section>

      <Section labelledBy={`${p}-approach`}>
        <SectionHeading id={`${p}-approach`} folio={folio()} eyebrow="How it runs" heading={detail.approach.heading} lead={detail.approach.lead} />
        <ProcessSteps steps={detail.approach.steps} />
      </Section>

      <Section tone="surface" labelledBy={`${p}-value`}>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading id={`${p}-value`} folio={folio()} eyebrow="The difference" heading={detail.value.heading} lead={detail.value.lead} />
          </div>
          <ul className="grid content-start gap-0 lg:col-span-7">
            {detail.value.items.map((item) => (
              <li key={item} className="flex items-baseline gap-4 border-b border-charcoal/15 py-5 font-display text-[clamp(1.5rem,1.1rem+1vw,2.1rem)] leading-tight text-charcoal">
                <Ornament className="size-4 shrink-0 text-gold" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section labelledBy={`${p}-related`}>
        <SectionHeading id={`${p}-related`} folio={folio()} eyebrow="Works well with" heading="Related services" />
        <ul className="grid gap-8 md:grid-cols-2">
          {related.map((s) => (
            <li key={s.slug}>
              <PhotoCard photo={servicePhotos[s.slug]!} title={s.title} text={s.summary} href={s.href} aspect="wide" sizes="(min-width: 768px) 50vw, 100vw" />
            </li>
          ))}
        </ul>
      </Section>

      <NextStep id={`${p}-cta`} eyebrow="Your next step" heading={detail.cta.heading} lead={detail.cta.body} options={nextStep.options} />
    </>
  );
}
