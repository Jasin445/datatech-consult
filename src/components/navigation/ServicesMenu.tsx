"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, type FocusEvent, type KeyboardEvent } from "react";
import { ArrowRight } from "@/components/ui/Ornament";
import { navLinkClass } from "./NavLink";

export type MenuService = { title: string; summary: string; href: string };

/**
 * Desktop services menu (disclosure pattern): a button toggles a panel of links.
 * Escape closes and returns focus; closes on outside click, when focus leaves, and on navigation.
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
    <div ref={root} className="relative" onKeyDown={onKeyDown} onBlur={onBlur}>
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
        <div id={id} className="absolute top-full left-1/2 z-50 mt-3 w-[34rem] -translate-x-1/2 border border-border bg-white p-3 shadow-[0_30px_60px_-30px_rgb(23_43_58/40%)]">
          <ul className="grid grid-cols-2 gap-1">
            {services.map((s) => (
              <li key={s.href}>
                <Link href={s.href} onClick={() => setOpenPath(null)} className="group block h-full p-4 no-underline hover:bg-surface">
                  <span className="mb-1 block font-display text-xl leading-tight text-charcoal group-hover:text-gold">{s.title}</span>
                  <span className="block text-sm text-muted">{s.summary}</span>
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/services" onClick={() => setOpenPath(null)} className="mt-1 flex items-center justify-between border-t border-border px-4 pt-3 pb-1 text-sm font-semibold no-underline">
            All services and how they fit together
            <ArrowRight />
          </Link>
        </div>
      )}
    </div>
  );
}
