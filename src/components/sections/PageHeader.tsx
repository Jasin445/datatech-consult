import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";

/** Standard page opening: the page's single h1 and an introduction. `above` renders before the h1 (e.g. breadcrumb). */
export function PageHeader({ heading, lead, above }: { heading: string; lead: string; above?: ReactNode }) {
  return (
    <section className="page-header" aria-labelledby="page-heading">
      <Container>
        <div className="reading">
          {above}
          <h1 id="page-heading">{heading}</h1>
          <p className="lead">{lead}</p>
        </div>
      </Container>
    </section>
  );
}
