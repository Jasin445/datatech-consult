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
| 11 | Contact and enquiry system | not started |
| 12 | Consultation booking | not started |
| 13 | Privacy | not started |
| 14 | SEO and site discovery | not started |
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
