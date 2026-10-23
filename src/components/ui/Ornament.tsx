/** Four-point star ornament (decorative). Colour follows `currentColor`. */
export function Ornament({ className = "size-10" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" aria-hidden="true" focusable="false">
      <path d="M20 0 C21.6 12.4 27.6 18.4 40 20 C27.6 21.6 21.6 27.6 20 40 C18.4 27.6 12.4 21.6 0 20 C12.4 18.4 18.4 12.4 20 0 Z" fill="currentColor" />
    </svg>
  );
}

/** Small right arrow used in card buttons and links (decorative). */
export function ArrowRight({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 8h11M9 4l4 4-4 4" />
    </svg>
  );
}
