import { MarkCard } from "@/components/cards/MarkCard";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ChartBackdrop } from "./ChartBackdrop";

type Option = { title: string; text: string; cta: string; href: string; recommended?: boolean };

/** Closing charcoal section with the two ways to start, over a faint plotted-chart backdrop. */
export function NextStep({ eyebrow, heading, lead, options, id = "next-step-heading" }: { eyebrow: string; heading: string; lead?: string; options: readonly Option[]; id?: string }) {
  return (
    <Section tone="charcoal" labelledBy={id} className="relative isolate overflow-hidden">
      <ChartBackdrop />
      <SectionHeading id={id} eyebrow={eyebrow} heading={heading} lead={lead} onDark align="center" />
      <ul className="mx-auto grid max-w-[60rem] gap-6 md:grid-cols-2 md:gap-10">
        {options.map((o) => (
          <li key={o.href}>
            <MarkCard title={o.title} text={o.text} cta={o.cta} href={o.href} recommended={o.recommended} tall />
          </li>
        ))}
      </ul>
    </Section>
  );
}
