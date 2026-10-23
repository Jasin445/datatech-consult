import Link from "next/link";
import { services } from "@/content/services";

type FitItem = { situation: string; slug: string };

export function FitList({ items }: { items: readonly FitItem[] }) {
  return (
    <ul className="grid gap-4">
      {items.map((item) => {
        const service = services.find((s) => s.slug === item.slug);
        if (!service) return null;
        return (
          <li
            key={item.slug}
            className="grid gap-2 rounded-md border border-l-4 border-border border-l-primary bg-white px-6 py-4 md:grid-cols-[1.4fr_1fr] md:items-center md:gap-6"
          >
            <p className="mb-0 text-lg text-charcoal">{item.situation}</p>
            <Link className="font-semibold" href={service.href}>
              {service.title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
