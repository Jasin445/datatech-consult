import Link from "next/link";
import type { Service } from "@/content/services";
import { cardClass, checkItemClass } from "@/components/ui/styles";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className={cardClass}>
      <h3 className="mb-3">{service.title}</h3>
      <p className="text-muted">{service.summary}</p>
      <ul className="mb-4 grid gap-2" aria-label={`${service.title}: how we can help`}>
        {service.helpsWith.map((point) => (
          <li key={point} className={checkItemClass}>
            {point}
          </li>
        ))}
      </ul>
      <Link className="mt-auto pt-3 font-semibold" href={service.href}>
        Learn about {service.shortName}
      </Link>
    </article>
  );
}
