import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "@/components/ui/Mark";

export type ShowcaseItem = { kicker: string; title: string; text: string; href: string; linkLabel: string; visual: ReactNode };

/**
 * "What the work looks like": large coded mockups beside short explanations, alternating sides.
 * Each item links to the service it illustrates.
 */
export function WorkShowcase({ items }: { items: readonly ShowcaseItem[] }) {
  return (
    <ul className="grid gap-20 lg:gap-28">
      {items.map((item, i) => (
        <li key={item.title} className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <div className={`min-w-0 lg:col-span-7 ${i % 2 === 1 ? "lg:order-2" : ""}`}>{item.visual}</div>
          <div className="lg:col-span-5">
            <p className="mb-3 text-sm font-semibold tracking-[0.18em] text-gold uppercase">{item.kicker}</p>
            <h3 className="mb-4 text-4xl">{item.title}</h3>
            <p className="mb-6 text-lg text-muted">{item.text}</p>
            <Link href={item.href} className="group inline-flex min-h-11 items-center gap-2 font-semibold">
              {item.linkLabel}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
}
