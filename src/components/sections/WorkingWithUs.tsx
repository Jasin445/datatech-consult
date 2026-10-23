import type { TitledItem } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Mark } from "@/components/ui/Mark";

/** Compact strip: heading on the left, four short commitments on the right. */
export function WorkingWithUs({ eyebrow, heading, items }: { eyebrow: string; heading: string; items: readonly TitledItem[] }) {
  return (
    <section aria-labelledby="working-heading" className="py-(--section-space)">
      <Container className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 id="working-heading" className="mb-0">
            {heading}
          </h2>
        </div>
        <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:col-span-8">
          {items.map((item) => (
            <li key={item.title} className="border-t border-charcoal/15 pt-5">
              <h3 className="mb-2 flex items-center gap-3 text-2xl">
                <Mark variant="bullet" className="size-4 shrink-0 text-gold" />
                {item.title}
              </h3>
              <p className="mb-0 text-muted">{item.text}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
