import Link from "next/link";
import { Ornament } from "@/components/ui/Ornament";

/**
 * Centred editorial card for dark (charcoal) sections: star ornament, large serif title,
 * one short sentence and an optional italic serif call to action (the whole card becomes clickable).
 */
export function OrnamentCard({
  title,
  text,
  href,
  cta,
  headingLevel = "h3",
}: {
  title: string;
  text: string;
  href?: string;
  cta?: string;
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;
  return (
    <article className="group relative flex h-full flex-col items-center rounded-[1.25rem] bg-white px-8 py-12 text-center text-charcoal transition-transform duration-300 hover:-translate-y-1 lg:px-12 lg:py-16">
      <Ornament className="mb-8 size-12 text-gold transition-transform duration-500 group-hover:rotate-45" />
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
