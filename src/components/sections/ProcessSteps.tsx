import type { CSSProperties } from "react";
import type { TitledItem } from "@/content/home";

/**
 * A genuine sequence, so an ordered list. V2: large italic serif numerals on a gold rule
 * (horizontal on desktop, vertical on mobile). Column count follows the number of steps.
 */
export function ProcessSteps({ steps, onDark = false }: { steps: readonly TitledItem[]; onDark?: boolean }) {
  return (
    <ol
      className="relative grid gap-10 lg:grid-cols-(--process-cols) lg:gap-8"
      style={{ "--process-cols": `repeat(${steps.length}, minmax(0, 1fr))` } as CSSProperties}
    >
      {steps.map((step, i) => (
        <li key={step.title} className={`relative border-l pl-6 lg:border-t lg:border-l-0 lg:pt-8 lg:pl-0 ${onDark ? "border-gold-soft/50" : "border-gold/40"}`}>
          <span aria-hidden="true" className={`absolute top-0 -left-[5px] size-[9px] rotate-45 lg:-top-[5px] lg:left-0 ${onDark ? "bg-gold-soft" : "bg-gold"}`} />
          <p aria-hidden="true" className={`mb-3 font-display text-5xl leading-none italic ${onDark ? "text-gold-soft" : "text-gold"}`}>
            {String(i + 1).padStart(2, "0")}
          </p>
          <h3 className={`mb-2 text-2xl ${onDark ? "text-white" : ""}`}>{step.title}</h3>
          <p className={`mb-0 ${onDark ? "text-footer-text" : "text-muted"}`}>{step.text}</p>
        </li>
      ))}
    </ol>
  );
}
