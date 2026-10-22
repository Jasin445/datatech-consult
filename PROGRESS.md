Current checkpoint: 2
Status: COMPLETE (awaiting authorisation to start Checkpoint 3)

Completed checkpoints:
- Checkpoint 1: complete (global application foundation, official logo integrated)
- Checkpoint 2: complete (homepage)

Current work:
- None in progress. Next: Checkpoint 3, Services overview.

Files completed (Checkpoint 2):
- src/app/page.tsx (composes sections from content)
- src/content/home.ts, src/content/services.ts (data-driven copy; nav services in src/lib/site.ts now derive from services.ts)
- src/components/sections/{Hero,ItemGrid,ProcessSteps}.tsx, src/components/services/ServiceCard.tsx, src/components/ui/SectionHeading.tsx
- src/styles/sections.css; narrow-screen header fixes in globals.css; MobileNav label class
- tests/home-content.test.ts

Validation (actually run):
- typecheck, lint: pass. Tests: 10/10 pass. Production build: pass.
- Chromium (Playwright): no horizontal overflow at 320, 360, 390, 820, 1280, 1680px; one h1; every main section has an accessible name; header logo/descriptor/menu button do not collide at 320/360/390 (320px uses an icon-only menu button with a screen-reader label); first Tab stop is the skip link; Case Studies/Insights links absent; full-page desktop and mobile screenshots reviewed.

Not yet verified:
- Colour contrast with a tool (palette ratios computed by hand only), touch behaviour, visible focus styling review, dev-mode rendering
- Homepage Insights section: not built. Spec says it renders only with approved articles; there are none, and the article card component arrives in Checkpoint 10. Add the conditional section there.

Outstanding issues:
- Header/footer and homepage links to /services/*, /about, /contact, /book-consultation, /privacy 404 until their checkpoints.
- Credibility section shows the working-commitments fallback (no approved evidence supplied).
- Hero uses a decorative SVG (no data implied), not photography; swap in approved photography if supplied.
- All homepage copy is proposed and needs business review.

Configuration blockers:
- No email, booking, site URL, contact email or parent-brand URL configured (not needed until Checkpoints 11/12/14 or launch)

Next action:
- Checkpoint 3: build /services (introduction, four service cards reusing ServiceCard, problems addressed, how services combine, engagement process reusing ProcessSteps, enquiry/consultation CTAs). Do not simply repeat the homepage section.
