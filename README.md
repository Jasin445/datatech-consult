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
```

## Environment
Copy `.env.example` to `.env.local`. Every variable is optional until the feature that needs it is used; unconfigured integrations must degrade honestly (no fake success). Never commit `.env.local`.

## Structure
`src/app` routes · `src/components/{ui,layout,navigation,sections}` · `src/styles/globals.css` (Tailwind import, `@theme` tokens, base) · `src/lib` site config, env validation, content governance · `src/content` typed content (added per checkpoint) · `tests` vitest.

## Styling
Tailwind CSS v4 utilities only. Rules, colour tokens and class mapping are in `STYLING.md`. Read it before touching UI.

## Content management
Content lives in code with a status of `dummy`, `draft` or `approved` (`src/lib/content/status.ts`). Production shows `approved` only. Never mark content approved without business verification.

## Resuming work
Read `PROGRESS.md`, `STYLING.md`, then `CHECKPOINTS.md` and `IMPLEMENTATION_PLAN.md`. Check `git status` and `git log`, run `npm run typecheck && npm test`, then continue from the first incomplete checkpoint. If the records and files disagree, trust the files and update the records.
