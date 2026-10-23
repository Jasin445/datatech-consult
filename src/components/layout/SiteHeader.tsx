import { Brand } from "./Brand";
import { HeaderShell } from "./HeaderShell";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/Mark";
import { NavLink } from "@/components/navigation/NavLink";
import { MobileNav } from "@/components/navigation/MobileNav";
import { ServicesMenu } from "@/components/navigation/ServicesMenu";
import { services as serviceContent } from "@/content/services";
import { getPrimaryNav, primaryCta } from "@/lib/site";
import { hasPublishableCaseStudies, hasPublishableInsights } from "@/lib/content/registry";

/**
 * Main header (sticky). Gold top rule, logo, primary navigation with the services mega-menu, a divider and the
 * primary action. Gains a shadow and frosted background once the page scrolls (HeaderShell).
 */
export function SiteHeader() {
  const items = getPrimaryNav({
    showCaseStudies: hasPublishableCaseStudies(),
    showInsights: hasPublishableInsights(),
  });
  const menuServices = serviceContent.map((s) => ({ slug: s.slug, title: s.title, summary: s.summary, href: s.href }));

  return (
    <HeaderShell className="sticky top-0 z-50 border-t-[3px] border-b border-t-gold border-b-border bg-white transition-[background-color,box-shadow] duration-300 data-[scrolled=true]:bg-white/90 data-[scrolled=true]:shadow-[0_12px_30px_-20px_rgb(23_43_58/40%)] data-[scrolled=true]:backdrop-blur-md">
      <Container className="flex min-h-(--header-height) items-center justify-between gap-6">
        <Brand />
        <nav className="ml-auto hidden lg:block" aria-label="Primary">
          <ul className="flex items-center gap-7 text-[0.95rem] xl:gap-9">
            {items.map((item) => (
              <li key={item.href}>
                {item.href === "/services" ? <ServicesMenu services={menuServices} /> : <NavLink href={item.href}>{item.label}</NavLink>}
              </li>
            ))}
          </ul>
        </nav>
        <span aria-hidden="true" className="h-8 w-px bg-border max-lg:hidden" />
        <ButtonLink className="shadow-[0_8px_20px_-10px_rgb(30_100_171/60%)] max-lg:hidden" href={primaryCta.href}>
          {primaryCta.label}
          <ArrowRight />
        </ButtonLink>
        <MobileNav items={items} cta={primaryCta} services={menuServices} />
      </Container>
    </HeaderShell>
  );
}
