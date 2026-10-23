# Checkpoints

**Global rule (added after Checkpoint 8): all styling must use Tailwind CSS v4 utilities. See `STYLING.md`. Applies to Checkpoints 9-15.**

| # | Title | Status |
|---|-------|--------|
| 1 | Global application foundation | complete |
| 2 | Homepage | complete |
| 3 | Services overview | complete |
| 4 | Data Analytics & Business Intelligence | complete |
| 5 | Data Infrastructure & Engineering | complete |
| 6 | AI & Automation | complete |
| 7 | Business & Technology Consulting | complete |
| 8 | About | complete |
| 9 | Case studies | complete |
| 10 | Insights | complete |
| 11 | Contact and enquiry system | complete |
| 12 | Consultation booking | complete |
| 13 | Privacy | complete |
| 14 | SEO and site discovery | complete |
| 15 | Final integration and QA | not started |

## Checkpoint 1: Global application foundation (complete)
Delivered: Next.js app, strict TypeScript, design tokens, global styles, root layout and metadata defaults, skip link, sticky header, accessible mobile disclosure menu, footer (verified details only), Button/ButtonLink, Container, Section, DevNotice, CtaBand, loading/error/not-found states, per-feature env validation, content status model with filtering and violation detection, conditional nav for Case Studies/Insights, .env.example, docs.
Validation: typecheck, lint, tests (6), build, curl smoke test all pass. Browser, responsive and contrast checks not yet run.
Commit: `checkpoint-01: global application foundation` (see `git log`).
Remaining: none within scope.

## Checkpoint 2: Homepage (complete)
Delivered: hero (two-column desktop, text first on mobile) with decorative SVG, challenges, four service cards, working principles, process (Understand to Support and improve), credibility fallback (no invented evidence), who we help, final CTA. Content in src/content/home.ts and services.ts. Narrow-screen header fix.
Validation: typecheck, lint, 10 tests, build, Chromium overflow/structure/header checks pass. Contrast tooling, touch and dev-mode checks not run.
Not delivered: homepage Insights section (conditional; deferred to Checkpoint 10).
Commit: `checkpoint-02: implement responsive homepage` (see `git log`).

## Checkpoint 3: Services overview (complete)
Delivered: /services with introduction, four service cards (reused), situation-to-service guide, how services combine, engagement process (reused), enquiry/consultation CTA. Reusable PageHeader, FitList, ConnectionList.
Validation: typecheck, lint, 12 tests, build, Chromium overflow/structure checks, curl status checks pass.
Open: service links 404 until Checkpoints 4-7; canonical deferred to Checkpoint 14.
Commit: `checkpoint-03: implement services overview` (see `git log`).

## Checkpoint 4: Data Analytics & Business Intelligence (complete)
Delivered: /services/data-analytics (introduction, problems, capabilities, example deliverables, what useful analytics depends on, 4-step approach, expected value without guarantees, related services, CTA, breadcrumb) built on a reusable ServiceDetailPage template driven by typed content.
Validation: typecheck, lint, 16 tests, build, Chromium status/overflow/structure checks pass.
Open: other service pages 404 until Checkpoints 5-7; canonical deferred to Checkpoint 14.
Commit: `checkpoint-04: implement data analytics service page` (see `git log`).

## Checkpoint 5: Data Infrastructure & Engineering (complete)
Delivered: /services/data-infrastructure via the shared ServiceDetailPage: common problems, pipelines and integration, data quality, architecture and reporting foundations, example deliverables, "dependable foundations, not necessarily complex ones" considerations, 4-step approach, expected value without guarantees, related services, CTA.
Validation: typecheck, lint, 22 tests, build, Chromium status/overflow/structure checks pass.
Open: AI & Automation and Business & Technology Consulting pages 404 until Checkpoints 6-7; canonical deferred to Checkpoint 14.
Commit: `checkpoint-05: implement data infrastructure service page` (see `git log`).

## Checkpoint 6: AI & Automation (complete)
Delivered: /services/ai-automation via ServiceDetailPage: problems, capabilities, where automation and AI tend to fit (new optional use-cases section), example deliverables, "feasibility, risk and human oversight" considerations (fit, feasibility, risk and accuracy, oversight, maintenance, impact on people), 4-step approach, value without guarantees, related services, CTA.
Validation: typecheck, lint, 27 tests, build, Chromium status/overflow/structure/tone checks pass.
Open: Business & Technology Consulting page 404 until Checkpoint 7; canonical deferred to Checkpoint 14.
Commit: `checkpoint-06: implement ai and automation service page` (see `git log`).

## Checkpoint 7: Business & Technology Consulting (complete)
Delivered: /services/business-technology-consulting via ServiceDetailPage: problems, capabilities, example advisory deliverables, "advice and implementation are different work" considerations, 4-step approach, value without guarantees, related services, CTA. All four service pages plus overview complete; service links verified by crawl.
Validation: typecheck, lint, 34 tests, build, Chromium status/overflow/structure checks, internal link crawl pass.
Open: /about, /contact, /book-consultation, /privacy 404 until their checkpoints; canonical deferred to Checkpoint 14.
Commit: `checkpoint-07: implement business and technology consulting page` (see `git log`).

