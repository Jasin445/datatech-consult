"use client";

import { useEffect, useState, type ReactNode } from "react";

/**
 * Sticky header wrapper that marks itself `data-scrolled` once the page moves, so styles can add depth
 * (shadow, frosted background). Height never changes on scroll, so there is no layout shift.
 */
export function HeaderShell({ children, className }: { children: ReactNode; className: string }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header data-scrolled={scrolled} className={className}>
      {children}
    </header>
  );
}
