import Link from "next/link";
import type { Service } from "@/content/services";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="card service-card">
      <h3>{service.title}</h3>
      <p>{service.summary}</p>
      <ul className="check-list" aria-label={`${service.title}: how we can help`}>
        {service.helpsWith.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
      <Link className="card-link" href={service.href}>
        Learn about {service.shortName}
      </Link>
    </article>
  );
}