## Checkpoint 8: About (complete)
Delivered: /about with company overview, relationship to Datatechhub, working principles, who we work with, CTA; leadership section driven by typed ManagedContent and omitted when nothing is approved; content-validation safeguards (invalid status or approved placeholder fails the build).
Validation: typecheck, lint, 42 tests, build, production HTML grep (no dummy content), dev-mode check, build-failure demonstrations, Chromium status/overflow/structure checks pass.
Open: real leadership and company details needed; /contact, /book-consultation, /privacy 404; canonical deferred to Checkpoint 14.
Commit: `checkpoint-08: implement about page and content safeguards` (see `git log`).

## Checkpoint 9: Case studies (complete)
Delivered: typed registry `src/content/case-studies` (ManagedContent + projectType: completed-work, prototype, internal-demonstration, ongoing); `src/lib/content/case-studies.ts` (validation: status, placeholder in approved, slug format/duplicates, project type, related-service slugs; getPublishableCaseStudies, getCaseStudyBySlug, getCaseStudySlugs); `/case-studies` index (404 in production when nothing is approved); `/case-studies/[slug]` (dynamicParams=false, generateStaticParams for publishable items only, noindex for non-approved); CaseStudyCard and CaseStudyDetail (challenge, objectives, contribution, approach, solution, deliverables, verified results, lessons, related services, CTA; empty sections omitted); nav link and registry now driven by the real registry. One fictional dummy entry (development only). All styling is Tailwind.
Validation: typecheck, lint, 53 tests, production build, production/dev route checks and the approved-dummy build-failure demonstration all pass (run during Checkpoint 10). Browser/visual QA not yet run. Tests in tests/case-studies.test.ts.
Open: no real case studies supplied; homepage has no case-study section yet (add only when approved items exist, in a later checkpoint or Checkpoint 14/15).

## Checkpoint 10: Insights (complete)
Delivered: typed registry `src/content/insights` (ManagedContent + publishedOn, optional author, key takeaways, headed sections with optional bullets, related services); `src/lib/content/insights.ts` (validation: status, placeholder in approved, slug format/duplicates, real calendar date, non-empty body, related-service slugs; newest-first publishable list); `/insights` index (404 in production when nothing is approved); `/insights/[slug]` (dynamicParams=false, generateStaticParams for publishable items only, noindex for non-approved); InsightCard, InsightDetail and a conditional homepage InsightsPreview (renders nothing when nothing is publishable); nav link driven by the real registry. One fictional dummy article (development only). All styling is Tailwind.
Validation: typecheck, lint, 67 tests, production build, production check (Insights and case-study routes 404, no nav link, no dummy text in page HTML), dev check (routes 200, badges, notice, noindex, homepage preview), and the approved-dummy build-failure demonstration all pass. Browser/visual QA not yet run (no browser available).
Open: no real articles supplied; Insights sitemap/canonical handled in Checkpoint 14.
Commit: `checkpoint-10: implement insights registry and routes` (see `git log`).

## Maintenance: Tailwind migration (after Checkpoint 8, not a numbered checkpoint)
Delivered: every component and page converted from hand-written CSS (tokens.css, sections.css, globals.css classes) to Tailwind v4 utilities; colour system retained as `@theme` tokens; STYLING.md added. Checkpoint 9 NOT started.
Validation: install, typecheck, lint, tests and build now pass (run during Checkpoint 10). Visual/responsive QA still to do (see PROGRESS.md).

## Checkpoint 11: Contact and enquiry system (complete, verified 2026-10-23)
Delivered: /contact (force-dynamic; form when email configured, honest unavailable state otherwise, dev notice naming missing variables), POST /api/contact (503/415/413/429/400/502/200 pipeline, honeypot, in-memory rate limit, Retry-After, no-store, GET 405), dependency-free validation shared by client and server, email provider adapter + Resend adapter, plain-text composer, accessible ContactForm client component, tests/contact.test.ts.
Files: src/lib/validation/enquiry.ts; src/lib/rate-limit.ts; src/lib/email/{types,resend,index}.ts; src/lib/contact/{compose,handle,availability}.ts; src/app/api/contact/route.ts; src/app/contact/page.tsx; src/components/forms/ContactForm.tsx; field classes in src/components/ui/styles.ts; tests/contact.test.ts.
Validation: npm ci, typecheck, lint, vitest 87/87, build pass. Production server: no-env state (no form, 503, 405), invalid-key state (400 field errors, real Resend 401 -> 502, 429 on 6th request, 415), PII-free logs. Chrome at 5 widths on 8 routes: no overflow, one h1, no console errors; mobile menu keyboard behaviour.
Fixes during verification: header desktop CTA visible on mobile (overflow at 320px), mobile menu panel padding/edge, unused lint directive.
Not verified: a successful real send (no credentials).
Commits: `checkpoint-11: implement contact page and enquiry api (unverified build)`, `checkpoint-11: verify enquiry flow and fix mobile header`.

