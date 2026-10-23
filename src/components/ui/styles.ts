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
