import type { Audience } from "@/content/home";
import { Photo } from "@/components/ui/Photo";

/**
 * Who we help, as an asymmetric photo mosaic: the first tile is tall on desktop.
 * Photos are decorative (the caption carries the meaning).
 */
export function AudienceMosaic({ items }: { items: readonly Audience[] }) {
  return (
    <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2">
      {items.map((item, i) => (
        <li
          key={item.title}
          className={`group relative isolate flex min-h-[20rem] flex-col justify-end overflow-hidden bg-charcoal p-7 ${
            i === 0 ? "lg:row-span-2 lg:min-h-[40rem]" : ""
          } ${i === 3 ? "lg:col-span-2" : ""}`}
        >
          <Photo photo={item.photo} fill decorative sizes="(min-width: 1024px) 40vw, (min-width: 768px) 50vw, 100vw" className="-z-10 transition-transform duration-700 group-hover:scale-[1.04]" />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-t from-charcoal via-charcoal/55 to-charcoal/5" />
          <p className="mb-2 text-xs font-semibold tracking-[0.16em] text-gold-soft tabular-nums">{String(i + 1).padStart(2, "0")}</p>
          <h3 className="mb-2 text-[clamp(1.75rem,1.2rem+1.2vw,2.5rem)] leading-[1.02] text-white">{item.title}</h3>
          <p className="mb-0 max-w-[40ch] text-footer-text">{item.text}</p>
        </li>
      ))}
    </ul>
  );
}
