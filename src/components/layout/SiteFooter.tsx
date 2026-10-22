import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { getParentBrandUrl, getPublicContactEmail } from "@/lib/env";
import { services, siteConfig } from "@/lib/site";

/** Only verified details appear here. Unset env values are omitted, never replaced with invented ones. */
export function SiteFooter() {
  const email = getPublicContactEmail();
  const parentUrl = getParentBrandUrl();

  return (
    <footer className="site-footer">
      <Container>
        <div className="footer-grid">
          <div>
            <p className="footer-brand">{siteConfig.name}</p>
            <p>{siteConfig.parentTagline}</p>
            {email && (
              <p>
                <a href={`mailto:${email}`}>{email}</a>
              </p>
            )}
          </div>
          <nav aria-label="Services">
            <h2 className="footer-heading">Services</h2>
            <ul className="footer-list">
              {services.map((s) => (
                <li key={s.href}>
                  <Link href={s.href}>{s.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Company">
            <h2 className="footer-heading">Company</h2>
            <ul className="footer-list">
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
        <p className="footer-bottom">
          © {new Date().getFullYear()} {siteConfig.name}, part of {siteConfig.parentBrand}.
        </p>
      </Container>
    </footer>
  );
}
