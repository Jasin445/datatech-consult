import type { TitledItem } from "@/content/home";
import type { Photo as PhotoData } from "@/content/media/photos";
import { Container } from "@/components/ui/Container";
import { Ornament } from "@/components/ui/Ornament";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Commitments (or approved evidence) as an ornament list beside a photograph. */
export function Commitments({
  eyebrow,
  folio,
  heading,
  lead,
  items,
  photo,
}: {
  eyebrow: string;
  folio?: string;
  heading: string;
  lead: string;
  items: readonly TitledItem[];
  photo: PhotoData;
}) {
  return (
    <section aria-labelledby="commitments-heading" className="py-(--section-space)">
      <Container className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <SectionHeading id="commitments-heading" eyebrow={eyebrow} folio={folio} heading={heading} lead={lead} />
          <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {items.map((item) => (
              <li key={item.title} className="border-t border-border pt-5">
                <h3 className="mb-2 flex items-center gap-3 text-2xl">
                  <Ornament className="size-4 shrink-0 text-gold" />
                  {item.title}
                </h3>
                <p className="mb-0 text-muted">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative lg:col-span-5">
          <div aria-hidden="true" className="absolute -top-4 -left-4 h-2/3 w-2/3 bg-gold-tint" />
          <div className="relative aspect-[4/5] overflow-hidden">
            <Photo photo={photo} fill sizes="(min-width: 1024px) 40vw, 100vw" />
          </div>
        </div>
      </Container>
    </section>
  );
}
