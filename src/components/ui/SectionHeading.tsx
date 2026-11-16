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
      <h2 id={id} className={`mb-5 ${onDark ? "text-white" : ""}`}>
        {heading}
      </h2>
      <div aria-hidden="true" className={`mb-6 h-px w-16 bg-gold ${center ? "mx-auto" : ""}`} />
      {lead && <p className={`mb-0 max-w-[58ch] text-lg ${center ? "mx-auto" : ""} ${onDark ? "text-footer-text" : "text-muted"}`}>{lead}</p>}
    </div>
  );
}
