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

/** Automation workflow with an explicit human-review step. Vertical on mobile. */
export function WorkflowDiagram({ className = "" }: { className?: string }) {
  return (
    <MockFrame
      title="Invoice processing workflow · Illustrative"
      label="Illustrative automated workflow: an invoice arrives by email, AI extracts the key fields, rules check totals and duplicates, a person reviews only the flagged exceptions, and the invoice is posted to the accounting system."
      className={className}
    >
      <ol className="grid gap-2 md:grid-cols-5 md:gap-1.5">
        {steps.map((s, i) => (
          <li key={s.title} className="relative flex md:block">
            <div className={`flex-1 rounded-lg border p-3 ${kindClass[s.kind]}`}>
              <p className={`mb-1.5 text-[9px] font-semibold tracking-[0.12em] uppercase ${s.kind === "human" ? "text-charcoal" : "text-primary"}`}>{kindLabel[s.kind]}</p>
              <p className="mb-0.5 text-[12px] font-semibold text-charcoal">{s.title}</p>
              <p className="mb-0 text-[10px] text-muted">{s.text}</p>
            </div>
            {i < steps.length - 1 && (
              <span aria-hidden="true" className="absolute -bottom-2 left-6 z-10 h-2 w-px bg-secondary md:top-1/2 md:-right-1.5 md:bottom-auto md:left-auto md:h-px md:w-1.5" />
            )}
          </li>
        ))}
      </ol>
      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-border pt-3 text-[10px] text-muted">
        <span>This week: 412 processed</span>
        <span>23 sent for review</span>
        <span>0 posted without a check</span>
      </div>
    </MockFrame>
  );
}
