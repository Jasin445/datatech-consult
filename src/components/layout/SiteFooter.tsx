import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { getParentBrandUrl, getPublicContactEmail } from "@/lib/env";
import { services, siteConfig } from "@/lib/site";

/** Only verified details appear here. Unset env values are omitted, never replaced with invented ones. */
export function SiteFooter() {
  const email = getPublicContactEmail();
  const parentUrl = getParentBrandUrl();

  return (
    <footer className="bg-charcoal pt-16 pb-8 text-footer-text [&_a]:text-white [&_a:hover]:text-footer-link-hover">
      <Container>
        <div className="grid gap-8 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <p className="mb-2 text-[1.25rem] font-bold text-white">{siteConfig.name}</p>
            <p>{siteConfig.parentTagline}</p>
            {email && (
              <p>
                <a href={`mailto:${email}`}>{email}</a>
              </p>
            )}
          </div>
          <nav aria-label="Services">
            <h2 className="mb-3 text-base font-bold text-white">Services</h2>
            <ul className="grid gap-2">
              {services.map((s) => (
                <li key={s.href}>
                  <Link href={s.href}>{s.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Company">
            <h2 className="mb-3 text-base font-bold text-white">Company</h2>
            <ul className="grid gap-2">
              <li><Link href="/about">About</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/book-consultation">Book a consultation</Link></li>
              <li><Link href="/privacy">Privacy</Link></li>
              {parentUrl && (
                <li>
                  <a href={parentUrl} rel="noopener noreferrer">
                    {siteConfig.parentBrand} (parent brand)
                  </a>
                </li>
              )}
            </ul>
          </nav>
        </div>
        <p className="mt-12 mb-0 border-t border-white/18 pt-6 text-sm">
          © {new Date().getFullYear()} {siteConfig.name}, part of {siteConfig.parentBrand}.
        </p>
      </Container>
    </footer>
  );
}
