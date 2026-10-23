import type { ReactNode } from "react";

/**
 * The measurement bracket: key words in a headline marked with a fine gold dimension line (ticked at both
 * ends), like an analyst marking up a report. Replaces gold italic accent words. Keep accents short: the
 * bracket wraps the phrase as one unit.
 */
export function Accent({ children, onDark = false }: { children: ReactNode; onDark?: boolean }) {
  return (
    <span
      className={`relative inline-block after:pointer-events-none after:absolute after:inset-x-[0.02em] after:-bottom-[0.06em] after:h-[0.16em] after:border-x-[max(2px,0.035em)] after:border-b-[max(2px,0.035em)] after:content-[''] ${
        onDark ? "after:border-gold-soft" : "after:border-gold"
      }`}
    >
      {children}
    </span>
  );
}
