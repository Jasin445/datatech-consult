import { getContactAvailability } from "@/lib/contact/availability";
import { handleEnquiry, MAX_BODY_BYTES } from "@/lib/contact/handle";
import { createRateLimiter } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// 5 enquiries per client per 10 minutes. In-memory: see src/lib/rate-limit.ts for limits on multi-instance hosting.
const limiter = createRateLimiter({ limit: 5, windowMs: 10 * 60 * 1000 });

function clientKey(request: Request): string {
  // x-forwarded-for is only trustworthy behind a proxy you control (most hosts set it). First entry = original client.
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || request.headers.get("x-real-ip")?.trim() || "unknown";
}

export async function POST(request: Request) {
  const availability = getContactAvailability();
  // Operator-facing reason (variable names or the privacy gate only, never values or visitor data).
  if (!availability.available) console.warn(`[contact] unavailable: ${availability.devDetail}`);

  // Cap the body before reading it fully when the client declares a length.
  const declared = Number(request.headers.get("content-length") ?? "0");
  if (declared > MAX_BODY_BYTES) return Response.json({ ok: false, code: "too_large" }, { status: 413 });

  let rawBody = "";
  try {
    rawBody = await request.text();
  } catch {
    return Response.json({ ok: false, code: "invalid_json" }, { status: 400 });
  }

  const result = await handleEnquiry(
    { contentType: request.headers.get("content-type"), rawBody, clientKey: clientKey(request) },
    {
      provider: availability.available ? availability.provider : null,
      addresses: availability.available ? availability.addresses : null,
      limiter,
      log: (event, details) => console.info("[contact]", event, details ?? {}),
    },
  );

  const headers: Record<string, string> = { "Cache-Control": "no-store" };
  if (result.status === 429) headers["Retry-After"] = String(result.retryAfterSeconds);
  return Response.json(result.body, { status: result.status, headers });
}

export function GET() {
  return Response.json({ ok: false, code: "method_not_allowed" }, { status: 405, headers: { Allow: "POST" } });
}
