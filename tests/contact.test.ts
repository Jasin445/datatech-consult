import { describe, expect, it } from "vitest";
import { composeEnquiryEmail } from "@/lib/contact/compose";
import { handleEnquiry, MAX_BODY_BYTES, type EnquiryDeps } from "@/lib/contact/handle";
import { createResendProvider } from "@/lib/email/resend";
import { createEmailProvider } from "@/lib/email";
import type { EmailMessage, EmailProvider, SendResult } from "@/lib/email/types";
import { createRateLimiter } from "@/lib/rate-limit";
import { validateEnquiry } from "@/lib/validation/enquiry";

const valid = {
  name: "  Ada   Okafor ",
  email: "ada@example.com",
  message: "We spend two days each month building reports by hand and want to automate it.",
};

function fakeProvider(result: SendResult = { ok: true, id: "x" }) {
  const sent: EmailMessage[] = [];
  const provider: EmailProvider = {
    name: "fake",
    async send(m) {
      sent.push(m);
      return result;
    },
  };
  return { provider, sent };
}

function deps(over: Partial<EnquiryDeps> = {}): { d: EnquiryDeps; logs: string[]; sent: EmailMessage[] } {
  const { provider, sent } = fakeProvider();
  const logs: string[] = [];
  const d: EnquiryDeps = {
    provider,
    addresses: { from: "from@example.com", to: "to@example.com" },
    limiter: createRateLimiter({ limit: 100, windowMs: 1000 }),
    log: (e) => logs.push(e),
    ...over,
  };
  return { d, logs, sent };
}

const req = (body: unknown, extra: Partial<{ contentType: string | null; clientKey: string }> = {}) => ({
  contentType: "application/json",
  clientKey: "1.1.1.1",
  rawBody: typeof body === "string" ? body : JSON.stringify(body),
  ...extra,
});

describe("validateEnquiry", () => {
  it("accepts the required fields and normalises whitespace", () => {
    const r = validateEnquiry(valid);
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.values.name).toBe("Ada Okafor");
      expect(r.spam).toBe(false);
    }
  });
  it("requires name, email and message", () => {
    const r = validateEnquiry({});
    expect(r.ok).toBe(false);
    if (!r.ok) {
      expect(Object.keys(r.errors).sort()).toEqual(["email", "message", "name"]);
    }
  });
  it("rejects malformed emails", () => {
    for (const email of ["nope", "a@b", "a b@c.com", "a@@c.com", "a@c..com", "<x>@c.com"]) {
      const r = validateEnquiry({ ...valid, email });
      expect(r.ok).toBe(false);
    }
  });
  it("enforces limits", () => {
    expect(validateEnquiry({ ...valid, message: "short" }).ok).toBe(false);
    expect(validateEnquiry({ ...valid, message: "x".repeat(3001) }).ok).toBe(false);
    expect(validateEnquiry({ ...valid, name: "n".repeat(101) }).ok).toBe(false);
    expect(validateEnquiry({ ...valid, organization: "o".repeat(121) }).ok).toBe(false);
  });
  it("rejects unknown option values and non-string input", () => {
    expect(validateEnquiry({ ...valid, serviceInterest: "hack" }).ok).toBe(false);
    expect(validateEnquiry({ ...valid, organizationType: "hack" }).ok).toBe(false);
    expect(validateEnquiry({ ...valid, name: { a: 1 } }).ok).toBe(false);
    expect(validateEnquiry(null).ok).toBe(false);
  });
  it("accepts optional fields including Not sure yet", () => {
    const r = validateEnquiry({ ...valid, organization: "Acme", organizationType: "sme", serviceInterest: "not-sure" });
    expect(r.ok).toBe(true);
  });
  it("strips line breaks from single-line fields (header injection)", () => {
    const r = validateEnquiry({ ...valid, name: "Ada\r\nBcc: evil@x.com" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.values.name).toBe("Ada Bcc: evil@x.com");
  });
  it("flags the honeypot", () => {
    const r = validateEnquiry({ ...valid, website: "http://spam" });
    expect(r.ok && r.spam).toBe(true);
  });
});

describe("composeEnquiryEmail", () => {
  it("builds plain text with reply-to and no extra headers", () => {
    const r = validateEnquiry({ ...valid, serviceInterest: "ai-automation" });
    if (!r.ok) throw new Error("invalid");
    const m = composeEnquiryEmail(r.values, { from: "a@b.com", to: "c@d.com" });
    expect(m.replyTo).toBe("ada@example.com");
    expect(m.subject).toBe("Website enquiry from Ada Okafor");
    expect(m.text).toContain("AI & Automation");
    expect(m.subject.includes("\n")).toBe(false);
  });
});

