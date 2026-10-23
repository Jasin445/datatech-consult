import type { Metadata } from "next";
import Link from "next/link";
import { OrnamentCard } from "@/components/cards/OrnamentCard";
import { ButtonLink, buttonRowClass } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { DevNotice } from "@/components/ui/DevNotice";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ArrowRight, Ornament } from "@/components/ui/Ornament";
import { Panel } from "@/components/ui/Panel";
import { Photo } from "@/components/ui/Photo";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { bookingPage } from "@/content/booking";
import { bookingProviderHost } from "@/lib/booking";
import { getBookingUrl, getPublicContactEmail } from "@/lib/env";
import { pageMetadata } from "@/lib/seo/page";

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
      <section aria-labelledby="page-heading" className="bg-surface py-12 lg:py-20">
        <Container className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <div className="animate-rise">
              <Eyebrow>{bookingPage.eyebrow}</Eyebrow>
            </div>
            <h1 id="page-heading" className="mb-6 animate-rise text-[clamp(2.6rem,1.6rem+3.6vw,4.5rem)] leading-[1] [animation-delay:90ms]">
              {bookingPage.heading} <em className="text-gold">{bookingPage.accent}</em>
            </h1>
            <p className="mb-10 animate-rise text-lg text-muted [animation-delay:180ms]">{bookingPage.lead}</p>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Photo photo={bookingPage.photo} fill priority sizes="(min-width: 1024px) 45vw, 100vw" />
            </div>
          </div>

          <div className="lg:col-span-6 lg:pt-16">
            <Panel>
              <h2 id="schedule-heading" className="mb-6 text-4xl">
                Choose a time
              </h2>
              {confirmedDetails.length === 0 && (
                <DevNotice>Meeting length and format are not confirmed. Set them in src/content/booking.ts once the business confirms them.</DevNotice>
              )}
              {bookingUrl ? (
                <>
                  {confirmedDetails.length > 0 && (
                    <dl className="mb-6 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 border-y border-border py-4">
                      {confirmedDetails.map((d) => (
                        <div key={d.label} className="contents">
                          <dt className="text-sm font-semibold tracking-[0.14em] text-gold uppercase">{d.label}</dt>
                          <dd className="m-0 text-charcoal">{d.value}</dd>
                        </div>
                      ))}
                    </dl>
                  )}
                  <p>
                    Bookings are handled by our scheduling provider, which shows available times in your time zone and sends the confirmation. Where the provider
                    supports it, the confirmation explains how to reschedule or cancel.
                  </p>
                  <div className={buttonRowClass}>
                    <ButtonLink href={bookingUrl} target="_blank" rel="noopener noreferrer">
                      Open the booking page
                      <span className="sr-only"> (opens {bookingProviderHost(bookingUrl)} in a new tab)</span>
                      <ArrowRight />
                    </ButtonLink>
                  </div>
                  <p className="mt-3 mb-0 text-sm text-muted" aria-hidden="true">
                    Opens {bookingProviderHost(bookingUrl)} in a new tab.
                  </p>
                </>
              ) : (
                <div className="flex flex-col gap-4">
                  <DevNotice>Booking is not configured. Set NEXT_PUBLIC_BOOKING_URL to an HTTPS scheduling-provider link (see .env.example).</DevNotice>
                  <div role="status" className="border-l-4 border-gold bg-surface p-6">
                    <h3 className="text-2xl">Online booking is not available right now</h3>
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
            </Panel>
            <p className="mt-6 mb-0 text-sm text-muted">
              Prefer to write first? <Link href="/contact">Send an enquiry</Link>.
            </p>
          </div>
        </Container>
      </section>

      <Section tone="charcoal" labelledBy="purpose-heading">
        <SectionHeading id="purpose-heading" folio="01" eyebrow={bookingPage.purpose.eyebrow} heading={bookingPage.purpose.heading} onDark align="center" />
        <ul className="grid gap-6 md:grid-cols-3">
          {bookingPage.purpose.items.map((item) => (
            <li key={item.title}>
              <OrnamentCard title={item.title} text={item.text} />
            </li>
          ))}
        </ul>
      </Section>

      <Section labelledBy="prepare-heading">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading id="prepare-heading" folio="02" eyebrow={bookingPage.prepare.eyebrow} heading={bookingPage.prepare.heading} lead={bookingPage.prepare.note} />
          </div>
          <ul className="grid content-start lg:col-span-7">
            {bookingPage.prepare.items.map((item) => (
              <li key={item} className="flex items-baseline gap-4 border-b border-charcoal/15 py-5 font-display text-[clamp(1.4rem,1.1rem+0.9vw,1.9rem)] leading-snug text-charcoal">
                <Ornament className="size-4 shrink-0 text-gold" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </>
  );
}
