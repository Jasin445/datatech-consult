import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/page";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { ReportSection } from "@/components/sections/ReportSection";
import { Container } from "@/components/ui/Container";
import { Mark } from "@/components/ui/Mark";
import { DevNotice } from "@/components/ui/DevNotice";
import { getPublicContactEmail } from "@/lib/env";
import { getPrivacyNotice, missingPrivacyFacts } from "@/lib/content/privacy";
import { siteConfig } from "@/lib/site";

const notice = getPrivacyNotice();
const approved = notice.status === "approved";

export const metadata: Metadata = pageMetadata({
  title: "Privacy notice",
  description: `How the ${siteConfig.name} website handles the information you send us.`,
  path: "/privacy",
  // A draft notice is not indexed.
  noindex: !approved,
});

// Reads runtime environment variables (public contact email).
export const dynamic = "force-dynamic";

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(
    new Date(`${iso}T00:00:00Z`),
  );
}

export default function PrivacyPage() {
  const { facts, sections } = notice.data;
  const missing = missingPrivacyFacts(facts);
  const requestEmail = facts.privacyContactEmail ?? getPublicContactEmail();
  const tocItems = [...sections.map((s) => ({ id: s.id, heading: s.heading })), { id: "contact-us", heading: "Who we are and how to contact us" }];
  const num = (i: number) => String(i + 1).padStart(2, "0");

  return (
    <>
      <PageHero eyebrow="Privacy" heading="Privacy notice" lead={`How the ${siteConfig.name} website handles the information you send us.`} />

      <section aria-labelledby="contents-heading" className="bg-surface py-12 lg:py-16">
        <Container>
          {!approved && (
            <p role="note" className="mb-8 max-w-(--reading-max) border-l-4 border-gold bg-white p-5">
              <strong>This notice is a draft and is being reviewed.</strong> It describes how this website currently handles information. Some details
              below will be added once review is complete.
            </p>
          )}
          {missing.length > 0 && (
            <div className="mb-8">
              <DevNotice>Privacy facts still to be supplied in src/content/privacy.ts: {missing.join(", ")}.</DevNotice>
            </div>
          )}
          <nav aria-labelledby="contents-heading">
            <h2 id="contents-heading" className="mb-5 font-sans text-sm font-semibold tracking-[0.18em] text-gold uppercase">
              Contents
            </h2>
            <ol className="grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
              {tocItems.map((item, i) => (
                <li key={item.id} className="border-t border-charcoal/15">
                  <a href={`#${item.id}`} className="flex min-h-11 items-baseline gap-3 py-2 text-charcoal no-underline hover:text-gold">
                    <span aria-hidden="true" className="font-display text-lg text-gold italic">
                      {num(i)}
                    </span>
                    <span className="underline decoration-1 underline-offset-4">{item.heading}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          {facts.effectiveDate && <p className="mt-8 mb-0 text-sm text-muted">Effective from {formatDate(facts.effectiveDate)}.</p>}
        </Container>
      </section>

      <Container className="pb-(--section-space)">
        {sections.map((section, i) => (
          <ReportSection key={section.id} id={section.id} folio={num(i)} heading={section.heading}>
            <div className="max-w-(--reading-max) text-lg [&_p]:mb-5 [&_p:last-child]:mb-0">
              {section.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
              {section.bullets && (
                <ul className="mb-5 border-t border-charcoal/15">
                  {section.bullets.map((b) => (
                    <li key={b} className="flex items-baseline gap-4 border-b border-charcoal/15 py-3">
                      <Mark variant="bullet" className="size-3 shrink-0 text-gold" />
                      {b}
                    </li>
                  ))}
                </ul>
              )}
              {section.id === "technical" && facts.hostingProvider && <p>Our hosting provider is {facts.hostingProvider}.</p>}
              {section.id === "retention" && facts.enquiryRetention && <p>We keep enquiry emails {facts.enquiryRetention}, then delete them.</p>}
            </div>
          </ReportSection>
        ))}

        <ReportSection id="contact-us" folio={num(sections.length)} heading="Who we are and how to contact us">
          <div className="max-w-(--reading-max) text-lg [&_p]:mb-5 [&_p:last-child]:mb-0">
            {facts.controllerName ? (
              <p>
                {facts.controllerName} is responsible for the information collected through this website.
                {facts.postalAddress ? ` Our address is ${facts.postalAddress}.` : null}
              </p>
            ) : (
              <p>{siteConfig.name} is responsible for the information collected through this website.</p>
            )}
            <p>
              To ask about your information or exercise your rights,{" "}
              {requestEmail ? (
                <>
                  email <a href={`mailto:${requestEmail}`}>{requestEmail}</a>.
                </>
              ) : (
                <>
                  contact us through our <Link href="/contact">contact page</Link>.
                </>
              )}
            </p>
          </div>
        </ReportSection>
      </Container>
    </>
  );
}
