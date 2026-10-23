import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/forms/ContactForm";
import { PageHeader } from "@/components/sections/PageHeader";
import { ButtonLink, buttonRowClass } from "@/components/ui/Button";
import { DevNotice } from "@/components/ui/DevNotice";
import { Section } from "@/components/ui/Section";
import { getContactAvailability } from "@/lib/contact/availability";
import { getPublicContactEmail } from "@/lib/env";

export const metadata: Metadata = {
  title: "Contact",
  description: "Tell Datatechhub Consulting about the business challenge you are trying to solve and we will respond by email.",
};

// Depends on runtime environment variables, so it must not be prerendered with stale configuration.
export const dynamic = "force-dynamic";

export default function ContactPage() {
  const availability = getContactAvailability();
  const publicEmail = getPublicContactEmail();

  return (
    <>
      <PageHeader
        heading="Discuss a business challenge"
        lead="Tell us what you are trying to solve. You do not need a finished brief; a clear description of the situation is enough to start a conversation."
      />
      <Section labelledBy="enquiry-heading">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <div className="max-w-(--reading-max)">
            <h2 id="enquiry-heading" className="mb-6">Send an enquiry</h2>
            {availability.available ? (
              <ContactForm />
            ) : (
              <div className="flex flex-col gap-4">
                <DevNotice>
                  Enquiry email is not configured, so the form is disabled. {availability.devDetail} Set the variables in .env.example (see IMPLEMENTATION_PLAN.md).
                </DevNotice>
                <div role="status" className="rounded-md border-2 border-border bg-surface p-6">
                  <h3 className="text-xl">Our online enquiry form is not available right now</h3>
                  <p>
                    {publicEmail ? (
                      <>
                        Please email us at <a href={`mailto:${publicEmail}`}>{publicEmail}</a>, or book a consultation instead.
                      </>
                    ) : (
                      <>Please try again later, or book a consultation instead.</>
                    )}
                  </p>
                  <div className={buttonRowClass}>
                    <ButtonLink href="/book-consultation">Book a consultation</ButtonLink>
                  </div>
                </div>
              </div>
            )}
          </div>

          <aside aria-labelledby="next-heading" className="max-w-(--reading-max)">
            <h2 id="next-heading" className="text-xl">What happens next</h2>
            <ol className="list-decimal pl-5 [&_li]:mb-2">
              <li>We read your description and consider whether our services fit.</li>
              <li>We reply by email, usually with questions or a suggested next step.</li>
              <li>If it makes sense, we arrange a consultation to discuss the challenge in more depth.</li>
            </ol>
            <p className="text-sm text-muted">
              Prefer to talk first? <Link href="/book-consultation">Book a consultation</Link>.
              {publicEmail ? (
                <>
                  {" "}
                  Or email <a href={`mailto:${publicEmail}`}>{publicEmail}</a>.
                </>
              ) : null}
            </p>
          </aside>
        </div>
      </Section>
    </>
  );
}
