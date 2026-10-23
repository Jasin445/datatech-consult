/**
 * Fixed-window, in-memory rate limiter.
 *
 * LIMITATION (documented in IMPLEMENTATION_PLAN.md): state lives in one server process. On serverless or
 * multi-instance hosting each instance counts separately, so this only slows casual abuse. For stronger
 * protection use a shared store or the host's/edge firewall rate limiting. No database is added by design.
 */
export type RateLimiter = { check(key: string): { allowed: boolean; retryAfterSeconds: number } };

export function createRateLimiter(options: { limit: number; windowMs: number; now?: () => number; maxKeys?: number }): RateLimiter {
  const { limit, windowMs, now = Date.now, maxKeys = 5000 } = options;
  const hits = new Map<string, { count: number; resetAt: number }>();

  return {
    check(key) {
      const t = now();
      if (hits.size >= maxKeys) {
        for (const [k, v] of hits) if (v.resetAt <= t) hits.delete(k);
        if (hits.size >= maxKeys) hits.clear(); // bounded memory: fail open rather than grow without limit
      }
      const entry = hits.get(key);
      if (!entry || entry.resetAt <= t) {
        hits.set(key, { count: 1, resetAt: t + windowMs });
        return { allowed: true, retryAfterSeconds: 0 };
      }
      entry.count += 1;
      if (entry.count > limit) return { allowed: false, retryAfterSeconds: Math.max(1, Math.ceil((entry.resetAt - t) / 1000)) };
      return { allowed: true, retryAfterSeconds: 0 };
    },
  };
}
