"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { usePathname } from "next/navigation";
import { ButtonLink } from "@/components/ui/Button";
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
    <div onKeyDown={onKeyDown}>
      <button
        ref={toggleRef}
        type="button"
        className="menu-toggle"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpenPath(open ? null : pathname)}
      >
        <span aria-hidden="true">{open ? "✕" : "☰"}</span>
        <span className="menu-toggle__label">Menu</span>
      </button>
      {open && (
        <nav id={menuId} className="mobile-menu" aria-label="Mobile">
          <div className="container">
            <ul className="mobile-menu__list">
              {items.map((item) => (
                <li key={item.href}>
                  <NavLink href={item.href} onClick={() => close(false)}>
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <ButtonLink href={cta.href} onClick={() => close(false)}>
              {cta.label}
            </ButtonLink>
          </div>
        </nav>
      )}
    </div>
  );
}
