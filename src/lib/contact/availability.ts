import "server-only";
import { getEmailConfig } from "@/lib/env";
import { createEmailProvider, SUPPORTED_EMAIL_PROVIDERS, type EmailProvider } from "@/lib/email";

export type ContactAvailability =
  | { available: true; provider: EmailProvider; addresses: { from: string; to: string } }
  | { available: false; /** Development-only detail. Never show to visitors in production. */ devDetail: string };

/** Single source of truth for whether the enquiry form can honestly accept submissions. */
export function getContactAvailability(): ContactAvailability {
  const result = getEmailConfig();
  if (!result.configured) return { available: false, devDetail: `Missing or invalid: ${result.missing.join(", ")}.` };
  const { EMAIL_PROVIDER, EMAIL_API_KEY, CONTACT_SENDER_EMAIL, CONTACT_RECIPIENT_EMAIL } = result.config;
  const provider = createEmailProvider(EMAIL_PROVIDER, EMAIL_API_KEY);
  if (!provider)
    return { available: false, devDetail: `EMAIL_PROVIDER "${EMAIL_PROVIDER}" is not supported. Supported: ${SUPPORTED_EMAIL_PROVIDERS.join(", ")}.` };
  return { available: true, provider, addresses: { from: CONTACT_SENDER_EMAIL, to: CONTACT_RECIPIENT_EMAIL } };
}
