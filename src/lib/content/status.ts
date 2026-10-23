/**
 * Content governance.
 * - dummy: fictional development data (never public)
 * - draft: awaiting approval (never public)
 * - approved: verified and authorised for publication
 * Adding an item to a source file never makes it approved; the status must be set explicitly.
 */
export type ContentStatus = "dummy" | "draft" | "approved";

export type ManagedContent<T> = {
  status: ContentStatus;
  data: T;
};

export const DUMMY_MARKER = "DUMMY DATA — REPLACE BEFORE LAUNCH";

const VALID_STATUSES: readonly ContentStatus[] = ["dummy", "draft", "approved"];

export function isContentStatus(value: unknown): value is ContentStatus {
  return typeof value === "string" && (VALID_STATUSES as readonly string[]).includes(value);
}

export function isProduction(): boolean {
  return process.env.NODE_ENV === "production";
}

/**
 * Production shows approved content only, unless `allowSample` is set, in which case "dummy" samples are shown too
 * (with a visible notice; see src/lib/content/preview.ts). Drafts never appear in production.
 * Development shows everything (with warnings).
 */
export function isPublishable(status: ContentStatus, production: boolean = isProduction(), allowSample = false): boolean {
  if (!production) return true;
  return status === "approved" || (allowSample && status === "dummy");
}

export function filterPublishable<T>(
  items: readonly ManagedContent<T>[],
  production: boolean = isProduction(),
  allowSample = false,
): ManagedContent<T>[] {
  return items.filter((item) => isPublishable(item.status, production, allowSample));
}

/** Items that must never be indexed or placed in the sitemap, in any environment. */
export function isIndexable(status: ContentStatus): boolean {
  return status === "approved";
}

export type ContentViolation = { id: string; message: string };

/** Detects invalid or missing status values. `registry` maps an item id to its raw (untrusted) status. */
export function findStatusViolations(registry: Record<string, unknown>): ContentViolation[] {
  const violations: ContentViolation[] = [];
  for (const [id, status] of Object.entries(registry)) {
    if (!isContentStatus(status)) {
      violations.push({
        id,
        message: `Content item "${id}" has a missing or invalid status (${String(status)}). Use "dummy", "draft" or "approved".`,
      });
    }
  }
  return violations;
}

export type ValidatableItem = { id: string; status: unknown; text: string };

/**
 * Critical content checks, run wherever a registry is read (so also during `next build`):
 *  - status missing or invalid
 *  - an "approved" item that still contains the placeholder marker (an unapproved claim scheduled for public output)
 */
export function validateManagedItems(items: readonly ValidatableItem[]): ContentViolation[] {
  const violations = findStatusViolations(Object.fromEntries(items.map((i) => [i.id, i.status])));
  for (const item of items) {
    if (item.status === "approved" && item.text.includes(DUMMY_MARKER)) {
      violations.push({
        id: item.id,
        message: `Content item "${item.id}" is marked "approved" but still contains the placeholder "${DUMMY_MARKER}". Replace the placeholder text or change its status.`,
      });
    }
  }
  return violations;
}

/** Throws with actionable messages so a build cannot ship a critical content violation. */
export function assertContentValid(violations: readonly ContentViolation[]): void {
  if (violations.length === 0) return;
  throw new Error(`Content validation failed:\n${violations.map((v) => `- ${v.message}`).join("\n")}`);
}
