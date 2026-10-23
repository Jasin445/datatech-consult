import { MockFrame } from "./MockFrame";

const sources = ["Accounting system", "CRM", "Field data app", "Spreadsheets"];
const steps = ["Extract", "Clean & validate", "Join & model"];

function Arrow() {
  return (
    <div className="flex items-center justify-center text-secondary" aria-hidden="true">
      <svg viewBox="0 0 24 24" className="size-5 rotate-90 md:rotate-0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 12h15M14 6l6 6-6 6" />
      </svg>
    </div>
  );
}

/** Data pipeline diagram: scattered sources, a cleaning layer, one reporting store, dashboards. Vertical on mobile. */
export function PipelineDiagram({ className = "" }: { className?: string }) {
  return (
    <MockFrame
      title="Data flow · Illustrative"
      label="Illustrative data pipeline: an accounting system, a CRM, a field data app and spreadsheets feed an extract, clean and model step, which loads one reporting store that powers dashboards and reports."
      className={className}
    >
      <div className="grid items-center gap-3 md:grid-cols-[1fr_auto_1.1fr_auto_0.9fr_auto_0.9fr]">
        <ul className="grid gap-2">
          {sources.map((s) => (
            <li key={s} className="rounded-md border border-border bg-surface px-3 py-2 text-[11px] font-medium text-charcoal">
              {s}
            </li>
          ))}
        </ul>
        <Arrow />
        <div className="rounded-lg border border-secondary/50 bg-secondary/5 p-3">
          <p className="mb-2 text-[10px] font-semibold tracking-[0.14em] text-primary uppercase">Pipeline</p>
          <ol className="grid gap-1.5">
            {steps.map((s, i) => (
              <li key={s} className="flex items-center gap-2 text-[11px] text-charcoal">
                <span className="grid size-4 place-items-center rounded-full bg-primary text-[9px] font-bold text-white">{i + 1}</span>
                {s}
              </li>
            ))}
          </ol>
          <p className="mt-2 mb-0 rounded bg-white px-2 py-1 text-[10px] text-muted">Checks: duplicates · formats · missing values</p>
        </div>
        <Arrow />
        <div className="rounded-lg border border-primary bg-primary p-3 text-center text-white">
          <svg aria-hidden="true" viewBox="0 0 24 24" className="mx-auto mb-1 size-6" fill="none" stroke="currentColor" strokeWidth="1.6">
            <ellipse cx="12" cy="6" rx="7" ry="2.5" />
            <path d="M5 6v12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V6M5 12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5" />
          </svg>
          <p className="mb-0 text-[11px] font-semibold">One reporting store</p>
        </div>
        <Arrow />
        <div className="grid gap-2">
          {["Dashboards", "Monthly reports", "Analysis"].map((d) => (
            <span key={d} className="rounded-md border border-gold/40 bg-gold-tint px-3 py-2 text-center text-[11px] font-medium text-charcoal">
              {d}
            </span>
          ))}
        </div>
      </div>
    </MockFrame>
  );
}
