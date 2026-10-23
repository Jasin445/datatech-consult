import type { Photo as PhotoData } from "@/content/media/photos";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Photo } from "@/components/ui/Photo";

export type DataPlace = { caption: string; photo: PhotoData };

const tileHeight = ["lg:h-[26rem]", "lg:h-[32rem] lg:mt-10", "lg:h-[24rem] lg:mt-20", "lg:h-[30rem] lg:mt-4", "lg:h-[27rem] lg:mt-14"] as const;

/**
 * Photo strip of the places data actually starts (shops, stalls, fields, desks), staggered like contact prints.
 * Horizontal swipe on small screens. Captions describe settings, never clients.
 */
export function WhereDataLives({ eyebrow, heading, lead, places }: { eyebrow: string; heading: string; lead: string; places: readonly DataPlace[] }) {
  return (
    <section aria-labelledby="places-heading" className="overflow-hidden py-(--section-space)">
      <Container>
        <div className="mb-10 grid gap-6 lg:mb-14 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 id="places-heading" className="mb-0">
              {heading}
            </h2>
          </div>
          <p className="mb-0 text-lg text-muted lg:col-span-5">{lead}</p>
        </div>
        <ul
          tabIndex={0}
          aria-label="Photos: where the data comes from (scrolls sideways on small screens)"
          className="-mx-(--gutter) flex snap-x snap-mandatory gap-4 overflow-x-auto px-(--gutter) pb-4 lg:mx-0 lg:grid lg:grid-cols-5 lg:items-start lg:overflow-visible lg:px-0 lg:pb-0">
          {places.map((place, i) => (
            <li key={place.caption} className={`relative h-[22rem] w-[72%] shrink-0 snap-start overflow-hidden rounded-xl sm:w-[40%] lg:w-auto ${tileHeight[i % tileHeight.length]}`}>
              <Photo photo={place.photo} fill sizes="(min-width: 1024px) 20vw, (min-width: 640px) 40vw, 72vw" />
              <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-charcoal/85 via-charcoal/10 to-transparent" />
              <p className="absolute inset-x-0 bottom-0 mb-0 p-5 text-[0.95rem] leading-snug font-medium text-white">{place.caption}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
