import { ArrowRight, Ornament } from "@/components/ui/Ornament";
import { Panel } from "@/components/ui/Panel";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { engagement, STAGE_LABELS } from "@/content/engagement";

/**
 * Engagement shapes as a connected track (diagnostic -> project -> support, start anywhere),
 * each showing which of the five stages it covers, followed by how pricing works. Shown once, on /services
 * (service pages link to it with EngagementLink).
 */
export function EngagementShapes({ id = "engagement-heading", tone = "surface" }: { id?: string; tone?: "default" | "surface" }) {
  return (
    <Section tone={tone} labelledBy={id}>
      <SectionHeading id={id} eyebrow={engagement.eyebrow} heading={engagement.heading} lead={engagement.lead} />
      <ol className="grid gap-4 lg:grid-cols-3 lg:gap-0">
        {engagement.shapes.map((shape, i) => (
          <li key={shape.name} className="relative flex">
            <article className={`flex flex-1 flex-col border border-border bg-white p-7 lg:p-8 ${i > 0 ? "lg:border-l-0" : ""}`}>
              <p className="mb-3 font-display text-lg text-gold italic">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mb-3 text-3xl">{shape.name}</h3>
              <p className="mb-4 border-l-2 border-gold pl-3 text-sm font-semibold text-charcoal">Best when: {shape.bestWhen}</p>
              <p className="mb-4 text-muted">{shape.text}</p>
              <ul className="mb-5 flex flex-wrap gap-1.5" aria-label={`Stages covered by ${shape.name}`}>
                {STAGE_LABELS.map((label, si) => (
                  <li
                    key={label}
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                      shape.stages.includes(si) ? "bg-primary text-white" : "border border-border text-muted line-through decoration-muted/50"
                    }`}
                  >
                    <span className="sr-only">{shape.stages.includes(si) ? "Included: " : "Not included: "}</span>
                    {label}
                  </li>
                ))}
              </ul>
              <p className="mb-5 flex items-baseline gap-2 text-sm text-charcoal">
                <span className="shrink-0 text-xs font-semibold tracking-[0.16em] text-gold uppercase">Scale</span>
                {shape.scale}
              </p>
              {shape.price && <p className="mb-5 font-display text-2xl text-charcoal">From {shape.price.from}</p>}
              <p className="mt-auto mb-0 border-t border-border pt-4 text-sm">
                <span className="mb-1 block text-xs font-semibold tracking-[0.16em] text-gold uppercase">You get</span>
                {shape.youGet}
              </p>
            </article>
            {i < engagement.shapes.length - 1 && (
              <span aria-hidden="true" className="absolute top-1/2 -right-4 z-10 hidden size-8 -translate-y-1/2 place-items-center rounded-full border border-border bg-white text-gold lg:grid">
                <ArrowRight className="size-4" />
              </span>
            )}
          </li>
        ))}
      </ol>
      <Panel tone={tone === "surface" ? "surface" : "white"} compact className="mt-8">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-center lg:pr-14">
          <h3 className="mb-0 text-3xl lg:col-span-4">{engagement.pricing.heading}</h3>
          <ul className="grid gap-3 lg:col-span-8">
            {engagement.pricing.points.map((point) => (
              <li key={point} className="flex items-baseline gap-3">
                <Ornament className="size-3 shrink-0 text-gold" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </Panel>
    </Section>
  );
}
