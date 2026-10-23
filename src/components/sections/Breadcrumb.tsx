import Link from "next/link";

export type Crumb = { label: string; href?: string };

/** The last crumb is the current page and is not a link. */
export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav className="mb-4 text-sm" aria-label="Breadcrumb">
      <ol className="flex flex-wrap gap-2">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.label} className="not-first:before:mr-2 not-first:before:text-muted not-first:before:content-['/']">
              {item.href && !last ? <Link href={item.href} className="inline-block py-2">{item.label}</Link> : <span aria-current="page" className="text-muted">{item.label}</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
