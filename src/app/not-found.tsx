import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <Container className="state-page section">
      <div className="reading">
        <h1>We can’t find that page</h1>
        <p className="lead">The link may be out of date, or the page may have moved.</p>
        <div className="btn-row">
          <ButtonLink href="/">Go to the homepage</ButtonLink>
          <ButtonLink variant="secondary" href="/contact">
            Contact us
          </ButtonLink>
        </div>
      </div>
    </Container>
  );
}
