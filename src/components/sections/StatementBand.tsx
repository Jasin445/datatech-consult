import type { Photo as PhotoData } from "@/content/media/photos";
import { Container } from "@/components/ui/Container";
import { Mark } from "@/components/ui/Mark";
import { Photo } from "@/components/ui/Photo";

/**
 * Full-bleed photograph with a large serif statement. The photo is decorative here.
 * The wash is charcoal — the same dark blue as the closing section below — so the
 * band melts into it instead of contrasting with it: the photo fades out into
 * solid charcoal at the bottom, and no line marks the join.
 */
export function StatementBand({ text, accent, photo }: { text: string; accent: string; photo: PhotoData }) {
  return (
    <section aria-label="Our view" className="relative isolate flex min-h-[28rem] items-center overflow-hidden bg-charcoal py-24 lg:min-h-[36rem]">
      <Photo photo={photo} fill decorative sizes="100vw" className="-z-10 opacity-50" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-r from-charcoal via-charcoal/80 to-charcoal/30" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-b from-transparent via-charcoal/70 via-60% to-charcoal to-85%" />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-px bg-gold/50" />
      <Mark aria-hidden="true" className="absolute -right-6 -bottom-10 -z-10 size-56 text-white/5" />
      <Container>
        <Mark className="mb-8 size-12 text-gold-soft" />
        <p className="mb-0 max-w-[20ch] font-display text-display text-white">
          {text} <em className="text-gold-soft">{accent}</em>
        </p>
      </Container>
    </section>
  );
}
