import { BarChart, HBars, LineChart } from "./charts";
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
const kpis = [
  { label: "Monthly revenue", value: "₦56.0m", delta: "+5.7%", up: true },
  { label: "Collection rate", value: "91%", delta: "+2 pts", up: true },
  { label: "Overdue invoices", value: "126", delta: "−18", up: true },
];

/** Management dashboard mockup: KPI tiles, trend vs target, region bars and product mix. */
export function DashboardMock({ className = "" }: { className?: string }) {
  return (
    <MockFrame
      title="Performance overview · Illustrative"
      label="Illustrative management dashboard showing three headline figures, a monthly revenue trend against target, revenue by region and sales mix by product line."
      className={className}
    >
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {kpis.map((k) => (
          <div key={k.label} className="rounded-lg border border-border p-2.5 sm:p-3">
            <p className="mb-1 truncate text-[10px] font-medium text-muted sm:text-[11px]">{k.label}</p>
            <p className="mb-0.5 font-display text-xl leading-none text-charcoal sm:text-2xl">{k.value}</p>
            <p className="mb-0 text-[10px] font-semibold text-primary">{k.delta}</p>
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-lg border border-border p-3">
        <div className="mb-2 flex items-center justify-between text-[11px]">
          <span className="font-semibold text-charcoal">Revenue vs target</span>
          <span className="flex items-center gap-3 text-muted">
            <span className="flex items-center gap-1"><span className="h-0.5 w-3 bg-primary" />Actual</span>
            <span className="flex items-center gap-1"><span className="h-0.5 w-3 border-t border-dashed border-gold" />Target</span>
          </span>
        </div>
        <LineChart labels={months} max={60} series={[{ values: actual, tone: "primary" }, { values: target, tone: "gold" }]} />
      </div>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg border border-border p-3">
          <p className="mb-1 text-[11px] font-semibold text-charcoal">Revenue by region</p>
          <BarChart bars={regions} max={70} highlight={3} />
        </div>
        <div className="rounded-lg border border-border p-3">
          <p className="mb-3 text-[11px] font-semibold text-charcoal">Sales mix</p>
          <HBars
            rows={[
              { label: "Product line A", value: 38 },
              { label: "Product line B", value: 27 },
              { label: "Services", value: 21 },
              { label: "Other", value: 14 },
            ]}
          />
        </div>
      </div>
    </MockFrame>
  );
}
