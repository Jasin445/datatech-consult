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
        <span aria-hidden="true">{open ? "✕" : "☰"}</span>
        <span className="sr-only min-[360px]:not-sr-only">Menu</span>
      </button>
      {open && (
        <nav id={menuId} className="absolute inset-x-0 top-full max-h-[calc(100dvh-var(--header-height))] overflow-y-auto border-t border-border bg-white" aria-label="Mobile">
          <Container>
            <ul className="pt-3 pb-6">
              {items.map((item) => (
                <li key={item.href}>
                  <NavLink href={item.href} onClick={() => close(false)} className="w-full py-2 text-lg">
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
