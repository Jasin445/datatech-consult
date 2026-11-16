import { useId, type CSSProperties } from "react";

/**
 * Minimal SVG charts for illustrative mockups. Colours come from theme tokens via Tailwind
 * fill-/stroke- utilities (no hex values). Decorative: callers hide them from assistive technology.
 * Gradient stops read the token through `var(--color-*)` so no hex ever appears in a component.
 */

type Series = { values: readonly number[]; tone: "primary" | "secondary" | "gold" };

const strokeTone = { primary: "stroke-primary", secondary: "stroke-secondary", gold: "stroke-gold" } as const;
const borderTone = { primary: "border-primary", secondary: "border-secondary", gold: "border-gold" } as const;
const fillTone = { primary: "fill-primary", secondary: "fill-secondary", gold: "fill-gold" } as const;
const tokenVar = { primary: "var(--color-primary)", secondary: "var(--color-secondary)", gold: "var(--color-gold)" } as const;

/** Soft gradient area under a line: fades from the series colour to transparent. */
function AreaFill({ id, tone, d, h }: { id: string; tone: Series["tone"]; d: string; h: number }) {
  return (
    <>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" style={{ stopColor: tokenVar[tone], stopOpacity: 0.22 } as CSSProperties} />
          <stop offset="100%" style={{ stopColor: tokenVar[tone], stopOpacity: 0.02 } as CSSProperties} />
        </linearGradient>
      </defs>
      <path d={`${d} L100,${h} L0,${h} Z`} fill={`url(#${id})`} />
    </>
  );
}

