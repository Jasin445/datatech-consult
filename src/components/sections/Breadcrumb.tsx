import Link from "next/link";

export type Crumb = { label: string; href?: string };

/** The last crumb is the current page and is not a link. */
export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <ol>
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.label}>
              {item.href && !last ? <Link href={item.href}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
