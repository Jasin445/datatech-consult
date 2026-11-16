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
        <ul className="grid gap-6 sm:grid-cols-2 lg:col-span-8">
          {items.map((item) => (
            <li key={item.title} className="rounded-[1.25rem] border border-border bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-pop sm:p-7">
              <Mark variant="bullet" className="mb-4 size-5 text-gold" />
              <h3 className="mb-2 text-2xl">{item.title}</h3>
              <p className="mobile-detail mb-0 text-muted">{item.text}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
