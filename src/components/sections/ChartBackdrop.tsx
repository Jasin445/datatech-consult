/**
 * Decorative backdrop for charcoal sections: faint graph-paper grid, a rising trend line with a soft fill,
 * and dashed readout guides to one plotted point (the readout mark at full scale). Low contrast by design.
 */
export function ChartBackdrop() {
  // Trend line in a 1440x800 plot; the readout point sits on it at (1150, 250).
  const line = "M-20 690 C 160 660, 260 700, 400 610 S 640 560, 760 500 S 980 430, 1080 300 S 1300 220, 1460 150";
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 h-[42rem] w-[60rem] -translate-x-1/2 -translate-y-[40%] rounded-full bg-[radial-gradient(closest-side,rgb(30_100_171/22%),transparent)]" />
      <svg className="absolute inset-0 h-full w-full text-gold-soft" viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice" fill="none">
        <defs>
          <pattern id="chart-grid" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M80 0H0V80" stroke="currentColor" strokeOpacity="0.07" strokeWidth="1" />
          </pattern>
          <linearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="currentColor" stopOpacity="0.10" />
            <stop offset="1" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect width="1440" height="800" fill="url(#chart-grid)" />
        <path d="M60 40V740H1440" stroke="currentColor" strokeOpacity="0.22" strokeWidth="1.5" />
        <path d={`${line} L1460 800 L-20 800 Z`} fill="url(#chart-fill)" />
        <path d={line} stroke="currentColor" strokeOpacity="0.35" strokeWidth="2" />
        <path d="M60 250H1150M1150 250V740" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1" strokeDasharray="3 6" />
        <circle cx="1150" cy="250" r="22" fill="currentColor" fillOpacity="0.08" />
        <circle cx="1150" cy="250" r="7" fill="currentColor" fillOpacity="0.55" />
      </svg>
    </div>
  );
}
