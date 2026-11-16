import Link from "next/link";
import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ArrowRight } from "@/components/ui/Mark";
import { Accent } from "@/components/ui/Accent";

type Cta = { label: string; href: string };

/**
 * Homepage hero: serif headline with the measurement-bracket accent, and a main visual (V4: a mockup in its
 * photographic setting). Text and actions come first on mobile.
 */
export function Hero({
  eyebrow,
  headline,
  headlineAccent,
  body,
  primary,
  secondary,
  visual,
}: {
  eyebrow: string;
  headline: string;
  headlineAccent: string;
  body: string;
  primary: Cta;
  secondary: Cta;
  /** Main visual (V3: a coded product mockup). */
  visual: ReactNode;
}) {
  return (
    <section aria-labelledby="page-heading" className="relative overflow-hidden pt-6 pb-10 sm:pt-10 lg:pt-14 lg:pb-16">
      <Container>
        <div className="relative overflow-hidden rounded-[1.5rem] bg-ink px-6 py-12 text-white shadow-hero sm:px-10 sm:py-16 lg:rounded-[2rem] lg:px-14 lg:py-24">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_85%_0%,rgb(21_168_234/22%),transparent_70%),radial-gradient(50%_60%_at_0%_100%,rgb(140_106_47/25%),transparent_70%)]" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gold/60" />
          <div className="relative grid items-center gap-10 sm:gap-14 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-6">
              <div>
                <Eyebrow onDark>{eyebrow}</Eyebrow>
              </div>
              <h1 id="page-heading" className="mb-5 text-display text-white sm:mb-7">
                {headline} <Accent onDark>{headlineAccent}</Accent>
              </h1>
              <p className="mb-6 max-w-[52ch] text-footer-text sm:mb-9 sm:text-lg">{body}</p>
              <div className="flex animate-rise flex-wrap items-center gap-x-8 gap-y-4 [animation-delay:270ms]">
                <ButtonLink href={primary.href} size="lg">{primary.label}</ButtonLink>
                <Link href={secondary.href} className="group inline-flex min-h-11 items-center gap-2 font-display text-xl text-white italic no-underline hover:text-gold-soft">
                  {secondary.label}
                  <ArrowRight className="size-4 text-gold-soft transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            <div className="relative min-w-0 animate-rise [animation-delay:200ms] lg:col-span-6 lg:pl-4">{visual}</div>
          </div>
        </div>
      </Container>
    </section>
  );
}
