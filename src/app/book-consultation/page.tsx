import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/page";
import Link from "next/link";
import { ItemGrid } from "@/components/sections/ItemGrid";
import { PageHeader } from "@/components/sections/PageHeader";
import { ButtonLink, buttonRowClass } from "@/components/ui/Button";
import { DevNotice } from "@/components/ui/DevNotice";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { checkItemClass } from "@/components/ui/styles";
import { bookingPage } from "@/content/booking";
import { bookingProviderHost } from "@/lib/booking";
import { getBookingUrl, getPublicContactEmail } from "@/lib/env";

export const metadata: Metadata = pageMetadata({
  title: bookingPage.title,
  description: bookingPage.metaDescription,
  path: "/book-consultation",
});

// Depends on runtime environment variables, so it must not be prerendered with stale configuration.
export const dynamic = "force-dynamic";

export default function BookConsultationPage() {
  const bookingUrl = getBookingUrl();
  const publicEmail = getPublicContactEmail();
  const { duration, format } = bookingPage.details;
  const confirmedDetails = [duration && { label: "Length", value: duration }, format && { label: "Format", value: format }].filter(
    (d): d is { label: string; value: string } => Boolean(d),
  );

  return (
    <>
      <PageHeader heading={bookingPage.heading} lead={bookingPage.lead} />

      <Section labelledBy="schedule-heading">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <div className="max-w-(--reading-max)">
            <h2 id="schedule-heading" className="mb-6">
              Choose a time
            </h2>
            {confirmedDetails.length === 0 && (
              <DevNotice>Meeting length and format are not confirmed. Set them in src/content/booking.ts once the business confirms them.</DevNotice>
            )}
            {bookingUrl ? (
              <div className="rounded-md border-2 border-border bg-white p-6">
                {confirmedDetails.length > 0 && (
                  <dl className="mb-4 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1">
                    {confirmedDetails.map((d) => (
                      <div key={d.label} className="contents">
                        <dt className="font-semibold text-charcoal">{d.label}</dt>
                        <dd className="m-0 text-muted">{d.value}</dd>
                      </div>
                    ))}
                  </dl>
                )}
                <p>
                  Bookings are handled by our scheduling provider, which shows available times in your time zone and sends the
                  confirmation. Where the provider supports it, the confirmation explains how to reschedule or cancel.
                </p>
                <div className={buttonRowClass}>
                  <ButtonLink href={bookingUrl} target="_blank" rel="noopener noreferrer">
                    Open the booking page
                    <span className="sr-only"> (opens {bookingProviderHost(bookingUrl)} in a new tab)</span>
                  </ButtonLink>
                </div>
                <p className="mt-3 mb-0 text-sm text-muted" aria-hidden="true">Opens {bookingProviderHost(bookingUrl)} in a new tab.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <DevNotice>
                  Booking is not configured. Set NEXT_PUBLIC_BOOKING_URL to an HTTPS scheduling-provider link (see .env.example).
                </DevNotice>
                <div role="status" className="rounded-md border-2 border-border bg-surface p-6">
                  <h3 className="text-xl">Online booking is not available right now</h3>
                  <p>
                    Send us an enquiry describing the challenge and we will reply by email to arrange a time.
                    {publicEmail ? (
                      <>
                        {" "}
                        You can also email <a href={`mailto:${publicEmail}`}>{publicEmail}</a>.
                      </>
                    ) : null}
                  </p>
                  <div className={buttonRowClass}>
                    <ButtonLink href="/contact">Send an enquiry</ButtonLink>
                  </div>
                </div>
              </div>
            )}
          </div>

          <aside aria-labelledby="prepare-heading" className="max-w-(--reading-max)">
            <h2 id="prepare-heading" className="text-xl">
              {bookingPage.prepare.heading}
            </h2>
            <ul className="mb-4 flex flex-col gap-2">
              {bookingPage.prepare.items.map((item) => (
                <li key={item} className={checkItemClass}>
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-sm text-muted">{bookingPage.prepare.note}</p>
            <p className="mb-0 text-sm text-muted">
              Prefer to write first? <Link href="/contact">Send an enquiry</Link>.
            </p>
          </aside>
        </div>
      </Section>

      <Section tone="surface" labelledBy="purpose-heading">
        <SectionHeading id="purpose-heading" heading={bookingPage.purpose.heading} />
        <ItemGrid items={bookingPage.purpose.items} columns={3} variant="card" />
      </Section>
    </>
  );
}
