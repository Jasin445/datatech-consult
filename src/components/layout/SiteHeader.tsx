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
    <header className="site-header">
      <Container className="site-header__inner">
        <Brand />
        <nav className="nav-desktop" aria-label="Primary">
          <ul className="nav-list">
            {items.map((item) => (
              <li key={item.href}>
                <NavLink href={item.href}>{item.label}</NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <ButtonLink className="header-cta" href={primaryCta.href}>
          {primaryCta.label}
        </ButtonLink>
        <MobileNav items={items} cta={primaryCta} />
      </Container>
    </header>
  );
}
