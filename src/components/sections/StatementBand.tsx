import type { Photo as PhotoData } from "@/content/media/photos";
import { Container } from "@/components/ui/Container";
import { Mark } from "@/components/ui/Mark";
import { Photo } from "@/components/ui/Photo";
import { Accent } from "@/components/ui/Accent";

/** Full-bleed photograph with a large serif statement. The photo is decorative here. */
export function StatementBand({ text, accent, photo }: { text: string; accent: string; photo: PhotoData }) {
  return (
    <section aria-label="Our view" className="relative isolate flex min-h-[26rem] items-center overflow-hidden bg-charcoal py-24 lg:min-h-[34rem]">
      <Photo photo={photo} fill decorative sizes="100vw" className="-z-10 opacity-60" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-r from-charcoal via-charcoal/75 to-charcoal/20" />
      <Container>
        <Mark className="mb-8 size-10 text-gold-soft" />
        <p className="mb-0 max-w-[18ch] font-display text-display text-white">
          {text} <Accent onDark>{accent}</Accent>
        </p>
      </Container>
    </section>
  );
}
