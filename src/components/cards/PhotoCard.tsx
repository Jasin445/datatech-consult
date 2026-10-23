import Link from "next/link";
import type { Photo as PhotoData } from "@/content/media/photos";
import { ArrowRight } from "@/components/ui/Ornament";
import { Photo } from "@/components/ui/Photo";

/**
 * Image-led card: tall photograph with the title set over a dark gradient, a short line below,
 * and the whole card clickable through the title link (stretched with ::after).
 */
export function PhotoCard({
  photo,
  folio,
  title,
  text,
  href,
  sizes = "(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw",
}: {
  photo: PhotoData;
  folio?: string;
  title: string;
  text: string;
  href: string;
  sizes?: string;
}) {
  return (
    <article className="group relative flex h-full flex-col">
      <div className="relative aspect-[4/5] overflow-hidden bg-charcoal">
        <Photo photo={photo} fill sizes={sizes} decorative className="transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
        <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-charcoal via-charcoal/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6">
          {folio && <p className="mb-2 font-display text-lg text-gold-soft italic">{folio}</p>}
          <h3 className="mb-0 text-[clamp(1.75rem,1.1rem+1vw,2.1rem)] leading-[1.02] text-white">
            <Link href={href} className="text-white no-underline after:absolute after:inset-0 hover:text-white">
              {title}
            </Link>
          </h3>
        </div>
      </div>
      <div className="flex flex-1 items-start justify-between gap-4 border-b border-charcoal/15 py-5">
        <p className="mb-0 text-muted">{text}</p>
        <ArrowRight className="mt-1 size-5 shrink-0 text-gold transition-transform duration-300 group-hover:translate-x-1" />
      </div>
    </article>
  );
}
