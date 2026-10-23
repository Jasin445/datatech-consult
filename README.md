# Datatechhub Consulting website

Multi-page business website for Datatechhub Consulting (parent brand: Datatechhub). Next.js App Router, strict TypeScript, Tailwind CSS v4, code-managed content, no database or CMS.

## Commands
```bash
npm install
npm run dev        # development server
npm run build      # production build
npm start          # serve the production build
npm run lint
npm run typecheck
npm test
# QA against a running production server on :3000 (needs Google Chrome installed)
npm run qa:responsive   # 10 routes x 320/390/820/1280/1680: overflow, one h1, console errors
npm run qa:a11y         # internal link crawl, axe WCAG 2.2 AA, keyboard focus, reduced motion
```

## Environment
Copy `.env.example` to `.env.local`. Every variable is optional until the feature that needs it is used; unconfigured integrations must degrade honestly (no fake success). Never commit `.env.local`.
`NEXT_PUBLIC_SITE_URL` must be set at build time. Without it the whole site is noindex, robots.txt blocks crawling and the sitemap is empty (safe for previews).

## Structure
`src/app` routes, `sitemap.ts`, `robots.ts`, `opengraph-image.tsx`, `api/contact` · `src/components/{ui,layout,navigation,sections,services,case-studies,insights,forms,seo}` · `src/styles/globals.css` (Tailwind import, `@theme` tokens, base) · `src/lib` site config, env validation, content governance (`content/`), enquiry pipeline (`contact/`, `email/`, `validation/`), booking, SEO (`seo/`) · `src/content` typed content (home, services, about, leadership, case studies, insights, booking, privacy) · `tests` vitest · `scripts/qa` browser QA.

## Styling
Tailwind CSS v4 utilities only. Rules, colour tokens and class mapping are in `STYLING.md`. Read it before touching UI.

## Content management
Content lives in code with a status of `dummy`, `draft` or `approved` (`src/lib/content/status.ts`). Production shows `approved` only. Never mark content approved without business verification.

## Privacy gate
In production the contact form is disabled until `src/content/privacy.ts` has status `"approved"`. Approving it requires every business fact in that file; otherwise the build fails with the missing names. Development always shows the form so it can be tested.

## Resuming work
Read `PROGRESS.md`, `STYLING.md`, then `CHECKPOINTS.md` and `IMPLEMENTATION_PLAN.md`. The original project brief is in `MASTER_PROMPT.md`. Check `git status` and `git log`, run `npm run typecheck && npm test`, then continue from the first incomplete checkpoint. If the records and files disagree, trust the files and update the records.
