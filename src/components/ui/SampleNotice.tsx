import type { ReactNode } from "react";

/**
 * Visible in every environment: tells visitors that the content around it is a fictional sample.
 * Used for sample case studies and Insights shown on the live site (src/lib/content/preview.ts).
 */
export function SampleNotice({ children }: { children: ReactNode }) {
  return (
    <p role="note" className="flex items-start gap-3 rounded-sm border-2 border-dashed border-warning-text bg-warning-bg px-4 py-3 text-sm text-warning-text">
      <span>
        <strong className="font-semibold">Sample content.</strong> {children}
      </span>
    </p>
  );
}

/** Badge text for non-approved items, as visitors see it. */
export function statusLabel(status: "dummy" | "draft" | "approved"): string {
  return status === "dummy" ? "Sample" : status === "draft" ? "Draft" : "";
}
