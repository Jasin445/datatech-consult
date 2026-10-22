# Checkpoints

| # | Title | Status |
|---|-------|--------|
| 1 | Global application foundation | complete |
| 2 | Homepage | complete |
| 3 | Services overview | complete |
| 4 | Data Analytics & Business Intelligence | not started |
| 5 | Data Infrastructure & Engineering | not started |
| 6 | AI & Automation | not started |
| 7 | Business & Technology Consulting | not started |
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
