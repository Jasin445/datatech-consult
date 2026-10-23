"use client";

import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/Ornament";
import { fieldClass, fieldErrorClass, hintClass, labelClass } from "@/components/ui/styles";
import {
  emptyEnquiry,
  ENQUIRY_LIMITS,
  ORGANIZATION_TYPES,
  SERVICE_INTERESTS,
  validateEnquiry,
  type EnquiryErrors,
  type EnquiryField,
  type EnquiryValues,
} from "@/lib/validation/enquiry";

type Phase = "idle" | "submitting" | "success" | "error";

const fieldOrder: EnquiryField[] = ["name", "email", "organization", "organizationType", "serviceInterest", "message"];
const scrollClass = "scroll-mt-[calc(var(--header-height)+1rem)]";

const serverMessages: Record<string, string> = {
  rate_limited: "You have sent several enquiries recently. Please wait a few minutes and try again.",
  not_configured: "Our enquiry form is temporarily unavailable. Please try the booking page or email us directly.",
  send_failed: "We could not send your enquiry just now. Your details are still in the form; please try again shortly.",
  too_large: "Your message is too large. Please shorten it and try again.",
};

/**
 * Enquiry form. Client validation is for early feedback only; the server validates again and is authoritative.
 * Only rendered when email is configured (see the contact page), so it never implies a send that cannot happen.
 * Input is preserved on every recoverable error.
 */
