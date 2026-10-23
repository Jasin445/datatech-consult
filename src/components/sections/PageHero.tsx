import type { ReactNode } from "react";
import type { Photo as PhotoData } from "@/content/media/photos";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Photo } from "@/components/ui/Photo";

/**
 * V2 inner-page opening: breadcrumb, eyebrow, serif h1 (optional gold italic accent), lead,
 * optional actions, and an optional framed photograph with the offset gold rule. Text first on mobile.
 */
export function PageHero({
  eyebrow,
  heading,
  accent,
  lead,
  photo,
  visual,
  above,
  actions,
}: {
  eyebrow: string;
  heading: string;
  accent?: string;
  lead: string;
  /** Omit for text-only openings (index pages, legal pages, case studies). */
  photo?: PhotoData;
  /** A coded visual (product mockup) shown instead of a photo. */
  visual?: ReactNode;
  above?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <section aria-labelledby="page-heading" className={`relative overflow-hidden pt-8 lg:pt-12 ${photo || visual ? "border-b border-border pb-16 lg:pb-24" : "pb-12 lg:pb-16"}`}>
      <Container>
        {above}
        <div className="mt-6 grid items-center gap-12 lg:mt-10 lg:grid-cols-12 lg:gap-12">
          <div className={visual ? "lg:col-span-6" : photo ? "lg:col-span-7" : "lg:col-span-10"}>
            <div>
              <Eyebrow>{eyebrow}</Eyebrow>
            </div>
            <h1 id="page-heading" className="mb-6 text-[clamp(2.6rem,1.6rem+4vw,5rem)] leading-[1]">
              {heading}
              {accent && (
                <>
                  {" "}
                  <em className="text-gold">{accent}</em>
                </>
              )}
            </h1>
            <p className="mb-0 max-w-[54ch] text-lg text-muted">{lead}</p>
            {actions && <div className="mt-9 flex animate-rise flex-wrap items-center gap-x-8 gap-y-4 [animation-delay:270ms]">{actions}</div>}
          </div>
          {visual && (
            <div className="relative min-w-0 animate-rise [animation-delay:200ms] lg:col-span-6">
              <div aria-hidden="true" className="absolute top-6 -right-3 -bottom-3 left-8 bg-gold-tint" />
              <div className="relative">{visual}</div>
            </div>
          )}
          {!visual && photo && (
            <div className="relative animate-rise [animation-delay:200ms] lg:col-span-5">
              <div aria-hidden="true" className="absolute top-5 -right-3 -bottom-5 left-5 border border-gold" />
              <div className="relative aspect-[4/3] overflow-hidden bg-surface lg:aspect-[4/5]">
                <Photo photo={photo} fill priority sizes="(min-width: 1024px) 38vw, 100vw" />
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
