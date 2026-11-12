"use client";

import { ViewTransition, useEffect, useRef, type ReactNode } from "react";

/** Adds scroll reveals to page sections and a lightweight route transition around page content. */
export default function Template({ children }: { children: ReactNode }) {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const sections = [...page.querySelectorAll<HTMLElement>("section")];
    const showAll = () => sections.forEach((section) => section.classList.add("section-visible"));

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      showAll();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("section-visible");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px 12% 0px", threshold: 0.04 },
    );

    for (const section of sections) {
      if (section.getBoundingClientRect().top < window.innerHeight * 0.92) {
        section.classList.add("section-visible");
      } else {
        section.classList.add("section-reveal");
        observer.observe(section);
      }
    }

    return () => observer.disconnect();
  }, []);

  return (
    <ViewTransition enter="page-enter" exit="page-exit" default="none">
      <div ref={pageRef}>{children}</div>
    </ViewTransition>
  );
}
