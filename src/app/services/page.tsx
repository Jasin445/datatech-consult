import type { Metadata } from "next";
import Link from "next/link";
import { FolioCard } from "@/components/cards/FolioCard";
import { EngagementShapes } from "@/components/sections/EngagementShapes";
import { NextStep } from "@/components/sections/NextStep";
import { PageHero } from "@/components/sections/PageHero";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { FitList } from "@/components/services/FitList";
import { ServiceFeature } from "@/components/services/ServiceFeature";
import { ButtonLink } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { nextStep, process, servicePhotos } from "@/content/home";
import { services } from "@/content/services";
import { engagement, fit, servicesPage, together } from "@/content/services-overview";
import { pageMetadata } from "@/lib/seo/page";
import { ctas } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: servicesPage.title,
  description: servicesPage.metaDescription,
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow={servicesPage.eyebrow}
        heading={servicesPage.heading}
        accent={servicesPage.accent}
        lead={servicesPage.lead}
        photo={servicesPage.photo}
        actions={
          <>
            <ButtonLink href="#fit-heading">Find your starting point</ButtonLink>
            <ButtonLink href={ctas.consultation.href} variant="secondary">
              {ctas.consultation.label}
            </ButtonLink>
          </>
        }
      />

      <Section labelledBy="service-areas-heading">
        <SectionHeading id="service-areas-heading" folio="01" eyebrow={servicesPage.areas.eyebrow} heading={servicesPage.areas.heading} />
        <ul className="grid gap-20 lg:gap-28">
          {services.map((service, i) => (
            <li key={service.slug}>
              <ServiceFeature service={service} photo={servicePhotos[service.slug]!} index={i} />
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="surface" labelledBy="fit-heading">
        <SectionHeading id="fit-heading" folio="02" eyebrow={fit.eyebrow} heading={fit.heading} lead={fit.lead} />
        <FitList items={fit.items} />
      </Section>

      <Section labelledBy="together-heading">
        <SectionHeading id="together-heading" folio="03" eyebrow={together.eyebrow} heading={together.heading} lead={together.lead} />
        <ul className="grid gap-6 lg:grid-cols-3">
          {together.items.map((item, i) => (
            <li key={item.title}>
              <FolioCard folio={["i.", "ii.", "iii."][i]} title={item.title} text={item.text} tone="white">
                <p className="mt-auto mb-0 flex flex-wrap gap-x-4 gap-y-2 border-t border-border pt-5 text-sm">
                  {item.slugs.map((slug) => {
                    const s = services.find((x) => x.slug === slug)!;
                    return (
                      <Link key={slug} href={s.href} className="font-semibold">
                        {s.title}
                      </Link>
                    );
                  })}
                </p>
              </FolioCard>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="surface" labelledBy="process-heading">
        <div className="mb-14 grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionHeading id="process-heading" eyebrow={engagement.eyebrow} heading={engagement.heading} lead={engagement.lead} />
          </div>
          <div className="relative aspect-[16/9] overflow-hidden lg:col-span-6 lg:mb-14">
            <Photo photo={engagement.photo} fill sizes="(min-width: 1024px) 50vw, 100vw" />
          </div>
        </div>
        <ProcessSteps steps={process.steps} />
      </Section>

      <EngagementShapes tone="default" />

      <NextStep id="services-next-heading" eyebrow={nextStep.eyebrow} heading="Not sure which service you need?" lead="Describe the challenge and we’ll tell you honestly whether and how we can help." options={nextStep.options} />
    </>
  );
}
