import type { ReactNode } from "react";
import { isProduction } from "@/lib/content/status";

/** Visible only outside production. Use for dummy-content and unconfigured-integration warnings. */
export function DevNotice({ children }: { children: ReactNode }) {
  if (isProduction()) return null;
  return (
    <p className="dev-notice" role="note">
      {children}
    </p>
  );
}
