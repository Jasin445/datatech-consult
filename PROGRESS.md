Current checkpoint: 8 (complete) + Tailwind migration (applied, UNVERIFIED, see below)
Status: Awaiting verification of the Tailwind migration, then authorisation to start Checkpoint 9

## READ FIRST: Tailwind migration (done after Checkpoint 8, before Checkpoint 9)
Project rule added: all styling uses Tailwind CSS v4 utilities (see STYLING.md, also referenced from README.md, IMPLEMENTATION_PLAN.md, CHECKPOINTS.md). No behaviour, content, routes, tests or logic were changed. Checkpoint 9 was NOT started.

What changed:
- Added devDependencies `tailwindcss` and `@tailwindcss/postcss` (^4.1.0) in package.json; added `postcss.config.mjs`.
- Deleted `src/styles/tokens.css` and `src/styles/sections.css`. Rewrote `src/styles/globals.css`: `@import "tailwindcss"`, `@theme` (same colour values, type scale, radii, shadow), unchanged responsive layout variables (--gutter, --section-space, ...), `@layer base` (body, h1-h4, p, a, focus-visible), reduced-motion rule.
- Converted every `.tsx` in src/components and src/app from custom classes to utilities. New shared helpers: `src/components/ui/styles.ts` (leadClass, cardClass, checkItemClass, valueItemClass), `buttonRowClass` exported from `ui/Button.tsx`. `navLinkClass` exported from `navigation/NavLink.tsx`.
- Colour tokens retained exactly; `--color-text-muted` is now `--color-muted` (utility `text-muted`); footer hexes became `footer-text` and `footer-link-hover` tokens.
- Files not touched: src/content, src/lib, tests, next.config.ts, eslint config.

NOT verified (authoring environment had no network, no node_modules):
- `npm install` has not been run, so package-lock.json is stale. FIRST ACTION: `npm install` (updates the lock file), then `npm run typecheck && npm run lint && npm test && npm run build`.
- No visual check was done. Compare against the pre-migration site (git stash or checkout commit 0da3815) at 320, 390, 820, 1280, 1680px: header/logo/menu toggle, mobile menu panel (now absolute under header, see STYLING.md), hero, card grids, process steps (numbered circles, 5 columns on desktop), breadcrumb slashes, footer, CTA band, dev notice and badge (dev server), 404/error pages.
- Likely failure points if something looks wrong: Tailwind version must be >= 4.1 (`not-first:` variant, `px-(--gutter)` syntax); heading sizes (preflight resets headings, restored in `@layer base`); `before:content-[...]` pseudo elements (checkmarks, step numbers, breadcrumb slash).
- When all pass, commit as `chore: migrate styling to Tailwind CSS v4`, update this section to "verified", then continue with Checkpoint 9 using Tailwind only.

Completed checkpoints:
- Checkpoint 1: complete (foundation, official logo)
- Checkpoint 2: complete (homepage)
- Checkpoint 3: complete (services overview)
- Checkpoint 4: complete (Data Analytics & Business Intelligence page + reusable service-detail template)
- Checkpoint 5: complete (Data Infrastructure & Engineering page)
- Checkpoint 6: complete (AI & Automation page)
- Checkpoint 7: complete (Business & Technology Consulting page; all four service pages and the overview now done)
- Checkpoint 8: complete (About page, leadership registry, content validation safeguards)

Current work:
- None in progress. Next: Checkpoint 9, Case studies.

Files completed (Checkpoint 8):
- src/app/about/page.tsx; src/content/about.ts (no founding year, legal status, history, credentials, mission or partnerships)
- src/content/leadership/profiles.ts: one fictional profile, status "dummy"; no real people supplied
- src/lib/content/leadership.ts: getPublishableLeadership (validates, then filters; production = approved only)
- src/lib/content/status.ts: added validateManagedItems and assertContentValid (invalid status, or "approved" item containing the DUMMY DATA marker, throws with the item id)
- src/components/sections/LeadershipGrid.tsx (dev-only warning and badge for non-approved profiles)
- tests/about-content.test.ts (8 tests)

Validation (actually run):
- typecheck, lint: pass. Tests: 42/42 pass. Production build: pass.
- Production output: /about returns 200 and contains no leadership section, no "Sample Person", no DUMMY text (grep count 0). Leadership section is omitted entirely while nothing is approved.
- Development server: /about shows the dummy profile with the dev notice and a "Dummy data" badge.
- Build safeguards demonstrated by temporarily editing the data: marking the placeholder profile "approved" FAILED the production build with the item id and an actionable message; an invalid status was rejected at compile time (and by the runtime validator in unit tests). File restored; build passes again.
- Chromium (production): no horizontal overflow at 320, 390, 820, 1280, 1680px; one h1; sections labelled; alternating tones; "About" current in nav; desktop screenshot reviewed.

Not yet verified:
- Contrast with a tool, touch behaviour, focus styling review; mobile/tablet screenshots only checked for overflow
- Parent-brand link rendering (needs NEXT_PUBLIC_PARENT_BRAND_URL; not set)

Outstanding issues:
- /contact, /book-consultation, /privacy return 404 until Checkpoints 11, 12, 13 (linked from header, footer, CTAs).
- No canonical URL (Checkpoint 14). All copy is proposed and needs business review.
- The About page uses the homepage principles and audiences copy; if the business wants distinct About copy, revise src/content/about.ts.
- Real leadership details, legal/company information and an approved relationship statement with Datatechhub are still needed before launch.
- Content validation currently covers leadership only. Extend assertContentValid to case studies (Checkpoint 9), articles (Checkpoint 10) and credibility evidence, and add a build-wide check in Checkpoints 14-15.

Configuration blockers:
- No email, booking, site URL, contact email or parent-brand URL configured

Next action:
- Checkpoint 9: build /case-studies and /case-studies/[slug]: typed registry using ManagedContent with status plus a project-type field (completed work, prototype, internal demonstration, ongoing), conditional index and nav (already driven by src/lib/content/registry.ts), reusable CaseStudyCard, detail template (challenge, objectives, actual contribution, approach, solution, deliverables, verified results, lessons, related services, CTA), slug validation with notFound(), generateStaticParams for publishable items only, and validation via assertContentValid. With no approved case studies the index must not expose fake projects (production returns 404 for the index route or an honest hidden state) and nav/home sections stay hidden. Use clearly labelled dummy data in development only.
