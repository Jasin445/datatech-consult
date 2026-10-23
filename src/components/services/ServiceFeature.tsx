import type { Service } from "@/content/services";
import type { Photo as PhotoData } from "@/content/media/photos";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRight, Ornament } from "@/components/ui/Ornament";
import { Photo } from "@/components/ui/Photo";

/** Editorial service row: large photo on one side (alternating), folio, serif title, summary, outcomes, action. */
export function ServiceFeature({ service, photo, index }: { service: Service; photo: PhotoData; index: number }) {
  const flip = index % 2 === 1;
  return (
    <article className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
      <div className={`relative aspect-[4/3] overflow-hidden lg:col-span-6 ${flip ? "lg:order-2" : ""}`}>
        <Photo photo={photo} fill sizes="(min-width: 1024px) 50vw, 100vw" />
        <p aria-hidden="true" className="absolute top-4 left-5 mb-0 font-display text-6xl leading-none text-white italic drop-shadow-[0_2px_12px_rgb(0_0_0/45%)]">
          {String(index + 1).padStart(2, "0")}
        </p>
      </div>
      <div className="lg:col-span-6">
        <h3 className="mb-4 text-4xl">{service.title}</h3>
        <p className="mb-6 max-w-[48ch] text-lg text-muted">{service.summary}</p>
        <ul className="mb-8 grid gap-3" aria-label={`${service.title}: how we can help`}>
          {service.helpsWith.map((point) => (
            <li key={point} className="flex items-baseline gap-3">
              <Ornament className="size-3 shrink-0 text-gold" />
              {point}
            </li>
          ))}
        </ul>
        <ButtonLink href={service.href} variant="gold-outline">
          Explore {service.shortName}
          <ArrowRight />
        </ButtonLink>
      </div>
    </article>
  );
}