export function ContactForm() {
  const [values, setValues] = useState<EnquiryValues>(emptyEnquiry);
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [phase, setPhase] = useState<Phase>("idle");
  const [serverError, setServerError] = useState("");
  const summaryRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  function update(field: EnquiryField, value: string) {
    setValues((v) => ({ ...v, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (phase === "submitting") return;
    setServerError("");

    const check = validateEnquiry({ ...values, website: honeypot });
    if (!check.ok) {
      setErrors(check.errors);
      setPhase("error");
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    setErrors({});
    setPhase("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website: honeypot }),
      });
      const data = (await response.json().catch(() => null)) as { ok?: boolean; code?: string; errors?: EnquiryErrors } | null;
      if (response.ok && data?.ok) {
        setValues(emptyEnquiry);
        setPhase("success");
        requestAnimationFrame(() => statusRef.current?.focus());
        return;
      }
      if (data?.code === "invalid_input" && data.errors) {
        setErrors(data.errors);
        setPhase("error");
        requestAnimationFrame(() => summaryRef.current?.focus());
        return;
      }
      setServerError(serverMessages[data?.code ?? ""] ?? "Something went wrong. Your details are still in the form; please try again.");
    } catch {
      setServerError("We could not reach the server. Check your connection; your details are still in the form.");
    }
    setPhase("error");
    requestAnimationFrame(() => statusRef.current?.focus());
  }

  if (phase === "success") {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className={`border-l-4 border-gold bg-surface p-6 outline-offset-4 ${scrollClass}`}>
        <h2 className="text-xl">Thank you. Your enquiry has been submitted.</h2>
        <p>
          We will respond to the email address you gave. If you do not hear from us within a few working days, please check your spam folder or{" "}
          <Link href="/book-consultation">book a consultation</Link>.
        </p>
        <Button variant="secondary" onClick={() => setPhase("idle")}>
          Send another enquiry
        </Button>
      </div>
    );
  }

  const errorList = fieldOrder.filter((f) => errors[f]);
  const describe = (f: EnquiryField, hint = false) => [hint ? `${f}-hint` : "", errors[f] ? `${f}-error` : ""].filter(Boolean).join(" ") || undefined;

  return (
    <form onSubmit={onSubmit} noValidate aria-describedby={errorList.length ? "form-errors" : undefined} className="flex flex-col gap-6">
      <div ref={statusRef} tabIndex={-1} role="alert" className={`outline-offset-4 ${scrollClass}`}>
        {serverError ? <p className="mb-0 border-2 border-danger bg-white p-4 font-semibold text-danger">{serverError}</p> : null}
      </div>

      {errorList.length > 0 && (
        <div ref={summaryRef} tabIndex={-1} id="form-errors" role="alert" className={`border-2 border-danger bg-white p-4 outline-offset-4 ${scrollClass}`}>
          <h2 className="mb-2 font-sans text-lg font-semibold text-danger">Please fix {errorList.length === 1 ? "this field" : "these fields"}</h2>
          <ul className="mb-0 list-disc pl-5">
            {errorList.map((f) => (
              <li key={f}>
                <a href={`#${f}`}>{errors[f]}</a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <label htmlFor="name" className={labelClass}>Your name <span className="text-danger" aria-hidden="true">*</span><span className="sr-only">(required)</span></label>
        <input id="name" name="name" type="text" autoComplete="name" required maxLength={ENQUIRY_LIMITS.name.max} className={`${fieldClass} ${scrollClass}`} value={values.name} onChange={(e) => update("name", e.target.value)} aria-invalid={errors.name ? true : undefined} aria-describedby={describe("name")} />
        {errors.name && <p id="name-error" className={fieldErrorClass}>{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>Business email <span className="text-danger" aria-hidden="true">*</span><span className="sr-only">(required)</span></label>
        <p id="email-hint" className={hintClass}>We will reply to this address.</p>
        <input id="email" name="email" type="email" autoComplete="email" required maxLength={ENQUIRY_LIMITS.email.max} className={`${fieldClass} ${scrollClass}`} value={values.email} onChange={(e) => update("email", e.target.value)} aria-invalid={errors.email ? true : undefined} aria-describedby={describe("email", true)} />
        {errors.email && <p id="email-error" className={fieldErrorClass}>{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="organization" className={labelClass}>Organisation name <span className="font-normal text-muted">(optional)</span></label>
        <input id="organization" name="organization" type="text" autoComplete="organization" maxLength={ENQUIRY_LIMITS.organization.max} className={`${fieldClass} ${scrollClass}`} value={values.organization} onChange={(e) => update("organization", e.target.value)} aria-invalid={errors.organization ? true : undefined} aria-describedby={describe("organization")} />
        {errors.organization && <p id="organization-error" className={fieldErrorClass}>{errors.organization}</p>}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="organizationType" className={labelClass}>Organisation type <span className="font-normal text-muted">(optional)</span></label>
          <select id="organizationType" name="organizationType" className={`${fieldClass} ${scrollClass}`} value={values.organizationType} onChange={(e) => update("organizationType", e.target.value)} aria-invalid={errors.organizationType ? true : undefined} aria-describedby={describe("organizationType")}>
            <option value="">Select a type</option>
            {ORGANIZATION_TYPES.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          {errors.organizationType && <p id="organizationType-error" className={fieldErrorClass}>{errors.organizationType}</p>}
        </div>
        <div>
          <label htmlFor="serviceInterest" className={labelClass}>Service of interest <span className="font-normal text-muted">(optional)</span></label>
          <select id="serviceInterest" name="serviceInterest" className={`${fieldClass} ${scrollClass}`} value={values.serviceInterest} onChange={(e) => update("serviceInterest", e.target.value)} aria-invalid={errors.serviceInterest ? true : undefined} aria-describedby={describe("serviceInterest")}>
            <option value="">Select a service</option>
            {SERVICE_INTERESTS.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
          {errors.serviceInterest && <p id="serviceInterest-error" className={fieldErrorClass}>{errors.serviceInterest}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>The business challenge <span className="text-danger" aria-hidden="true">*</span><span className="sr-only">(required)</span></label>
        <p id="message-hint" className={hintClass}>Describe what you are trying to solve. Please do not include passwords or sensitive personal data.</p>
        <textarea id="message" name="message" rows={7} required maxLength={ENQUIRY_LIMITS.message.max} className={`${fieldClass} ${scrollClass}`} value={values.message} onChange={(e) => update("message", e.target.value)} aria-invalid={errors.message ? true : undefined} aria-describedby={describe("message", true)} />
        {errors.message && <p id="message-error" className={fieldErrorClass}>{errors.message}</p>}
      </div>

      {/* Honeypot: hidden from people and assistive technology; bots tend to fill it. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
      </div>

      <div>
        <Button type="submit" className="w-full sm:w-auto" disabled={phase === "submitting"} aria-disabled={phase === "submitting"}>
          {phase === "submitting" ? "Sending…" : "Send enquiry"}
          <ArrowRight />
        </Button>
        <p className="mt-3 mb-0 text-sm text-muted">
          We use your details only to respond to your enquiry. See our <Link href="/privacy">privacy notice</Link>.
        </p>
      </div>
    </form>
  );
}
