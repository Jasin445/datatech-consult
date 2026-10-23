export function SectionHeading({ id, heading, lead }: { id: string; heading: string; lead?: string }) {
  return (
    <div className="mb-8 max-w-(--reading-max)">
      <h2 id={id} className="mb-3">
        {heading}
      </h2>
      {lead && <p className="mb-0 max-w-[62ch] text-lg text-muted">{lead}</p>}
    </div>
  );
}
