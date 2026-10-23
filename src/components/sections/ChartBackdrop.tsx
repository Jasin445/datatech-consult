/**
 * Decorative backdrop for the closing section: scattered data points drift in from the left and gradually
 * settle onto one smooth line that ends at a single plotted point with its readout guides. Scattered data
 * becoming one clear line, which is what the work does. Deterministic (no randomness at render), low contrast.
 */

// The line the points settle onto, in a 1440x800 plot.
const curveY = (x: number) => 640 - 470 / (1 + Math.exp(-(x - 760) / 210));

// Deterministic pseudo-random sequence so server and client render identically.
function seeded(n: number) {
  let s = 7;
  return Array.from({ length: n }, () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  });
}

const POINTS = (() => {
  const r = seeded(480);
  const pts: { x: number; y: number; r: number; o: number }[] = [];
  for (let i = 0; i < 150; i++) {
    const t = i / 149; // 0 = far left (scattered), 1 = right (settled)
    const x = 20 + t ** 0.8 * 1120 + (r[i * 3]! - 0.5) * 50;
    const spread = (1 - t) ** 1.4 * 340; // vertical scatter shrinks to zero
    const y = curveY(x) + (r[i * 3 + 1]! - 0.5) * 2 * spread;
    pts.push({ x, y, r: 2.2 + r[i * 3 + 2]! * 2.6, o: 0.3 + t * 0.4 });
  }
  return pts;
})();

const LINE = Array.from({ length: 41 }, (_, i) => {
  const x = 520 + i * 24;
  return `${i === 0 ? "M" : "L"}${x.toFixed(0)} ${curveY(x).toFixed(1)}`;
}).join(" ");

const END = { x: 1480 - 320, y: curveY(1160) };

export function ChartBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 h-[42rem] w-[60rem] -translate-x-1/2 -translate-y-[40%] rounded-full bg-[radial-gradient(closest-side,rgb(30_100_171/22%),transparent)]" />
      <svg className="absolute inset-0 h-full w-full text-gold-soft" viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice" fill="none">
        <defs>
          <linearGradient id="settle-line" x1="520" y1="0" x2="1160" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="currentColor" stopOpacity="0" />
            <stop offset="1" stopColor="currentColor" stopOpacity="0.65" />
          </linearGradient>
        </defs>
        {POINTS.map((p, i) => (
          <circle key={i} cx={p.x.toFixed(1)} cy={p.y.toFixed(1)} r={p.r.toFixed(1)} fill="currentColor" fillOpacity={p.o.toFixed(2)} />
        ))}
        <path d={LINE} stroke="url(#settle-line)" strokeWidth="2" strokeLinecap="round" />
        <path d={`M${END.x} ${END.y.toFixed(1)}V800M${END.x} ${END.y.toFixed(1)}H1440`} stroke="currentColor" strokeOpacity="0.3" strokeWidth="1" strokeDasharray="3 6" />
        <circle cx={END.x} cy={END.y.toFixed(1)} r="22" fill="currentColor" fillOpacity="0.08" />
        <circle cx={END.x} cy={END.y.toFixed(1)} r="7" fill="currentColor" fillOpacity="0.6" />
      </svg>
    </div>
  );
}
