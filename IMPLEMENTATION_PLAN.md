# Implementation plan: Datatechhub Consulting website

One Next.js application, one folder, one Git repository. Built in 15 checkpoints; stop after each. The full source brief is in `MASTER_PROMPT.md`.

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
Email: provider adapter behind `/api/contact` (Checkpoint 11); env `EMAIL_PROVIDER`, `EMAIL_API_KEY`, `CONTACT_RECIPIENT_EMAIL`, `CONTACT_SENDER_EMAIL`. Booking: `NEXT_PUBLIC_BOOKING_URL` (HTTPS provider link, opened in a new tab; no embed until a provider is chosen). Privacy: `src/content/privacy.ts` (draft); production disables the enquiry form until it is approved. SEO: `src/lib/seo`; indexable only with `NEXT_PUBLIC_SITE_URL` (build time) and approved content. No analytics, no cookies.

## Loading states
There is deliberately no root `loading.tsx`: it wrapped every route in a Suspense boundary so static pages shipped a "Loading…" fallback with the real content hidden until JavaScript ran. Add `loading.tsx` only to a segment that genuinely awaits slow data.

## Checkpoint sequence
1 Foundation · 2 Homepage · 3 Services overview · 4 Data Analytics · 5 Data Infrastructure · 6 AI & Automation · 7 Business & Technology Consulting (completes services) · 8 About · 9 Case studies · 10 Insights · 11 Contact + enquiry API · 12 Book consultation · 13 Privacy · 14 SEO/discovery · 15 Final QA.

## Acceptance
See sections 11 and 12 of the master prompt. Development completion is reported separately from production readiness.

## Enquiry flow (Checkpoint 11)
Validation is dependency-free (`src/lib/validation/enquiry.ts`) and shared by client and server. `/api/contact` -> `handleEnquiry` (`src/lib/contact/handle.ts`) -> `EmailProvider` adapter (`src/lib/email`, supported: `resend`). The form only renders when `getContactAvailability()` reports email as configured. Rate limiting is in-memory (5 per 10 minutes per client); on serverless or multi-instance hosting use host/edge limits or a shared store. No durable queue or retry exists; failures are shown to the visitor. Provider acknowledgement does not guarantee delivery.

---

# Version 2: visual redesign (started 2026-10-23)

## Brief (from the business owner)
V1 reads as old-fashioned and text-heavy. V2 remakes every page to be image-led and distinctive, with card styles taken from two supplied references (an "ornament" card: rounded light card on a dark field, star ornament, serif title, short line, italic serif CTA; and a "folio" card: square card with a folded corner, uppercase title, outline button with an arrow, a filled featured variant). Two branded fonts. Existing colour tokens unchanged; add one brand colour, a dark gold. Copy must be sharp, specific to our value proposition (problem-first statements), with no filler. Same governance rules as V1 (no invented facts, no fake functionality).

## Direction: "field report"
The site reads like a well-made consulting report: editorial serif headlines, documentary photography of real African workplaces and cities, dark gold rules and folio numbers (01, 02...) as the recurring motif, folded-corner "report page" cards. Charcoal sections give contrast for ornament cards. Blue stays the action colour (buttons, links); gold is the editorial accent.

## Tokens added (existing tokens unchanged)
- `--color-gold: #8c6a2f` (dark gold). 5.0:1 on white, 4.6:1 on surface: safe for text on light backgrounds.
- Derived: `--color-gold-soft` (gold mixed with white, for text/ornaments on charcoal) and `--color-gold-tint` (pale gold for card folds and featured cards).
- Fonts (self-hosted at build via next/font, no third-party requests at runtime): Instrument Serif (display: h1-h3, card titles, italic CTAs) and Instrument Sans (body and UI).

## Photography
Free-licence photographs (Unsplash License: free commercial use, no attribution required) downloaded into `public/images/photos/` and served from our own domain. Every photo is registered in `src/content/media/photos.ts` with source URL, photographer and licence; a test fails if a file is unregistered or a registered file is missing. Photos are illustrative: alt text describes the scene and never implies the people are Datatechhub staff or clients. Replace with commissioned photography when available.

