import type { CSSProperties } from "react";
import type { TitledItem } from "@/content/home";

/**
 * A genuine sequence, so an ordered list with visible step numbers is appropriate.
 * Desktop column count follows the number of steps via the --process-cols custom property.
 */
export function ProcessSteps({ steps }: { steps: readonly TitledItem[] }) {
  return (
    <ol
      className="grid gap-6 [counter-reset:step] lg:grid-cols-(--process-cols)"
      style={{ "--process-cols": `repeat(${steps.length}, minmax(0, 1fr))` } as CSSProperties}
    >
      {steps.map((step) => (
        <li
          key={step.title}
          className="relative pl-13 [counter-increment:step] before:absolute before:top-0 before:left-0 before:grid before:size-9 before:place-items-center before:rounded-full before:bg-primary before:font-bold before:text-white before:content-[counter(step)] lg:pt-13 lg:pl-0"
        >
          <h3 className="mb-1 text-lg leading-[1.15]">{step.title}</h3>
          <p className="mb-0 text-muted">{step.text}</p>
        </li>
      ))}
    </ol>
  );
}
