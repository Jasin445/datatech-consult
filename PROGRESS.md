Current checkpoint: 1
Status: COMPLETE (awaiting authorisation to start Checkpoint 2)

Completed checkpoints:
- Checkpoint 1: complete (global application foundation)

Current work:
- None in progress. Next: Checkpoint 2, Homepage.

Files completed:
- Config: package.json, tsconfig.json (strict + noUncheckedIndexedAccess), next.config.ts, eslint.config.mjs, vitest.config.mts, .gitignore, .env.example
- Styles: src/styles/tokens.css, src/styles/globals.css
- App: src/app/layout.tsx, page.tsx (temporary shell), not-found.tsx, error.tsx, loading.tsx
- Components: ui/{Button,Container,Section,DevNotice}, layout/{Brand,SiteHeader,SiteFooter}, navigation/{NavLink,MobileNav}, sections/CtaBand
- Lib: site.ts, env.ts, content/status.ts, content/registry.ts
- Tests: tests/content-status.test.ts (6 tests)
- Docs: README.md, IMPLEMENTATION_PLAN.md, PROGRESS.md, CHECKPOINTS.md, RELEASE_CHECKLIST.md

Validation (actually run):
- npm run typecheck: pass
- npm run lint: pass
- npm test: pass (6/6)
- npm run build: pass
- next start smoke test via curl: / returns 200; unknown path returns 404 with noindex and an h1; skip link, #main and one h1 present; Case Studies/Insights links absent; dev notice absent in production build; footer omits email and parent link when env unset.

Browser checks run (Playwright/Chromium): mobile menu opens, Escape closes it and returns focus to the toggle; no horizontal overflow at 1280px and 390px; desktop header with official logo screenshot reviewed.

Not yet verified:
- Touch behaviour and keyboard focus visuals
- Responsive layout at mobile/tablet/desktop/wide, colour contrast with a tool, reduced motion
- Development-mode rendering (dev notice)

Outstanding issues:
- Header/footer link to routes not yet built (/services*, /about, /contact, /book-consultation, /privacy). They 404 until their checkpoints. Expected; no stubs added.
- Homepage is a temporary shell.
- Logo is a dark wordmark: valid on white only (header). Do not use on the dark footer/CTA band.

Configuration blockers:
- (resolved) Official logo supplied and integrated
- No email, booking, site URL, contact email or parent-brand URL configured (optional until their checkpoints/launch)

Next action:
- Checkpoint 2: build the full homepage (hero, challenges, four service cards, principles, process, credibility fallback, who we help, final CTA) driven by data in src/content, with Insights hidden until approved content exists.