## Checkpoint 12: Consultation booking (complete, 2026-10-23)
Delivered: /book-consultation (force-dynamic). Configured: explanation, provider-handled scheduling (time zones, confirmation; reschedule/cancel only "where the provider supports it"), button to the provider link in a new tab with the provider host announced. Unconfigured: honest "online booking is not available" status, enquiry CTA, optional public email, dev notice. Purpose cards, preparation checklist, fallback enquiry link. Meeting length/format are null until confirmed and only rendered when set (dev notice otherwise).
Decision: a provider link, not an iframe embed. No provider is chosen yet, and embeds need provider-specific scripts/CSP. Add an embed later only for the chosen provider.
Files: src/app/book-consultation/page.tsx; src/content/booking.ts; src/lib/booking.ts (HTTPS-only link parsing, provider host); src/lib/env.ts (getBookingUrl uses parseBookingUrl); tests/booking.test.ts (6 tests).
Validation: typecheck, lint, vitest 93/93, build pass. Production server: unset URL -> unconfigured state; HTTPS URL -> link with rel="noopener noreferrer"; http:// URL rejected (unconfigured state). Chrome at 320/390/820/1280/1680: no overflow, one h1, no console errors.
Commit: `checkpoint-12: implement consultation booking page`.

## Checkpoint 13: Privacy (complete, 2026-10-23)
Delivered: /privacy (force-dynamic) rendering a typed, status-managed notice written from the site's actual behaviour: form fields, in-memory IP for rate limiting (10 min, never logged), PII-free logs, hosting-provider logs, use, basis, processors (Resend, scheduling provider), no cookies/analytics/third-party assets, no database, security, rights (NDPA 2023 / NDPC, to be legally checked), contact. Contents sidebar with anchor links. Draft banner shown in all environments while unapproved; noindex while draft; dev notice lists missing facts.
Safeguards: business facts (controller name, address, privacy contact, retention, hosting provider, effective date) are null, never invented; approving with any missing fact or a bad date fails the build naming them; production keeps the enquiry form disabled until the notice is approved (mayCollectPersonalData in src/lib/content/privacy.ts, used by src/lib/contact/availability.ts); the API logs the reason for operators.
Files: src/content/privacy.ts; src/lib/content/privacy.ts; src/app/privacy/page.tsx; src/lib/contact/availability.ts; src/app/api/contact/route.ts (operator log); tests/privacy.test.ts (7 tests); .env.example, README.md.
Validation: typecheck, lint, vitest 100/100, build pass. Production: /privacy 200 with noindex and draft banner, no dev text; with email env set the contact form is withheld and the API returns 503 with the privacy reason logged. Dev: form shown, missing-facts notice shown. Marking the notice approved FAILED the build listing all six missing facts; restored. Chrome at 5 widths: no overflow, one h1.
Remaining (business/legal): supply facts, legal review against the NDPA 2023 and any other applicable law, then approve.
Commit: `checkpoint-13: implement privacy notice and collection gate`.

## Checkpoint 14: SEO and site discovery (complete, 2026-10-23)
Delivered: shared `pageMetadata()` (src/lib/seo/page.ts over pure buildPageMetadata in metadata.ts) on every route: title, description, absolute canonical, Open Graph (url, image, article type/date/verified authors), Twitter card. Indexing policy: indexable only with NEXT_PUBLIC_SITE_URL set AND approved/public content; otherwise noindex and no canonical. src/app/sitemap.ts and robots.ts over pure buildSitemap/buildRobots (src/lib/seo/discovery.ts): sitemap lists static public pages, approved case studies/insights (and their indexes) only, privacy only when approved, empty without a site URL; robots disallows everything without a site URL or outside production, otherwise allows / except /api/ and links the sitemap. Structured data: Organization (name, URL, official logo only) on the homepage, Article on approved insights; JsonLd escapes "<". Generated share image src/app/opengraph-image.tsx (official logo unchanged). Conditional index pages emit no canonical when they 404; 404s rely on Next's own single noindex.
Files: src/lib/seo/{metadata,page,discovery,structured-data}.ts; src/components/seo/JsonLd.tsx; src/app/{sitemap,robots}.ts; src/app/opengraph-image.tsx; metadata in every page, layout.tsx, not-found.tsx; tests/seo.test.ts (12 tests).
Validation: typecheck, lint, vitest 112/112, build pass. Production without site URL: all pages noindex, no canonical, robots.txt Disallow /, empty sitemap. Production with NEXT_PUBLIC_SITE_URL=https://www.example.com (build-time variable): canonicals and og:url absolute, og/twitter image 200 PNG 1200x630, Organization JSON-LD on /, privacy noindex (draft), robots allows / with sitemap link, sitemap = 9 static pages (no dummy, no draft privacy), /case-studies, unknown slugs and /nope 404 with a single noindex and no canonical.
Note: NEXT_PUBLIC_SITE_URL must be set at BUILD time (static pages, robots and sitemap are prerendered).
Commit: `checkpoint-14: implement seo metadata, sitemap and robots`.
