/**
 * ArchTransition — the moment between the photo statement band and the charcoal
 * closing section on /about, where belief turns into action.
 *
 * A grand centred arch, gold-traced, cut into the bottom of the statement band:
 * the night skyline shows through the arch like a doorway into the city, and
 * the charcoal of the closing section rises up to meet it. The arch is one
 * gesture — a double gold line (a firm trace with a fainter echo) and a small
 * gold keystone diamond at the apex — not a separator strip. It overlaps the
 * bottom of the statement band (negative margin equal to its own height), so
 * it adds no vertical space; its charcoal fill merges seamlessly with the
 * closing section below. About only — the home statement band is untouched.
 * Purely visual, no text, no link.
 */
export function ArchTransition() {
  return (
    <div aria-hidden="true" className="relative z-10 -mt-28 h-28 lg:-mt-40 lg:h-40">
      {/* Keystone: a small gold diamond sitting on the apex of the arch. */}
      <span className="absolute top-0 left-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-gold" />
      <svg
        aria-hidden="true"
        className="block h-full w-full"
        viewBox="0 0 1440 160"
        preserveAspectRatio="none"
        focusable="false"
      >
        {/* Charcoal fill: everything below the arch boundary, merging into NextStep. */}
        <path
          d="M0 112 H480 C480 20 600 0 720 0 C840 0 960 20 960 112 H1440 V160 H0 Z"
          fill="var(--color-charcoal)"
        />
        {/* Gold trace along the boundary — the arch line. */}
        <path
          d="M0 112 H480 C480 20 600 0 720 0 C840 0 960 20 960 112 H1440"
          fill="none"
          stroke="var(--color-gold)"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
        {/* Fainter echo of the arch, just inside the trace. */}
        <path
          d="M0 126 H480 C480 34 600 14 720 14 C840 14 960 34 960 126 H1440"
          fill="none"
          stroke="var(--color-gold)"
          strokeOpacity="0.35"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}
