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
    <section aria-labelledby="page-heading" className="relative overflow-hidden pt-6 pb-20 sm:pt-12 lg:pt-20 lg:pb-28">
      <Container className="grid items-center gap-8 sm:gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <div>
            <Eyebrow>{eyebrow}</Eyebrow>
          </div>
          <h1 id="page-heading" className="mb-5 text-display sm:mb-7">
            {headline} <Accent>{headlineAccent}</Accent>
          </h1>
          <p className="mb-6 max-w-[52ch] text-muted sm:mb-9 sm:text-lg">{body}</p>
          <div className="flex animate-rise flex-wrap items-center gap-x-8 gap-y-4 [animation-delay:270ms]">
            <ButtonLink href={primary.href} size="lg">{primary.label}</ButtonLink>
            <Link href={secondary.href} className="group inline-flex min-h-11 items-center gap-2 font-display text-xl text-charcoal italic">
              {secondary.label}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        <div className="relative min-w-0 animate-rise [animation-delay:200ms] lg:col-span-6 lg:pl-4">{visual}</div>
      </Container>
    </section>
  );
}
