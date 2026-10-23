"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export const navLinkClass =
  "inline-flex min-h-11 items-center font-medium text-charcoal no-underline hover:text-primary hover:underline aria-[current=page]:font-bold aria-[current=page]:text-primary";

export function NavLink({
  href,
  children,
  onClick,
  className,
}: {
  href: string;
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  const pathname = usePathname();
  const current = pathname === href || pathname.startsWith(`${href}/`);
  return (
    <Link
      href={href}
      className={[navLinkClass, className].filter(Boolean).join(" ")}
      aria-current={current ? "page" : undefined}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
