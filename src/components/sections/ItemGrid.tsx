import type { TitledItem } from "@/content/home";

const columnClass = {
  2: "md:grid-cols-2",
  3: "md:grid-cols-2 lg:grid-cols-3",
  4: "md:grid-cols-2 lg:grid-cols-4",
} as const;

const itemClass = {
  plain: "border-l-[3px] border-secondary pl-4",
  card: "rounded-md border border-border bg-white p-6",
} as const;

/** Titled text items in a responsive grid. Used for challenges, principles, audiences and commitments. */
export function ItemGrid({
  items,
  columns = 2,
  variant = "plain",
}: {
  items: readonly TitledItem[];
  columns?: 2 | 3 | 4;
  variant?: "plain" | "card";
}) {
  return (
    <ul className={`grid grid-cols-1 gap-6 ${columnClass[columns]}`}>
      {items.map((item) => (
        <li key={item.title} className={itemClass[variant]}>
          <h3 className="mb-2 text-lg leading-[1.15]">{item.title}</h3>
          <p className="mb-0 text-muted">{item.text}</p>
        </li>
      ))}
    </ul>
  );
}
