import Link from "next/link";
import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ArrowRight } from "@/components/ui/Ornament";

type Cta = { label: string; href: string };

/**
 * Homepage hero: serif headline with an italic gold accent, a main visual (a product mockup) with an offset
 * gold rule, and a folded "field note" card overlapping it. Text and actions come first on mobile.
 */
export function Hero({
  eyebrow,
  headline,
  headlineAccent,
  body,
  primary,
  secondary,
  visual,
  note,
}: {
  eyebrow: string;
  headline: string;
  headlineAccent: string;
  body: string;
  primary: Cta;
  secondary: Cta;
  /** Main visual (V3: a coded product mockup). */
  visual: ReactNode;
  note: { label: string; text: string };
}) {
  return (
    <section aria-labelledby="page-heading" className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
      <Container className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <div className="animate-rise">
            <Eyebrow>{eyebrow}</Eyebrow>
          </div>
          <h1 id="page-heading" className="mb-7 animate-rise text-display [animation-delay:90ms]">
            {headline} <em className="text-gold">{headlineAccent}</em>
          </h1>
          <p className="mb-9 max-w-[52ch] animate-rise text-lg text-muted [animation-delay:180ms]">{body}</p>
          <div className="flex animate-rise flex-wrap items-center gap-x-8 gap-y-4 [animation-delay:270ms]">
            <ButtonLink href={primary.href}>{primary.label}</ButtonLink>
            <Link href={secondary.href} className="group inline-flex min-h-11 items-center gap-2 font-display text-xl text-charcoal italic">
              {secondary.label}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        <div className="relative min-w-0 animate-rise [animation-delay:200ms] lg:col-span-6 lg:pl-8">
          <div aria-hidden="true" className="absolute top-8 -right-3 -bottom-4 left-12 bg-gold-tint max-lg:left-6" />
          <div className="relative">{visual}</div>
          <figure className="relative mt-6 ml-4 max-w-[22rem] border border-border bg-white p-6 shadow-[0_24px_50px_-24px_rgb(23_43_58/45%)] sm:ml-8 lg:absolute lg:-right-6 lg:-bottom-28 lg:mt-0 lg:ml-0">
            <span aria-hidden="true" className="absolute -top-px -right-px size-10 bg-[linear-gradient(to_bottom_left,var(--color-bg)_50%,var(--color-border)_50%)]" />
            <figcaption className="mb-2 text-xs font-semibold tracking-[0.18em] text-gold uppercase">{note.label}</figcaption>
            <blockquote className="m-0 font-display text-xl leading-snug text-charcoal italic">{note.text}</blockquote>
          </figure>
        </div>
      </Container>
    </section>
  );
}
