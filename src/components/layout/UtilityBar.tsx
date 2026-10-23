import { Container } from "@/components/ui/Container";
import { getPublicContactEmail } from "@/lib/env";
import { siteConfig } from "@/lib/site";

/** Slim charcoal bar above the main header (scrolls away; only the main header is sticky). Hidden on small screens. */
export function UtilityBar() {
  const email = getPublicContactEmail();
  return (
    <aside aria-label="About Datatechhub Consulting" className="hidden bg-charcoal text-footer-text md:block">
      <Container className="flex min-h-9 items-center justify-between gap-6 text-xs tracking-[0.04em]">
        <p className="mb-0">Data, analytics, AI and technology consulting · Nigeria and across Africa</p>
        <p className="mb-0 flex items-center gap-5">
          {email && (
            <a href={`mailto:${email}`} className="text-white no-underline hover:text-gold-soft hover:underline">
              {email}
            </a>
          )}
          <span className="font-display text-sm text-gold-soft">{siteConfig.parentTagline}</span>
        </p>
      </Container>
    </aside>
  );
}
