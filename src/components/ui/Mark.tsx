/**
 * The readout mark: the project's own symbol. A chart corner (two axes) with one plotted point and faint
 * guide lines from the point to each axis, the moment you read a value off a chart. Decorative; colour follows
 * currentColor. `variant="bullet"` drops the guides and thickens the strokes so it reads at list-bullet size.
 */
export function Mark({ className = "size-10", variant = "full" }: { className?: string; variant?: "full" | "bullet" }) {
  const bullet = variant === "bullet";
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor">
      <path d="M4 3.5V20h16.5" strokeWidth={bullet ? 2.6 : 1.7} strokeLinecap="square" />
      {!bullet && <path d="M4 9.5h10.5M14.5 9.5V20" strokeWidth="1" strokeDasharray="1.6 2.2" opacity="0.6" />}
      <circle cx="14.5" cy="9.5" r={bullet ? 3.6 : 3} fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Small right arrow used in buttons and links (decorative). */
export function ArrowRight({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 8h11M9 4l4 4-4 4" />
    </svg>
  );
}
