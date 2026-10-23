import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Ornament } from "@/components/ui/Ornament";
import { getParentBrandUrl, getPublicContactEmail } from "@/lib/env";
import { primaryCta, services, siteConfig } from "@/lib/site";

/** Only verified details appear here. Unset env values are omitted, never replaced with invented ones. */
export function SiteFooter() {
  const email = getPublicContactEmail();
  const parentUrl = getParentBrandUrl();

  return (
    <footer className="bg-charcoal text-footer-text [&_a]:text-white [&_a:hover]:text-gold-soft [&_li_a]:no-underline [&_li_a:hover]:underline">
      <Container>
        <div className="flex flex-col gap-8 border-b border-white/15 py-16 lg:flex-row lg:items-end lg:justify-between lg:py-20">
          <p className="mb-0 max-w-[16ch] font-display text-4xl text-white">
            Empowering <span className="text-gold-soft italic">through data.</span>
          </p>
          <Link
            href={primaryCta.href}
            className="group inline-flex items-center gap-4 self-start font-display text-2xl italic no-underline lg:self-auto"
          >
            <Ornament className="size-6 text-gold-soft transition-transform duration-500 group-hover:rotate-45" />
            <span className="underline decoration-1 underline-offset-8">{primaryCta.label}</span>
          </Link>
        </div>

        <div className="grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="mb-2 font-semibold text-white">{siteConfig.name}</p>
            <p className="max-w-[34ch]">Data, analytics, automation and technology consulting for organisations in Nigeria and across Africa.</p>
            {email && (
              <p>
                <a href={`mailto:${email}`}>{email}</a>
              </p>
            )}
          </div>
          <nav aria-label="Services">
            <h2 className="mb-4 font-sans text-sm font-semibold tracking-[0.18em] text-gold-soft uppercase">Services</h2>
            <ul className="grid gap-3">
              {services.map((s) => (
                <li key={s.href}>
                  <Link href={s.href}>{s.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Company">
            <h2 className="mb-4 font-sans text-sm font-semibold tracking-[0.18em] text-gold-soft uppercase">Company</h2>
            <ul className="grid gap-3">
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
        <p className="mb-0 border-t border-white/15 py-6 text-sm">
          © {new Date().getFullYear()} {siteConfig.name}, part of {siteConfig.parentBrand}.
        </p>
      </Container>
    </footer>
  );
}
