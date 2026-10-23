import { services } from "@/content/services";

/**
 * Enquiry validation and normalisation. Dependency-free and framework-free so the same rules run
 * on the client (for early feedback) and, authoritatively, on the server. Never trust the client result.
 */

export const ENQUIRY_LIMITS = {
  name: { min: 2, max: 100 },
  email: { max: 254 },
  message: { min: 20, max: 3000 },
  organization: { max: 120 },
} as const;

export const ORGANIZATION_TYPES = [
  { value: "sme", label: "SME or growing business" },
  { value: "established", label: "Established company" },
  { value: "ngo", label: "NGO or development organisation" },
  { value: "institution", label: "Institution" },
  { value: "other", label: "Other" },
] as const;

export const SERVICE_INTERESTS = [
  ...services.map((s) => ({ value: s.slug, label: s.title })),
  { value: "not-sure", label: "Not sure yet" },
] as const;

export type EnquiryField = "name" | "email" | "message" | "organization" | "organizationType" | "serviceInterest";

export type EnquiryValues = {
  name: string;
  email: string;
  message: string;
  organization: string;
  organizationType: string;
  serviceInterest: string;
};

export type EnquiryErrors = Partial<Record<EnquiryField, string>>;

export type EnquiryResult =
  | { ok: true; values: EnquiryValues; spam: boolean }
  | { ok: false; values: EnquiryValues; errors: EnquiryErrors };

export const emptyEnquiry: EnquiryValues = {
  name: "",
  email: "",
  message: "",
  organization: "",
  organizationType: "",
  serviceInterest: "",
};

// Control characters other than tab and newline (kept in the message only).
const CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;
const EMAIL_PATTERN = /^[^\s@<>(),;:"[\]\\]+@[^\s@<>(),;:"[\]\\]+\.[^\s@<>(),;:"[\]\\]{2,}$/;

function asString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

/** Single-line text: strip control characters, collapse whitespace, trim. Also removes line breaks (header safety). */
export function cleanLine(value: unknown): string {
  return asString(value).normalize("NFC").replace(CONTROL_CHARS, "").replace(/\s+/g, " ").trim();
}

/** Multi-line text: unify line endings, strip control characters, trim, limit blank lines. */
export function cleanText(value: unknown): string {
  return asString(value)
    .normalize("NFC")
    .replace(/\r\n?/g, "\n")
    .replace(CONTROL_CHARS, "")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function isValidEmail(value: string): boolean {
  return value.length <= ENQUIRY_LIMITS.email.max && EMAIL_PATTERN.test(value) && !value.includes("..");
}

const organizationTypeValues: readonly string[] = ORGANIZATION_TYPES.map((o) => o.value);
const serviceInterestValues: readonly string[] = SERVICE_INTERESTS.map((s) => s.value);

/** Normalise untrusted input and validate it. `website` is a honeypot: humans never see or fill it. */
export function validateEnquiry(input: unknown): EnquiryResult {
  const raw = (typeof input === "object" && input !== null ? input : {}) as Record<string, unknown>;

  const values: EnquiryValues = {
    name: cleanLine(raw.name),
    email: cleanLine(raw.email),
    message: cleanText(raw.message),
    organization: cleanLine(raw.organization),
    organizationType: cleanLine(raw.organizationType),
    serviceInterest: cleanLine(raw.serviceInterest),
  };
  const errors: EnquiryErrors = {};

  if (!values.name) errors.name = "Enter your name.";
  else if (values.name.length < ENQUIRY_LIMITS.name.min) errors.name = "Enter your full name.";
  else if (values.name.length > ENQUIRY_LIMITS.name.max) errors.name = `Keep your name under ${ENQUIRY_LIMITS.name.max} characters.`;

  if (!values.email) errors.email = "Enter your business email address.";
  else if (!isValidEmail(values.email)) errors.email = "Enter a valid email address, for example name@company.com.";

  if (!values.message) errors.message = "Describe the business challenge you would like to discuss.";
  else if (values.message.length < ENQUIRY_LIMITS.message.min)
    errors.message = `Add a little more detail (at least ${ENQUIRY_LIMITS.message.min} characters).`;
  else if (values.message.length > ENQUIRY_LIMITS.message.max)
    errors.message = `Keep your description under ${ENQUIRY_LIMITS.message.max} characters.`;

  if (values.organization.length > ENQUIRY_LIMITS.organization.max)
    errors.organization = `Keep the organisation name under ${ENQUIRY_LIMITS.organization.max} characters.`;

  if (values.organizationType && !organizationTypeValues.includes(values.organizationType))
    errors.organizationType = "Choose one of the listed organisation types.";

  if (values.serviceInterest && !serviceInterestValues.includes(values.serviceInterest))
    errors.serviceInterest = "Choose one of the listed services.";

  if (Object.keys(errors).length > 0) return { ok: false, values, errors };
  return { ok: true, values, spam: cleanLine(raw.website).length > 0 };
}

export function labelFor(list: readonly { value: string; label: string }[], value: string): string {
  return list.find((i) => i.value === value)?.label ?? "";
}
