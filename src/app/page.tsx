import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { DevNotice } from "@/components/ui/DevNotice";
import { CtaBand } from "@/components/sections/CtaBand";

/**
 * TEMPORARY SHELL (Checkpoint 1). The full homepage is built in Checkpoint 2.
 * It exists so the application runs and the shared layout can be verified.
 */
export default function HomePage() {
  return (
    <>
      <Section labelledBy="hero-heading">
        <div className="reading">
          <DevNotice>Checkpoint 1 shell. The full homepage is implemented in Checkpoint 2.</DevNotice>
          <h1 id="hero-heading">Make your data and technology work for your business.</h1>
          <p className="lead">
            We help organisations solve business challenges, improve decision-making, and streamline operations through
            practical data, analytics, AI, automation, and technology solutions.
          </p>
          <div className="btn-row">
            <ButtonLink href="/contact">Discuss a business challenge</ButtonLink>
            <ButtonLink variant="secondary" href="/services">
              Explore our services
            </ButtonLink>
          </div>
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
