import type { ReactNode } from "react";
import type { Photo as PhotoData } from "@/content/media/photos";
import { Photo } from "@/components/ui/Photo";

/**
 * A mockup shown in its setting: a photograph with the mockup overlapping its lower-left corner.
 * The photo is decorative here (the mockup carries the described content); the mockup keeps its caption visible.
 */
export function InContext({ photo, children, priority = false }: { photo: PhotoData; children: ReactNode; priority?: boolean }) {
  return (
    <div className="relative pb-6 sm:pb-0">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 bottom-6 z-0 translate-x-3 translate-y-3 rounded-[1.5rem] border border-gold/40 sm:bottom-0" />
      <div className="relative z-10 ml-auto aspect-[4/3] w-full overflow-hidden rounded-[1.5rem] shadow-hero ring-1 ring-white/20 sm:aspect-[4/5] sm:w-[86%] lg:aspect-[4/5]">
        <Photo photo={photo} fill decorative priority={priority} sizes="(min-width: 1024px) 38vw, (min-width: 640px) 78vw, 100vw" />
        <div aria-hidden="true" className="absolute inset-0 bg-linear-to-tr from-charcoal/35 via-transparent to-transparent" />
      </div>
      <div className="relative z-10 -mt-24 w-[94%] sm:absolute sm:-bottom-6 sm:left-0 sm:mt-0 sm:w-[68%] lg:-bottom-14 lg:-left-4">{children}</div>
    </div>
  );
}
