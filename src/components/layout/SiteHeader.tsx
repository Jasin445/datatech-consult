import { Brand } from "./Brand";
import { HeaderShell } from "./HeaderShell";
import { UtilityBar } from "./UtilityBar";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/Mark";
import { NavLink } from "@/components/navigation/NavLink";
import { MobileNav } from "@/components/navigation/MobileNav";
import { getPrimaryNav, primaryCta } from "@/lib/site";
import { hasPublishableCaseStudies, hasPublishableInsights } from "@/lib/content/registry";

/** Desktop nav items sit as tabs in a tray; the current page is a raised white tab. */
export const trayItemClass =
  "rounded-full px-4 min-h-10 after:hidden hover:bg-white/80 aria-[current=page]:bg-white aria-[current=page]:shadow-[0_2px_8px_-2px_rgb(23_43_58/25%),0_0_0_1px_rgb(23_43_58/6%)] aria-expanded:bg-white aria-expanded:shadow-[0_2px_8px_-2px_rgb(23_43_58/25%),0_0_0_1px_rgb(23_43_58/6%)] xl:px-5";

/**
 * Sticky header: the top banner and the main bar move together. Main bar: brand on the left, then the
 * navigation in its own tray (separated from the brand), then the primary action. Gains a shadow once scrolled.
 */
export function SiteHeader() {
  const items = getPrimaryNav({
    showCaseStudies: hasPublishableCaseStudies(),
    showInsights: hasPublishableInsights(),
  });

  return (
    <HeaderShell className="sticky top-0 z-50 bg-white transition-[background-color,box-shadow] duration-300 data-[scrolled=true]:bg-white/92 data-[scrolled=true]:shadow-[0_14px_34px_-22px_rgb(23_43_58/45%)] data-[scrolled=true]:backdrop-blur-md">
      <UtilityBar />
      <div className="border-t-2 border-b border-t-gold border-b-border">
        <Container className="flex min-h-(--nav-height) items-center gap-6">
          <Brand />
          <nav className="ml-auto hidden lg:block" aria-label="Primary">
            <ul className="flex items-center gap-1 rounded-full border border-border bg-surface p-1.5 text-[0.95rem]">
              {items.map((item) => (
                <li key={item.href}>
                  <NavLink href={item.href} className={trayItemClass}>
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <ButtonLink variant="primary-pill" size="nav" className="ml-2 shadow-[0_10px_24px_-12px_rgb(30_100_171/70%)] max-lg:hidden" href={primaryCta.href}>
            {primaryCta.label}
            <ArrowRight />
          </ButtonLink>
          <div className="ml-auto lg:hidden">
            <MobileNav items={items} cta={primaryCta} />
          </div>
        </Container>
      </div>
    </HeaderShell>
  );
}
