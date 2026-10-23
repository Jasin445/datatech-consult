import Link from "next/link";
import { ArrowRight } from "@/components/ui/Mark";
import { engagement } from "@/content/engagement";

/** Compact pointer to the engagement model on /services (instead of repeating the full block on every service page). */
export function EngagementLink() {
  return (
    <section aria-label="How engagements work" className="border-y border-border bg-surface py-10">
      <div className="mx-auto flex w-full max-w-[calc(var(--container-max)+2*var(--gutter))] flex-col gap-4 px-(--gutter) md:flex-row md:items-center md:justify-between">
        <p className="mb-0 font-display text-2xl text-charcoal">
          Three ways to start:{" "}
          {engagement.shapes.map((s, i) => (
            <span key={s.name}>
              <em className="text-gold">{s.name}</em>
              {i < engagement.shapes.length - 1 ? ", " : "."}
            </span>
          ))}
        </p>
        <Link href="/services#how-we-work" className="group inline-flex min-h-11 shrink-0 items-center gap-2 font-semibold">
          How we work and how pricing works
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}
