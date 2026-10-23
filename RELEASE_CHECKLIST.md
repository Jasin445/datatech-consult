# Release checklist

Development completion is not launch readiness. Tick only after verification.

- [x] Official logo supplied and integrated (public/logos/datatechhub-logo.png); final approval of "Consulting" lockup still needed
- [ ] Company and legal information verified
- [ ] Leadership details approved (or company-only About layout confirmed)
- [ ] Case studies approved (or section stays hidden)
- [ ] Articles approved (or section stays hidden)
- [ ] All dummy/draft content removed or excluded; build validation passes
- [ ] Email provider chosen; EMAIL_PROVIDER, EMAIL_API_KEY, CONTACT_RECIPIENT_EMAIL, CONTACT_SENDER_EMAIL set and delivery tested
- [ ] Scheduling provider chosen; NEXT_PUBLIC_BOOKING_URL (HTTPS) set and tested; meeting duration/format confirmed and set in src/content/booking.ts; decide link vs provider embed
- [ ] Privacy notice: facts supplied in src/content/privacy.ts, reviewed against applicable law (incl. the Nigeria Data Protection Act 2023), status set to "approved" (until then production disables the contact form)
- [ ] HTTPS enforced by the host (the privacy notice states the site is served over an encrypted connection)
- [ ] Domain and hosting configured; NEXT_PUBLIC_SITE_URL set
- [ ] Verified contact email and parent-brand URL set (or intentionally omitted)
- [ ] SEO: implemented and verified with an example URL (Checkpoint 14); re-verify canonical URLs, sitemap, robots and Open Graph on the real domain
- [ ] Analytics: decision recorded (none implemented; the privacy notice says no cookies or analytics, so update it first if this changes)
- [x] Automated accessibility QA (axe WCAG 2.2 AA, keyboard focus, reduced motion): 0 violations on 2026-10-23 (`npm run qa:a11y`)
- [ ] Manual accessibility QA: screen reader (VoiceOver/NVDA) and real touch devices
- [x] Responsive QA: 320/390/820/1280/1680 on every route, 2026-10-23 (`npm run qa:responsive`); re-run after content changes
- [ ] Production build, lint, type-check and tests pass on the release commit (pass on the checkpoint-15 commit; re-run on the release commit)
- [ ] Rate-limit/queue strategy: current limiter is in-memory per instance and there is no queue/retry (documented in PROGRESS.md); confirm or upgrade for the chosen host
- [x] Checkpoint 11 verified on a networked machine (install, typecheck, lint, tests, build, /contact and /api/contact checks). A real successful send is still untested (see the email item)
- [ ] Verify the sender domain with the email provider (Resend requires it) and confirm EMAIL_PROVIDER=resend
- [ ] Homepage and service marketing copy reviewed and approved by the business
- [ ] Hero imagery decision (keep decorative graphic or supply licensed photography)
- [ ] Approved statement of relationship to Datatechhub confirmed; NEXT_PUBLIC_PARENT_BRAND_URL set (or link intentionally omitted)
- [ ] Dummy leadership profile removed from src/content/leadership/profiles.ts once real approved profiles exist (it is already excluded from production output)
- [ ] V2 photography: stock photos (Unsplash License, registered in src/content/media/photos.ts) approved by the business, or replaced with commissioned photography
- [ ] V2 copy: homepage and remaining page copy approved by the business (all V2 statements are proposals)
- [x] Favicon/touch icon from the supplied Hub mark (src/app/icon.png, apple-icon.png)
- [ ] Production server start log shows no `[launch]` warnings (at minimum: a public contact email or booking link, so visitors can make contact before the form is enabled)
- [ ] Engagement shapes, scale lines and "How pricing works" (src/content/engagement.ts) confirmed by the business; to show a starting price, set `price: { from: "₦...", confirmed: true }` on a shape
- [ ] Re-run Lighthouse on the deployed domain (expect SEO to pass once NEXT_PUBLIC_SITE_URL is set) and on a real mid-range phone
- [ ] Remove or replace the items in src/content/dummy-data.ts once real, approved content exists (they never appear in production)
