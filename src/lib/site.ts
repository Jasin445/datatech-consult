import { services as serviceContent } from "@/content/services";

export const siteConfig = {
  name: "Datatechhub Consulting",
  parentBrand: "Datatechhub",
  parentTagline: "Empowering through data.",
  description:
    "Datatechhub Consulting helps organisations in Nigeria and across Africa solve business challenges with practical data, analytics, AI, automation and technology.",
} as const;

export type NavItem = { label: string; href: string };

export const services: readonly NavItem[] = serviceContent.map((s) => ({ label: s.title, href: s.href }));

export type NavOptions = { showCaseStudies: boolean; showInsights: boolean };

export function getPrimaryNav({ showCaseStudies, showInsights }: NavOptions): NavItem[] {
  return [
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    ...(showCaseStudies ? [{ label: "Case Studies", href: "/case-studies" }] : []),
    ...(showInsights ? [{ label: "Insights", href: "/insights" }] : []),
    { label: "Contact", href: "/contact" },
  ];
}

export const primaryCta: NavItem = { label: "Book a consultation", href: "/book-consultation" };
