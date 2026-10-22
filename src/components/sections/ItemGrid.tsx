import type { TitledItem } from "@/content/home";

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
    <ul className={`item-grid item-grid--${columns} item-grid--${variant}`}>
      {items.map((item) => (
        <li key={item.title}>
          <h3>{item.title}</h3>
          <p>{item.text}</p>
        </li>
      ))}
    </ul>
  );
}
