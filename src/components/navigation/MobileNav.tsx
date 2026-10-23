"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { usePathname } from "next/navigation";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { NavLink } from "./NavLink";
import type { NavItem } from "@/lib/site";

/**
 * Disclosure-style mobile menu: a toggle button with aria-expanded controlling a link list.
 * Escape closes it and returns focus to the toggle. The menu closes on navigation because
 * open state is tied to the pathname it was opened on.
 */
export function MobileNav({ items, cta }: { items: NavItem[]; cta: NavItem }) {
  const pathname = usePathname();
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;
  const menuId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);

  function close(returnFocus: boolean) {
    setOpenPath(null);
    if (returnFocus) toggleRef.current?.focus();
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape" && open) {
      event.stopPropagation();
      close(true);
    }
  }

  return (
    <div onKeyDown={onKeyDown} className="lg:hidden">
      <button
        ref={toggleRef}
        type="button"
        className="inline-flex min-h-11 min-w-11 cursor-pointer items-center gap-2 rounded-sm border border-border bg-white px-3 font-semibold text-charcoal min-[480px]:px-4"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpenPath(open ? null : pathname)}
      >
        <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h10" />}
        </svg>
        <span className="sr-only min-[360px]:not-sr-only">Menu</span>
      </button>
      {open && (
        <nav id={menuId} className="absolute inset-x-0 top-full max-h-[calc(100dvh-var(--header-height))] overflow-y-auto border-y border-border bg-white shadow-card" aria-label="Mobile">
          <Container className="pb-6">
            <ul className="pt-4 pb-6">
              {items.map((item, i) => (
                <li key={item.href} className="border-b border-border">
                  <NavLink href={item.href} onClick={() => close(false)} className="w-full gap-4 py-3 font-display text-3xl">
                    <span aria-hidden="true" className="font-display text-base text-gold italic">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <ButtonLink href={cta.href} className="mt-3 w-full" onClick={() => close(false)}>
              {cta.label}
            </ButtonLink>
          </Container>
        </nav>
      )}
    </div>
  );
}
