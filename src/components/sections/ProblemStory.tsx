import type { ReactNode } from "react";
import type { Photo as PhotoData } from "@/content/media/photos";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Ornament } from "@/components/ui/Ornament";
import { Photo } from "@/components/ui/Photo";

/** Problem told as a short story beside a tall photograph, ending on a turn line in italic serif. */
export function ProblemStory({
  folio,
  eyebrow,
  heading,
  paragraphs,
  turn,
  photo,
  visual,
  tags,
}: {
  folio?: string;
  eyebrow: string;
  heading: string;
  paragraphs: readonly string[];
  turn: string;
  /** Photo, or (V3) a coded visual such as the messy spreadsheet. */
  photo?: PhotoData;
  visual?: ReactNode;
  /** Short problem labels shown under the turn line. */
  tags?: readonly string[];
}) {
  return (
    <section aria-labelledby="problem-heading" className="bg-surface py-(--section-space)">
      <Container className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className={`relative min-w-0 ${visual ? "lg:col-span-6" : "lg:col-span-5"}`}>
          {visual ?? (
            photo && (
              <div className="relative aspect-[4/5] overflow-hidden lg:aspect-[3/4]">
                <Photo photo={photo} fill sizes="(min-width: 1024px) 40vw, 100vw" />
              </div>
            )
          )}
          {folio && !visual && (
            <p aria-hidden="true" className="absolute -bottom-6 left-6 mb-0 font-display text-[7rem] leading-none text-gold/25 italic select-none lg:-left-6">
              {folio}
            </p>
          )}
        </div>
        <div className={visual ? "lg:col-span-6" : "lg:col-span-7"}>
          <Eyebrow folio={visual ? undefined : folio}>{eyebrow}</Eyebrow>
          <h2 id="problem-heading" className="mb-8 text-4xl">
            {heading}
          </h2>
          <div className="max-w-[60ch] text-lg [&_p]:mb-5">
            {paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <p className="mt-8 mb-0 border-l-2 border-gold pl-5 font-display text-3xl text-charcoal italic">{turn}</p>
          {tags && tags.length > 0 && (
            <ul className="mt-8 flex flex-wrap gap-2" aria-label="Common problems">
              {tags.map((t) => (
                <li key={t} className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-sm text-charcoal">
                  <Ornament className="size-2.5 text-gold" />
                  {t}
                </li>
              ))}
            </ul>
          )}
        </div>
      </Container>
    </section>
  );
}
