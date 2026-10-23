import { ArrowRight, Ornament } from "@/components/ui/Ornament";
import { Panel } from "@/components/ui/Panel";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { engagement } from "@/content/engagement";

/**
 * Engagement shapes as a connected track (diagnostic -> project -> support, start anywhere),
 * followed by how pricing works. Used on /services and every service page.
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
              <p className="mb-5 text-muted">{shape.text}</p>
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
