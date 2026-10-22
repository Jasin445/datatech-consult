import type { CSSProperties } from "react";
import type { TitledItem } from "@/content/home";

/** A genuine sequence, so an ordered list with visible step numbers is appropriate. */
export function ProcessSteps({ steps }: { steps: readonly TitledItem[] }) {
  return (
    <ol className="process" style={{ "--process-cols": steps.length } as CSSProperties}>
      {steps.map((step) => (
        <li key={step.title}>
          <h3>{step.title}</h3>
          <p>{step.text}</p>
        </li>
      ))}
    </ol>
  );
}
