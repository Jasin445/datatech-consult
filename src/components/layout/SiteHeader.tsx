import { Brand } from "./Brand";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { NavLink } from "@/components/navigation/NavLink";
import { MobileNav } from "@/components/navigation/MobileNav";
import { getPrimaryNav, primaryCta } from "@/lib/site";
import { hasPublishableCaseStudies, hasPublishableInsights } from "@/lib/content/registry";

export function SiteHeader() {
  const items = getPrimaryNav({
    showCaseStudies: hasPublishableCaseStudies(),
    showInsights: hasPublishableInsights(),
  });

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white/97">
      <Container className="flex min-h-(--header-height) items-center justify-between gap-4">
        <Brand />
        <nav className="ml-auto hidden lg:block" aria-label="Primary">
          <ul className="flex items-center gap-6">
            {items.map((item) => (
              <li key={item.href}>
                <NavLink href={item.href}>{item.label}</NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <ButtonLink className="ml-3 max-lg:hidden" href={primaryCta.href}>
          {primaryCta.label}
        </ButtonLink>
        <MobileNav items={items} cta={primaryCta} />
      </Container>
    </header>
  );
}
