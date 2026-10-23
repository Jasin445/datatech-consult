/**
 * Shared Tailwind class strings for patterns used by more than one component.
 * Keep them as complete, literal strings so Tailwind can detect every class.
 */

/** Lead paragraph (larger, muted). */
export const leadClass = "max-w-[62ch] text-lg text-muted";

/** Checkmark list item used in service cards (small tick). */
export const checkItemClass =
  "relative pl-6 before:absolute before:left-0 before:top-[0.55em] before:h-[0.4rem] before:w-[0.7rem] before:-translate-y-1/2 before:-rotate-45 before:border-b-2 before:border-l-2 before:border-primary before:content-['']";

/** Checkmark list item used for value lists (larger text and tick). */
export const valueItemClass =
  "relative pl-7 text-lg before:absolute before:left-0 before:top-[0.5em] before:h-2 before:w-[0.9rem] before:-rotate-45 before:border-b-2 before:border-l-2 before:border-primary before:content-['']";

/** Card surface. */
export const cardClass = "flex flex-col rounded-md border border-border bg-white p-6 shadow-card";

/** Neutral pill (e.g. project type). */
export const pillClass =
  "inline-block rounded-full border border-border bg-surface px-3 py-1 text-sm font-semibold text-charcoal";

/** Development-only status pill for dummy/draft content. */
export const statusPillClass =
  "inline-block rounded-full border border-dashed border-warning-text bg-warning-bg px-3 py-1 text-sm font-bold text-warning-text";

/** Form control (input, select, textarea). V2: square editorial fields. Border uses `muted` (not the light `border` token) to meet 3:1 non-text contrast. */
export const fieldClass =
  "block min-h-12 w-full rounded-none border border-muted bg-white px-4 py-3 text-base text-charcoal transition-colors hover:border-charcoal aria-[invalid=true]:border-2 aria-[invalid=true]:border-danger";

export const labelClass = "mb-2 block font-semibold text-charcoal";
export const hintClass = "mb-1 mt-0 text-sm text-muted";
export const fieldErrorClass = "mt-1 mb-0 text-sm font-semibold text-danger";
