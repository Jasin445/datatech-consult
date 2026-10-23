import type { ManagedContent } from "@/lib/content/status";

/**
 * Privacy notice. DRAFT: written from the site's actual behaviour (see the comments on each section),
 * but NOT legally reviewed. Before setting status to "approved":
 *  1. The business supplies every value in `facts` (an approved notice with a null fact fails the build).
 *  2. A qualified reviewer checks the whole notice against applicable law, including the
 *     Nigeria Data Protection Act 2023 and any other jurisdiction the business serves.
 *
 * While the notice is not approved, production disables the enquiry form
 * (see src/lib/contact/availability.ts): the site must not collect personal data under an unreviewed notice.
 *
 * If the site's data handling changes (new form field, analytics, cookies, another provider),
 * update this notice in the same change.
 */
export type PrivacyFacts = {
  /** Legal name of the organisation responsible for the data (the data controller). */
  controllerName: string | null;
  /** Registered or postal address for privacy correspondence. */
  postalAddress: string | null;
  /** Mailbox that handles privacy requests. */
  privacyContactEmail: string | null;
  /** How long enquiry emails are kept, e.g. "up to 24 months after our last contact". */
  enquiryRetention: string | null;
  /** Who hosts the website, e.g. "Vercel Inc.". */
  hostingProvider: string | null;
  /** Date this version of the notice took effect, ISO format YYYY-MM-DD. */
  effectiveDate: string | null;
};

export type PrivacySection = {
  id: string;
  heading: string;
  paragraphs: readonly string[];
  bullets?: readonly string[];
};

export type PrivacyNotice = {
  facts: PrivacyFacts;
  sections: readonly PrivacySection[];
};

export const privacyNotice: ManagedContent<PrivacyNotice> = {
  status: "draft",
  data: {
    facts: {
      controllerName: null,
      postalAddress: null,
      privacyContactEmail: null,
      enquiryRetention: null,
      hostingProvider: null,
      effectiveDate: null,
    },
    sections: [
      {
        // Fields from src/lib/validation/enquiry.ts. Honeypot field is empty for people and never sent.
        id: "collect",
        heading: "Information we collect",
        paragraphs: [
          "This website collects personal information only when you choose to send an enquiry through the contact form. The form asks for:",
        ],
        bullets: [
          "your name and business email address (required);",
          "a description of the business challenge you want to discuss (required);",
          "your organisation's name, the type of organisation and the service you are interested in (all optional).",
        ],
      },
      {
        // src/app/api/contact/route.ts + src/lib/rate-limit.ts: IP held in process memory, max 10 minutes, never logged.
        id: "technical",
        heading: "Technical information",
        paragraphs: [
          "When you send an enquiry, the website briefly holds your IP address in server memory to limit repeated submissions (no more than five in ten minutes). It is not written to our logs or stored elsewhere by the website, and it is discarded when the ten-minute window ends.",
          "Our application logs record only that an event happened (for example, that an enquiry was sent or failed to send) and, on failure, the email provider's name and response code. They do not contain your name, email address or message.",
          "Like most websites, our hosting provider may record standard technical information, such as IP addresses and requested pages, in its own server logs to operate and secure the service.",
        ],
      },
      {
        id: "use",
        heading: "How we use your information",
        paragraphs: ["We use the information you send only to:"],
        bullets: [
          "read and respond to your enquiry;",
          "discuss whether and how we might work together;",
          "keep a record of our correspondence with you.",
        ],
      },
      {
        id: "basis",
        heading: "Why we are allowed to use it",
        paragraphs: [
          "We process enquiry information because you asked us to respond, and to take steps you request before any agreement to work together. Where the law requires a different basis, we will identify it in this notice after legal review.",
        ],
      },
      {
        // Resend is the only adapter in src/lib/email. Booking is a plain outbound link (src/app/book-consultation).
        id: "processors",
        heading: "Service providers who handle your information",
        paragraphs: [
          "Enquiries are delivered by email using Resend, an email delivery service, to the Datatechhub Consulting inbox. Resend processes the enquiry on our behalf to deliver it. Its servers may be located outside Nigeria.",
          "If you book a consultation, you do so on our scheduling provider's website, not on this site. The information you enter there is handled by that provider under its own privacy notice, and is shared with us so we can hold the meeting.",
          "We do not sell your information or share it for advertising.",
        ],
      },
      {
        id: "cookies",
        heading: "Cookies and analytics",
        paragraphs: [
          "This website does not set cookies and does not use analytics, advertising or tracking tools. It does not load fonts or scripts from third-party services. If this changes, we will update this notice first.",
        ],
      },
      {
        id: "retention",
        heading: "How long we keep information",
        paragraphs: [
          "The website itself does not store enquiries: there is no database. Enquiries exist as emails in our inbox and in the email provider's delivery records.",
        ],
      },
      {
        id: "security",
        heading: "Security",
        paragraphs: [
          "The website is served over an encrypted connection. Enquiries are checked and processed on our server, and the credentials used to send email are kept on the server and never sent to your browser. No method of transmission or storage is completely secure, so please do not include passwords or sensitive personal data in your enquiry.",
        ],
      },
      {
        // Rights listed follow the Nigeria Data Protection Act 2023 as commonly summarised. MUST be checked in legal review.
        id: "rights",
        heading: "Your rights",
        paragraphs: [
          "Depending on the law that applies to you, you may have the right to ask for a copy of the information we hold about you, to have it corrected or deleted, to object to or restrict how we use it, and to withdraw consent where we rely on it. In Nigeria, you can also complain to the Nigeria Data Protection Commission.",
        ],
      },
    ],
  },
};
