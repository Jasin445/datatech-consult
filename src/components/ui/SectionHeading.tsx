import { Eyebrow } from "./Eyebrow";

/**
 * Section opening: optional eyebrow (folio number + label), serif heading and lead.
 * Use `onDark` inside charcoal sections (headings and lead switch to light colours).
 */
export function SectionHeading({
  id,
  heading,
  lead,
  eyebrow,
  folio,
  onDark = false,
  align = "left",
}: {
  id: string;
  heading: string;
  lead?: string;
  eyebrow?: string;
  folio?: string;
  onDark?: boolean;
  align?: "left" | "center";
}) {
  const center = align === "center";
  return (
    <div className={`mb-12 max-w-(--reading-max) lg:mb-16 ${center ? "mx-auto text-center [&>p:first-child]:justify-center" : ""}`}>
      {eyebrow && (
        <Eyebrow folio={folio} onDark={onDark}>
          {eyebrow}
        </Eyebrow>
      )}
      <h2 id={id} className={`mb-5 tracking-[-0.015em] ${onDark ? "text-white" : ""}`}>
        {heading}
      </h2>
      <div aria-hidden="true" className={`mb-6 flex items-center gap-2 ${center ? "justify-center" : ""}`}>
        <span className="h-0.5 w-20 rounded-full bg-gold" />
        <span className="size-1.5 rounded-full bg-gold/60" />
      </div>
      {lead && <p className={`mb-0 max-w-[60ch] text-lg ${center ? "mx-auto" : ""} ${onDark ? "text-footer-text" : "text-muted"}`}>{lead}</p>}
    </div>
  );
}
