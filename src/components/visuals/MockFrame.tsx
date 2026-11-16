import type { ReactNode } from "react";
import { Mark } from "@/components/ui/Mark";

/** Every mock visual carries this caption (tests/visuals.test.ts enforces it). */
export const ILLUSTRATIVE_CAPTION = "Illustrative example, not client data";

/**
 * App-window frame for coded product mockups. The whole mock is exposed to assistive technology as one
 * image with a text description (`label`); its internals are hidden. The visible caption states that the
 * content is illustrative, so a mock is never mistaken for real client work or results.
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
      <div role="img" aria-label={label} className="overflow-hidden rounded-[1.25rem] border border-border bg-white shadow-lift transition-shadow duration-300 hover:shadow-hero">
        <div aria-hidden="true" className="flex items-center gap-1.5 border-b border-border bg-surface px-4 py-2.5">
          <span className="size-2.5 rounded-full bg-border" />
          <span className="size-2.5 rounded-full bg-border" />
          <span className="size-2.5 rounded-full bg-border" />
          <span className="ml-3 truncate text-xs font-medium text-muted">{title}</span>
        </div>
        <div aria-hidden="true" className={bodyClassName}>
          {children}
        </div>
      </div>
      <figcaption className="mt-3 flex items-center gap-2 text-xs text-muted">
        <Mark variant="bullet" className="size-2.5 shrink-0 text-gold" />
        {ILLUSTRATIVE_CAPTION}
      </figcaption>
    </figure>
  );
}
