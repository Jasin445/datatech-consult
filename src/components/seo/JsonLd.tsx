/**
 * Structured data. Only verified facts: never add addresses, ratings, awards, social profiles or
 * other business details unless they are confirmed (see src/lib/seo/structured-data.ts).
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  // Escape "<" so content can never close the script element.
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
