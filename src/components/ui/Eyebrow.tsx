/**
 * Section label: a short sentence-case label (and an optional number). No mark in front of the text —
 * the label simply starts (owner decision 2026-11-17: the readout mark is design-only, never an inline
 * prefix to text). `onDark` switches to gold-soft for charcoal backgrounds.
 */
export function Eyebrow({ folio, children, onDark = false, className = "" }: { folio?: string; children: string; onDark?: boolean; className?: string }) {
  return (
    <p className={`mb-5 flex items-center gap-2.5 text-[0.95rem] font-semibold ${onDark ? "text-gold-soft" : "text-gold-deep"} ${className}`}>
      {folio && <span className="tabular-nums">{folio}</span>}
      <span>{children}</span>
    </p>
  );
}
