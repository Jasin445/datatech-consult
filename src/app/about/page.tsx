import type { Metadata } from "next";
import Image from "next/image";
import { AudienceMosaic } from "@/components/sections/AudienceMosaic";
import { LeadershipGrid } from "@/components/sections/LeadershipGrid";
import { NextStep } from "@/components/sections/NextStep";
import { PageHero } from "@/components/sections/PageHero";
import { StatementBand } from "@/components/sections/StatementBand";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ArrowRight } from "@/components/ui/Ornament";
import { Photo } from "@/components/ui/Photo";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { aboutPage } from "@/content/about";
import { audiences, nextStep } from "@/content/home";
import { getPublishableLeadership } from "@/lib/content/leadership";
import { getParentBrandUrl } from "@/lib/env";
import { pageMetadata } from "@/lib/seo/page";
import { ctas, siteConfig } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: aboutPage.title,
  description: aboutPage.metaDescription,
  path: "/about",
});

export default function AboutPage() {
  const leadership = getPublishableLeadership();
  const parentUrl = getParentBrandUrl();
  const { overview, parent } = aboutPage;

  return (
    <>
      <PageHero
        eyebrow={aboutPage.eyebrow}
        heading={aboutPage.heading}
        lead={aboutPage.lead}
        photo={aboutPage.photo}
        actions={
          <>
            <ButtonLink href={ctas.consultation.href}>{ctas.consultation.label}</ButtonLink>
            <ButtonLink href="/services" variant="secondary">
              Explore our services
            </ButtonLink>
          </>
        }
      />

      <section aria-labelledby="who-heading" className="py-(--section-space)">
        <Container className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Eyebrow>{overview.eyebrow}</Eyebrow>
            <h2 id="who-heading" className="mb-4 text-4xl">
              {overview.heading}
            </h2>
            <p className="mb-8 font-display text-3xl leading-snug text-gold italic">{overview.statement}</p>
            <div className="max-w-[58ch] text-lg [&_p]:mb-5 [&_p:last-child]:mb-0">
              {overview.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
          <div className="relative min-h-[28rem] lg:col-span-6 lg:min-h-[36rem]">
            <div className="absolute top-0 right-0 aspect-[3/4] w-[68%] overflow-hidden">
              <Photo photo={overview.photos[0]!} fill sizes="(min-width: 1024px) 30vw, 65vw" />
            </div>
            <div className="absolute bottom-0 left-0 aspect-[4/3] w-[58%] overflow-hidden border-8 border-white shadow-[0_24px_50px_-24px_rgb(23_43_58/45%)]">
              <Photo photo={overview.photos[1]!} fill sizes="(min-width: 1024px) 28vw, 55vw" />
            </div>
          </div>
        </Container>
      </section>

      <Section tone="surface" labelledBy="parent-heading">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="relative flex aspect-[4/3] flex-col items-center justify-center gap-6 border border-border bg-white p-10 lg:col-span-5">
            <span aria-hidden="true" className="absolute -top-px -right-px size-16 bg-[linear-gradient(to_bottom_left,var(--color-surface)_50%,var(--color-border)_50%)]" />
            {/* Official logo, unchanged. */}
            <Image src="/logos/datatechhub-logo.png" alt="Datatechhub logo" width={849} height={294} className="h-auto w-full max-w-[18rem]" />
            <p className="mb-0 text-center font-display text-2xl text-gold italic">{siteConfig.parentTagline}</p>
          </div>
          <div className="lg:col-span-7">
            <SectionHeading id="parent-heading" eyebrow={parent.eyebrow} heading={parent.heading} />
            <div className="max-w-[58ch] text-lg [&_p]:mb-5">
              {parent.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            {parentUrl && (
              <a href={parentUrl} rel="noopener noreferrer" className="inline-flex items-center gap-2 font-display text-xl italic">
                Visit {siteConfig.parentBrand}
                <ArrowRight />
              </a>
            )}
          </div>
        </div>
      </Section>

      <Section labelledBy="audiences-heading">
        <SectionHeading id="audiences-heading" eyebrow={audiences.eyebrow} heading={audiences.heading} lead={audiences.lead} />
        <AudienceMosaic items={audiences.items} />
      </Section>

      {leadership.length > 0 ? (
        <Section tone="surface" labelledBy="leadership-heading">
          <SectionHeading id="leadership-heading" eyebrow={aboutPage.leadership.eyebrow} heading={aboutPage.leadership.heading} lead={aboutPage.leadership.lead} />
          <LeadershipGrid profiles={leadership} />
        </Section>
      ) : null}

      <StatementBand {...aboutPage.statement} />

      <NextStep id="about-next-heading" eyebrow={nextStep.eyebrow} heading={aboutPage.next.heading} options={nextStep.options} />
    </>
  );
}
