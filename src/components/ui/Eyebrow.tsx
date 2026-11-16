import { Mark } from "./Mark";

/**
 * Section label: the readout mark followed by a short sentence-case label (and an optional number).
 * Replaces the earlier gold rule + uppercase label. `onDark` switches to gold-soft for charcoal backgrounds.
 */
export function Eyebrow({ folio, children, onDark = false, className = "" }: { folio?: string; children: string; onDark?: boolean; className?: string }) {
  return (
    <p className={`mb-5 flex items-center gap-2.5 text-[0.95rem] font-semibold ${onDark ? "text-gold-soft" : "text-gold-deep"} ${className}`}>
      <Mark variant="bullet" className="size-4 shrink-0" />
      {folio && <span className="tabular-nums">{folio}</span>}
      <span>{children}</span>
    </p>
  );
}
