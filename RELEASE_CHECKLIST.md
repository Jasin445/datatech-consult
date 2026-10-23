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
- [ ] Privacy notice reviewed against applicable law (incl. Nigerian data-protection requirements)
- [ ] Domain and hosting configured; NEXT_PUBLIC_SITE_URL set
- [ ] Verified contact email and parent-brand URL set (or intentionally omitted)
- [ ] SEO: canonical URLs, sitemap, robots, Open Graph verified
- [ ] Analytics: decision recorded (none implemented by default)
- [ ] Accessibility QA (keyboard, focus, contrast, reduced motion) with real tooling
- [ ] Responsive QA: mobile, tablet, desktop, wide
- [ ] Production build, lint, type-check and tests pass on the release commit
- [ ] Rate-limit/queue strategy: current limiter is in-memory per instance and there is no queue/retry (documented in PROGRESS.md); confirm or upgrade for the chosen host
- [x] Checkpoint 11 verified on a networked machine (install, typecheck, lint, tests, build, /contact and /api/contact checks). A real successful send is still untested (see the email item)
- [ ] Verify the sender domain with the email provider (Resend requires it) and confirm EMAIL_PROVIDER=resend
- [ ] Homepage and service marketing copy reviewed and approved by the business
- [ ] Hero imagery decision (keep decorative graphic or supply licensed photography)
- [ ] Approved statement of relationship to Datatechhub confirmed; NEXT_PUBLIC_PARENT_BRAND_URL set (or link intentionally omitted)
- [ ] Dummy leadership profile removed from src/content/leadership/profiles.ts once real approved profiles exist (it is already excluded from production output)
