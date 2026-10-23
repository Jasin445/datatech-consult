import Link from "next/link";
import { services } from "@/content/services";
import type { Connection } from "@/content/services-overview";

export function ConnectionList({ items }: { items: readonly Connection[] }) {
  return (
    <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <li key={item.title} className="rounded-md border border-border bg-white p-6">
          <h3 className="mb-2 text-lg leading-[1.15]">{item.title}</h3>
          <p className="mb-0 text-muted">{item.text}</p>
          <p className="mt-3 mb-0 grid gap-1 font-semibold">
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
