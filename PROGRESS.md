Current phase: VERSION 4 COMPLETE (V4-1 to V4-5). V3 and its fixes (F1-F9) complete before it.
Status: development complete. NOT LAUNCH-READY: business, legal and configuration inputs outstanding (RELEASE_CHECKLIST.md). Critique item 1 (real people, credentials, case studies) is PARKED by owner decision (2026-10-23): it will be the final piece of work, after everything else.

Redesign note (2026-11-16, uncommitted, style only — no copy, content status, or business facts changed): deep-ink hero and statement panels, warm mist alternating sections, larger display type and section rhythm, rounded photo/mockup/card frames with soft lift shadows, gold-rule section headings, pill kickers, and card hover lift across homepage, services, about, contact and booking. New @theme tokens: ink, mist, gold-deep, shadow-lift, shadow-hero. Verified 2026-11-16: typecheck pass, lint pass, vitest 176/176, production build pass; responsive/overflow check (10 routes × 320/390/820/1280/1680, Playwright Chromium — official qa scripts need Google Chrome, not installed here) all passed with no page overflow, 1 h1 per page, no console errors; axe re-run clean on /, /services, /about, /contact, /book-consultation, /privacy at 390 and 1280 (one flaky first-run contrast hit on /book-consultation and /privacy at 390 only, clean on re-run).

Images & visuals note (2026-11-16, uncommitted — no copy, content status, or business facts changed): three service photos replaced with verified Unsplash photos — data-infrastructure card/hero is now server racks (data-centre.jpg, Taylor Vick), data-analytics is now a laptop full of performance charts (analytics-dashboard.jpg, Luke Chesser), AI & automation is now a humanoid robot with a tablet (ai-robot.jpg, Alex Knight); all other photos unchanged. Coded visuals rebuilt as polished deliverables: dashboard with product header, KPI sparklines, gradient area chart and sales-mix donut; pipeline as a 4-stage flow with checks strip; invoice workflow as a timeline with a gold human-review checkpoint; options as scorecards with totals and a recommended ribbon; spreadsheet with issue flags and an "Issues found" strip. Hero dashboard height fixed so its window bar is no longer clipped on desktop; region bars are now horizontal so labels read in full; small gold text on tinted backgrounds now uses gold-deep (passes 4.5:1). Verified 2026-11-16: typecheck pass, lint pass, vitest 176/176, production build pass (22 pages); Playwright Chromium checks on 10 routes × 1280/390 — no overflow, 1 h1 per page, no console errors, axe WCAG 2A/2AA clean on all 10 routes at both widths (official qa scripts need Google Chrome, not installed here). The three new JPGs are binary and cannot be pushed by the GitHub connector — push them with git from a Mac checkout.

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
- typecheck, lint (0 problems), vitest 167/167, production build: pass (last run at V4-5). Lighthouse (simulated mobile): performance 90-96, accessibility 100, best practices 100.
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
