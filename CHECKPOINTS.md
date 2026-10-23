# Checkpoints

| # | Title | Status |
|---|-------|--------|
| 1 | Global application foundation | complete |
| 2 | Homepage | complete |
| 3 | Services overview | complete |
| 4 | Data Analytics & Business Intelligence | complete |
| 5 | Data Infrastructure & Engineering | complete |
| 6 | AI & Automation | complete |
| 7 | Business & Technology Consulting | complete |
| 8 | About | not started |
| 9 | Case studies | not started |
| 10 | Insights | not started |
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
