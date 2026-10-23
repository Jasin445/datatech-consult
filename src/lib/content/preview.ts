/**
 * OWNER DECISION (2026-10-24): show the sample (status "dummy") case studies and Insights articles in production,
 * each with a visible "sample content" notice, so the sections can be reviewed on the live site.
 *
 * Applies only to case studies and Insights; leadership and credibility evidence stay development-only.
 * Sample items are never indexed, never in the sitemap and never in structured data, whatever this flag says.
 * Set to false before launch (RELEASE_CHECKLIST.md), or once real approved items exist.
 */
export const SHOW_SAMPLE_CONTENT_IN_PRODUCTION = true;
