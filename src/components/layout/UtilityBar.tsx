import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ArrowRight } from "@/components/ui/Mark";
import { getPublicContactEmail } from "@/lib/env";
import { ctas } from "@/lib/site";

/**
 * Charcoal banner at the top of the sticky header: a short prompt with the primary action, plus a link to how
 * we work (or the public email once configured). Hidden below md. Makes no offer the business hasn't confirmed.
 */
export function UtilityBar() {
  const email = getPublicContactEmail();
  return (
    <aside aria-label="Book a consultation" className="hidden bg-charcoal text-footer-text md:block">
      <Container className="flex min-h-(--utility-height) items-center justify-between gap-6 text-[0.8rem]">
        <p className="mb-0 flex min-w-0 items-center gap-2.5">
          <span className="truncate">
            Planning a dashboard, an automation or a new system?
            <span className="max-lg:hidden"> Talk it through before you commit budget.</span>
          </span>
          <Link href={ctas.consultation.href} className="group inline-flex shrink-0 items-center gap-1.5 font-semibold text-gold-soft underline decoration-1 underline-offset-4 hover:text-white">
            {ctas.consultation.label}
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </p>
        {email ? (
          <a href={`mailto:${email}`} className="shrink-0 text-white no-underline hover:text-gold-soft hover:underline">
            {email}
          </a>
        ) : (
          <Link href="/services#how-we-work" className="shrink-0 text-footer-text no-underline hover:text-white hover:underline">
            How we work and how pricing works
          </Link>
        )}
      </Container>
    </aside>
  );
}
