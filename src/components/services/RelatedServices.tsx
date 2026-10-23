import { PhotoCard } from "@/components/cards/PhotoCard";
import { servicePhotos } from "@/content/home";
import { services } from "@/content/services";

/** Related services as wide photo cards. */
export function RelatedServices({ slugs }: { slugs: readonly string[] }) {
  const related = slugs.flatMap((slug) => services.filter((s) => s.slug === slug));
  return (
    <ul className="grid grid-cols-1 gap-8 md:grid-cols-2">
      {related.map((service) => (
        <li key={service.slug}>
          <PhotoCard photo={servicePhotos[service.slug]!} title={service.title} text={service.summary} href={service.href} aspect="wide" sizes="(min-width: 768px) 50vw, 100vw" />
        </li>
      ))}
    </ul>
  );
}
