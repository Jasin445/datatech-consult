Current checkpoint: 6
Status: COMPLETE (awaiting authorisation to start Checkpoint 7)

Completed checkpoints:
- Checkpoint 1: complete (foundation, official logo)
- Checkpoint 2: complete (homepage)
- Checkpoint 3: complete (services overview)
- Checkpoint 4: complete (Data Analytics & Business Intelligence page + reusable service-detail template)
- Checkpoint 5: complete (Data Infrastructure & Engineering page)
- Checkpoint 6: complete (AI & Automation page)

Current work:
- None in progress. Next: Checkpoint 7, Business & Technology Consulting page (completes all four service pages).

Files completed (Checkpoint 6):
- src/app/services/ai-automation/page.tsx
- src/content/service-details/ai-automation.ts
- ServiceDetail type gained an optional `useCases` section; ServiceDetailPage renders it and keeps section backgrounds alternating with or without it
- tests/service-details.test.ts: AI page added to the shared checks; guarantee test now strips "can’t guarantee" and rejects "guarantee/eliminate/risk-free"; new test asserts risk, maintenance, human oversight and fit sections exist and that copy never says "always" or implies replacing staff

Validation (actually run):
- typecheck, lint: pass. Tests: 27/27 pass. Production build: pass.
- Chromium: /services/ai-automation returns 200; no horizontal overflow at 320, 390, 820, 1280, 1680px; one h1; all sections labelled; section tones alternate (checked on all three finished service pages); desktop screenshot reviewed.
- Route status: /services, /services/data-analytics, /services/data-infrastructure, /services/ai-automation return 200; /services/business-technology-consulting returns 404.

Not yet verified:
- Contrast with a tool, touch behaviour, focus styling review; mobile/tablet screenshots only checked for overflow

Outstanding issues:
- /services/business-technology-consulting 404 until Checkpoint 7. Its content should clearly separate advisory deliverables from implementation work; add it to tests/service-details.test.ts. Related-service links from other pages to it currently 404.
- /about, /contact, /book-consultation, /privacy still 404 until their checkpoints.
- No canonical URL (Checkpoint 14). All copy is proposed and needs business review.

Configuration blockers:
- No email, booking, site URL, contact email or parent-brand URL configured

Next action:
- Checkpoint 7: add src/content/service-details/business-technology-consulting.ts and src/app/services/business-technology-consulting/page.tsx using ServiceDetailPage. Cover discovery and requirements, business and technical assessment, technology evaluation, solution architecture, implementation planning, advisory deliverables, and an explicit distinction between advisory work and implementation. Add it to tests, then verify all four service pages and the overview link correctly.
