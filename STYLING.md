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

---

# V2 design system ("field report"), added at V2-1

## Fonts
- **Instrument Serif** (`font-display`): h1-h3 (set in base styles, weight 400 only: hierarchy comes from size, never bold), card titles, italic accents (`<em>` inside headings renders gold italic), italic call-to-action links, folio numerals.
- **Instrument Sans** (`font-sans`, default): body and UI. Has a width axis: `font-stretch-condensed` + uppercase + tracking for folio-card titles.
- Both are loaded with `next/font/google` in `layout.tsx`: downloaded at build time and self-hosted (no runtime request to Google; the privacy notice stays accurate).
- Sizes: `text-display` (hero/statements), `text-4xl` (h1), `text-3xl` (h2), `text-2xl` (h3).

## Colour
- Existing tokens unchanged. Added `gold` (#8c6a2f, the V2 brand accent) plus derived `gold-soft` (on charcoal) and `gold-tint` (featured card fill).
- Blue (`primary`) stays the action colour: primary buttons and links. Gold is editorial: eyebrows, folio numbers, rules, ornaments, card buttons.
- Contrast: `gold` text only on white/surface. On charcoal use `gold-soft`. On `gold-tint` use charcoal or muted text (gold is 4.3:1 there). `gold-deep` (#7a5c28, added in the redesign) is the text-safe darker gold for small gold text on tinted backgrounds (`gold-tint`, `mist` — e.g. eyebrows, the workflow human-review label, dashboard trend chips); it passes 4.5:1 on white, surface, mist and gold-tint.

## Motifs (use them, do not invent new ones per page)
- **Eyebrow** (`ui/Eyebrow`): folio number + gold rule + uppercase label. Every major section opens with one via `SectionHeading` (`folio`, `eyebrow` props). Number sections 01, 02... in page order.
- **Ornament** (`ui/Ornament`): four-point star. Bullets for short lists, top of ornament cards, footer CTA.
- **Folded corner**: diagonal gradient square in the top-right corner; set `tone` to the section background.
- **Offset gold frame** behind feature photos (hero).

## Cards (src/components/cards)
- `FolioCard`: report page (square, folded corner, folio, condensed uppercase title, gold outline button with arrow; `featured` = gold tint + solid gold button). For principles, options, lists of offerings.
- `OrnamentCard`: rounded white card on a charcoal section, star, serif title, one line, italic serif CTA (whole card clickable). For two or three "ways to start" choices.
- `PhotoCard`: tall photo, title over a charcoal gradient, short line and arrow below, whole card clickable. For services and anything with a photo.
- Accessible names: repeated "Learn more" buttons carry an sr-only title suffix.

## Photography
- Only photos registered in `src/content/media/photos.ts` (licence, source, alt). Render with `ui/Photo` (next/image). Use `decorative` only when a caption already carries the meaning.
- Text over photos always sits on a charcoal gradient (`bg-linear-to-t from-charcoal ...`) for contrast.

## Sections
- `Section tone`: `default` (white), `surface`, `charcoal`. In charcoal sections pass `onDark` to `SectionHeading`/`ProcessSteps`.
- Alternate backgrounds; never put two charcoal sections next to each other.

## Motion
- One staggered entrance on the hero only (`animate-rise` + `[animation-delay:...]`), image zoom and arrow nudge on card hover, star rotation on hover. All disabled by `prefers-reduced-motion`.
- QA note: `scripts/qa/a11y-crawl.mjs` waits for animations to finish before measuring contrast.

## Added in V2-3 to V2-6
- `PageHero` (inner-page opening; photo optional), `Panel` (white folded-corner panel for forms/booking/takeaways; `compact`), `ReportSection` (sticky label column + content; long-form pages), `ContentsList` (report contents rows), `ServiceFeature` (alternating photo rows).
- Case studies never use stock photography: use `CaseCover` (typographic). Insights may use an optional registered `cover` photo.
- Placeholder favicon in `src/app/icon.tsx` / `apple-icon.tsx` until an official one is supplied.

## V3 rules (supersede earlier V2 guidance where they differ)
- Folio numbers only for genuinely numbered items (card sets, steps, contents, report sections), never on section eyebrows.
- Gold italic heading accent only on: homepage hero, statement bands, contact, 404. Elsewhere headings are plain.
- Show the work: prefer a coded mockup (src/components/visuals) over a stock photo where the section is about what we deliver. Every mockup must keep its visible illustrative caption (MockFrame); never cover it with overlapping elements.
- Grid columns that hold mockups need `min-w-0`.
- Calls to action: only `ctas.enquiry` and `ctas.consultation` from src/lib/site.ts.

## V3 fixes rules
- Primary action is Book a consultation: it leads in heroes and closing cards ("Recommended first step"); enquiry is secondary.
- Engagement model lives once, on /services (#how-we-work); other pages link to it with `EngagementLink`.
- Service mockups sit full width below the hero, not squeezed into a half-width hero column.
- Capability cards use `FolioCard titleStyle="serif"`; condensed capitals are reserved for short reference-style labels.
- Measure page height when adding sections (homepage target: about 7 sections).

## V4 rules (supersede earlier guidance where they differ)
- Symbol: the readout mark (`ui/Mark`). Never the four-point star. `variant="bullet"` at list sizes.
- Section labels: `Eyebrow` (mark + sentence-case label). No leading rules, no uppercase tracking on section labels.
- Accent words: `Accent` (measurement bracket). No gold italic accent words. Keep accents short (it wraps as one unit).
- Numbers: light tabular sans (big) or small semibold tabular (labels). No italic serif numerals.
- Italics for real quotations, plus two owner-approved exceptions: statement-band accents (gold-soft italic), the hero secondary link ("Send an enquiry") and the closing-card (MarkCard) links, which are italic serif. Other links are sans semibold with an arrow.
- Micro-labels are sentence case (no tracked uppercase), except inside mockups.
- Photos with mockups: use `visuals/InContext`; captions on photo strips describe settings, never clients.
- Hover states always transition (global base rule, 250ms). Do not add `transition-none` to interactive elements.

## Mobile-cut rule for mockups (added 2026-11-16)
- Long coded visuals are CUT on mobile, not shrunk: below `md` each mockup shows its headline
  element only (hero dashboard: one KPI + trend chart; pipeline: a four-chip stage strip;
  workflow: compact icon+title rows; options: name + total score; spreadsheet: four rows).
  The full visual returns from `md` up. The cut uses responsive display classes
  (`hidden md:block`, `hidden sm:block`) — never `hidden lg:...` on elements that already
  set `display` in their base classes.
- Charts (`visuals/charts.tsx`) are drawn like a deck: labelled y-axis (HTML labels, never
  SVG text under a non-uniform stretch), hairline gridlines, a firm baseline, tabular numbers.
- New tokens: `ink-soft`, `shadow-pop`, `shadow-glow`, `shadow-gold-glow`. Primary buttons carry
  a depth shadow (`shadow-[0_12px_28px_-12px_rgb(30_100_171/65%)]` in `ui/Button.tsx`).
