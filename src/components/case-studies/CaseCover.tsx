import { Ornament } from "@/components/ui/Ornament";

/**
 * Typographic cover for case studies. Deliberately no photograph: a stock image could be read as
 * showing the real client or project. Decorative only (the type label is also given as text nearby).
 */
export function CaseCover({ number, label, className = "" }: { number: string; label: string; className?: string }) {
  return (
    <div aria-hidden="true" className={`relative flex flex-col justify-between overflow-hidden bg-charcoal p-6 text-gold-soft lg:p-8 ${className}`}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold tracking-[0.18em] uppercase">{label}</span>
        <Ornament className="size-5" />
      </div>
      <span className="font-display text-[clamp(5rem,4rem+4vw,8rem)] leading-[0.8] italic">{number}</span>
      <span aria-hidden="true" className="absolute -right-10 -bottom-10 size-40 rounded-full border border-gold-soft/25" />
      <span aria-hidden="true" className="absolute -right-4 -bottom-4 size-24 rounded-full border border-gold-soft/25" />
    </div>
  );
}
