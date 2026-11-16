import type { CSSProperties } from "react";
import { MockFrame } from "./MockFrame";

type Rating = 1 | 2 | 3;
const criteria = ["Cost", "Risk", "Time to value", "Solves the problem"] as const;
const options: { name: string; ratings: [Rating, Rating, Rating, Rating]; recommended?: boolean }[] = [
  { name: "Fix the current system", ratings: [3, 3, 3, 1] },
  { name: "Add an integration layer", ratings: [2, 2, 2, 3], recommended: true },
  { name: "Replace with a new platform", ratings: [1, 1, 1, 3] },
];

const MAX_TOTAL = 12;

/** One criterion as a row of three dots; stronger ratings read darker. */
function Dots({ n }: { n: Rating }) {
  return (
    <span className="inline-flex gap-1">
      {[1, 2, 3].map((i) => (
        <span key={i} className={`size-2.5 rounded-full ${i <= n ? (n === 3 ? "bg-primary" : n === 2 ? "bg-secondary" : "bg-gold") : "bg-border"}`} />
      ))}
    </span>
  );
}

/** Options appraisal page from an advisory report: three options rated against criteria, one recommended. */
export function OptionsMock({ className = "" }: { className?: string }) {
  return (
    <MockFrame
      title="Technology options appraisal · Illustrative"
      label="Illustrative options appraisal comparing three options (fix the current system, add an integration layer, replace with a new platform) on cost, risk, time to value and how much of the problem each solves, with the integration layer recommended."
      className={className}
    >
      <p className="mb-1 text-[10px] font-semibold tracking-[0.14em] text-gold uppercase">Section 4 · Options</p>
      <p className="mb-3 font-display text-xl leading-tight text-charcoal">Which route fits the problem?</p>

      <div className="grid gap-3 md:grid-cols-3">
        {options.map((o) => {
          const total = o.ratings.reduce<number>((a, b) => a + b, 0);
          return (
            <article
              key={o.name}
              className={`relative overflow-hidden rounded-lg border p-3.5 ${o.recommended ? "border-gold bg-gold-tint shadow-card" : "border-border bg-white"}`}
            >
              {o.recommended && (
                <span className="absolute top-3 right-3 rounded-full bg-gold px-2 py-0.5 text-[9px] font-bold tracking-wide text-white uppercase">Recommended</span>
              )}
              <p className={`mb-3 min-h-[2.6em] text-[13px] leading-snug font-semibold text-charcoal ${o.recommended ? "pr-20" : ""}`}>{o.name}</p>

              {/* Criteria as a dot matrix: one row per criterion, three dots per row. */}
              <ul className="grid gap-2 border-t border-border/70 pt-3">
                {o.ratings.map((r, i) => (
                  <li key={criteria[i] ?? i} className="flex items-center justify-between gap-2 text-[11px]">
                    <span className="text-muted">{criteria[i] ?? ""}</span>
                    <Dots n={r} />
                  </li>
                ))}
              </ul>

              {/* Total score bar. */}
              <div className="mt-3 border-t border-border/70 pt-3">
                <div className="mb-1.5 flex items-baseline justify-between">
                  <span className="text-[10px] font-semibold tracking-[0.12em] text-muted uppercase">Total score</span>
                  <span className="font-display text-xl leading-none text-charcoal tabular-nums">
                    {total} <span className="text-sm text-muted">/ {MAX_TOTAL}</span>
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-border/60">
                  <span
                    className={`block h-2 w-(--w) rounded-full ${o.recommended ? "bg-gold" : "bg-primary"}`}
                    style={{ "--w": `${(total / MAX_TOTAL) * 100}%` } as CSSProperties}
                  />
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <p className="mt-3 mb-0 text-[10px] text-muted">More dots = better on that criterion (lower cost, lower risk, faster, solves more of the problem).</p>
    </MockFrame>
  );
}
