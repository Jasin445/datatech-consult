import Link from "next/link";
import { Mark } from "@/components/ui/Mark";

/**
 * Centred editorial card for dark (charcoal) sections: star ornament, large serif title,
 * one short sentence and an optional italic serif call to action (the whole card becomes clickable).
 */
export function MarkCard({
  title,
  text,
  href,
  cta,
  headingLevel = "h3",
  recommended = false,
  tall = false,
}: {
  title: string;
  text: string;
  href?: string;
  cta?: string;
  headingLevel?: "h2" | "h3";
  /** Marks the primary option (gold ring and a "Recommended first step" label). */
  recommended?: boolean;
  /** Taller card with more breathing room (closing "next step" section). */
  tall?: boolean;
}) {
  const Heading = headingLevel;
  return (
    <article
      className={`group relative flex h-full flex-col items-center rounded-[1.5rem] bg-white text-center text-charcoal shadow-lift transition-all duration-300 hover:-translate-y-1.5 hover:shadow-hero ${
        tall ? "min-h-[28rem] px-8 py-16 lg:min-h-[34rem] lg:px-14 lg:py-20" : "px-8 py-12 lg:px-12 lg:py-16"
      } ${
        recommended ? "ring-2 ring-gold ring-offset-4 ring-offset-charcoal" : ""
      }`}
    >
      {recommended && (
        <p className="absolute -top-3.5 left-1/2 mb-0 -translate-x-1/2 rounded-full bg-gold px-4 py-1 text-sm font-semibold whitespace-nowrap text-white">
          Recommended first step
        </p>
      )}
      <Mark className="mb-8 size-12 text-gold" />
      <Heading className="mb-5 text-4xl text-charcoal">{title}</Heading>
      <p className={`max-w-[30ch] text-lg ${href ? "mb-8" : "mb-0"}`}>{text}</p>
      {href && cta && (
        <Link
          href={href}
          className="mt-auto font-display text-2xl text-charcoal italic decoration-1 underline-offset-8 after:absolute after:inset-0 after:rounded-[1.25rem] hover:text-gold"
        >
          {cta}
        </Link>
      )}
    </article>
  );
}
