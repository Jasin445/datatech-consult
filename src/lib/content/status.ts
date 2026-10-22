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

/** Production shows approved content only. Development also shows dummy/draft (with warnings). */
export function isPublishable(status: ContentStatus, production: boolean = isProduction()): boolean {
  return production ? status === "approved" : true;
}

export function filterPublishable<T>(
  items: readonly ManagedContent<T>[],
  production: boolean = isProduction(),
): ManagedContent<T>[] {
  return items.filter((item) => isPublishable(item.status, production));
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
