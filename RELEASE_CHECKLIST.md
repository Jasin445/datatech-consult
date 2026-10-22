# Release checklist

Development completion is not launch readiness. Tick only after verification.

- [x] Official logo supplied and integrated (public/logos/datatechhub-logo.png); final approval of "Consulting" lockup still needed
- [ ] Company and legal information verified
- [ ] Leadership details approved (or company-only About layout confirmed)
- [ ] Case studies approved (or section stays hidden)
- [ ] Articles approved (or section stays hidden)
- [ ] All dummy/draft content removed or excluded; build validation passes
- [ ] Email provider chosen; EMAIL_PROVIDER, EMAIL_API_KEY, CONTACT_RECIPIENT_EMAIL, CONTACT_SENDER_EMAIL set and delivery tested
- [ ] Scheduling provider chosen; NEXT_PUBLIC_BOOKING_URL set and tested; meeting duration/format confirmed
- [ ] Privacy notice reviewed against applicable law (incl. Nigerian data-protection requirements)
- [ ] Domain and hosting configured; NEXT_PUBLIC_SITE_URL set
- [ ] Verified contact email and parent-brand URL set (or intentionally omitted)
- [ ] SEO: canonical URLs, sitemap, robots, Open Graph verified
- [ ] Analytics: decision recorded (none implemented by default)
- [ ] Accessibility QA (keyboard, focus, contrast, reduced motion) with real tooling
- [ ] Responsive QA: mobile, tablet, desktop, wide
- [ ] Production build, lint, type-check and tests pass on the release commit
- [ ] Rate-limit/queue strategy documented for the chosen host
