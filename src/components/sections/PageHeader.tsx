import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { leadClass } from "@/components/ui/styles";

/** Standard page opening: the page's single h1 and an introduction. `above` renders before the h1 (e.g. breadcrumb). */
export function PageHeader({ heading, lead, above }: { heading: string; lead: string; above?: ReactNode }) {
  return (
    <section className="border-b border-border bg-surface pt-12 pb-8 lg:pt-16 lg:pb-12" aria-labelledby="page-heading">
      <Container>
        <div className="max-w-(--reading-max)">
          {above}
          <h1 id="page-heading">{heading}</h1>
          <p className={`${leadClass} mb-0`}>{lead}</p>
        </div>
      </Container>
    </section>
  );
}
