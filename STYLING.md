# Styling rules (Tailwind CSS v4)

**All styling uses Tailwind CSS utility classes. This is a project rule for every checkpoint and every AI/human contributor.**

## Rules
1. Style with Tailwind utilities in `className`. Do **not** create new `.css` files, BEM-style classes (`.card`, `.btn--primary`, `.section`...) or inline `style={{}}` (the only allowed inline style is passing a CSS custom property, as in `ProcessSteps`).
2. The only stylesheet is `src/styles/globals.css`. It contains: `@import "tailwindcss"`, the `@theme` block (design tokens), responsive layout variables, a small `@layer base` (element defaults), and the reduced-motion rule. Add to it only for global/base concerns, never per-component styles.
3. Colours come from tokens only. Use `bg-primary`, `text-charcoal`, `text-muted`, `bg-surface`, `border-border`, `bg-warning-bg`, etc. Never hard-code hex values in components (the one exception is the decorative SVG in `Hero.tsx`, which uses the same brand hexes as fill attributes). To add or change a colour, edit `@theme` in `globals.css`.
4. There is no `tailwind.config.js`. Tailwind v4 is configured in CSS (`@theme`). PostCSS is wired in `postcss.config.mjs` via `@tailwindcss/postcss`.
5. Write complete, literal class strings. Never build class names dynamically (`` `bg-${x}` ``): Tailwind cannot detect them. Use lookup objects of full strings (see `ItemGrid.tsx`, `Button.tsx`).
6. Repeated patterns go in a component or in `src/components/ui/styles.ts` (shared class strings), not in new CSS.
7. Mobile first. Breakpoints: default (<768), `md` 768, `lg` 1024, `min-[1440px]` wide. Check 320, 390, 820, 1280, 1680 for horizontal overflow.
8. Keep accessibility behaviour: min touch target `min-h-11` (44px), `sr-only` for visually hidden text, `aria-current` styling via `aria-[current=page]:`, global `:focus-visible` outline (do not remove with `outline-none`).
9. Layout variables (`--gutter`, `--section-space`, `--container-max`, `--reading-max`, `--header-height`) live in `:root` in `globals.css`, change per breakpoint, and are consumed with arbitrary-value utilities: `px-(--gutter)`, `py-(--section-space)`, `max-w-(--reading-max)`.
10. To hide a component that already sets `display` in its base classes (e.g. `Button`/`ButtonLink` use `inline-flex`), use a variant such as `max-lg:hidden`, not `hidden lg:inline-flex`. Two unprefixed display utilities conflict and the later one in the generated CSS wins (this caused the desktop CTA to show on mobile).

## Colour system (unchanged from before the migration)
| Token (utility suffix) | Value | Notes |
|---|---|---|
| `primary` | `#1e64ab` | Confirmed brand colour |
| `secondary` | `#15a8ea` | Confirmed brand colour. Accents/graphics only, 2.7:1 on white, never body text |
| `bg` | `#ffffff` | Confirmed (page background; use `bg-white` in components) |
| `charcoal` / `text` | `#172b3a` | PROPOSED, not verified brand |
| `surface` | `#f3f7fa` | PROPOSED, not verified brand |
| `primary-hover` | `#17508a` | |
| `muted` | `#4a5d6c` | Muted text, 6.4:1 on white. Was `--color-text-muted`; utility is now `text-muted` |
| `border` | `#d6e0e8` | |
| `focus` | `#0b3d73` | Focus outline |
| `warning-bg` / `warning-text` | `#fff4d6` / `#5c4300` | Dev notices and status badges |
| `danger` | `#a32020` | |
| `footer-text` / `footer-link-hover` | `#dbe6ee` / `#cfe9f9` | Footer (were hard-coded hexes before) |

Other tokens kept: font stack (Segoe UI system stack, no network fonts), type scale (`text-sm/base/lg/xl/2xl/3xl`, with the same clamp() values), `rounded-sm` 6px, `rounded-md` 10px, `shadow-card`.

## Old class to Tailwind mapping (to read older docs/commits)
| Old | Now |
|---|---|
| `.container` | `<Container>` (`mx-auto w-full max-w-[calc(var(--container-max)+2*var(--gutter))] px-(--gutter)`) |
| `.section`, `.section--surface` | `<Section tone>` (`py-(--section-space)`, `bg-surface`) |
| `.btn*`, `.btn-row` | `Button`/`ButtonLink` variants; `buttonRowClass` export |
| `.lead` | `leadClass` in `ui/styles.ts` |
| `.card` | `cardClass` in `ui/styles.ts` |
| `.check-list li`, `.value-list li` | `checkItemClass`, `valueItemClass` in `ui/styles.ts` |
| `.item-grid*` | `ItemGrid` lookup objects |
| `.process` | `ProcessSteps` |
| `.visually-hidden` | `sr-only` |
| `.skip-link`, header, footer, mobile menu | utilities in `layout.tsx`, `SiteHeader`, `SiteFooter`, `MobileNav` |
| `src/styles/tokens.css`, `sections.css` | removed; tokens are in `@theme` in `globals.css` |

## Known deliberate differences from the pre-migration CSS
- Mobile menu panel is now `absolute inset-x-0 top-full` under the sticky header (full width, scrolls inside `100dvh - header`). Before, it sat inside the header's flex child. Verify visually.
- `h1-h4` base styles now live in `@layer base` and are explicitly `font-weight: 700` (Tailwind preflight resets headings to inherit).
- Tailwind preflight now applies (it resets lists, margins, `img/svg {display:block}`).
