export function SectionHeading({ id, heading, lead }: { id: string; heading: string; lead?: string }) {
  return (
    <div className="section-heading">
      <h2 id={id}>{heading}</h2>
      {lead && <p className="lead">{lead}</p>}
    </div>
  );
}
