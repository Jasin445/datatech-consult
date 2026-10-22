import "server-only";
import { z } from "zod";

/**
 * Environment strategy: validate at the boundary where a feature is used, never at import time.
 * An unconfigured optional integration must not break the rest of the site.
 *
 * Categories:
 *  - core: none required for the site to run
 *  - feature: contact email (EMAIL_*, CONTACT_*), booking (NEXT_PUBLIC_BOOKING_URL)
 *  - optional: public contact details, parent-brand URL
 *  - launch-only: NEXT_PUBLIC_SITE_URL
 */

const emailSchema = z.object({
  EMAIL_PROVIDER: z.string().trim().min(1),
  EMAIL_API_KEY: z.string().trim().min(1),
  CONTACT_RECIPIENT_EMAIL: z.string().trim().email(),
  CONTACT_SENDER_EMAIL: z.string().trim().email(),
});

export type EmailConfigResult =
  | { configured: true; config: z.infer<typeof emailSchema> }
  | { configured: false; missing: string[] };

/** Server-only. Never expose `missing` details or values to visitors in production. */
export function getEmailConfig(): EmailConfigResult {
  const parsed = emailSchema.safeParse({
    EMAIL_PROVIDER: process.env.EMAIL_PROVIDER,
    EMAIL_API_KEY: process.env.EMAIL_API_KEY,
    CONTACT_RECIPIENT_EMAIL: process.env.CONTACT_RECIPIENT_EMAIL,
    CONTACT_SENDER_EMAIL: process.env.CONTACT_SENDER_EMAIL,
  });
  if (parsed.success) return { configured: true, config: parsed.data };
  const missing = [...new Set(parsed.error.issues.map((i) => String(i.path[0])))];
  return { configured: false, missing };
}

function cleanUrl(value: string | undefined): string | null {
  if (!value) return null;
  try {
    const url = new URL(value.trim());
    if (url.protocol !== "https:" && url.protocol !== "http:") return null;
    return url.toString().replace(/\/$/, "");
  } catch {
    return null;
  }
}

export function getSiteUrl(): string | null {
  return cleanUrl(process.env.NEXT_PUBLIC_SITE_URL);
}

export function getBookingUrl(): string | null {
  return cleanUrl(process.env.NEXT_PUBLIC_BOOKING_URL);
}

export function getParentBrandUrl(): string | null {
  return cleanUrl(process.env.NEXT_PUBLIC_PARENT_BRAND_URL);
}

export function getPublicContactEmail(): string | null {
  const value = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim();
  return value && z.string().email().safeParse(value).success ? value : null;
}
