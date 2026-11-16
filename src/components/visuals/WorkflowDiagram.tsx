import { MockFrame } from "./MockFrame";

const steps = [
  { title: "Invoice arrives", text: "PDF by email", kind: "auto" },
  { title: "Fields extracted", text: "AI reads supplier, date, total", kind: "ai" },
  { title: "Rules check", text: "Totals, duplicates, PO match", kind: "auto" },
  { title: "Person reviews", text: "Only flagged exceptions", kind: "human" },
  { title: "Posted", text: "To the accounting system", kind: "auto" },
] as const;

const kindClass = {
  auto: "border-border bg-white",
  ai: "border-secondary/50 bg-secondary/5",
  human: "border-gold bg-gold-tint",
} as const;
const kindLabel = { auto: "Automated", ai: "AI-assisted", human: "Human review" } as const;
const iconWrap = {
  auto: "bg-surface text-primary",
  ai: "bg-secondary/15 text-primary",
  human: "bg-gold text-white",
} as const;

/** Small line icons for the five workflow steps. */
function IconFor({ title }: { title: string }) {
  const cls = "size-5";
  const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" } as const;
  if (title === "Invoice arrives") {
    return (
      <svg viewBox="0 0 24 24" className={cls} {...stroke} aria-hidden="true">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3.5 7l8.5 6 8.5-6" />
      </svg>
    );
  }
  if (title === "Fields extracted") {
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="currentColor" aria-hidden="true">
        <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2z" />
        <path d="M19 15l.8 2.7 2.7.8-2.7.8L19 22l-.8-2.7-2.7-.8 2.7-.8L19 15z" />
      </svg>
    );
  }
  if (title === "Rules check") {
    return (
      <svg viewBox="0 0 24 24" className={cls} {...stroke} aria-hidden="true">
        <path d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3z" />
        <path d="M9 12l2 2 4-4.5" />
      </svg>
    );
  }
  if (title === "Person reviews") {
    return (
      <svg viewBox="0 0 24 24" className={cls} {...stroke} aria-hidden="true">
        <circle cx="12" cy="8" r="3.5" />
        <path d="M5 20c1.2-3.5 3.8-5 7-5s5.8 1.5 7 5" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className={cls} {...stroke} aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12.5l2.5 2.5L16 9.5" />
    </svg>
  );
}

/**
 * Automation workflow with an explicit human-review step. A progress track runs through the five steps.
 * Mobile cut: below `md` each step is one compact row (icon, title, kind) with no description text —
 * the full cards and the weekly stats return from `md` up.
 */
export function WorkflowDiagram({ className = "" }: { className?: string }) {
  return (
    <MockFrame
      title="Invoice processing workflow · Illustrative"
      label="Illustrative automated workflow: an invoice arrives by email, AI extracts the key fields, rules check totals and duplicates, a person reviews only the flagged exceptions, and the invoice is posted to the accounting system."
      className={className}
    >
      <div className="relative">
        {/* Progress track: vertical on mobile (through the compact row icons), horizontal on desktop. The filled part runs to the human-review checkpoint. */}
        <div className="absolute top-4 bottom-4 left-6 w-0.5 bg-border md:top-5 md:right-10 md:bottom-auto md:left-10 md:h-0.5 md:w-auto" aria-hidden="true" />
        <div className="absolute top-4 left-6 h-[62%] w-0.5 bg-primary/60 md:top-5 md:left-10 md:h-0.5 md:w-[62%]" aria-hidden="true" />
        <ol className="relative grid gap-1.5 md:grid-cols-5 md:gap-3">
          {steps.map((s, i) => (
            <li key={s.title} className="relative flex md:block">
              <div className={`flex-1 rounded-lg border p-2.5 pl-12 md:p-3 md:pt-12 ${kindClass[s.kind]} ${s.kind === "human" ? "shadow-card" : ""}`}>
                {/* Step icon sits on the track. */}
                <span
                  className={`absolute top-2 left-2 grid size-8 place-items-center rounded-full border-2 border-white shadow-card md:top-0 md:left-1/2 md:size-10 md:-translate-x-1/2 ${iconWrap[s.kind]}`}
                  aria-hidden="true"
                >
                  <IconFor title={s.title} />
                </span>
                <p className={`mb-1.5 hidden items-center gap-1.5 text-[9px] font-semibold tracking-[0.12em] uppercase md:flex ${s.kind === "human" ? "text-gold-deep" : "text-primary"}`}>
                  <span className="grid size-3.5 place-items-center rounded-full bg-charcoal text-[8px] font-bold text-white tabular-nums">{i + 1}</span>
                  {kindLabel[s.kind]}
                </p>
                <p className="mb-0 text-[12px] font-semibold text-charcoal">
                  <span className="mr-1.5 inline-grid size-4 place-items-center rounded-full bg-charcoal align-middle text-[9px] font-bold text-white tabular-nums md:hidden">{i + 1}</span>
                  {s.title}
                  <span className={`ml-2 inline-flex rounded-full px-1.5 py-0.5 align-middle text-[9px] font-semibold md:hidden ${s.kind === "human" ? "bg-gold-tint text-gold-deep" : "bg-mist text-primary"}`}>
                    {kindLabel[s.kind]}
                  </span>
                  {s.kind === "human" && (
                    <span className="ml-2 inline-flex rounded-full bg-gold px-2 py-0.5 align-middle text-[9px] font-bold tracking-wide text-white uppercase md:mt-2 md:ml-0 md:block md:w-fit">Checkpoint</span>
                  )}
                </p>
                <p className="mb-0 hidden text-[10px] text-muted md:block">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-border pt-3 md:mt-4">
        <span className="text-[10px] font-semibold tracking-[0.12em] text-muted uppercase">This week</span>
        {[
          { n: "412", label: "processed" },
          { n: "23", label: "sent for review" },
          { n: "0", label: "posted without a check" },
        ].map((s, j) => (
          <span key={s.label} className={`items-baseline gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-[11px] text-muted ${j === 0 ? "inline-flex" : "hidden sm:inline-flex"}`}>
            <span className="font-display text-base leading-none font-normal text-charcoal tabular-nums">{s.n}</span>
            {s.label}
          </span>
        ))}
      </div>
    </MockFrame>
  );
}
