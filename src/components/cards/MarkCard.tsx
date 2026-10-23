import Link from "next/link";
import { ArrowRight, Mark } from "@/components/ui/Mark";

/**
 * Centred editorial card for dark (charcoal) sections: star ornament, large serif title,
 * one short sentence and an optional call to action (the whole card becomes clickable).
 */
export function MarkCard({
  title,
  text,
  href,
  cta,
  headingLevel = "h3",
  recommended = false,
}: {
  title: string;
  text: string;
  href?: string;
  cta?: string;
  headingLevel?: "h2" | "h3";
  /** Marks the primary option (gold ring and a "Recommended first step" label). */
  recommended?: boolean;
}) {
  const Heading = headingLevel;
  return (
    <article
      className={`group relative flex h-full flex-col items-center rounded-[1.25rem] bg-white px-8 py-12 text-center text-charcoal transition-transform duration-300 hover:-translate-y-1 lg:px-12 lg:py-16 ${
        recommended ? "ring-2 ring-gold-soft ring-offset-4 ring-offset-charcoal" : ""
      }`}
    >
      {recommended && (
        <p className="absolute -top-3.5 left-1/2 mb-0 -translate-x-1/2 rounded-full bg-gold px-4 py-1 text-xs font-semibold tracking-[0.14em] whitespace-nowrap text-white uppercase">
          Recommended first step
        </p>
      )}
      <Mark className="mb-8 size-12 text-gold" />
      <Heading className="mb-5 text-4xl text-charcoal">{title}</Heading>
      <p className={`max-w-[30ch] text-lg ${href ? "mb-8" : "mb-0"}`}>{text}</p>
      {href && cta && (
        <Link
          href={href}
          className="mt-auto inline-flex min-h-11 items-center gap-2 text-lg font-semibold underline-offset-[6px] after:absolute after:inset-0 after:rounded-[1.25rem]"
        >
          {cta}
          <ArrowRight />
        </Link>
      )}
    </article>
  );
}
