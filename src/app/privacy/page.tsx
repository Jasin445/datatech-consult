import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/sections/PageHeader";
import { DevNotice } from "@/components/ui/DevNotice";
import { Section } from "@/components/ui/Section";
import { getPublicContactEmail } from "@/lib/env";
import { getPrivacyNotice, missingPrivacyFacts } from "@/lib/content/privacy";
import { siteConfig } from "@/lib/site";

const notice = getPrivacyNotice();
const approved = notice.status === "approved";

export const metadata: Metadata = {
  title: "Privacy notice",
  description: `How the ${siteConfig.name} website handles the information you send us.`,
  // A draft notice is not indexed.
  ...(approved ? {} : { robots: { index: false, follow: true } }),
};

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

  return (
    <>
      <PageHeader
        heading="Privacy notice"
        lead={`How the ${siteConfig.name} website handles the information you send us.`}
      />

      <Section labelledBy="contents-heading">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.4fr)]">
          <nav aria-labelledby="contents-heading" className="lg:sticky lg:top-[calc(var(--header-height)+2rem)] lg:self-start">
            <h2 id="contents-heading" className="text-lg">
              Contents
            </h2>
            <ol className="m-0 list-none p-0 text-sm [&_li]:mb-2">
              {tocItems.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`}>{item.heading}</a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="max-w-(--reading-max)">
            {!approved && (
              <p role="note" className="rounded-md border-2 border-border bg-surface p-4">
                <strong>This notice is a draft and is being reviewed.</strong> It describes how this website currently
                handles information. Some details below will be added once review is complete.
              </p>
            )}
            {missing.length > 0 && (
              <DevNotice>Privacy facts still to be supplied in src/content/privacy.ts: {missing.join(", ")}.</DevNotice>
            )}
            {facts.effectiveDate && <p className="text-sm text-muted">Effective from {formatDate(facts.effectiveDate)}.</p>}

            {sections.map((section) => (
              <section key={section.id} aria-labelledby={section.id} className="mt-10 first-of-type:mt-6">
                <h2 id={section.id} className="text-2xl">
                  {section.heading}
                </h2>
                {section.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
                {section.bullets && (
                  <ul className="list-disc pl-6 [&_li]:mb-1">
                    {section.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                )}
                {section.id === "technical" && facts.hostingProvider && <p>Our hosting provider is {facts.hostingProvider}.</p>}
                {section.id === "retention" && facts.enquiryRetention && <p>We keep enquiry emails {facts.enquiryRetention}, then delete them.</p>}
              </section>
            ))}

            <section aria-labelledby="contact-us" className="mt-10">
              <h2 id="contact-us" className="text-2xl">
                Who we are and how to contact us
              </h2>
              {facts.controllerName ? (
                <p>
                  {facts.controllerName} is responsible for the information collected through this website.
                  {facts.postalAddress ? ` Our address is ${facts.postalAddress}.` : null}
                </p>
              ) : (
                <p>{siteConfig.name} is responsible for the information collected through this website.</p>
              )}
              <p className="mb-0">
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
            </section>
          </div>
        </div>
      </Section>
    </>
  );
}
