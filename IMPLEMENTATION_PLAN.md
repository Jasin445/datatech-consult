# Implementation plan: Datatechhub Consulting website

One Next.js application, one folder, one Git repository. Built in 15 checkpoints; stop after each.

## Stack
Next.js 16 (App Router, Turbopack), React 19, TypeScript 5.9 strict, **Tailwind CSS v4 (all styling; see STYLING.md)**, zod (validation), vitest (tests), ESLint (eslint-config-next). No database, CMS, auth, or admin. TypeScript 5.9 is used deliberately: a 7.x release exists but was not verified against Next 16 / eslint-config-next.

## Routes (all required)
`/`, `/services`, `/services/data-analytics`, `/services/data-infrastructure`, `/services/ai-automation`, `/services/business-technology-consulting`, `/about`, `/case-studies`, `/case-studies/[slug]`, `/insights`, `/insights/[slug]`, `/contact`, `/book-consultation`, `/privacy`, `/api/contact`, plus `sitemap.ts`, `robots.ts`, `not-found.tsx`.

## Architecture
- Server Components by default; Client Components only for interactivity (`NavLink`, `MobileNav`, `error.tsx`, later the contact form).
- **Styling rule: Tailwind utilities only. Read `STYLING.md` before writing any UI.** `src/styles/globals.css` is the only stylesheet: `@import "tailwindcss"`, `@theme` tokens (colours, type, radii, shadow), responsive layout variables, minimal `@layer base`. `postcss.config.mjs` uses `@tailwindcss/postcss`. No `tailwind.config.js`, no per-component CSS files.
- `src/components/ui`: Button/ButtonLink, Container, Section, SectionHeading, DevNotice, `styles.ts` (shared Tailwind class strings). `layout`: Brand, SiteHeader, SiteFooter. `navigation`: NavLink, MobileNav. `sections`: CtaBand.
- `src/lib/site.ts`: site config, services list, nav builder. `src/lib/env.ts`: server-only, per-feature env validation (never at import time).
- `src/lib/content/status.ts`: `ContentStatus` (dummy | draft | approved) and filtering. `registry.ts`: conditional Case Studies/Insights flags.
- Fonts: system stack (no network font fetch at build).

## Design tokens (defined in `@theme` in globals.css)
Confirmed: primary `#1E64AB`, secondary `#15A8EA` (accents/graphics only, 2.7:1 on white), white background. Proposed (unverified): charcoal `#172B3A`, pale blue-gray `#F3F7FA`. Container 1200px, reading 760px, gutters 20/32/48/64px, section spacing 56/72/96/112px.

## Content governance
Production output = `approved` only. `dummy`/`draft` visible in development with `DUMMY DATA — REPLACE BEFORE LAUNCH` notices, never indexed or in sitemap. Build-time validation of statuses is added with each content registry (Checkpoints 8-10) and finalised in 14-15.

## Integration boundaries
Email: provider adapter behind `/api/contact` (Checkpoint 11); env `EMAIL_PROVIDER`, `EMAIL_API_KEY`, `CONTACT_RECIPIENT_EMAIL`, `CONTACT_SENDER_EMAIL`. Booking: `NEXT_PUBLIC_BOOKING_URL` (Checkpoint 12). No analytics.

## Checkpoint sequence
1 Foundation · 2 Homepage · 3 Services overview · 4 Data Analytics · 5 Data Infrastructure · 6 AI & Automation · 7 Business & Technology Consulting (completes services) · 8 About · 9 Case studies · 10 Insights · 11 Contact + enquiry API · 12 Book consultation · 13 Privacy · 14 SEO/discovery · 15 Final QA.

## Acceptance
See sections 11 and 12 of the master prompt. Development completion is reported separately from production readiness.
