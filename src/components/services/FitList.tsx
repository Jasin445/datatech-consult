import Link from "next/link";
import { services } from "@/content/services";
import { ArrowRight } from "@/components/ui/Ornament";

type FitItem = { situation: string; slug: string };

/** "If this sounds like you, start here": the situation as an italic serif quote, the service as the link. */
export function FitList({ items }: { items: readonly FitItem[] }) {
  return (
    <ul className="border-t border-charcoal/15">
      {items.map((item) => {
        const service = services.find((s) => s.slug === item.slug);
        if (!service) return null;
        return (
          <li key={item.slug} className="group relative grid gap-3 border-b border-charcoal/15 py-7 md:grid-cols-[1.5fr_1fr] md:items-center md:gap-10">
            <p className="mb-0 font-display text-[clamp(1.4rem,1rem+1vw,1.9rem)] leading-snug text-charcoal italic">“{item.situation}”</p>
            <Link href={service.href} className="inline-flex items-center gap-3 font-semibold no-underline after:absolute after:inset-0 md:justify-self-end">
              <span className="underline decoration-1 underline-offset-4">{service.title}</span>
              <ArrowRight className="size-4 shrink-0 text-gold transition-transform group-hover:translate-x-1" />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
