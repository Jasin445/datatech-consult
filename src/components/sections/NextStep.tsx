import { OrnamentCard } from "@/components/cards/OrnamentCard";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

type Option = { title: string; text: string; cta: string; href: string };

/** Closing charcoal section with the two ways to start, as ornament cards. */
export function NextStep({ eyebrow, heading, lead, options, id = "next-step-heading" }: { eyebrow: string; heading: string; lead?: string; options: readonly Option[]; id?: string }) {
  return (
    <Section tone="charcoal" labelledBy={id}>
      <SectionHeading id={id} eyebrow={eyebrow} heading={heading} lead={lead} onDark align="center" />
      <ul className="mx-auto grid max-w-[60rem] gap-6 md:grid-cols-2 md:gap-10">
        {options.map((o) => (
          <li key={o.href}>
            <OrnamentCard title={o.title} text={o.text} cta={o.cta} href={o.href} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
