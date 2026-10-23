import { labelFor, ORGANIZATION_TYPES, SERVICE_INTERESTS, type EnquiryValues } from "@/lib/validation/enquiry";
import type { EmailMessage } from "@/lib/email/types";

/** Plain-text only: no HTML is built from visitor input. Header values are single-line (already cleaned). */
export function composeEnquiryEmail(values: EnquiryValues, addresses: { from: string; to: string }): EmailMessage {
  const service = labelFor(SERVICE_INTERESTS, values.serviceInterest) || "Not specified";
  const orgType = labelFor(ORGANIZATION_TYPES, values.organizationType) || "Not specified";
  const subject = `Website enquiry from ${values.name}`.slice(0, 150);
  const text = [
    "New enquiry from the Datatechhub Consulting website.",
    "",
    `Name: ${values.name}`,
    `Email: ${values.email}`,
    `Organisation: ${values.organization || "Not specified"}`,
    `Organisation type: ${orgType}`,
    `Service interest: ${service}`,
    "",
    "Business challenge:",
    values.message,
    "",
    "Reply to this email to respond to the sender.",
  ].join("\n");
  return { from: addresses.from, to: addresses.to, replyTo: values.email, subject, text };
}
