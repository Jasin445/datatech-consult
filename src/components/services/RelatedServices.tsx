import Link from "next/link";
import { services } from "@/content/services";

export function RelatedServices({ slugs }: { slugs: readonly string[] }) {
  const related = slugs.flatMap((slug) => services.filter((s) => s.slug === slug));
  return (
    <ul className="related-grid">
      {related.map((service) => (
        <li key={service.slug}>
          <article className="card">
            <h3>{service.title}</h3>
            <p>{service.summary}</p>
            <Link className="card-link" href={service.href}>
              Learn about {service.shortName}
            </Link>
          </article>
        </li>
      ))}
    </ul>
  );
}
