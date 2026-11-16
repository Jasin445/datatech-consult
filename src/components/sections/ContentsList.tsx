import type { TitledItem } from "@/content/home";

/** Items laid out like the contents page of a report: readout numerals, title and one line, ruled rows. */
export function ContentsList({ items }: { items: readonly TitledItem[] }) {
  return (
    <ol className="border-t border-charcoal/15">
      {items.map((item, i) => (
        <li key={item.title} className="group grid grid-cols-[auto_1fr] items-start gap-x-5 border-b border-charcoal/15 px-2 py-6 transition-colors duration-300 hover:bg-surface sm:gap-x-6 sm:px-4">
          <span aria-hidden="true" className="font-sans text-3xl font-light leading-none text-gold tabular-nums">
            {String(i + 1).padStart(2, "0")}
          </span>
          <div>
            <h3 className="mb-1 text-2xl transition-colors group-hover:text-gold">{item.title}</h3>
            <p className="mb-0 text-muted">{item.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
