import { MockFrame } from "./MockFrame";

type Rating = 1 | 2 | 3;
const criteria = ["Cost", "Risk", "Time to value", "Solves the problem"] as const;
const options: { name: string; ratings: Rating[]; recommended?: boolean }[] = [
  { name: "Fix the current system", ratings: [3, 3, 3, 1] },
  { name: "Add an integration layer", ratings: [2, 2, 2, 3], recommended: true },
  { name: "Replace with a new platform", ratings: [1, 1, 1, 3] },
];

function Dots({ n }: { n: Rating }) {
  return (
    <span className="inline-flex gap-1">
      {[1, 2, 3].map((i) => (
        <span key={i} className={`size-2 rounded-full ${i <= n ? "bg-primary" : "bg-border"}`} />
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
      <div className="overflow-hidden rounded-lg border border-border">
        <table className="w-full border-collapse text-[11px]">
          <thead>
            <tr className="bg-surface text-left text-muted">
              <th className="px-3 py-2 font-medium">Option</th>
              {criteria.map((c) => (
                <th key={c} className="hidden px-2 py-2 font-medium sm:table-cell">
                  {c}
                </th>
              ))}
              <th className="px-2 py-2 font-medium sm:hidden">Score</th>
            </tr>
          </thead>
          <tbody>
            {options.map((o) => (
              <tr key={o.name} className={`border-t border-border ${o.recommended ? "bg-gold-tint" : ""}`}>
                <td className="px-3 py-2.5 font-semibold text-charcoal">
                  {o.name}
                  {o.recommended && <span className="ml-2 rounded-full bg-charcoal px-2 py-0.5 text-[9px] font-semibold text-white">Recommended</span>}
                </td>
                {o.ratings.map((r, i) => (
                  <td key={i} className="hidden px-2 py-2.5 sm:table-cell">
                    <Dots n={r} />
                  </td>
                ))}
                <td className="px-2 py-2.5 sm:hidden">
                  <Dots n={Math.round(o.ratings.reduce<number>((a, b) => a + b, 0) / o.ratings.length) as Rating} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 mb-0 text-[10px] text-muted">More dots = better on that criterion (lower cost, lower risk, faster, solves more of the problem).</p>
    </MockFrame>
  );
}
