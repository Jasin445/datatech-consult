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

/** Messy spreadsheet mockup: the starting point for most reporting work. */
export function SpreadsheetMock({ className = "" }: { className?: string }) {
  return (
    <MockFrame
      title="sales_report_FINAL_v3 (2).xlsx"
      label="Illustrative spreadsheet with common problems highlighted: mixed date formats, the same region spelled three ways, a duplicated row, a missing value and a broken formula."
      className={className}
      bodyClassName="p-0"
    >
      <div className="overflow-hidden">
        <table className="w-full border-collapse text-[10px] sm:text-[11px]">
          <thead>
            <tr className="bg-surface text-muted">
              <th className="w-6 border-r border-b border-border px-1 py-1 font-normal" />
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
              <tr key={ri} className={ri === 5 ? "bg-danger/8" : ""}>
                <td className="border-r border-b border-border bg-surface px-1 py-1 text-center text-muted">{ri + 2}</td>
                {r.map((c, ci) => (
                  <td key={ci} className={`border-r border-b border-border px-2 py-1 whitespace-nowrap ${c.bad ? "bg-danger/10 font-semibold text-danger" : "text-charcoal"}`}>
                    {c.v || " "}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-wrap gap-2 border-t border-border bg-surface px-4 py-3">
        {notes.map((n) => (
          <span key={n} className="rounded-full border border-danger/30 bg-white px-2.5 py-1 text-[10px] font-semibold text-danger">
            {n}
          </span>
        ))}
      </div>
    </MockFrame>
  );
}
