import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/Mark";

/** Folded corner colours for each section tone: page colour above the diagonal, fold below it. */
const foldClass = {
  white: "bg-[linear-gradient(to_bottom_left,var(--color-bg)_50%,var(--color-border)_50%)]",
  surface: "bg-[linear-gradient(to_bottom_left,var(--color-surface)_50%,var(--color-border)_50%)]",
} as const;

/**
 * "Report page" card: square corners, a folded top-right corner, folio number, condensed uppercase title,
 * short text and an outlined gold action. `featured` fills the card with gold tint and a solid button.
 * Set `tone` to the section background so the fold reads as the page behind the card.
 */
export function FolioCard({
  folio,
  title,
  text,
  href,
  cta = "Learn more",
  featured = false,
  tone = "surface",
  headingLevel = "h3",
  titleStyle = "condensed",
  children,
}: {
  folio?: string;
  title: string;
  text: string;
  href?: string;
  cta?: string;
  featured?: boolean;
  tone?: keyof typeof foldClass;
  headingLevel?: "h2" | "h3";
  /** "condensed" = uppercase condensed sans (reference style); "serif" = calmer display serif. */
  titleStyle?: "condensed" | "serif";
  /** Extra content after the text (e.g. related links). */
  children?: ReactNode;
}) {
  const Heading = headingLevel;
  return (
    <article
      className={`relative flex h-full flex-col border p-5 transition-shadow duration-200 hover:shadow-[0_18px_40px_-18px_rgb(23_43_58/35%)] sm:p-8 lg:p-10 ${
        featured ? "border-gold/30 bg-gold-tint" : "border-border bg-white"
      }`}
    >
      <span aria-hidden="true" className={`pointer-events-none absolute -top-px -right-px size-14 lg:size-18 ${foldClass[tone]}`} />
      {folio && <p className={`mb-4 text-xs font-semibold tracking-[0.16em] tabular-nums ${featured ? "text-charcoal" : "text-gold"}`}>{folio}</p>}
      <Heading
        className={
          titleStyle === "serif" ? "mb-3 text-3xl leading-tight" : "mb-4 font-sans text-2xl leading-tight font-medium tracking-[0.04em] uppercase font-stretch-condensed"
        }
      >
        {title}
      </Heading>
      <p className="mb-8 text-muted">{text}</p>
      {children}
      {href && (
        <ButtonLink href={href} variant={featured ? "gold" : "gold-outline"} className="mt-auto w-full">
          {cta}
          <span className="sr-only">: {title}</span>
          <ArrowRight />
        </ButtonLink>
      )}
    </article>
  );
}
