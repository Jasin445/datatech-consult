import type { ReactNode } from "react";

/**
 * App-window frame for coded product mockups. The whole mock is exposed to assistive technology as one
 * image with a text description (`label`); its internals are hidden. Mockups carry no illustrative
 * caption or pill (removed 2026-11-17 by owner decision).
 */
export function MockFrame({
  title,
  label,
  children,
  className = "",
  bodyClassName = "p-4 sm:p-5",
}: {
  title: string;
  label: string;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <figure className={`m-0 min-w-0 ${className}`}>
      <div role="img" aria-label={label} className="overflow-hidden rounded-[1.25rem] border border-border bg-white shadow-lift ring-1 ring-charcoal/5 transition-shadow duration-300 hover:shadow-hero">
        <div aria-hidden="true" className="flex items-center gap-1.5 border-b border-border bg-linear-to-b from-white to-surface px-3 py-2 sm:px-4 sm:py-2.5">
          <span className="size-2 rounded-full bg-danger/70 sm:size-2.5" />
          <span className="size-2 rounded-full bg-gold/70 sm:size-2.5" />
          <span className="size-2 rounded-full bg-primary/70 sm:size-2.5" />
          <span className="ml-2 truncate text-[11px] font-semibold tracking-[0.02em] text-muted sm:ml-3 sm:text-xs">{title}</span>
        </div>
        <div aria-hidden="true" className={bodyClassName}>
          {children}
        </div>
      </div>
    </figure>
  );
}