export function LineChart({ series, labels, max }: { series: readonly Series[]; labels: readonly string[]; max: number }) {
  // Fixed-height plot stretched to the container width; strokes keep their width (non-scaling-stroke).
  // Axis labels are HTML so they stay crisp and never scale with the plot.
  // End-point dots are HTML, positioned with CSS custom properties so they stay round at any width.
  const gradientId = useId().replace(/[^a-zA-Z0-9]/g, "");
  const w = 100;
  const h = 40;
  const x = (i: number) => (i * w) / (labels.length - 1);
  const y = (v: number) => (1 - v / max) * h;
  return (
    <div>
      <div className="relative">
        <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="block h-28 w-full overflow-visible sm:h-36">
          {[0.25, 0.5, 0.75].map((g) => (
            <line key={g} x1={0} x2={w} y1={h * g} y2={h * g} className="stroke-border" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          ))}
          {series.map((s, si) => {
            const d = s.values.map((v, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(2)},${y(v).toFixed(2)}`).join(" ");
            return (
              <g key={si}>
                {si === 0 ? <AreaFill id={`${gradientId}-${si}`} tone={s.tone} d={d} h={h} /> : <path d={`${d} L${w},${h} L0,${h} Z`} className={`${fillTone[s.tone]} opacity-10`} />}
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
        {series.map((s, si) => {
          const last = s.values[s.values.length - 1] ?? 0;
          return (
            <span
              key={si}
              className={`absolute left-(--dx) top-(--dy) size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 bg-white ${borderTone[s.tone]}`}
              style={{ "--dx": `${x(s.values.length - 1)}%`, "--dy": `${(1 - last / max) * 100}%` } as CSSProperties}
            />
          );
        })}
      </div>
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

/** Single-series area chart: gradient fill, line, and a labelled end point.
 *  An optional dashed `compare` series (e.g. a target) is drawn on the same plot. */
export function AreaChart({
  values,
  labels,
  max,
  tone = "primary",
  endLabel,
  compare,
}: {
  values: readonly number[];
  labels: readonly string[];
  max: number;
  tone?: Series["tone"];
  endLabel?: string;
  compare?: { values: readonly number[]; tone: Series["tone"] };
}) {
  const gradientId = useId().replace(/[^a-zA-Z0-9]/g, "");
  const w = 100;
  const h = 40;
  const x = (i: number) => (i * w) / (labels.length - 1);
  const y = (v: number) => (1 - v / max) * h;
  const d = values.map((v, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(2)},${y(v).toFixed(2)}`).join(" ");
  const last = values[values.length - 1] ?? 0;
  const compareD = compare ? compare.values.map((v, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(2)},${y(v).toFixed(2)}`).join(" ") : "";
  const compareLast = compare ? (compare.values[compare.values.length - 1] ?? 0) : 0;
  return (
    <div>
      <div className="relative">
        <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="block h-24 w-full overflow-visible sm:h-28">
          {[0.25, 0.5, 0.75].map((g) => (
            <line key={g} x1={0} x2={w} y1={h * g} y2={h * g} className="stroke-border" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          ))}
          <AreaFill id={gradientId} tone={tone} d={d} h={h} />
          <path d={d} fill="none" className={strokeTone[tone]} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          {compare && (
            <path
              d={compareD}
              fill="none"
              className={strokeTone[compare.tone]}
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              strokeDasharray="4 4"
            />
          )}
        </svg>
        {compare && (
          <span
            className={`absolute left-(--dx) top-(--dy) size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 bg-white ${borderTone[compare.tone]}`}
            style={{ "--dx": `${x(compare.values.length - 1)}%`, "--dy": `${(1 - compareLast / max) * 100}%` } as CSSProperties}
          />
        )}
        <span
          className={`absolute left-(--dx) top-(--dy) size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 bg-white ${borderTone[tone]}`}
          style={{ "--dx": `${x(values.length - 1)}%`, "--dy": `${(1 - last / max) * 100}%` } as CSSProperties}
        />
        {endLabel && (
          <span
            className="absolute left-(--dx) top-(--dy) -translate-x-[calc(100%+0.6rem)] -translate-y-1/2 rounded-full bg-charcoal px-2 py-0.5 text-[10px] font-semibold whitespace-nowrap text-white tabular-nums"
            style={{ "--dx": `${x(values.length - 1)}%`, "--dy": `${(1 - last / max) * 100}%` } as CSSProperties}
          >
            {endLabel}
          </span>
        )}
      </div>
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
    <div className="flex h-32 items-end gap-1.5 sm:h-36 @[30rem]:gap-2">
      {bars.map((b, i) => (
        <div key={b.label} className="group flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-1">
          <span className={`text-[10px] font-semibold tabular-nums ${i === highlight ? "text-gold" : "text-charcoal"}`}>{b.value}</span>
          <span
            className={`block h-(--h) w-full max-w-10 rounded-t-md transition-colors ${i === highlight ? "bg-gold group-hover:bg-gold-deep" : "bg-primary group-hover:bg-primary-hover"}`}
            style={{ "--h": `${(b.value / max) * 72}%` } as CSSProperties}
          />
          <span className="max-w-full truncate text-[9px] text-muted @[30rem]:text-[10px]">{b.label}</span>
        </div>
      ))}
    </div>
  );
}

/** Horizontal progress-style bars, e.g. share by category. The leading row reads as the leader.
 *  Bars are scaled against `max` (default 100) and values are shown with `unit` (default "%"),
 *  so the same component works for shares and for plain figures. */
export function HBars({ rows, max = 100, unit = "%" }: { rows: readonly { label: string; value: number }[]; max?: number; unit?: string }) {
  const leader = Math.max(...rows.map((r) => r.value));
  return (
    <ul className="grid gap-2.5">
      {rows.map((r) => {
        const isLeader = r.value === leader;
        return (
          <li key={r.label} className="grid grid-cols-[4.5rem_1fr_2rem] items-center gap-2 text-[11px] text-charcoal">
            <span className={`truncate ${isLeader ? "font-semibold" : ""}`}>{r.label}</span>
            <span className="h-2.5 rounded-full bg-surface">
              <span
                className={`block h-2.5 w-(--w) rounded-full ${isLeader ? "bg-primary" : "bg-secondary/60"}`}
                style={{ "--w": `${(r.value / max) * 100}%` } as CSSProperties}
              />
            </span>
            <span className={`text-right tabular-nums ${isLeader ? "font-bold text-charcoal" : "text-muted"}`}>{`${r.value}${unit}`}</span>
          </li>
        );
      })}
    </ul>
  );
}

const donutStroke = {
  primary: "stroke-primary",
  secondary: "stroke-secondary",
  gold: "stroke-gold",
  charcoal: "stroke-charcoal",
} as const;
const donutDot = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  gold: "bg-gold",
  charcoal: "bg-charcoal",
} as const;

export type DonutTone = keyof typeof donutStroke;

/** Donut chart with a centre total and a legend. Values are shares of the total. */
export function DonutChart({
  segments,
  totalLabel,
}: {
  segments: readonly { label: string; value: number; tone: DonutTone }[];
  totalLabel: string;
}) {
  const total = segments.reduce((a, s) => a + s.value, 0);
  return (
    <div className="flex items-center gap-4">
      <div className="relative size-28 shrink-0 sm:size-32">
        <svg viewBox="0 0 42 42" className="block size-full -rotate-90">
          <circle cx="21" cy="21" r="15.915" fill="none" className="stroke-border" strokeWidth="5" />
          {segments.map((s, i) => {
            const start = segments.slice(0, i).reduce((a, seg) => a + seg.value, 0);
            return (
              <circle
                key={s.label}
                cx="21"
                cy="21"
                r="15.915"
                fill="none"
                pathLength={100}
                strokeDasharray={`${s.value} ${100 - s.value}`}
                strokeDashoffset={-start}
                className={donutStroke[s.tone]}
                strokeWidth="5"
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 grid place-content-center text-center">
          <span className="font-display text-2xl leading-none text-charcoal tabular-nums">{total}%</span>
          <span className="mt-1 text-[10px] leading-none text-muted">{totalLabel}</span>
        </div>
      </div>
      <ul className="grid min-w-0 flex-1 gap-2">
        {segments.map((s) => (
          <li key={s.label} className="flex items-center gap-2 text-[11px] text-charcoal">
            <span className={`size-2.5 shrink-0 rounded-full ${donutDot[s.tone]}`} />
            <span className="min-w-0 flex-1 truncate">{s.label}</span>
            <span className="font-semibold tabular-nums">{s.value}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
