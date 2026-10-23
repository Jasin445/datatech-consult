/** Line icons for the four services (decorative; colour follows currentColor). */
export function ServiceIcon({ slug, className = "size-6" }: { slug: string; className?: string }) {
  const common = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const paths: Record<string, React.ReactNode> = {
    "data-analytics": (
      <>
        <path d="M4 20V10M10 20V6M16 20v-8M22 20H2" />
        <path d="M4 7l6-3 6 5 5-4" />
      </>
    ),
    "data-infrastructure": (
      <>
        <ellipse cx="12" cy="5" rx="7" ry="2.5" />
        <path d="M5 5v6c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V5M5 11v6c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-6" />
      </>
    ),
    "ai-automation": (
      <>
        <path d="M12 3l1.6 3.9L17.5 8.5l-3.9 1.6L12 14l-1.6-3.9L6.5 8.5l3.9-1.6z" />
        <path d="M5 16h4l2 3h8" />
        <circle cx="19" cy="19" r="1.5" />
      </>
    ),
    "business-technology-consulting": (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M15.5 8.5l-2 5-5 2 2-5z" />
      </>
    ),
  };
  return (
    <svg aria-hidden="true" focusable="false" className={className} {...common}>
      {paths[slug]}
    </svg>
  );
}
