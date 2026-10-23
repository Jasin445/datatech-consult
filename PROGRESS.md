Current phase: VERSION 3 COMPLETE (V3-1 to V3-8). V1 and V2 complete before it.
Status: development complete. NOT LAUNCH-READY: business, legal and configuration inputs outstanding (RELEASE_CHECKLIST.md). Critique item 1 (real people, credentials, case studies) is PARKED by owner decision (2026-10-23): it will be the final piece of work, after everything else.

Next action:
- Owner review of V3; supply launch inputs (team/credentials, contact email or booking link, privacy facts, domain, email provider).

Completed checkpoints:
- Checkpoints 1-15: complete (deliverables, files and validation per checkpoint in CHECKPOINTS.md)

V2 plan and checkpoint table: IMPLEMENTATION_PLAN.md ("Version 2") and CHECKPOINTS.md.

## Report by area (master prompt section 11, production acceptance)
Development functionality completed:
- All 14 required routes plus /api/contact, sitemap.xml, robots.txt, opengraph-image. Four distinct service pages. Conditional Case Studies and Insights (hidden in production until approved items exist). Content governance (dummy/draft/approved) enforced in pages, navigation, metadata and sitemap; critical violations fail the build.
- Enquiry form with shared client/server validation, honeypot, rate limit, provider adapter (Resend), honest unavailable states. Booking page with HTTPS provider link or honest unconfigured state. Draft privacy notice describing actual behaviour, with a production gate on personal-data collection.

Production build and tests completed (2026-10-23, this machine):
- typecheck, lint (0 problems), vitest 161/161, production build: pass (last run at V3-8). Lighthouse (simulated mobile): performance 94-100, accessibility 100, best practices 100.
- npm run qa:responsive and npm run qa:a11y against the production build: pass (0 axe violations, no overflow, all links resolve, focus visible, reduced motion respected). Development-only routes also checked.

External integrations configured and tested:
- NOT configured. Email: tested against the real Resend API only with an invalid key (correct 502 path); a successful send is untested. Scheduling: no provider chosen. Domain/hosting: none.

Business information verified:
- NO. Pending: legal/company details, leadership, relationship statement with Datatechhub, approved case studies and articles, review of all marketing copy, meeting length/format, public contact email, parent-brand URL.

Legal and privacy review completed:
- NO. Privacy notice is a draft with six business facts missing; production disables the contact form until it is approved.

Domain and deployment configured:
- NO. NEXT_PUBLIC_SITE_URL unset (site is noindex everywhere by design until set at build time).

Remaining launch blockers: see RELEASE_CHECKLIST.md (unticked items).

## Known limitations (documented decisions)
- Rate limiting is in-memory per server instance; no durable email queue/retry (failures are shown to the visitor).
- No root loading.tsx (it hid static content until JS ran); add segment-level loading UI only where data is slow.
- Booking is a link, not an embed, until a provider is chosen.
- Share image headline renders in the bundled regular-weight font.

## Not verified
- Screen-reader pass, real touch devices, Lighthouse/performance budget, deployment on the target host, real email delivery, real scheduling provider.

## Resume instructions
Read this file, STYLING.md, CHECKPOINTS.md, IMPLEMENTATION_PLAN.md and MASTER_PROMPT.md. Run `npm ci && npm run typecheck && npm run lint && npm test && npm run build`, then `npm start` and `npm run qa:responsive && npm run qa:a11y`.
