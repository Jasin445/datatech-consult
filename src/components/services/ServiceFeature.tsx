import type { Service } from "@/content/services";
import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRight, Ornament } from "@/components/ui/Ornament";

/** Editorial service row: the service's mockup on one side (alternating), serif title, summary, outcomes, action. */
export function ServiceFeature({ service, visual, index }: { service: Service; visual: ReactNode; index: number }) {
  const flip = index % 2 === 1;
  return (
    <article className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
      <div className={`relative min-w-0 lg:col-span-6 ${flip ? "lg:order-2" : ""}`}>
        <p aria-hidden="true" className="mb-3 font-display text-5xl leading-none text-gold italic">
          {String(index + 1).padStart(2, "0")}
        </p>
        {visual}
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
