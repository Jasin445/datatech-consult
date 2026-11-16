import { MockFrame } from "./MockFrame";

const sources = ["Accounting system", "CRM", "Field data app", "Spreadsheets"];
const steps = ["Extract", "Clean & validate", "Join & model"];
const checks = ["Duplicates", "Formats", "Missing values"];
const outputs = ["Dashboards", "Monthly reports", "Analysis"];
const stages = ["Sources", "Pipeline", "Store", "Outputs"] as const;

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-3.5 shrink-0 text-primary" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 12.5l5 5L20 6.5" />
    </svg>
  );
}

function StageHeading({ n, label, tone, center = false }: { n: number; label: string; tone: "muted" | "primary" | "white" | "gold"; center?: boolean }) {
  const numClass = { muted: "bg-charcoal text-white", primary: "bg-primary text-white", white: "bg-white text-primary", gold: "bg-gold text-white" }[tone];
  const labelClass = { muted: "text-muted", primary: "text-primary", white: "text-white/80", gold: "text-gold-deep" }[tone];
  return (
    <p className={`mb-2 flex items-center gap-2 text-[10px] font-semibold tracking-[0.14em] uppercase ${labelClass} ${center ? "justify-center" : ""}`}>
      <span className={`grid size-4 shrink-0 place-items-center rounded-full text-[9px] font-bold tabular-nums ${numClass}`}>{n}</span>
      <span className="whitespace-nowrap">{label}</span>
    </p>
  );
}

/**
 * Data pipeline diagram: scattered sources flow through cleaning into one reporting store, then out to dashboards.
 * No connector lines or arrows between stages — the numbered order (1–4) is the flow. The four stage panels
 * are equal-height and each fills its own height, so there is no dead space, and the four-column grid
 * (no fixed-width arrow columns) fits its container at every width with nothing clipped.
 * Mobile cut: below `md` the four stages collapse to a single four-chip strip with the checks on one line —
 * the full stage-by-stage flow returns from `md` up.
 */
export function PipelineDiagram({ className = "" }: { className?: string }) {
  return (
    <MockFrame
      title="Data flow"
      label="Data pipeline: an accounting system, a CRM, a field data app and spreadsheets feed an extract, clean and model step, which loads one reporting store that powers dashboards and reports."
      className={className}
    >
      {/* Mobile: the journey as one compact strip — four stages, one line of checks. */}
      <div className="md:hidden">
        <ol className="grid grid-cols-4 gap-1.5">
          {stages.map((s, i) => (
            <li key={s} className="flex flex-col items-center gap-1.5 text-center">
              <span className={`grid size-7 shrink-0 place-items-center rounded-full text-[11px] font-bold tabular-nums ${i === 2 ? "bg-primary text-white" : "border border-border bg-surface text-charcoal"}`}>{i + 1}</span>
              <span className={`text-[10px] leading-tight font-semibold ${i === 2 ? "text-primary" : "text-charcoal"}`}>{s}</span>
            </li>
          ))}
        </ol>
        <p className="mt-3 mb-0 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 rounded-lg border border-border bg-surface px-3 py-2 text-center text-[11px] text-charcoal">
          <span className="text-[10px] font-semibold tracking-[0.12em] text-primary uppercase">Checks</span>
          {checks.map((c) => (
            <span key={c} className="inline-flex items-center gap-1 font-medium">
              <CheckIcon /> {c}
            </span>
          ))}
        </p>
      </div>

      {/* Desktop: the full four-stage flow — four equal columns, each panel filling its height. */}
      <div className="hidden md:block">
        <div className="grid items-stretch gap-2 md:grid-cols-4 lg:gap-3">
          {/* Stage 1 — scattered sources */}
          <div className="flex min-w-0 flex-col rounded-lg border border-border bg-white p-2.5 lg:p-3">
            <StageHeading n={1} label="Sources" tone="muted" />
            <ul className="flex flex-1 flex-col justify-between gap-2">
              {sources.map((s) => (
                <li key={s} className="rounded-md border border-border bg-surface px-2.5 py-2 text-[11px] leading-snug font-medium text-charcoal lg:px-3">
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Stage 2 — the pipeline */}
          <div className="flex min-w-0 flex-col rounded-lg border border-secondary/50 bg-white p-2.5 lg:p-3">
            <StageHeading n={2} label="Pipeline" tone="primary" />
            <ol className="flex flex-1 flex-col justify-between gap-1.5">
              {steps.map((s, i) => (
                <li key={s} className="flex items-center gap-2 rounded-md bg-surface px-2 py-2 text-[11px] leading-snug font-medium text-charcoal ring-1 ring-border/60">
                  <span className="grid size-4 shrink-0 place-items-center rounded-full bg-primary text-[9px] font-bold text-white tabular-nums">{i + 1}</span>
                  {s}
                </li>
              ))}
            </ol>
          </div>

          {/* Stage 3 — one reporting store */}
          <div className="flex min-w-0 flex-col rounded-lg border border-primary bg-primary p-2.5 text-center text-white shadow-card lg:p-3">
            <StageHeading n={3} label="Store" tone="white" center />
            <div className="flex flex-1 flex-col items-center justify-center py-2">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="mx-auto mb-1.5 size-6" fill="none" stroke="currentColor" strokeWidth="1.6">
                <ellipse cx="12" cy="6" rx="7" ry="2.5" />
                <path d="M5 6v12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V6M5 12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5" />
              </svg>
              <p className="mb-0 text-[11px] leading-snug font-semibold">One reporting store</p>
              <p className="mb-0 text-[10px] leading-snug text-white/80">Single source of truth</p>
            </div>
          </div>

          {/* Stage 4 — what comes out */}
          <div className="flex min-w-0 flex-col rounded-lg border border-border bg-white p-2.5 lg:p-3">
            <StageHeading n={4} label="Outputs" tone="gold" />
            <div className="flex flex-1 flex-col justify-between gap-2">
              {outputs.map((d) => (
                <span key={d} className="rounded-md border border-gold/40 bg-gold-tint px-2.5 py-2 text-center text-[11px] leading-snug font-medium text-charcoal lg:px-3">
                  {d}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Checks strip: every record is checked before it reaches the store. Desktop only — mobile shows the same checks in the compact strip above. */}
      <div className="mt-3 hidden flex-wrap items-center gap-x-4 gap-y-1.5 rounded-lg border border-border bg-surface px-3 py-2.5 md:flex">
        <span className="text-[10px] font-semibold tracking-[0.14em] text-primary uppercase">Checks</span>
        {checks.map((c) => (
          <span key={c} className="flex items-center gap-1.5 text-[11px] font-medium text-charcoal">
            <CheckIcon /> {c}
          </span>
        ))}
        <span className="ml-auto hidden text-[10px] text-muted sm:block">Checked before anything is stored</span>
      </div>
    </MockFrame>
  );
}
