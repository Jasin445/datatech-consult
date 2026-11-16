import Link from "next/link";
import type { Photo as PhotoData } from "@/content/media/photos";
import { ArrowRight } from "@/components/ui/Mark";
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
  aspect = "tall",
}: {
  photo: PhotoData;
  folio?: string;
  title: string;
  text: string;
  href: string;
  sizes?: string;
  aspect?: "tall" | "wide";
}) {
  return (
    <article className="group relative flex h-full flex-col rounded-[1.25rem] bg-white shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift">
      <div className={`relative overflow-hidden rounded-t-[1.25rem] bg-charcoal ${aspect === "wide" ? "aspect-[16/10]" : "aspect-[4/5]"}`}>
        <Photo photo={photo} fill sizes={sizes} decorative className="transition-transform duration-700 ease-out group-hover:scale-[1.05]" />
        <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-charcoal via-charcoal/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6">
          {folio && <p className="mb-2 text-xs font-semibold tracking-[0.16em] text-gold-soft tabular-nums">{folio}</p>}
          <h3 className="mb-0 text-[clamp(1.75rem,1.1rem+1vw,2.1rem)] leading-[1.02] text-white">
            <Link href={href} className="text-white no-underline after:absolute after:inset-0 hover:text-white">
              {title}
            </Link>
          </h3>
        </div>
      </div>
      <div className="flex flex-1 items-start justify-between gap-4 p-5 sm:p-6">
        <p className="mobile-detail mb-0 text-muted">{text}</p>
        <span className="mt-1 flex size-10 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold transition-colors duration-300 group-hover:bg-gold group-hover:text-white">
          <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-0.5" />
        </span>
      </div>
    </article>
  );
}
