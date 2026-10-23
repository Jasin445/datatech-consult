/**
 * Editorial label above a heading: optional folio number, a short gold rule and a label.
 * `onDark` switches to gold-soft for charcoal backgrounds (gold itself is too dark there).
 */
export function Eyebrow({ folio, children, onDark = false, className = "" }: { folio?: string; children: string; onDark?: boolean; className?: string }) {
  return (
    <p
      className={`mb-5 flex items-center gap-3 text-sm font-semibold tracking-[0.18em] uppercase ${onDark ? "text-gold-soft" : "text-gold"} ${className}`}
    >
      {folio && <span className="font-display text-lg tracking-normal normal-case italic">{folio}</span>}
      <span aria-hidden="true" className="h-px w-10 bg-current" />
      <span>{children}</span>
    </p>
  );
}
