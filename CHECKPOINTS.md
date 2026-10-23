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
| 15 | Final integration and QA | complete (development); launch blocked on business inputs, see RELEASE_CHECKLIST.md |

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
Validation: typecheck, lint, vitest 111/111, build pass. Production without site URL: all pages noindex, no canonical, robots.txt Disallow /, empty sitemap. Production with NEXT_PUBLIC_SITE_URL=https://www.example.com (build-time variable): canonicals and og:url absolute, og/twitter image 200 PNG 1200x630, Organization JSON-LD on /, privacy noindex (draft), robots allows / with sitemap link, sitemap = 9 static pages (no dummy, no draft privacy), /case-studies, unknown slugs and /nope 404 with a single noindex and no canonical.
Note: NEXT_PUBLIC_SITE_URL must be set at BUILD time (static pages, robots and sitemap are prerendered).
Commit: `checkpoint-14: implement seo metadata, sitemap and robots`.

## Checkpoint 15: Final integration and QA (complete for development, 2026-10-23)
Checks run (all on this machine, Chrome headless via Playwright, axe-core 4):
- typecheck, lint (0 problems), vitest 111/111 across 11 files, production build: pass.
- Responsive: all 10 production routes at 320/390/820/1280/1680 and the 5 development-only routes (case studies, insights, contact form): no horizontal overflow, exactly one h1, no console errors.
- Link crawl: every internal link and in-page anchor on every route resolves (production 30 links, development 21).
- axe WCAG 2.0/2.1/2.2 A+AA + best-practice at 390 and 1280 on every route: 0 violations after fixes.
- Keyboard: skip link is the first Tab stop; every Tab stop shows a visible focus indicator; mobile menu opens with Enter, Escape closes and returns focus.
- Reduced motion: transitions ~0s, scroll-behavior auto.
- Contact form in browser: empty submit focuses the error summary, marks 3 fields aria-invalid with summary links; provider failure shows the honest error and preserves input.
- Unknown slugs and /nope return 404 with one noindex; content filtering, privacy gate, missing-env states verified in Checkpoints 11-14.
Defects found and fixed:
- Root loading.tsx made static pages ship "Loading…" with content hidden until JS ran (axe intermittently found no h1). Removed; content is now in the initial HTML.
- Links in muted text were distinguishable by colour only (axe link-in-text-block, serious). Links are now underlined globally; footer list links underline on hover.
Added: scripts/qa/{responsive,a11y-crawl}.mjs with npm scripts qa:responsive and qa:a11y (devDependencies playwright-core, axe-core).
Not run / not possible here: screen-reader testing, real touch devices, a successful real email send, a real scheduling provider, deployment on the target host, Lighthouse/performance budget.
Commit: `checkpoint-15: final integration and qa`.

---

# Version 2 checkpoints (visual redesign; plan in IMPLEMENTATION_PLAN.md)

| # | Title | Status |
|---|-------|--------|
| V2-1 | Design foundation (fonts, gold token, photo registry, card family, header/footer) | complete |
| V2-2 | Homepage | complete (direction approved by owner) |
| V2-3 | Services overview + service detail template | complete |
| V2-4 | About | complete |
| V2-5 | Contact + Booking | complete |
| V2-6 | Case studies, Insights, Privacy, 404 | complete |
| V2-7 | Sitewide copy/imagery pass, QA, docs | complete |

