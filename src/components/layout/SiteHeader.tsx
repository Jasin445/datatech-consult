import { Brand } from "./Brand";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { NavLink } from "@/components/navigation/NavLink";
import { MobileNav } from "@/components/navigation/MobileNav";
import { ServicesMenu } from "@/components/navigation/ServicesMenu";
import { services as serviceContent } from "@/content/services";
import { getPrimaryNav, primaryCta } from "@/lib/site";
import { hasPublishableCaseStudies, hasPublishableInsights } from "@/lib/content/registry";

export function SiteHeader() {
  const items = getPrimaryNav({
    showCaseStudies: hasPublishableCaseStudies(),
    showInsights: hasPublishableInsights(),
  });

  const menuServices = serviceContent.map((s) => ({ title: s.title, summary: s.summary, href: s.href }));

  return (
    <header className="sticky top-0 z-50 border-t-[3px] border-b border-t-gold border-b-border bg-white/95 backdrop-blur-sm">
      <Container className="flex min-h-(--header-height) items-center justify-between gap-4">
        <Brand />
        <nav className="ml-auto hidden lg:block" aria-label="Primary">
          <ul className="flex items-center gap-8">
            {items.map((item) => (
              <li key={item.href}>
                {item.href === "/services" ? <ServicesMenu services={menuServices} /> : <NavLink href={item.href}>{item.label}</NavLink>}
              </li>
            ))}
          </ul>
        </nav>
        <ButtonLink className="ml-3 max-lg:hidden" href={primaryCta.href}>
          {primaryCta.label}
        </ButtonLink>
        <MobileNav items={items} cta={primaryCta} services={menuServices.map(({ title, href }) => ({ label: title, href }))} />
      </Container>
    </header>
  );
}
