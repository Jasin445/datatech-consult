import type { ReactNode } from "react";

/**
 * Re-mounts on every navigation (unlike layout.tsx), so each page's content gets the brief slide-up entrance.
 * The header and footer live in the layout and stay still. Disabled by the reduced-motion rule in globals.css.
 */
export default function Template({ children }: { children: ReactNode }) {
  return <div className="animate-page-in">{children}</div>;
}
