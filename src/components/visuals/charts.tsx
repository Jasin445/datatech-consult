import { useId, type CSSProperties } from "react";

/**
 * SVG charts for illustrative mockups, drawn like a consulting deck: a labelled
 * y-axis, hairline gridlines, a firm baseline, one accent colour per series and
 * tabular numbers throughout. Colours come from theme tokens via Tailwind
 * fill-/stroke- utilities (no hex values). Decorative: callers hide them from
 * assistive technology. Gradient stops read the token through `var(--color-*)`.
 *
 * Plot geometry: a 10-unit left gutter holds the y-axis labels; the plot runs
 * from x=10 to x=100 and y=0 (top) to y=40 (baseline). Strokes keep their width
 * (non-scaling-stroke) at any container width.
 */

type Series = { values: readonly number[]; tone: "primary" | "secondary" | "gold" };

const strokeTone = { primary: "stroke-primary", secondary: "stroke-secondary", gold: "stroke-gold" } as const;
const borderTone = { primary: "border-primary", secondary: "border-secondary", gold: "border-gold" } as const;
const fillTone = { primary: "fill-primary", secondary: "fill-secondary", gold: "fill-gold" } as const;
const tokenVar = { primary: "var(--color-primary)", secondary: "var(--color-secondary)", gold: "var(--color-gold)" } as const;

const PLOT_X0 = 10;
const PLOT_W = 100;
const PLOT_H = 40;

/** Soft gradient area under a line: fades from the series colour to transparent. */
function AreaFill({ id, tone, d }: { id: string; tone: Series["tone"]; d: string }) {
  return (
    <>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" style={{ stopColor: tokenVar[tone], stopOpacity: 0.2 } as CSSProperties} />
          <stop offset="100%" style={{ stopColor: tokenVar[tone], stopOpacity: 0.01 } as CSSProperties} />
        </linearGradient>
      </defs>
      <path d={`${d} L${PLOT_W},${PLOT_H} L${PLOT_X0},${PLOT_H} Z`} fill={`url(#${id})`} />
    </>
  );
}

/** Hairline gridlines and a firm baseline for a plot of height PLOT_H. (Y-axis labels are HTML — see YLabels.) */
function PlotGrid() {
  return (
    <g aria-hidden="true">
      {[0, 0.5, 1].map((g) => (
        <line key={g} x1={PLOT_X0} x2={PLOT_W} y1={PLOT_H * (1 - g)} y2={PLOT_H * (1 - g)} className="stroke-border" strokeWidth="0.6" vectorEffect="non-scaling-stroke" />
      ))}
      <line x1={PLOT_X0} x2={PLOT_W} y1={PLOT_H} y2={PLOT_H} className="stroke-charcoal/25" strokeWidth="1" vectorEffect="non-scaling-stroke" />
    </g>
  );
}

/** Y-axis tick labels as HTML (SVG text would distort under the plot's non-uniform stretch). */
function YLabels({ max, format }: { max: number; format: (v: number) => string }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      {[1, 0.5, 0].map((g) => (
        <span key={g} className="absolute left-0 -translate-y-1/2 text-[9px] leading-none text-muted tabular-nums" style={{ top: `${(1 - g) * 100}%` } as CSSProperties}>
          {format(max * g)}
        </span>
      ))}
    </div>
  );
}

function XLabels({ labels }: { labels: readonly string[] }) {
  return (
    <div className="mt-1.5 flex justify-between pl-[10%] text-[10px] text-muted tabular-nums">
      {labels.map((l, i) => (
        <span key={l} className={i % 2 === 0 ? "" : "invisible sm:visible"}>
          {l}
        </span>
      ))}
    </div>
  );
}

function EndDot({ xPct, yPct, tone, large = false }: { xPct: number; yPct: number; tone: Series["tone"]; large?: boolean }) {
  return (
    <span
      className={`absolute left-(--dx) top-(--dy) -translate-x-1/2 -translate-y-1/2 rounded-full border-2 bg-white shadow-[0_1px_3px_rgb(23_43_58/30%)] ${borderTone[tone]} ${large ? "size-3" : "size-2.5"}`}
      style={{ "--dx": `${xPct}%`, "--dy": `${yPct}%` } as CSSProperties}
    />
  );
}

