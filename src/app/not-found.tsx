import type { Metadata } from "next";
import { ButtonLink, buttonRowClass } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { leadClass } from "@/components/ui/styles";

// Next.js adds noindex to every 404 response itself.
export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <Container className="grid min-h-[55vh] content-center py-(--section-space)">
      <div className="max-w-(--reading-max)">
        <h1>We can’t find that page</h1>
        <p className={leadClass}>The link may be out of date, or the page may have moved.</p>
        <div className={buttonRowClass}>
          <ButtonLink href="/">Go to the homepage</ButtonLink>
          <ButtonLink variant="secondary" href="/contact">
            Contact us
          </ButtonLink>
        </div>
      </div>
    </Container>
  );
}
