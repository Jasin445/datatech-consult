import type { ElementType, ReactNode } from "react";

/** Page-width wrapper. Width and gutters come from --container-max and --gutter (see globals.css). */
export function Container({
  as: Tag = "div",
  className,
  children,
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag
      className={["mx-auto w-full max-w-[calc(var(--container-max)+2*var(--gutter))] px-(--gutter)", className]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </Tag>
  );
}
