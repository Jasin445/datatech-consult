import Link from "next/link";
import { cardClass } from "@/components/ui/styles";
import { services } from "@/content/services";

export function RelatedServices({ slugs }: { slugs: readonly string[] }) {
  const related = slugs.flatMap((slug) => services.filter((s) => s.slug === slug));
  return (
    <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {related.map((service) => (
        <li key={service.slug}>
          <article className={`${cardClass} h-full`}>
            <h3 className="mb-3">{service.title}</h3>
            <p className="text-muted">{service.summary}</p>
            <Link className="mt-auto pt-3 font-semibold" href={service.href}>
              Learn about {service.shortName}
            </Link>
          </article>
        </li>
      ))}
    </ul>
  );
}
