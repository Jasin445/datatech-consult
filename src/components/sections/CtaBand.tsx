import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export type CtaBandProps = {
  id?: string;
  heading?: string;
  body?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
};

/** Shared closing call to action. Defaults route to the enquiry and consultation pages. */
export function CtaBand({
  id = "cta-heading",
  heading = "Let’s talk about the challenge you’re trying to solve.",
  body = "Tell us what you’re dealing with and we’ll help you work out whether and how we can help.",
  primary = { label: "Send an enquiry", href: "/contact" },
  secondary = { label: "Book a consultation", href: "/book-consultation" },
}: CtaBandProps) {
  return (
    <section className="section cta-band" aria-labelledby={id}>
      <Container>
        <h2 id={id}>{heading}</h2>
        <p>{body}</p>
        <div className="btn-row">
          <ButtonLink variant="on-dark" href={primary.href}>
            {primary.label}
          </ButtonLink>
          <ButtonLink variant="outline-on-dark" href={secondary.href}>
            {secondary.label}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
