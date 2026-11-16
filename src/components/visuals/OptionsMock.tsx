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

/**
 * Options appraisal page from an advisory report: three options rated against criteria, one recommended.
 * Mobile cut: below `md` the criteria dot-matrix is hidden — each option shows its name and total
 * score only, so the three cards stay short. The full appraisal returns from `md` up.
 */
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
              className={`relative overflow-hidden rounded-lg border p-3.5 ${o.recommended ? "border-gold bg-gold-tint shadow-card" : "hidden border-border bg-white md:block"}`}
            >
              {o.recommended && (
                <span className="absolute top-3 right-3 rounded-full bg-gold px-2 py-0.5 text-[9px] font-bold tracking-wide text-white uppercase">Recommended</span>
              )}
              <p className={`mb-0 text-[13px] leading-snug font-semibold text-charcoal md:mb-3 md:min-h-[2.6em] ${o.recommended ? "pr-20" : ""}`}>{o.name}</p>

              {/* Criteria as a dot matrix: one row per criterion, three dots per row. Desktop only. */}
              <ul className="hidden gap-2 border-t border-border/70 pt-3 md:grid">
                {o.ratings.map((r, i) => (
                  <li key={criteria[i] ?? i} className="flex items-center justify-between gap-2 text-[11px]">
                    <span className="text-muted">{criteria[i] ?? ""}</span>
                    <Dots n={r} />
                  </li>
                ))}
              </ul>

              {/* Total score bar. */}
              <div className="mt-3 border-t border-border/70 pt-3 md:mt-3">
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

      {/* Mobile: the two non-recommended options as single-line rows — the recommended card above carries the section. */}
      <ul className="mt-3 grid gap-2 md:hidden">
        {options
          .filter((o) => !o.recommended)
          .map((o) => {
            const total = o.ratings.reduce<number>((a, b) => a + b, 0);
            return (
              <li key={o.name} className="flex items-center gap-3 rounded-lg border border-border bg-white px-3 py-2.5">
                <span className="min-w-0 flex-1 truncate text-[12px] font-semibold text-charcoal">{o.name}</span>
                <span className="h-1.5 w-16 shrink-0 overflow-hidden rounded-full bg-border/60">
                  <span className="block h-1.5 w-(--w) rounded-full bg-primary" style={{ "--w": `${(total / MAX_TOTAL) * 100}%` } as CSSProperties} />
                </span>
                <span className="shrink-0 font-display text-base leading-none text-charcoal tabular-nums">
                  {total}
                  <span className="text-xs text-muted"> / {MAX_TOTAL}</span>
                </span>
              </li>
            );
          })}
      </ul>

      <p className="mt-3 mb-0 hidden text-[10px] text-muted md:block">More dots = better on that criterion (lower cost, lower risk, faster, solves more of the problem).</p>
    </MockFrame>
  );
}
