import type { CSSProperties } from "react";

/**
 * Minimal SVG charts for illustrative mockups. Colours come from theme tokens via Tailwind
 * fill-/stroke- utilities (no hex values). Decorative: callers hide them from assistive technology.
 */

type Series = { values: readonly number[]; tone: "primary" | "secondary" | "gold" };

const strokeTone = { primary: "stroke-primary", secondary: "stroke-secondary", gold: "stroke-gold" } as const;
const fillTone = { primary: "fill-primary", secondary: "fill-secondary", gold: "fill-gold" } as const;

export function LineChart({ series, labels, max }: { series: readonly Series[]; labels: readonly string[]; max: number }) {
  // Fixed-height plot stretched to the container width; strokes keep their width (non-scaling-stroke).
  // Axis labels are HTML so they stay crisp and never scale with the plot.
  const w = 100;
  const h = 40;
  const x = (i: number) => (i * w) / (labels.length - 1);
  const y = (v: number) => (1 - v / max) * h;
  return (
    <div>
      <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="block h-28 w-full overflow-visible sm:h-36">
        {[0.25, 0.5, 0.75].map((g) => (
          <line key={g} x1={0} x2={w} y1={h * g} y2={h * g} className="stroke-border" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        ))}
        {series.map((s, si) => {
          const d = s.values.map((v, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(2)},${y(v).toFixed(2)}`).join(" ");
          return (
            <g key={si}>
              {si === 0 && <path d={`${d} L${w},${h} L0,${h} Z`} className={`${fillTone[s.tone]} opacity-10`} />}
              <path
                d={d}
                fill="none"
                className={strokeTone[s.tone]}
                strokeWidth="2"
                strokeLinejoin="round"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                strokeDasharray={si === 0 ? undefined : "4 4"}
              />
            </g>
          );
        })}
      </svg>
      <div className="mt-1.5 flex justify-between text-[10px] text-muted">
        {labels.map((l, i) => (
          <span key={l} className={i % 2 === 0 ? "" : "invisible sm:visible"}>
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}

export function BarChart({ bars, max, highlight }: { bars: readonly { label: string; value: number }[]; max: number; highlight?: number }) {
  return (
    <div className="flex h-32 items-end gap-2 sm:h-36">
      {bars.map((b, i) => (
        <div key={b.label} className="flex h-full flex-1 flex-col items-center justify-end gap-1.5">
          <span
            className={`block h-(--h) w-full max-w-10 rounded-t ${i === highlight ? "bg-gold" : "bg-primary"}`}
            style={{ "--h": `${(b.value / max) * 82}%` } as CSSProperties}
          />
          <span className="text-[10px] text-muted">{b.label}</span>
        </div>
      ))}
    </div>
  );
}

/** Horizontal progress-style bars, e.g. share by category. */
export function HBars({ rows }: { rows: readonly { label: string; value: number }[] }) {
  return (
    <ul className="grid gap-2.5">
      {rows.map((r) => (
        <li key={r.label} className="grid grid-cols-[5.5rem_1fr_2.5rem] items-center gap-2 text-[11px] text-charcoal">
          <span className="truncate">{r.label}</span>
          <span className="h-2 rounded-full bg-surface">
            <span className="block h-2 w-(--w) rounded-full bg-secondary" style={{ "--w": `${r.value}%` } as CSSProperties} />
          </span>
          <span className="text-right text-muted tabular-nums">{r.value}%</span>
        </li>
      ))}
    </ul>
  );
}
