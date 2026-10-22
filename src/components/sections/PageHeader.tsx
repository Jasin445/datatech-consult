import { Container } from "@/components/ui/Container";

/** Standard page opening: the page's single h1 and an introduction. */
export function PageHeader({ heading, lead }: { heading: string; lead: string }) {
  return (
    <section className="page-header" aria-labelledby="page-heading">
      <Container>
        <div className="reading">
          <h1 id="page-heading">{heading}</h1>
          <p className="lead">{lead}</p>
        </div>
      </Container>
    </section>
  );
}
