import { AreaChart, DonutChart, HBars } from "./charts";
import { MockFrame } from "./MockFrame";

// Illustrative data only: generic labels and round numbers, never a real organisation's figures.
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const actual = [31, 34, 33, 38, 41, 39, 44, 47, 46, 50, 53, 56];
const target = [32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54];
const regions = [
  { label: "North", value: 42 },
  { label: "South", value: 58 },
  { label: "East", value: 35 },
  { label: "West", value: 66 },
  { label: "Central", value: 49 },
];
// Decorative trend shapes for the KPI sparklines (no axis, no values attached);
// the revenue shape follows the monthly series above, the others follow the stated direction.
const kpis = [
  { label: "Monthly revenue", value: "₦56.0m", delta: "+5.7%", up: true, spark: [55, 61, 59, 68, 73, 70, 79, 84, 82, 89, 95, 100] },
  { label: "Collection rate", value: "91%", delta: "+2 pts", up: true, spark: [78, 80, 79, 83, 85, 84, 88, 90, 89, 92, 93, 95] },
  { label: "Overdue invoices", value: "126", delta: "−18", up: false, spark: [100, 97, 98, 94, 90, 91, 87, 84, 85, 81, 78, 75] },
];

/** Tiny decorative sparkline: a line with a soft fill, no axis or labels. */
function Sparkline({ points, tone }: { points: readonly number[]; tone: "primary" | "secondary" | "gold" }) {
  const w = 100;
  const h = 24;
  const x = (i: number) => (i * w) / (points.length - 1);
  const y = (v: number) => h - 3 - (v / 100) * (h - 6);
  const d = points.map((v, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
  const stroke = { primary: "stroke-primary", secondary: "stroke-secondary", gold: "stroke-gold" }[tone];
  const fill = { primary: "fill-primary", secondary: "fill-secondary", gold: "fill-gold" }[tone];
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="h-6 w-full">
      <path d={`${d} L${w},${h} L0,${h} Z`} className={`${fill} opacity-10`} />
      <path d={d} fill="none" className={stroke} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

/**
 * Management dashboard mockup: KPI tiles, trend vs target, region bars and product mix.
 * Mobile cut: below `sm` only the headline KPI and the trend chart show; below `md` the
 * region and sales-mix panels are hidden too, so the hero visual stays short on phones.
 * The full dashboard returns from `md` up.
 */
export function DashboardMock({ className = "" }: { className?: string }) {
  return (
    <MockFrame
      title="Performance overview"
      label="Management dashboard showing three headline figures, a monthly revenue trend against target, revenue by region and sales mix by product line."
      className={className}
      bodyClassName="p-3 sm:p-4"
    >
      <div className="@container">
        {/* Product header: name, date range and a live indicator. */}
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="grid size-7 shrink-0 place-items-center rounded-md bg-primary text-white">
              <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden="true">
                <rect x="4" y="12" width="4" height="8" rx="1" />
                <rect x="10" y="8" width="4" height="12" rx="1" />
                <rect x="16" y="4" width="4" height="16" rx="1" />
              </svg>
            </span>
            <span className="text-[13px] font-semibold text-charcoal">Finance overview</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-full border border-border px-2.5 py-1 text-[10px] font-medium text-muted">Jan – Dec 2026</span>
            <span className="flex items-center gap-1.5 rounded-full bg-surface px-2.5 py-1 text-[10px] font-semibold text-primary">
              <span className="size-1.5 rounded-full bg-secondary" /> Live
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 @[30rem]:gap-3">
          {kpis.map((k, i) => (
            <div key={k.label} className={`rounded-lg border border-border p-2.5 sm:p-3 ${i > 0 ? "hidden sm:block" : ""}`}>
              <p className="mb-1 text-[10px] leading-tight font-medium text-muted @[30rem]:text-[11px]">{k.label}</p>
              <div className="flex items-baseline justify-between gap-2 sm:block">
                <p className="mb-1 font-display text-xl leading-none whitespace-nowrap text-charcoal">{k.value}</p>
                <p className="mb-1.5 sm:mt-1">
                  <span className={`inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${k.up ? "bg-mist text-primary" : "bg-gold-tint text-gold-deep"}`}>
                    {k.up ? "↑" : "↓"} {k.delta}
                  </span>
                </p>
              </div>
              <Sparkline points={k.spark} tone={i === 0 ? "primary" : i === 1 ? "secondary" : "gold"} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 rounded-lg border border-border p-3">
        <div className="mb-2 flex flex-wrap items-center justify-between gap-2 text-[11px]">
          <span className="font-semibold text-charcoal">Revenue vs target</span>
          <span className="flex items-center gap-3 text-muted">
            <span className="flex items-center gap-1"><span className="h-0.5 w-3 bg-primary" />Actual</span>
            <span className="flex items-center gap-1"><span className="h-0.5 w-3 border-t border-dashed border-gold" />Target</span>
          </span>
        </div>
        <AreaChart values={actual} labels={months} max={60} tone="primary" endLabel="₦56.0m" compare={{ values: target, tone: "gold" }} />
      </div>

      <div className="mt-3 hidden gap-3 md:grid md:grid-cols-2">
        <div className="rounded-lg border border-border p-3">
          <div className="mb-1 flex items-baseline justify-between">
            <p className="mb-0 text-[11px] font-semibold whitespace-nowrap text-charcoal">By region</p>
            <p className="mb-0 text-[10px] text-muted">
              Highest: <span className="font-semibold text-gold">West</span>
            </p>
          </div>
          <HBars rows={regions} max={70} unit="" />
        </div>
        <div className="rounded-lg border border-border p-3">
          <p className="mb-3 text-[11px] font-semibold text-charcoal">Sales mix</p>
          <DonutChart
            totalLabel="of sales"
            segments={[
              { label: "Product line A", value: 38, tone: "primary" },
              { label: "Product line B", value: 27, tone: "secondary" },
              { label: "Services", value: 21, tone: "gold" },
              { label: "Other", value: 14, tone: "charcoal" },
            ]}
          />
        </div>
      </div>
    </MockFrame>
  );
}