## V2-1: Design foundation (complete, 2026-10-23)
Delivered: Instrument Serif + Instrument Sans via next/font (self-hosted); `gold` token (#8c6a2f) with derived `gold-soft`/`gold-tint`, existing tokens unchanged; display type scale; `rise` entrance animation; 18 Unsplash-License photos in public/images/photos with a typed registry (licence, source URL, photographer, scene-only alt) and tests/photos.test.ts (file/registry sync, licence, alt, no staff/client implication); ui/Eyebrow, ui/Ornament (+ArrowRight), ui/Photo; cards/FolioCard, OrnamentCard, PhotoCard; gold button variants (button shape moved into variants to avoid utility conflicts); Section `charcoal` tone; SectionHeading eyebrow/folio/onDark/align; ProcessSteps timeline restyle; header gold top rule and animated gold underline nav; footer statement band. STYLING.md "V2 design system" section.
Validation: typecheck, lint, vitest 115/115 (staged snapshot verified in an isolated copy), build pass.
Commit: `v2-1: design foundation (brand fonts, gold accent, photo registry, card family)`.

## V2-2: Homepage (complete, 2026-10-23; direction awaiting owner review)
Delivered: new homepage copy (problem-first, no stats/claims) and layout: hero (display headline with gold italic accent, framed photo, folded "field note"); 01 problem story beside a photo, ending on a turn line; challenges strip; 02 services as photo cards; full-bleed statement over a night photograph; 03 principles as folio cards (first featured); 04 process timeline with photo; 05 audience photo mosaic; 06 commitments with photo (approved evidence replaces it automatically when it exists); conditional Insights preview; closing charcoal "next step" ornament cards (enquiry, consultation).
Files: src/content/home.ts; src/app/page.tsx; src/components/sections/{Hero,ProblemStory,StatementBand,AudienceMosaic,Commitments,NextStep}.tsx.
Validation: typecheck, lint, vitest 115/115, build; qa:responsive (/, /services, /about, /contact at 5 widths) pass; qa:a11y on 6 routes: 0 violations after fixes; desktop and mobile screenshots reviewed section by section.
Fixes during review: service/mosaic titles overflowed narrow cards (sizes reduced); gold folio on the gold-tint featured card failed contrast at mobile size (charcoal there); a11y script now waits for entrance animations before measuring contrast.
Not yet V2: all other pages still use V1 layouts with the new fonts (V2-3 onwards).
Commit: `v2-2: redesign homepage`.

## V2-3: Services overview + service detail template (complete, 2026-10-23)
Owner approved the V2 homepage direction before this checkpoint.
Delivered: reusable `PageHero` (breadcrumb, eyebrow, serif h1 with optional gold accent, lead, actions, framed photo) for all inner pages. /services: hero ("Start with the problem. We’ll find the service."), alternating editorial service rows with large photos (`ServiceFeature`), situation-to-service rows set as italic quotations (`FitList`), "better together" folio cards with service links, engagement timeline with photo and notes, closing ornament cards. Service detail template (all four pages): hero with photo and actions, problem-first hook story per service (new `v2.hook` content), problems strip, capabilities as folio cards, use cases on charcoal (AI page), deliverables as a report contents list (`ContentsList`) beside a sticky photo, considerations as ornament cards on charcoal, approach timeline, value list, related services as wide photo cards, closing ornament cards with each service’s CTA copy. Breadcrumb aligned and 44px targets. OrnamentCard CTA optional; FolioCard accepts children; PhotoCard `aspect="wide"`; NextStep `lead`.
Content: `v2` block (hero photo, hook story, deliverables photo) added to each service detail; services overview copy refreshed. Existing structured content and its tests unchanged.
Removed: ServiceCard, ConnectionList (unused).
Validation: typecheck, lint, vitest 115/115, build; qa:responsive on the 5 services routes at 5 widths and qa:a11y (crawl, axe, keyboard, reduced motion): all pass. Desktop and mobile screenshots reviewed.
Commit: `v2-3: redesign services overview and service pages`.

## V2-4: About (complete, 2026-10-23)
Delivered: /about rebuilt: PageHero ("A practical partner for problems that don’t fit a template."), "who we are" with a gold italic statement and an overlapping two-photo collage, parent-brand section with the official logo (unchanged) in a folded-corner card, principles as folio cards, conditional leadership (V2 cards with serif monogram, no stock faces; hidden in production until approved), full-bleed statement ("Context isn’t a detail. It’s the brief."), audience photo mosaic, closing ornament cards.
Files: src/content/about.ts; src/app/about/page.tsx; src/components/sections/LeadershipGrid.tsx.
Governance unchanged: no founding year, legal status, history, credentials, mission or partnerships (about test still enforces it); leadership filtered by status.
Validation: typecheck, lint, vitest 115/115, build; qa:responsive /about at 5 widths; qa:a11y on production (leadership hidden) and on the development server (dummy profile shown): all pass. Screenshots reviewed.
Commit: `v2-4: redesign about page`.

## V2-5: Contact + Booking (complete, 2026-10-23)
Delivered: /contact rebuilt as a split layout on surface: eyebrow, serif h1 ("Tell us what isn’t working. We’ll take it from there."), lead, numbered "what happens next" list, photo; the form (or the honest unavailable state) inside a folded-corner `Panel`; charcoal "Prefer to talk first?" band with italic link to booking. /book-consultation rebuilt the same way ("Let’s talk it through. No finished brief needed."), booking states in a `Panel`, purpose as ornament cards on charcoal, preparation list with ornaments. Form fields restyled via shared `fieldClass` (square editorial fields), error/success boxes squared, submit button with arrow. Copy moved to src/content/contact.ts; booking content gained eyebrows and a photo.
Behaviour unchanged: availability check, privacy gate, validation, error summary, server messages, input preservation, booking URL parsing, unconfirmed length/format (null, dev notice only).
Removed: sections/ItemGrid (unused).
Validation: typecheck, lint, vitest 115/115, build. Production (no env): qa:responsive and qa:a11y on /contact and /book-consultation pass. A disposable copy of the project in the scratchpad running `next dev` with dummy email config and a booking URL: form and configured booking render; qa:responsive and qa:a11y pass; browser form test passes (empty submit focuses error summary with 3 invalid fields; real Resend rejects the dummy key and the visitor sees the honest error with input preserved).
Commit: `v2-5: redesign contact and booking pages`.

## V2-6: Case studies, Insights, Privacy, 404 (complete, 2026-10-23)
Delivered: `PageHero` photo now optional (text-only openings). Case studies: deliberately NO stock photography (could imply the real client/project); typographic `CaseCover` (charcoal, italic folio numeral, project-type label); `CaseStudyCard` with cover, visible project-type pill, gold action; detail page laid out as a report: hero, "at a glance" sheet (cover, project type, services involved, dev-only status), numbered `ReportSection`s with sticky labels (approach full width, verified results in a gold-tint panel), related services as photo cards, closing ornament cards. Insights: optional licensed `cover` (registry photo) on the Insight type (dummy article uses one in development); `InsightCard` with cover or ornament panel, whole card clickable; article template with reading column, gold drop cap, ornament bullets, sticky folded "Key takeaways" panel, related services, closing cards; index and homepage preview restyled. Privacy: text-only hero, draft banner, numbered two/three-column contents, each section as a `ReportSection`; all governance logic unchanged. 404: large italic "404", copy, homepage button, ruled links to Services/About/Contact. Error page: eyebrow and V2 heading. `RelatedServices` now wide photo cards; `Panel` gained `compact`.
Defect found and fixed: the site had no favicon, so every browser requested /favicon.ico and got a 404 (found through an intermittent QA failure on the first page of each run). Added PLACEHOLDER typographic `icon.tsx` and `apple-icon.tsx`; official favicon added to the release checklist. qa:responsive now also reports failing resource URLs.
Removed: PageHeader, CtaBand, and unused class strings (cardClass, checkItemClass, valueItemClass).
Governance unchanged: production /case-studies, /case-studies/sample-case-study, /insights, /insights/sample-article and /nope all return 404.
Validation: typecheck, lint, vitest 115/115, build. Production: qa:responsive on all 10 public routes (3 consecutive clean runs after the favicon fix), qa:a11y on all 10 plus /privacy and /nope (only the expected 404 skip-link self-reference), 404 overflow check at 320-1280. Development (owner’s dev server on :3000): qa:responsive and qa:a11y on case study and insight index/detail pages and the homepage preview: pass. Screenshots reviewed.
Note: running `next build` while a `next dev` server runs in the same folder once corrupted a generated file (.next/dev/types/routes.d.ts); the dev server regenerated it. See README QA note.
Commit: `v2-6: redesign case studies, insights, privacy and 404`.

## V2-7: Sitewide copy/imagery pass, QA, docs (complete, 2026-10-23)
Delivered: 8 more Unsplash-License photos (licence verified on each photo page, registered with source/photographer/alt; 26 total). Reassigned images so no photo appears in more than two content files (the two-use cases are mostly a service's own photo on its card and its page, which is intentional). Mobile menu: SVG menu/close icon (replaces the ☰/✕ text glyphs), serif links with gold folio numbers and rules. Copy pass: scanned all visitor copy for filler and unsupported claims (none found beyond the parent tagline and our own "can’t guarantee" disclaimers) and added tests/copy.test.ts, which fails on banned filler phrases or any "guarantee" that is not a disclaimer; proven by planting "seamless" in a content file (test failed, naming the file and word), then restoring it.
Validation: typecheck, lint, vitest 136/136 (13 files), production build. Built and served from a synced scratchpad copy because the owner's dev server was running in the project folder (see README note). qa:responsive on all 10 public routes (two consecutive clean runs) and qa:a11y (crawl, axe WCAG 2.2 AA, keyboard, reduced motion): pass. Governance: /case-studies, /insights, both sample detail pages and /nope return 404 in production. SEO without NEXT_PUBLIC_SITE_URL: noindex, robots Disallow /, empty sitemap; with an example site URL: canonical on every page, draft privacy noindex, sitemap 9 URLs. Mobile menu keyboard behaviour (Enter opens, Escape closes and returns focus) and screenshot reviewed.
Commit: `v2-7: imagery and copy pass, mobile menu, final v2 qa`.

---

# Version 3 checkpoints (plan in IMPLEMENTATION_PLAN.md)

| # | Title | Status |
|---|-------|--------|
| V3-1 | Data visual system | complete |
| V3-2 | CTA vocabulary + launch conversion safeguards | complete |
| V3-3 | Navigation (services menu, footer contact) | complete |
| V3-4 | Homepage rework | complete |
| V3-5 | Service pages shortened, per-service visuals, less hedging | complete |
| V3-6 | Engagement and pricing signals | complete |
| V3-7 | About/overview de-duplication, de-formularising pass | complete |
| V3-8 | Performance, images, final QA, docs | complete |

## V3-1: Data visual system (complete, 2026-10-23)
Delivered: src/components/visuals: `MockFrame` (app-window frame; one described image for assistive technology; visible "Illustrative example, not client data" caption), `charts.tsx` (LineChart with non-scaling strokes and HTML axis labels, HTML BarChart and HBars; theme colours only), `DashboardMock` (KPI tiles, revenue vs target, region bars, sales mix), `SpreadsheetMock` (messy "before" sheet: mixed dates, inconsistent spellings, duplicate row, missing value, #REF!), `PipelineDiagram` (sources to pipeline to one reporting store to outputs), `WorkflowDiagram` (invoice automation with an explicit human-review step), `OptionsMock` (advisory options appraisal with a recommendation). All responsive (diagrams go vertical on mobile). The logo's bright secondary blue now has a role in data visuals.
Tests: tests/visuals.test.tsx renders every mock and checks the caption, the described image and that no organisation is named (vitest now includes .tsx tests).
Review: rendered on a temporary preview route (deleted) at desktop and mobile; fixed a stretched line chart with oversized, clipped labels, and an options appraisal whose recommendation contradicted its own ratings.
Validation: typecheck, lint, vitest 151/151. Production build deferred to the next build in the scratchpad copy (owner's dev server is running in the project folder).
Commit: `v3-1: coded mock visuals (dashboard, spreadsheet, pipeline, workflow, options)`.

## V3-2: CTA vocabulary + launch conversion safeguards (complete, 2026-10-23)
Delivered: `ctas` in src/lib/site.ts is the single source of the two action labels ("Send an enquiry" -> /contact, "Book a consultation" -> /book-consultation); all pages, content and the footer use it. Closing ornament cards now titled "Write to us" / "Talk it through" with the standard labels as their actions. Service closing headings rewritten (the "Talk to us about..." variants were a third phrasing, caught by the new test). `src/lib/conversion.ts` (pure) + `conversion-server.ts`: which contact paths work (form, booking, public email); contact and booking unavailable states now only point at working paths (no circular dead ends), and the "prefer to talk/write first" links appear only when the other path works. `src/instrumentation.ts` logs `[launch]` warnings at production server start, including a LAUNCH BLOCKER line when visitors have no way to make contact. .env.example notes that NEXT_PUBLIC_* values are build-time and recommends a public email for launch.
Tests: tests/cta.test.ts (exact two actions; no alternative labels anywhere in src; conversion path and warning logic).
Validation: typecheck, lint, vitest 156/156; production build in the scratchpad copy: nothing configured -> 4 [launch] warnings incl. LAUNCH BLOCKER, contact and booking say "check back soon" with no circular links; with only a public email -> both pages direct visitors to the email (duplicate email line on /contact found and fixed).
Commit: `v3-2: single cta vocabulary and launch conversion safeguards`.

## V3-3: Navigation (complete, 2026-10-23)
Delivered: desktop `ServicesMenu` (client disclosure: button with aria-expanded/aria-controls; panel with the four services, one-line summaries and "All services and how they fit together"; Escape closes and returns focus; closes on outside click, focus leaving and navigation). Mobile menu lists the four services as an indented sub-list under Services. Footer already shows the public email when configured (build-time NEXT_PUBLIC_CONTACT_EMAIL, documented in V3-2).
Validation: typecheck, lint, vitest 156/156; browser test on the owner's dev server: Enter opens (5 links), Tab enters the panel, Escape closes with focus returned, outside click closes, choosing a service navigates and closes; desktop panel and mobile sub-list screenshots reviewed.
Commit: `v3-3: services menu in header and mobile nav`.

## V3-4: Homepage rework (complete, 2026-10-23)
Delivered: hero visual is now the dashboard mockup (boardroom photo removed) with the field note moved so it never covers the "illustrative" caption; problem story uses the messy spreadsheet mockup and is cut to two paragraphs; new "What the work looks like" showcase (`WorkShowcase`: pipeline, workflow with human review, options appraisal; each linked to its service); process timeline removed from the homepage (kept on /services); section eyebrows no longer carry folio numbers (gold italic accent kept to the hero and statement band); backgrounds re-sequenced. Hero and ProblemStory accept coded visuals.
Fixes during review: field note hid the dashboard caption at desktop; 320px overflow from grid columns holding mockups (min-w-0 on mock containers and MockFrame); KPI labels truncated on small phones (now wrap).
Validation: typecheck, lint, vitest 156/156; on the owner's dev server: qa:a11y on / passes; qa:responsive on / passes after the fix; desktop and 320px screenshots reviewed.
Commit: `v3-4: homepage shows the work (dashboard, spreadsheet, showcase)`.

## V3-5: Service pages shortened, per-service visuals, less hedging (complete, 2026-10-23)
Delivered: service template cut from ~10 sections to 7 (8 on AI): hero with the service's own mockup (`PageHero` now accepts `visual`): dashboard / pipeline / workflow / options appraisal; hook story with the problems as tags (separate strip removed); what we do; where it fits (AI); what you get, ending with the page's single disclaimer; before we start (compact ornament list instead of large cards); an `engagement` slot (filled in V3-6); closing cards with a "Works well with" related-services link row (the related photo-card section is gone). Removed per page: approach timeline and value section. Content model: `approach` and `value` removed, `disclaimer` added (the old value lead); consulting deliverables lead no longer says "where agreed".
Tests: service-details tests updated; new test asserts "can’t guarantee" appears only in each page's disclaimer and "where agreed" nowhere in service content.
Validation: typecheck, lint, vitest 160/160; infrastructure page full-page and AI hero screenshots reviewed on the dev server (infrastructure page now ~6,600px tall at 1440 wide).
Commit: `v3-5: shorter service pages with per-service mockups and one disclaimer`.

## V3-6: Engagement and pricing signals (complete, 2026-10-23)
Delivered: src/content/engagement.ts (three shapes: Diagnostic, Project, Ongoing support, each with "best when", description and "you get"; "How pricing works": quote after the first conversation, written scope with every quote, no work before agreement, changes agreed in writing). NO prices, rates or durations; restates commitments already published; listed for owner confirmation. `EngagementShapes` section (connected three-step track + folded pricing panel) on every service page and on /services (replacing the old engagement notes paragraph, which it supersedes; the process timeline stays on /services only).
Fixes during review: removed an unverifiable claim ("many clients begin with a diagnostic"); folded corner clipped pricing text (panel padding). Copy guard now also bans "our clients", "many clients", "most clients", "clients say", "trusted by".
Validation: typecheck, lint, vitest 161/161; engagement section screenshot reviewed on the dev server.
Commit: `v3-6: engagement shapes and how pricing works`.

## V3-7: De-duplication and de-formularising (complete, 2026-10-23)
Delivered: About no longer repeats the homepage (principles cards and audience mosaic removed; page is hero, who we are, relationship to Datatechhub, conditional leadership, statement, closing). Folio numbers removed from section eyebrows sitewide (kept only for genuinely numbered items: cards, steps, contents, case-study report sections). Gold italic heading accent kept only on the homepage hero, statement bands, contact and 404; services, about, booking, case studies and insights headings are now plain. Repetition summary after V3: process timeline only on /services; principles and audiences only on the homepage; engagement shapes on /services and service pages (by design).
Validation: typecheck, lint, vitest 161/161; production build in the scratchpad copy: qa:responsive and qa:a11y on all 10 public routes pass; About screenshot reviewed (about 4,400px tall at 1440 wide).
Commit: `v3-7: remove repeated sections, fewer folios and accents`.

## V3-8: Performance, images, final QA, docs (complete, 2026-10-23)
Performance (first Lighthouse measurement on the project; Lighthouse 12, simulated mobile, production build served locally):
- Before: / perf 89 (LCP 3.4s, Speed Index 4.2s), /services/data-analytics 95, /contact 89 (TBT 310ms). LCP elements were small (logo, breadcrumb) because headlines and leads faded in from opacity 0 and did not count as painted.
- Fix: headline, eyebrow and lead text on all hero/intro sections now render immediately; the entrance animation stays only on actions and visuals.
- After: / perf 94 (3 stable runs; LCP 3.0s, SI 1.4s, TBT 10-20ms), /services/data-analytics 95 (SI 1.1s), /contact 96 (SI 0.8s), /about 100 (LCP 1.8s). Accessibility 100 and best practices 100 on all measured pages; CLS 0. SEO 66 only because the site is deliberately noindex without NEXT_PUBLIC_SITE_URL (the single failing audit is is-crawlable).
- Tested and rejected: dropping the Instrument Sans width axis halves the largest font file (57KB to 30KB) but improved LCP by only 0.1s; kept, because the condensed folio-card titles depend on it. The remaining LCP (about 3s) is mostly Lighthouse's simulated slow-4G network plus the web-font swap of the lead paragraph.
- One cold-start run scored 63 (TBT 990ms); three repeat runs were stable at 94. Treated as an outlier.
Images: removed the one photo no longer used (boardroom, replaced by the dashboard mockup); 25 photos remain, all used; next/image serves resized modern formats.
Final QA (fresh production build of the project in the scratchpad copy): typecheck, lint, vitest 161/161 (15 files); qa:responsive on all 10 public routes, two clean runs; qa:a11y (31 links, axe WCAG 2.2 AA, keyboard, reduced motion): pass; unapproved content and unknown routes 404; [launch] warnings logged as expected with nothing configured.
Commit: `v3-8: measured performance, text no longer fades in, final v3 qa`.

---

# V3 fixes (after the V3 critique; owner: "not version 4, just fixes")

Owner decisions: Book a consultation is the primary action. Fix critique items 1-8 and 10 of the V3 critique, except item 9 (contact configuration) and the parked "real team/proof" item. No invented prices or durations (item 8 gets qualitative scale notes and optional price fields that stay hidden until the business supplies figures).

| # | Fix | Status |
|---|-----|--------|
| F1 | Primary action = Book a consultation (hero, service heroes, closing cards, footer duplicate CTA removed) | complete |
| F2 | Homepage cut to ~7 sections (principles + commitments merged, audiences moved to About, challenges folded into the problem story) | complete |
| F3 | Service pages: one specific "what we do" list, plain titles, mockup full width instead of cramped in the hero | complete |
| F4 | One engagement model (shapes with their stages) on /services; service pages link to it instead of repeating it | complete |
| F5 | Weak stock photos replaced (services hero; services rows use mockups) | complete |
| F6 | Scale/cost signals (qualitative, optional price fields hidden until supplied) | complete |
| F7 | Smaller items (mobile hero, sound-familiar strip) | complete |
| F8 | QA, Lighthouse, docs | complete |
| F9 | Navigation redesign (owner request: more sophisticated header) | complete |

### F1 (complete, 2026-10-23)
Homepage hero primary button is now "Book a consultation" (enquiry secondary); service, About and services-overview heroes put booking first; closing cards list "Talk it through" first with a gold ring and "Recommended first step" label (`OrnamentCard recommended`); the footer's duplicate booking link after the closing cards is removed (header CTA unchanged). Validation: typecheck, lint, vitest 161/161. Commit: `fix(f1): book a consultation is the primary action`.

### F2 (complete, 2026-10-23)
Homepage is now seven sections: hero, problem story (common problems as tags; separate strip removed), services, showcase, statement, "What working with us is like" (principles and commitments merged into four items in `workingWithUs`; approved credibility evidence still replaces it), closing (+ Insights preview only when articles are publishable). Audience mosaic moved to About (About reordered so backgrounds alternate with or without leadership). Removed: `principles`, `credibilityFallback` content and the `Commitments` component. Height at 1440px about 7,300px in production (was 9,500); 390px about 12,000px (was 16,300). Validation: typecheck, lint, vitest 161/161; screenshots reviewed. Commit: `fix(f2): homepage cut to seven sections`.

### F3 (complete, 2026-10-23)
Capabilities rewritten in specific terms on all four service pages (six each); the AI page's separate "where it fits" list folded in (`useCases` removed from type and content). Capability cards use serif titles (`FolioCard titleStyle="serif"`) instead of condensed capitals. Hero is text-only; the service's mockup now sits full width (max 64rem) directly below it. Problem tags moved inside the problem story (separate strip removed). AI page 7,969px at 1440 (was 8,420) before F4 shortens the engagement block. Validation: typecheck, lint, vitest 161/161; screenshots reviewed. Commit: `fix(f3): one specific capability list and full-width service mockups`.

### F4 (complete, 2026-10-23)
One engagement model: each shape lists which of the five stages it covers (Diagnostic: understand, diagnose, design; Project: design, implement; Ongoing support: support and improve), highlighted chips with screen-reader "Included/Not included" text. Shown once, on /services as "How we work" (#how-we-work), replacing the separate process timeline and the previous duplicate block; service pages show a compact `EngagementLink` strip ("Three ways to start: Diagnostic, Project, Ongoing support" -> How we work and how pricing works). Removed unused services-overview engagement copy. Tests: tests/engagement.test.ts (stage labels match process order; every stage covered; no prices/durations in engagement copy). Heights at 1440: /services about 8,000px (was 8,800), service pages about 7,300px. Validation: typecheck, lint, vitest 164/164; screenshots reviewed. Commit: `fix(f4): one engagement model shown once`.

### F5 (complete, 2026-10-23)
Services hero photo replaced (casual "shorts and sandals" shot -> professional working meeting `workshop`); the four /services rows now show each service's mockup instead of stock people (`ServiceFeature` takes a `visual`). Removed three photos no longer used (team-casual, team-discussion, planning-wall): 22 photos, 8.6MB. Validation: typecheck, lint, vitest 164/164; screenshot reviewed. Commit: `fix(f5): services page shows mockups, weak stock photo replaced`.

### F6 (complete, 2026-10-23)
Each engagement shape now has a "Scale" line (Diagnostic: the smallest commitment, one problem, one written plan; Project: sized to one agreed deliverable, bigger work split into approved stages; Ongoing support: only what is agreed in advance) and an optional `price: { from, confirmed: true } | null` that renders "From ..." only when the business supplies a figure. All prices are null. Tests: every shape has a scale signal; prices may only appear through the confirmed field; no figures or durations elsewhere. Validation: typecheck, lint, vitest 165/165. Commit: `fix(f6): scale signals and optional confirmed prices`.

### F7 (complete, 2026-10-23)
"Sound familiar?" strip: already folded into the problem stories (F2, F3). Mobile hero tightened (top padding, gaps, heading/lead spacing, base-size lead below sm): dashboard top moved from 729px to 606px on 390x844 (about 240px visible above the fold, was 115px) and from 725px to 603px on 360x740 (about 140px, was 15px). Desktop unchanged. Screen reader: real screen-reader and real-device testing are not possible in this environment; as a proxy, the accessibility tree (Playwright aria snapshot) of / and /services/ai-automation was reviewed: one h1, logical h2/h3 outline, labelled regions and landmarks, every mockup exposed as a figure named by its illustrative caption containing a fully described image. Manual screen-reader and real-phone testing remain on the release checklist. Commit: `fix(f7): mobile hero shows the dashboard sooner`.

### F8 (complete, 2026-10-23)
Found during measurement: /services became longer on mobile after F5 (mockups are taller than the photos they replaced). Removed the abstract "Where one service leans on another" section (service pages already show related services) and its content/test.
Page heights (production build, before fixes -> after): / desktop 9,530 -> 7,224, mobile 16,313 -> 12,351; /services 8,838 -> 7,323, mobile 12,817 -> 11,650; /services/ai-automation 8,420 -> 6,947, mobile 12,931 -> 9,982; /about 5,538 / 7,294 (now includes the audience mosaic).
Lighthouse (simulated mobile): / 94, /services 98, /services/ai-automation 95; accessibility 100 and best practices 100; CLS 0.
QA (fresh production build in the scratchpad copy): typecheck, lint, vitest 164/164 (16 files); qa:responsive on all 10 public routes (clean runs) and qa:a11y (32 links, axe, keyboard, reduced motion): pass; unapproved content and unknown routes 404.
Commit: `fix(f8): final qa; services overview shortened on mobile`.

### F9: Navigation redesign (complete, 2026-10-23)
Owner: header "too short and understyled; professional, decent but not flat". Delivered: slim charcoal `UtilityBar` (positioning line, public email when set, parent tagline; an `aside` landmark; scrolls away, hidden below md); taller sticky main bar (--header-height 5.25rem) with "How we work" added to the primary nav, a divider and a raised "Book a consultation" button with an arrow; `HeaderShell` adds a shadow and frosted background once scrolled (height constant, no layout shift); full-width Services mega-menu (line icons per service via `ServiceIcon`, summaries, "All services", charcoal "Not sure where to start?" card with the three ways to start and the booking button); mobile menu with service tiles and icons. Nav test updated for "How we work".
Validation: typecheck, lint, vitest 164/164; production build: qa:responsive and qa:a11y on all 10 routes pass (axe "region" finding on the utility bar fixed by making it a labelled aside); nav fits without wrapping at 1024/1100/1180; mega-menu keyboard: Enter opens (10 links), Escape closes and returns focus. Note: the owner's dev server served a stale bundle during review; the production build shows the current menu.
Commit: `fix(f9): sophisticated two-tier header and services mega-menu`.

---

# Version 4 checkpoints (plan in IMPLEMENTATION_PLAN.md)

| # | Title | Status |
|---|-------|--------|
| V4-1 | Readout mark replaces the star | complete |
| V4-2 | Motif pass: labels, headline accent, links | complete |
| V4-3 | Copy pass and guard | not started |
| V4-4 | Imagery and photo-plus-mockup compositions | not started |
| V4-5 | QA, Lighthouse, docs | not started |

## V4-1: Readout mark (complete, 2026-10-23)
New project symbol `Mark` (src/components/ui/Mark.tsx): a chart corner with one plotted point and faint guide lines (reading a value off a chart); `variant="bullet"` (no guides, heavier strokes) for list sizes. Replaced the four-point star in 30 files; `Ornament` removed, `OrnamentCard` renamed `MarkCard`; star-specific rotate-on-hover removed. Placeholder favicon and touch icon now draw the readout mark. Validation: typecheck, lint, vitest 164/164; production build; card, bullet and icon screenshots reviewed. Commit: `v4-1: readout mark replaces the star`.

## V4-2: Motif pass (complete, 2026-10-23)
Section labels: gold rule + uppercase tracking replaced by the readout mark + sentence-case label (Eyebrow, mega-menu). Headline accents: gold italic words replaced by the measurement bracket (`Accent`: upright words with a fine gold dimension line ticked at both ends) in the hero, page heroes, statement bands, contact, 404, error and footer slogan. Numerals: italic serif replaced by light tabular sans "readout" figures (large) or small semibold tabular counters (labels) across process steps, contents lists, report sections, cards, mosaic, menus, case covers, 404. Links: italic serif links replaced by sans semibold with an arrow (hero, closing cards, insights preview, contact band, about). Italics now only for genuine quotations (field note, problem quotes). Process markers: rotated diamonds replaced by plotted points.
Validation: typecheck, lint, vitest 164/164; production build; qa:a11y on 5 routes passes; hero screenshot reviewed.
Commit: `v4-2: measurement bracket, readout numerals, mark labels`.