describe("handleEnquiry", () => {
  it("sends and returns success only after provider acknowledgement", async () => {
    const { d, sent } = deps();
    const r = await handleEnquiry(req(valid), d);
    expect(r.status).toBe(200);
    expect(sent).toHaveLength(1);
  });
  it("returns 503 and never succeeds when email is not configured", async () => {
    const r = await handleEnquiry(req(valid), deps({ provider: null, addresses: null }).d);
    expect(r.status).toBe(503);
  });
  it("returns 502 (not success) when the provider fails, without leaking details", async () => {
    const { provider } = fakeProvider({ ok: false, reason: "rejected", status: 401 });
    const { d, logs } = deps({ provider });
    const r = await handleEnquiry(req(valid), d);
    expect(r.status).toBe(502);
    expect(JSON.stringify(r.body)).not.toContain("401");
    expect(logs).toContain("send_failed");
  });
  it("returns 400 with field errors for invalid input and sends nothing", async () => {
    const { d, sent } = deps();
    const r = await handleEnquiry(req({ ...valid, email: "bad" }), d);
    expect(r.status).toBe(400);
    expect(sent).toHaveLength(0);
  });
  it("rejects bad JSON, wrong content type and oversize bodies", async () => {
    expect((await handleEnquiry(req("{nope"), deps().d)).status).toBe(400);
    expect((await handleEnquiry(req(valid, { contentType: "text/plain" }), deps().d)).status).toBe(415);
    expect((await handleEnquiry(req("x".repeat(MAX_BODY_BYTES + 1)), deps().d)).status).toBe(413);
  });
  it("rate limits repeated submissions per client", async () => {
    const limiter = createRateLimiter({ limit: 2, windowMs: 60_000 });
    const { d } = deps({ limiter });
    expect((await handleEnquiry(req(valid), d)).status).toBe(200);
    expect((await handleEnquiry(req(valid), d)).status).toBe(200);
    const third = await handleEnquiry(req(valid), d);
    expect(third.status).toBe(429);
    expect((await handleEnquiry(req(valid, { clientKey: "2.2.2.2" }), d)).status).toBe(200);
  });
  it("silently drops honeypot submissions without sending", async () => {
    const { d, sent } = deps();
    const r = await handleEnquiry(req({ ...valid, website: "x" }), d);
    expect(r.status).toBe(200);
    expect(sent).toHaveLength(0);
  });
  it("never logs personal information", async () => {
    const { d, logs } = deps();
    await handleEnquiry(req(valid), d);
    expect(logs.join(" ")).not.toContain("ada@example.com");
  });
});

describe("rate limiter window", () => {
  it("resets after the window", () => {
    let t = 0;
    const l = createRateLimiter({ limit: 1, windowMs: 1000, now: () => t });
    expect(l.check("a").allowed).toBe(true);
    expect(l.check("a").allowed).toBe(false);
    t = 1001;
    expect(l.check("a").allowed).toBe(true);
  });
});

describe("email providers", () => {
  const msg: EmailMessage = { from: "a@b.com", to: "c@d.com", subject: "s", text: "t" };
  it("resend adapter reports acknowledgement, rejection, network error and timeout", async () => {
    const ok = createResendProvider("k", { fetchImpl: (async () => new Response(JSON.stringify({ id: "1" }), { status: 200 })) as typeof fetch });
    expect((await ok.send(msg)).ok).toBe(true);
    const bad = createResendProvider("k", { fetchImpl: (async () => new Response("no", { status: 403 })) as typeof fetch });
    const b = await bad.send(msg);
    expect(b.ok).toBe(false);
    const net = createResendProvider("k", { fetchImpl: (async () => { throw new Error("down"); }) as typeof fetch });
    const n = await net.send(msg);
    expect(!n.ok && n.reason).toBe("network");
    const slow = createResendProvider("k", {
      timeoutMs: 10,
      fetchImpl: ((_u: unknown, init?: RequestInit) =>
        new Promise((_res, rej) => init?.signal?.addEventListener("abort", () => rej(Object.assign(new Error("a"), { name: "AbortError" }))))) as typeof fetch,
    });
    const s = await slow.send(msg);
    expect(!s.ok && s.reason).toBe("timeout");
  });
  it("unknown providers are not created", () => {
    expect(createEmailProvider("mystery", "k")).toBeNull();
    expect(createEmailProvider("Resend", "k")?.name).toBe("resend");
  });
});
