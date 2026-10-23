Current checkpoint: 12 (Consultation booking)
Status: NOT STARTED

Completed checkpoints:
- Checkpoints 1-10: complete (see CHECKPOINTS.md for deliverables and validation)
- Checkpoint 11: complete (verified 2026-10-23 on a networked machine)

Current work:
- Checkpoint 12: /book-consultation using NEXT_PUBLIC_BOOKING_URL (getBookingUrl in src/lib/env.ts), honest unconfigured state with a link to /contact.

Validation (last run, 2026-10-23, Checkpoint 11):
- npm ci, typecheck, lint (0 problems), vitest 87/87, production build: pass.
- Production server, no email env: /contact 200 shows the honest "form not available" message and a booking link, no <form>; POST /api/contact 503 not_configured; GET 405.
- Production server, EMAIL_PROVIDER=resend with an invalid key: form renders; invalid input 400 with field errors; valid input reaches the real Resend API, which returns 401, and the route returns 502 send_failed; 6th request in the window returns 429; non-JSON returns 415. Logs contain only event names, provider and HTTP status (no personal data).
- Chrome (headless, Playwright): /, /services, all four service pages, /about, /contact at 320/390/820/1280/1680px: no horizontal overflow, one h1, no console errors. Mobile menu: keyboard open (Enter), Escape closes and returns focus.

Defects fixed in Checkpoint 11 verification:
- Desktop "Book a consultation" header button was visible on mobile (Tailwind `hidden` lost to the Button's `inline-flex`), causing horizontal overflow at 320px. Now `max-lg:hidden`; rule 10 added to STYLING.md.
- Mobile menu panel had no bottom padding or edge; added padding, bottom border and card shadow.
- Unused eslint-disable directive removed.

Not verified:
- A successful real email send (no real provider credentials available).
- Contrast with a dedicated tool; touch-device behaviour; screen-reader pass.

Outstanding issues:
- /book-consultation and /privacy return 404 until Checkpoints 12-13 (linked from header, footer, CTAs and the contact form).
- No canonical URL, sitemap or robots yet (Checkpoint 14).
- All marketing copy is proposed and needs business review.

Configuration blockers:
- No email provider credentials, booking URL, site URL, public contact email or parent-brand URL configured.

Next action:
- Build src/app/book-consultation/page.tsx (Checkpoint 12).
