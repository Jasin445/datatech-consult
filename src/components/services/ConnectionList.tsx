import Link from "next/link";
import { services } from "@/content/services";
import type { Connection } from "@/content/services-overview";

export function ConnectionList({ items }: { items: readonly Connection[] }) {
  return (
    <ul className="item-grid item-grid--3 item-grid--card">
      {items.map((item) => (
        <li key={item.title}>
          <h3>{item.title}</h3>
          <p>{item.text}</p>
          <p className="connection-links">
            {item.slugs.map((slug) => {
              const service = services.find((s) => s.slug === slug);
              return service ? (
                <Link key={slug} href={service.href}>
                  {service.title}
                </Link>
              ) : null;
            })}
          </p>
        </li>
      ))}
    </ul>
  );
}
