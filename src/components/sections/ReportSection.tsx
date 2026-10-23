import type { ReactNode } from "react";

/**
 * Long-form "report" section: a sticky label column (folio + heading + optional lead) beside the content.
 * Used by case studies and the privacy notice. Sections are separated by a rule, not background changes.
 */
export function ReportSection({ id, folio, heading, lead, children }: { id: string; folio?: string; heading: string; lead?: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="grid gap-6 border-t border-charcoal/15 py-12 lg:grid-cols-12 lg:gap-12 lg:py-16">
      <div className="lg:col-span-4">
        <div className="lg:sticky lg:top-[calc(var(--header-height)+2rem)]">
          {folio && <p aria-hidden="true" className="mb-3 font-display text-4xl leading-none text-gold italic">{folio}</p>}
          <h2 id={id} className="mb-3 text-3xl">
            {heading}
          </h2>
          {lead && <p className="mb-0 text-muted">{lead}</p>}
        </div>
      </div>
      <div className="lg:col-span-8">{children}</div>
    </section>
  );
}
