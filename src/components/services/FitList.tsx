import Link from "next/link";
import { services } from "@/content/services";

type FitItem = { situation: string; slug: string };

export function FitList({ items }: { items: readonly FitItem[] }) {
  return (
    <ul className="fit-list">
      {items.map((item) => {
        const service = services.find((s) => s.slug === item.slug);
        if (!service) return null;
        return (
          <li key={item.slug}>
            <p className="fit-list__situation">{item.situation}</p>
            <Link href={service.href}>{service.title}</Link>
          </li>
        );
      })}
    </ul>
  );
}
