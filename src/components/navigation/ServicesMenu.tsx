"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, type FocusEvent, type KeyboardEvent } from "react";
import { ArrowRight, Mark } from "@/components/ui/Mark";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { engagement } from "@/content/engagement";
import { ctas } from "@/lib/site";
import { navLinkClass } from "./NavLink";

export type MenuService = { slug: string; title: string; summary: string; href: string };

/**
 * Desktop services mega-menu (disclosure pattern): a button toggles a full-width panel under the header
 * (the root is not positioned, so the panel is placed against the sticky header). Escape closes and returns
 * focus; closes on outside click, when focus leaves, and on navigation.
 */
export function ServicesMenu({ services }: { services: readonly MenuService[] }) {
  const pathname = usePathname();
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;
  const id = useId();
  const root = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const current = pathname === "/services" || pathname.startsWith("/services/");

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpenPath(null);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === "Escape" && open) {
      e.stopPropagation();
      setOpenPath(null);
      button.current?.focus();
    }
  }

  function onBlur(e: FocusEvent<HTMLDivElement>) {
    if (open && !root.current?.contains(e.relatedTarget as Node | null)) setOpenPath(null);
  }

  return (
    <div ref={root} onKeyDown={onKeyDown} onBlur={onBlur}>
      <button
        ref={button}
        type="button"
        aria-expanded={open}
        aria-controls={id}
        aria-current={current ? "page" : undefined}
        onClick={() => setOpenPath(open ? null : pathname)}
        className={`${navLinkClass} cursor-pointer gap-1.5 bg-transparent`}
      >
        Services
        <svg aria-hidden="true" viewBox="0 0 16 16" className={`size-3.5 transition-transform ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M4 6l4 4 4-4" />
        </svg>
      </button>
      {open && (
        <div id={id} className="absolute inset-x-0 top-full z-50 border-t border-border bg-white shadow-[0_40px_60px_-40px_rgb(23_43_58/45%)]">
          <div className="mx-auto grid w-full max-w-[calc(var(--container-max)+2*var(--gutter))] grid-cols-12 gap-10 px-(--gutter) py-10">
            <div className="col-span-8">
              <p className="mb-5 flex items-center gap-3 text-xs font-semibold tracking-[0.18em] text-gold uppercase">
                <span aria-hidden="true" className="h-px w-8 bg-current" />
                Our services
              </p>
              <ul className="grid grid-cols-2 gap-2">
                {services.map((s) => (
                  <li key={s.href}>
                    <Link href={s.href} onClick={() => setOpenPath(null)} className="group flex h-full gap-4 rounded-md p-4 no-underline transition-colors hover:bg-surface">
                      <span className="grid size-11 shrink-0 place-items-center rounded-md border border-border bg-white text-primary transition-colors group-hover:border-gold group-hover:text-gold">
                        <ServiceIcon slug={s.slug} className="size-5" />
                      </span>
                      <span>
                        <span className="mb-1 flex items-center gap-2 font-display text-xl leading-tight text-charcoal">
                          {s.title}
                          <ArrowRight className="size-3.5 -translate-x-1 text-gold opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100" />
                        </span>
                        <span className="block text-sm text-muted">{s.summary}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/services" onClick={() => setOpenPath(null)} className="mt-4 ml-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold">
                All services
                <ArrowRight />
              </Link>
            </div>
            <div className="col-span-4 flex flex-col rounded-md bg-charcoal p-7 text-footer-text">
              <Mark className="mb-5 size-6 text-gold-soft" />
              <p className="mb-2 font-display text-2xl leading-tight text-white">Not sure where to start?</p>
              <p className="mb-5 text-sm">Tell us the problem. We’ll point you to the right service, or tell you if you don’t need one.</p>
              <p className="mb-2 text-xs font-semibold tracking-[0.16em] text-gold-soft uppercase">Three ways to start</p>
              <ul className="mb-6 grid gap-1.5 text-sm">
                {engagement.shapes.map((shape) => (
                  <li key={shape.name}>
                    <Link href="/services#how-we-work" onClick={() => setOpenPath(null)} className="flex items-center gap-2 text-white no-underline hover:text-gold-soft">
                      <Mark variant="bullet" className="size-2.5 shrink-0 text-gold-soft" />
                      {shape.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href={ctas.consultation.href}
                onClick={() => setOpenPath(null)}
                className="mt-auto inline-flex min-h-11 items-center justify-center gap-2 rounded-sm bg-white px-5 font-semibold text-charcoal no-underline hover:bg-surface hover:text-charcoal"
              >
                {ctas.consultation.label}
                <ArrowRight />
              </Link>
              <Link href="/services#fit-heading" onClick={() => setOpenPath(null)} className="mt-3 text-center text-sm text-white">
                Find your starting point
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
