import { createResendProvider } from "./resend";
import type { EmailProvider } from "./types";

export type { EmailMessage, EmailProvider, SendResult } from "./types";

/** Add new adapters here. The enquiry flow only depends on the EmailProvider interface. */
const factories: Record<string, (apiKey: string) => EmailProvider> = {
  resend: (apiKey) => createResendProvider(apiKey),
};

export const SUPPORTED_EMAIL_PROVIDERS = Object.keys(factories);

export function createEmailProvider(name: string, apiKey: string): EmailProvider | null {
  const factory = factories[name.trim().toLowerCase()];
  return factory ? factory(apiKey) : null;
}
