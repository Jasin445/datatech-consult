/**
 * Consultation booking page copy. PROPOSED copy, subject to business review.
 *
 * `details.duration` and `details.format` must stay null until the business confirms them.
 * They are rendered only when set; nothing about length or format is promised otherwise.
 */
export type BookingDetails = {
  /** e.g. "30 minutes". Null until confirmed. */
  duration: string | null;
  /** e.g. "Video call". Null until confirmed. */
  format: string | null;
};

export const bookingPage = {
  title: "Book a consultation",
  metaDescription:
    "Book an initial consultation with Datatechhub Consulting to discuss a business challenge and whether data, analytics, automation or technology work could help.",
  heading: "Book a consultation",
  lead: "An initial conversation to understand the challenge you are facing and whether we are the right people to help.",
  purpose: {
    heading: "What the consultation is for",
    items: [
      {
        title: "Understand the situation",
        text: "We ask about the problem, how it affects your organisation, and what you have already tried.",
      },
      {
        title: "Check the fit",
        text: "We give an honest view of whether our services are relevant, including when they are not.",
      },
      {
        title: "Agree a sensible next step",
        text: "That might be a written proposal, a short discovery exercise, or simply some pointers if a project is not needed.",
      },
    ],
  },
  prepare: {
    heading: "How to prepare",
    items: [
      "A short description of the challenge and who it affects.",
      "The systems, spreadsheets or reports involved, if you know them.",
      "Any deadline or constraint we should be aware of.",
    ],
    note: "You do not need a finished brief. Please do not share passwords or sensitive personal data before or during the call.",
  },
  details: { duration: null, format: null } as BookingDetails,
} as const;
