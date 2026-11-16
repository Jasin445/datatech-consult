import type { ReactNode } from "react";
import { Container } from "./Container";

/** Standard page section. Pass `labelledBy` with the id of the section heading for landmark naming. */
export function Section({
  id,
  labelledBy,
  tone = "default",
  className,
  children,
}: {
  id?: string;
  labelledBy?: string;
  tone?: "default" | "surface" | "mist" | "charcoal";
  className?: string;
  children: ReactNode;
}) {
  const toneClass = { default: "", surface: "bg-surface", mist: "bg-mist", charcoal: "bg-charcoal text-footer-text" }[tone];
  const classes = ["py-(--section-space)", toneClass, className].filter(Boolean).join(" ");
  return (
    <section id={id} aria-labelledby={labelledBy} className={classes}>
      <Container>{children}</Container>
    </section>
  );
}