export function LineChart({ series, labels, max }: { series: readonly Series[]; labels: readonly string[]; max: number }) {
  // Fixed-height plot stretched to the container width; strokes keep their width (non-scaling-stroke).
  // Axis labels are HTML so they stay crisp and never scale with the plot.
  // End-point dots are HTML, positioned with CSS custom properties so they stay round at any width.
  const gradientId = useId().replace(/[^a-zA-Z0-9]/g, "");
  const x = (i: number) => PLOT_X0 + (i * (PLOT_W - PLOT_X0)) / (labels.length - 1);
  const y = (v: number) => (1 - v / max) * PLOT_H;
  return (
    <div>
      <div className="relative">
        <YLabels max={max} format={(v) => String(Math.round(v))} />
        <svg viewBox={`0 0 ${PLOT_W} ${PLOT_H}`} preserveAspectRatio="none" className="block h-24 w-full overflow-visible sm:h-36" role="presentation">
          <PlotGrid />
          {series.map((s, si) => {
            const d = s.values.map((v, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(2)},${y(v).toFixed(2)}`).join(" ");
            return (
              <g key={si}>
                {si === 0 ? <AreaFill id={`${gradientId}-${si}`} tone={s.tone} d={d} /> : <path d={`${d} L${PLOT_W},${PLOT_H} L${PLOT_X0},${PLOT_H} Z`} className={`${fillTone[s.tone]} opacity-10`} />}
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
          return <EndDot key={si} xPct={x(s.values.length - 1)} yPct={(1 - last / max) * 100} tone={s.tone} />;
        })}
      </div>
      <XLabels labels={labels} />
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
  const x = (i: number) => PLOT_X0 + (i * (PLOT_W - PLOT_X0)) / (labels.length - 1);
  const y = (v: number) => (1 - v / max) * PLOT_H;
  const d = values.map((v, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(2)},${y(v).toFixed(2)}`).join(" ");
  const last = values[values.length - 1] ?? 0;
  const compareD = compare ? compare.values.map((v, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(2)},${y(v).toFixed(2)}`).join(" ") : "";
  const compareLast = compare ? (compare.values[compare.values.length - 1] ?? 0) : 0;
  return (
    <div>
      <div className="relative">
        <YLabels max={max} format={(v) => String(Math.round(v))} />
        <svg viewBox={`0 0 ${PLOT_W} ${PLOT_H}`} preserveAspectRatio="none" className="block h-20 w-full overflow-visible sm:h-28" role="presentation">
          <PlotGrid />
          <AreaFill id={gradientId} tone={tone} d={d} />
          <path d={d} fill="none" className={strokeTone[tone]} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          {compare && (
            <path
              d={compareD}
              fill="none"
              className={strokeTone[compare.tone]}
              strokeWidth="1.75"
              strokeLinejoin="round"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              strokeDasharray="4 3"
            />
          )}
        </svg>
        {compare && <EndDot xPct={x(compare.values.length - 1)} yPct={(1 - compareLast / max) * 100} tone={compare.tone} />}
        <EndDot xPct={x(values.length - 1)} yPct={(1 - last / max) * 100} tone={tone} large />
        {endLabel && (
          <span
            className="absolute left-(--dx) top-(--dy) -translate-x-[calc(100%+0.6rem)] -translate-y-1/2 rounded-full bg-charcoal px-2 py-0.5 text-[10px] font-semibold whitespace-nowrap text-white tabular-nums"
            style={{ "--dx": `${x(values.length - 1)}%`, "--dy": `${(1 - last / max) * 100}%` } as CSSProperties}
          >
            {endLabel}
          </span>
        )}
      </div>
      <XLabels labels={labels} />
    </div>
  );
}

export function BarChart({ bars, max, highlight }: { bars: readonly { label: string; value: number }[]; max: number; highlight?: number }) {
  return (
    <div>
      <div className="flex h-32 items-end gap-1.5 border-b border-charcoal/25 pb-0 sm:h-36 @[30rem]:gap-2">
        {bars.map((b, i) => (
          <div key={b.label} className="group flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-1">
            <span className={`text-[10px] font-semibold tabular-nums ${i === highlight ? "text-gold-deep" : "text-charcoal"}`}>{b.value}</span>
            <span
              className={`block h-(--h) w-full max-w-10 rounded-t-[4px] transition-colors ${i === highlight ? "bg-gold group-hover:bg-gold-deep" : "bg-primary group-hover:bg-primary-hover"}`}
              style={{ "--h": `${(b.value / max) * 72}%` } as CSSProperties}
            />
            <span className="max-w-full truncate text-[9px] text-muted @[30rem]:text-[10px]">{b.label}</span>
          </div>
        ))}
      </div>
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
            <span className={`truncate ${isLeader ? "font-semibold" : "text-muted"}`}>{r.label}</span>
            <span className="h-2 overflow-hidden rounded-full bg-mist">
              <span
                className={`block h-2 w-(--w) rounded-full ${isLeader ? "bg-primary" : "bg-secondary/60"}`}
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
        <svg viewBox="0 0 42 42" className="block size-full -rotate-90" role="presentation">
          <circle cx="21" cy="21" r="15.915" fill="none" className="stroke-mist" strokeWidth="4.5" />
          {segments.map((s, i) => {
            const start = segments.slice(0, i).reduce((a, seg) => a + seg.value, 0);
            const gap = 0.9;
            return (
              <circle
                key={s.label}
                cx="21"
                cy="21"
                r="15.915"
                fill="none"
                pathLength={100}
                strokeDasharray={`${Math.max(s.value - gap, 0.5)} ${100 - s.value + gap}`}
                strokeDashoffset={-start - gap / 2}
                className={donutStroke[s.tone]}
                strokeWidth="4.5"
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 grid place-content-center text-center">
          <span className="font-display text-2xl leading-none text-charcoal tabular-nums">{total}%</span>
          <span className="mt-1 text-[10px] leading-none text-muted">{totalLabel}</span>
        </div>
      </div>
      <ul className="grid min-w-0 flex-1">
        {segments.map((s, i) => (
          <li key={s.label} className={`flex items-center gap-2 py-1.5 text-[11px] text-charcoal ${i < segments.length - 1 ? "border-b border-border/60" : ""}`}>
            <span className={`size-2.5 shrink-0 rounded-full ${donutDot[s.tone]}`} />
            <span className="min-w-0 flex-1 truncate">{s.label}</span>
            <span className="font-semibold tabular-nums">{s.value}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
