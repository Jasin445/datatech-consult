import type { Metadata } from "next";
import { CtaBand } from "@/components/sections/CtaBand";
import { ItemGrid } from "@/components/sections/ItemGrid";
import { LeadershipGrid } from "@/components/sections/LeadershipGrid";
import { PageHeader } from "@/components/sections/PageHeader";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { aboutPage } from "@/content/about";
import { audiences, principles } from "@/content/home";
import { getParentBrandUrl } from "@/lib/env";
import { getPublishableLeadership } from "@/lib/content/leadership";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: aboutPage.title,
  description: aboutPage.metaDescription,
};

export default function AboutPage() {
  const leadership = getPublishableLeadership();
  const parentUrl = getParentBrandUrl();

  return (
    <>
      <PageHeader heading={aboutPage.heading} lead={aboutPage.lead} />

      <Section labelledBy="who-heading">
        <SectionHeading id="who-heading" heading={aboutPage.overview.heading} />
        <div className="max-w-(--reading-max) [&_p]:text-lg [&_p:last-child]:mb-0">
          {aboutPage.overview.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </Section>

      <Section tone="surface" labelledBy="parent-heading">
        <SectionHeading id="parent-heading" heading={aboutPage.parent.heading} />
        <div className="max-w-(--reading-max) [&_p]:text-lg [&_p:last-child]:mb-0">
          {aboutPage.parent.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
          {parentUrl && (
            <p className="mt-3 font-semibold">
              <a href={parentUrl} rel="noopener noreferrer">
                Visit {siteConfig.parentBrand}
              </a>
            </p>
          )}
        </div>
      </Section>

      <Section labelledBy="principles-heading">
        <SectionHeading id="principles-heading" heading={principles.heading} lead={principles.lead} />
        <ItemGrid items={principles.items} columns={2} variant="plain" />
      </Section>

      {leadership.length > 0 ? (
        <Section tone="surface" labelledBy="leadership-heading">
          <SectionHeading id="leadership-heading" heading={aboutPage.leadership.heading} lead={aboutPage.leadership.lead} />
          <LeadershipGrid profiles={leadership} />
        </Section>
      ) : null}

      <Section tone={leadership.length > 0 ? "default" : "surface"} labelledBy="audiences-heading">
        <SectionHeading id="audiences-heading" heading="Who we work with" lead={audiences.lead} />
        <ItemGrid items={audiences.items} columns={4} variant="card" />
      </Section>

      <CtaBand />
    </>
  );
}
