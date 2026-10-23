import type { EmailMessage, EmailProvider, SendResult } from "./types";

const ENDPOINT = "https://api.resend.com/emails";

/** Resend adapter. Uses fetch only (no SDK dependency). The API key never leaves the server. */
export function createResendProvider(apiKey: string, options: { fetchImpl?: typeof fetch; timeoutMs?: number } = {}): EmailProvider {
  const { fetchImpl = fetch, timeoutMs = 10_000 } = options;
  return {
    name: "resend",
    async send(message: EmailMessage): Promise<SendResult> {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), timeoutMs);
      try {
        const response = await fetchImpl(ENDPOINT, {
          method: "POST",
          headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            from: message.from,
            to: [message.to],
            reply_to: message.replyTo,
            subject: message.subject,
            text: message.text,
          }),
          signal: controller.signal,
        });
        if (!response.ok) return { ok: false, reason: "rejected", status: response.status };
        const data = (await response.json().catch(() => null)) as { id?: unknown } | null;
        return { ok: true, id: typeof data?.id === "string" ? data.id : undefined };
      } catch (error) {
        const aborted = error instanceof Error && error.name === "AbortError";
        return { ok: false, reason: aborted ? "timeout" : "network" };
      } finally {
        clearTimeout(timer);
      }
    },
  };
}