## V2 checkpoints (all complete, 2026-10-23)
V2-1 Design foundation · V2-2 Homepage · V2-3 Services overview + service detail template · V2-4 About · V2-5 Contact + Booking · V2-6 Case studies, Insights, Privacy, 404 · V2-7 Sitewide copy/imagery pass, QA, docs.

## V2 outcome
Every page rebuilt with the field-report system. Copy guard (tests/copy.test.ts) and photo registry test (tests/photos.test.ts) protect the voice and image licensing. Case studies use typographic covers only. Placeholder favicon pending an official asset.

---

# Version 3: proof of work, focus and conversion (started 2026-10-23)

## Brief (owner, after the V2 critique)
Fix everything in the critique except item 1 (real people/credentials/case studies, which need owner input): consistent CTA labels; mocked product visuals (dashboards, charts, spreadsheets, diagrams) so the site shows the work; shorter, non-repetitive pages with less hedging; engagement and pricing signals; a less formulaic design; better navigation; launch-time conversion safeguards; technical gaps (performance measurement, images).

## Rules
- Mock visuals are coded (SVG/HTML), use generic labels and round illustrative numbers, and always carry a visible "Illustrative example, not client data" caption (enforced by a test). They never name a client or imply a result.
- No invented prices, rates or durations. Engagement shapes and the quoting approach are described qualitatively and listed for owner confirmation.
- One CTA vocabulary sitewide: "Send an enquiry" (/contact) and "Book a consultation" (/book-consultation).

## V3 checkpoints (all complete, 2026-10-23)
V3-1 Data visual system (mock dashboard, charts, spreadsheet, pipeline/workflow/roadmap diagrams) · V3-2 CTA vocabulary + launch conversion safeguards · V3-3 Navigation (services menu, footer contact) · V3-4 Homepage rework (visuals over stock, no repetition, varied sections) · V3-5 Service pages shortened with per-service visuals and less hedging · V3-6 Engagement and pricing signals · V3-7 About/overview de-duplication and design de-formularising pass · V3-8 Performance measurement and image optimisation, final QA, docs.

## V3 outcome
The site now shows the work (coded, captioned mockups), uses one CTA vocabulary, never sends visitors in a circle when a contact path is unavailable, warns operators at startup when no contact path exists, has a services menu, shorter service pages with one disclaimer each, engagement shapes and a pricing approach (no figures), less repetition and fewer decorative tics, and measured performance (94-100). Guards: tests/visuals.test.tsx, tests/cta.test.ts, tests/copy.test.ts (extended), service hedging test.

---

# Version 4: distinctive, not generic (started 2026-10-23)

## Brief (owner)
Remove the generic "AI-made" tells (the long rule before labels read as an em dash; the four-point star is widely used); be creative but decent and specific to this project; add more photography alongside the charts and spreadsheets.

## Decisions
- Brand mark: the **readout mark** (a chart corner with one plotted point and faint guide lines to it: reading a value off a chart). Replaces the star everywhere (ornaments, bullets, cards, menu, favicon placeholder).
- Section labels: no leading rule; the readout mark plus a sentence-case label.
- Headline accent: the **measurement bracket** (a fine gold dimension line under the key words) replaces gold italic words.
- Links: no italic-serif link style; sans semibold with an arrow.
- Copy: no two-beat "X. Y." slogans, no "not X, Y" contrasts, no em dashes in visitor copy; "honest" used sparingly. Enforced by the copy guard where a rule can be expressed.
- Photography: more licensed photos (registered, licence-checked); photo-plus-mockup compositions; a "where the work happens" strip with descriptive (not client) captions.

## V4 checkpoints
V4-1 Readout mark · V4-2 Motif pass (labels, accent, links) · V4-3 Copy pass and guard · V4-4 Imagery and compositions · V4-5 QA, Lighthouse, docs.
