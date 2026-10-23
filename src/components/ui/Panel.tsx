import type { ReactNode } from "react";

/** White "report page" panel with a folded top-right corner, for forms and booking. Set `tone` to the section background. */
export function Panel({ children, tone = "surface", compact = false, className = "" }: { children: ReactNode; tone?: "surface" | "white"; compact?: boolean; className?: string }) {
  const fold =
    tone === "surface"
      ? "bg-[linear-gradient(to_bottom_left,var(--color-surface)_50%,var(--color-border)_50%)]"
      : "bg-[linear-gradient(to_bottom_left,var(--color-bg)_50%,var(--color-border)_50%)]";
  return (
    <div className={`relative border border-border bg-white shadow-[0_30px_60px_-30px_rgb(23_43_58/30%)] ${compact ? "p-6 sm:p-8" : "p-6 sm:p-10 lg:p-12"} ${className}`}>
      <span aria-hidden="true" className={`pointer-events-none absolute -top-px -right-px size-14 lg:size-18 ${fold}`} />
      {children}
    </div>
  );
}
