import type { ReactNode } from "react";
import { isProduction } from "@/lib/content/status";

/** Visible only outside production. Use for dummy-content and unconfigured-integration warnings. */
export function DevNotice({ children }: { children: ReactNode }) {
  if (isProduction()) return null;
  return (
    <p
      className="rounded-sm border-2 border-dashed border-warning-text bg-warning-bg px-4 py-3 text-sm font-semibold text-warning-text"
      role="note"
    >
      {children}
    </p>
  );
}
