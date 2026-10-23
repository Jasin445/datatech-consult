import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/forms/ContactForm";
import { ButtonLink, buttonRowClass } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { DevNotice } from "@/components/ui/DevNotice";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Mark } from "@/components/ui/Mark";
import { Panel } from "@/components/ui/Panel";
import { Photo } from "@/components/ui/Photo";
import { contactPage } from "@/content/contact";
import { getContactAvailability } from "@/lib/contact/availability";
import { getConversionPaths } from "@/lib/conversion-server";
import { pageMetadata } from "@/lib/seo/page";
import { ctas } from "@/lib/site";
import { Accent } from "@/components/ui/Accent";

export const metadata: Metadata = pageMetadata({
  title: contactPage.title,
  description: contactPage.metaDescription,
  path: "/contact",
});

// Depends on runtime environment variables, so it must not be prerendered with stale configuration.
export const dynamic = "force-dynamic";

export default function ContactPage() {
  const availability = getContactAvailability();
  const paths = getConversionPaths();
  const publicEmail = paths.email;

  return (
    <>
      <section aria-labelledby="page-heading" className="bg-surface py-12 lg:py-20">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div>
              <Eyebrow>{contactPage.eyebrow}</Eyebrow>
            </div>
            <h1 id="page-heading" className="mb-6 text-[clamp(2.6rem,1.6rem+3.6vw,4.5rem)] leading-[1]">
              {contactPage.heading} <Accent>{contactPage.accent}</Accent>
            </h1>
            <p className="mb-10 text-lg text-muted">{contactPage.lead}</p>

            <h2 id="next-heading" className="mb-5 font-sans text-sm font-semibold text-gold">
              {contactPage.next.heading}
            </h2>
            <ol aria-labelledby="next-heading" className="mb-10 border-t border-charcoal/15">
              {contactPage.next.steps.map((step, i) => (
                <li key={step} className="grid grid-cols-[2.75rem_1fr] gap-x-3 border-b border-charcoal/15 py-4">
                  <span aria-hidden="true" className="font-sans text-3xl font-light leading-none text-gold tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>

            <div className="relative hidden aspect-[4/3] overflow-hidden lg:block">
              <Photo photo={contactPage.photo} fill sizes="35vw" />
            </div>
          </div>

          <div className="lg:col-span-7">
            <Panel>
              <h2 id="enquiry-heading" className="mb-8 text-4xl">
                {contactPage.formHeading}
              </h2>
              {availability.available ? (
                <ContactForm />
              ) : (
                <div className="flex flex-col gap-4">
                  <DevNotice>
                    Enquiry email is not configured, so the form is disabled. {availability.devDetail} Set the variables in .env.example (see IMPLEMENTATION_PLAN.md).
                  </DevNotice>
                  <div role="status" className="border-l-4 border-gold bg-surface p-6">
                    <h3 className="text-2xl">Our online enquiry form is not available right now</h3>
                    {/* Fallbacks point only at paths that work (never at another unavailable page). */}
                    <p className={paths.booking ? "" : "mb-0"}>
                      {publicEmail ? (
                        <>
                          Please email us at <a href={`mailto:${publicEmail}`}>{publicEmail}</a>
                          {paths.booking ? ", or book a consultation instead." : "."}
                        </>
                      ) : paths.booking ? (
                        <>Please book a consultation instead.</>
                      ) : (
                        <>Please check back soon.</>
                      )}
                    </p>
                    {paths.booking && (
                      <div className={buttonRowClass}>
                        <ButtonLink href={ctas.consultation.href}>{ctas.consultation.label}</ButtonLink>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </Panel>
            {publicEmail && availability.available ? (
              <p className="mt-6 mb-0 text-sm text-muted">
                Or email <a href={`mailto:${publicEmail}`}>{publicEmail}</a>.
              </p>
            ) : null}
          </div>
        </Container>
      </section>

      {paths.booking && (
        <section aria-label="Book a consultation instead" className="bg-charcoal py-16 lg:py-20">
          <Container className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <p className="mb-0 flex items-center gap-4 font-display text-4xl text-white">
              <Mark className="size-8 shrink-0 text-gold-soft" />
              {contactPage.talk.text}
            </p>
            <Link href={ctas.consultation.href} className="inline-flex min-h-11 items-center text-lg font-semibold text-white underline-offset-[6px] hover:text-gold-soft">
              {ctas.consultation.label}
            </Link>
          </Container>
        </section>
      )}
    </>
  );
}
