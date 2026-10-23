Current checkpoint: 10 (complete, code-level verified) on top of Checkpoint 9 and the Tailwind migration (both code-level verified)
Status: Awaiting browser/visual QA and authorisation to start Checkpoint 11

## READ FIRST: Checkpoint 10 (Insights) status
Implemented in Tailwind only, mirroring Checkpoint 9.

Verified (actually run, after `npm install`): typecheck, lint pass; tests 67/67 pass (53 before + 14 in tests/insights.test.ts); production build passes. Production (`next start`): /insights, /insights/sample-article and /insights/nope return 404; /case-studies and /case-studies/sample-case-study return 404; nav has no Insights or Case Studies link; no "DUMMY" or "Sample article" text in /, /about, /services, /services/data-analytics HTML (count 0). Development (`next dev`): /insights and /insights/sample-article return 200 with dev notice, "Dummy data" badge, noindex on the detail page, one h1, breadcrumb, key takeaways, related services; nav shows Insights; homepage shows the "Latest insights" preview. Safeguard demonstrated: marking the dummy article "approved" FAILED the production build naming `insights/sample-article`; file restored and build passes. All new Tailwind utilities were confirmed present in the built CSS.

NOT verified: no browser was available, so NO visual or responsive check has been done for the Tailwind migration, Checkpoint 9 or Checkpoint 10. Do this next at 320, 390, 820, 1280, 1680px (dev server shows the dummy content): horizontal overflow, header/logo/mobile menu panel (now absolute under the header, see STYLING.md), hero, card grids, process steps, breadcrumb slashes, checkmark lists, footer, CTA band, insight card/detail layout, homepage Insights preview (3-column on lg). Also still unrun: contrast tooling, touch behaviour, focus review. `package-lock.json` was refreshed by `npm install` (committed separately).

Files (Checkpoint 10): src/content/insights/{types,index,page}.ts; src/lib/content/insights.ts (validation: status, placeholder in approved, slug format/duplicates, real calendar date, non-empty body, related-service slugs; getPublishableInsights newest first, getInsightBySlug, getInsightSlugs, formatPublishedDate (UTC), readingTimeMinutes); src/lib/content/registry.ts (Insights now real; the temporary empty array is gone); src/components/insights/{InsightCard,InsightDetail,InsightsPreview}.tsx; src/app/insights/page.tsx and [slug]/page.tsx; conditional homepage preview in src/app/page.tsx; tests/insights.test.ts.
Behaviour: with no approved articles, production hides the nav link and the homepage preview and both routes 404 (index calls notFound(); [slug] has dynamicParams=false and no static params). Non-approved items are noindex in any environment. One fictional dummy article (development only). Author is optional and must be a real approved name; publishedOn must be the real publication date.
Next action: Checkpoint 11 (Contact and enquiry system): /contact, /api/contact with a provider adapter, zod validation, honest degradation when email env vars are unset (no fake success), the first interactive Client Component form (Tailwind only). Read `.env.example` and `src/lib/env.ts` first. Real articles and case studies still need business-supplied, verified facts.

## Checkpoint 9 (Case studies) and Tailwind migration: now code-level verified
Both were first written without network access. They are now installed, type-checked, linted, tested and built (see above), and production/dev route behaviour was checked. Only visual QA remains (see NOT verified above). Case study files: src/content/case-studies/{types,index,page}.ts; src/lib/content/case-studies.ts; src/components/case-studies/{CaseStudyCard,CaseStudyDetail}.tsx; src/app/case-studies; shared pillClass/statusPillClass in src/components/ui/styles.ts; tests/case-studies.test.ts. Tailwind migration details are in STYLING.md. The untested Tailwind failure points listed earlier (Tailwind >= 4.1, heading sizes, `before:content-[...]` pseudo elements) built without error, but still need the visual check.

Completed checkpoints:
- Checkpoint 1: complete (foundation, official logo)
- Checkpoint 2: complete (homepage)
- Checkpoint 3: complete (services overview)
- Checkpoint 4: complete (Data Analytics & Business Intelligence page + reusable service-detail template)
- Checkpoint 5: complete (Data Infrastructure & Engineering page)
- Checkpoint 6: complete (AI & Automation page)
- Checkpoint 7: complete (Business & Technology Consulting page; all four service pages and the overview now done)
- Checkpoint 8: complete (About page, leadership registry, content validation safeguards)
- Checkpoint 9: complete (case studies registry and routes)
- Checkpoint 10: complete (Insights registry, routes, homepage preview)

Current work:
- None in progress. Next: Checkpoint 11, Contact and enquiry system.

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
- Content validation now covers leadership, case studies and Insights. Still to extend: credibility evidence, plus a build-wide check in Checkpoints 14-15.

Configuration blockers:
- No email, booking, site URL, contact email or parent-brand URL configured

Next action:
- See "Next action" under Checkpoint 10 above.
