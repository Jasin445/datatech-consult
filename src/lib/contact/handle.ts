import { composeEnquiryEmail } from "./compose";
import type { EmailProvider } from "@/lib/email/types";
import type { RateLimiter } from "@/lib/rate-limit";
import { validateEnquiry, type EnquiryErrors } from "@/lib/validation/enquiry";

export const MAX_BODY_BYTES = 20_000;

export type EnquiryResponse =
  | { status: 200; body: { ok: true } }
  | { status: 400; body: { ok: false; code: "invalid_json" | "invalid_input"; errors?: EnquiryErrors } }
  | { status: 413; body: { ok: false; code: "too_large" } }
  | { status: 415; body: { ok: false; code: "unsupported_type" } }
  | { status: 429; body: { ok: false; code: "rate_limited" }; retryAfterSeconds: number }
  | { status: 502; body: { ok: false; code: "send_failed" } }
  | { status: 503; body: { ok: false; code: "not_configured" } };

export type EnquiryDeps = {
  /** null when email is not (fully) configured or the provider is unsupported. */
  provider: EmailProvider | null;
  addresses: { from: string; to: string } | null;
  limiter: RateLimiter;
  log: (event: string, details?: Record<string, string | number>) => void;
};

/**
 * Orchestrates one enquiry. Framework-free for testing; the route handler only wires it.
 * Order matters: configuration -> content type/size -> rate limit -> parse -> validate -> honeypot -> send.
 * Success is returned ONLY when the provider acknowledged the request.
 * Logs never contain names, emails or message text.
 */
export async function handleEnquiry(
  request: { contentType: string | null; rawBody: string; clientKey: string },
  deps: EnquiryDeps,
): Promise<EnquiryResponse> {
  if (!deps.provider || !deps.addresses) {
    deps.log("not_configured");
    return { status: 503, body: { ok: false, code: "not_configured" } };
  }
  if (!request.contentType?.toLowerCase().startsWith("application/json"))
    return { status: 415, body: { ok: false, code: "unsupported_type" } };
  if (new TextEncoder().encode(request.rawBody).length > MAX_BODY_BYTES)
    return { status: 413, body: { ok: false, code: "too_large" } };

  const limit = deps.limiter.check(request.clientKey);
  if (!limit.allowed) {
    deps.log("rate_limited");
    return { status: 429, body: { ok: false, code: "rate_limited" }, retryAfterSeconds: limit.retryAfterSeconds };
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(request.rawBody);
  } catch {
    return { status: 400, body: { ok: false, code: "invalid_json" } };
  }

  const result = validateEnquiry(parsed);
  if (!result.ok) return { status: 400, body: { ok: false, code: "invalid_input", errors: result.errors } };

  if (result.spam) {
    // Honeypot filled: report success to the bot but send nothing.
    deps.log("honeypot");
    return { status: 200, body: { ok: true } };
  }

  const sent = await deps.provider.send(composeEnquiryEmail(result.values, deps.addresses));
  if (!sent.ok) {
    deps.log("send_failed", { provider: deps.provider.name, reason: sent.reason, ...(sent.status ? { status: sent.status } : {}) });
    return { status: 502, body: { ok: false, code: "send_failed" } };
  }
  deps.log("sent", { provider: deps.provider.name });
  return { status: 200, body: { ok: true } };
}
