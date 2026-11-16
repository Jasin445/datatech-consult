import { MockFrame } from "./MockFrame";

type Cell = { v: string; bad?: boolean };

// Illustrative "before" state: the inconsistencies a manual report usually hides.
const header = ["Date", "Region", "Product", "Units", "Amount (₦)", "Status"];
const rows: Cell[][] = [
  [{ v: "03/02/2026" }, { v: "Lagos" }, { v: "Line A" }, { v: "120" }, { v: "1,440,000" }, { v: "Paid" }],
  [{ v: "2026-02-03", bad: true }, { v: "lagos ", bad: true }, { v: "Line A" }, { v: "120" }, { v: "1440000", bad: true }, { v: "paid", bad: true }],
  [{ v: "4 Feb", bad: true }, { v: "Abuja" }, { v: "Line B" }, { v: "" , bad: true }, { v: "860,000" }, { v: "Pending" }],
  [{ v: "05/02/2026" }, { v: "LAG", bad: true }, { v: "Svc" }, { v: "40" }, { v: "#REF!", bad: true }, { v: "Paid" }],
  [{ v: "06/02/2026" }, { v: "Kano" }, { v: "Line A" }, { v: "75" }, { v: "900,000" }, { v: "Overdue" }],
  [{ v: "06/02/2026" }, { v: "Kano" }, { v: "Line A" }, { v: "75" }, { v: "900,000" }, { v: "Overdue" }],
];
const notes = ["3 date formats", "Same region, 3 spellings", "Duplicate row", "Broken formula"];
const flaggedCells = rows.flat().filter((c) => c.bad).length; // 8
const issueSummary = [
  { n: String(flaggedCells), label: "flagged cells" },
  { n: "4", label: "issue types" },
  { n: "1", label: "duplicate row" },
  { n: "1", label: "broken formula" },
];

/**
 * Messy spreadsheet mockup: the starting point for most reporting work.
 * Mobile cut: below `md` two middle rows and the notes strip are hidden, so the sheet shows
 * a clean row, a bad row, a clean row and the duplicate row — the whole story, in four rows.
 */
export function SpreadsheetMock({ className = "" }: { className?: string }) {
  return (
    <MockFrame
      title="sales_report_FINAL_v3 (2).xlsx"
      label="Spreadsheet with common problems highlighted: mixed date formats, the same region spelled three ways, a duplicated row, a missing value and a broken formula."
      className={className}
      bodyClassName="p-0"
    >
      {/* Spreadsheet chrome: sheet tabs and a formula bar. */}
      <div className="flex items-center gap-2 border-b border-border bg-surface px-3 pt-2">
        <span className="rounded-t-md border border-b-0 border-border bg-white px-3 py-1 text-[11px] font-semibold text-charcoal">Sales</span>
        <span className="rounded-t-md px-3 py-1 text-[11px] text-muted">Summary</span>
        <span className="ml-auto pb-1 text-[10px] text-muted">6 rows · 6 columns</span>
      </div>
      <div className="flex items-center gap-2 border-b border-border px-3 py-1.5">
        <span className="grid size-5 shrink-0 place-items-center rounded bg-charcoal text-[10px] font-bold text-white italic">fx</span>
        <span className="min-w-0 flex-1 truncate rounded border border-border bg-white px-2 py-1 font-mono text-[11px] text-charcoal">A2 · 03/02/2026</span>
        <span className="hidden shrink-0 rounded-full bg-danger px-2 py-0.5 text-[9px] font-bold text-white uppercase sm:block">8 issues</span>
      </div>

      {/* Issues found: a count strip above the grid. */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-b border-border bg-warning-bg px-3 py-2">
        <span className="text-[10px] font-bold tracking-[0.12em] text-warning-text uppercase">Issues found</span>
        {issueSummary.map((s, i) => (
          <span key={s.label} className={`items-baseline gap-1 text-[11px] text-warning-text ${i < 2 ? "flex" : "hidden sm:flex"}`}>
            <span className="font-display text-base leading-none tabular-nums">{s.n}</span>
            {s.label}
          </span>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[26rem] border-collapse text-[10px] sm:text-[11px]">
          <thead>
            <tr className="bg-surface text-muted">
              <th className="w-8 border-r border-b border-border px-1 py-1 font-normal" />
              {header.map((h, i) => (
                <th key={h} className="border-r border-b border-border px-2 py-1 text-left font-normal">
                  {String.fromCharCode(65 + i)}
                </th>
              ))}
            </tr>
            <tr>
              <td className="border-r border-b border-border bg-surface px-1 py-1 text-center text-muted">1</td>
              {header.map((h) => (
                <td key={h} className="border-r border-b border-border px-2 py-1 font-semibold whitespace-nowrap text-charcoal">
                  {h}
                </td>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, ri) => (
              <tr key={ri} className={`${ri === 5 ? "bg-danger/10" : ""} ${ri === 3 || ri === 4 ? "hidden md:table-row" : ""}`}>
                <td className="border-r border-b border-border bg-surface px-1 py-1 text-center text-muted">
                  <span className="inline-flex items-center gap-1">
                    {ri + 2}
                    {ri === 5 && <span className="rounded-full bg-danger px-1.5 py-px text-[8px] font-bold text-white uppercase">Dup</span>}
                  </span>
                </td>
                {r.map((c, ci) => (
                  <td
                    key={ci}
                    className={`border-r border-b border-border px-2 py-1 whitespace-nowrap ${c.bad ? "bg-danger/10 font-semibold text-danger" : "text-charcoal"}`}
                  >
                    <span className="inline-flex items-center gap-1.5">
                      {c.bad && (
                        <span className="grid size-3.5 shrink-0 place-items-center rounded-full bg-danger text-[9px] leading-none font-bold text-white">!</span>
                      )}
                      {c.v || " "}
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="hidden flex-wrap gap-2 border-t border-border bg-surface px-4 py-3 md:flex">
        {notes.map((n) => (
          <span key={n} className="rounded-full border border-danger/30 bg-white px-2.5 py-1 text-[10px] font-semibold text-danger">
            {n}
          </span>
        ))}
      </div>
    </MockFrame>
  );
}
