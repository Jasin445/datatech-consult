import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink, buttonRowClass } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ArrowRight } from "@/components/ui/Mark";

// Next.js adds noindex to every 404 response itself.
export const metadata: Metadata = { title: "Page not found" };

const destinations = [
  { label: "Services", text: "Four ways we help organisations run on data.", href: "/services" },
  { label: "About", text: "Who we are and how we work.", href: "/about" },
  { label: "Contact", text: "Tell us what you’re trying to solve.", href: "/contact" },
];

export default function NotFound() {
  return (
    <section aria-labelledby="page-heading" className="py-(--section-space)">
      <Container className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <p aria-hidden="true" className="mb-0 font-display text-[clamp(8rem,5rem+14vw,16rem)] leading-[0.8] text-gold italic lg:col-span-5">
          404
        </p>
        <div className="lg:col-span-7">
          <Eyebrow>Page not found</Eyebrow>
          <h1 id="page-heading" className="mb-5">
            This page isn’t in the report. <em className="text-gold">Let’s find the one you need.</em>
          </h1>
          <p className="mb-8 max-w-[52ch] text-lg text-muted">The link may be out of date, or the page may have moved.</p>
          <div className={buttonRowClass}>
            <ButtonLink href="/">Go to the homepage</ButtonLink>
          </div>
        </div>
        <ul className="grid border-t border-charcoal/15 lg:col-span-12 lg:grid-cols-3">
          {destinations.map((d) => (
            <li key={d.href} className="border-b border-charcoal/15 lg:border-b-0 lg:px-6 lg:first:pl-0 lg:last:pr-0 lg:not-last:border-r">
              <Link href={d.href} className="group flex min-h-24 items-center justify-between gap-4 py-6 no-underline">
                <span>
                  <span className="block font-display text-3xl text-charcoal group-hover:text-gold">{d.label}</span>
                  <span className="text-muted">{d.text}</span>
                </span>
                <ArrowRight className="size-5 shrink-0 text-gold transition-transform group-hover:translate-x-1" />
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
