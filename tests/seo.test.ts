import { describe, expect, it } from "vitest";
import { caseStudies } from "@/content/case-studies";
import { insights } from "@/content/insights";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { STATIC_PUBLIC_PATHS, buildRobots, buildSitemap } from "@/lib/seo/discovery";
import { articleJsonLd, organizationJsonLd } from "@/lib/seo/structured-data";
import type { ManagedContent } from "@/lib/content/status";
import type { Insight } from "@/content/insights/types";

const SITE = "https://www.example.com";

const approvedInsight: ManagedContent<Insight> = {
  status: "approved",
  data: {
    slug: "real-article",
    title: "A real article",
    summary: "Summary.",
    metaDescription: "Description.",
    publishedOn: "2026-10-01",
    keyTakeaways: [],
    sections: [{ heading: "Heading", paragraphs: ["Body."] }],
    relatedServices: [],
  },
};

describe("page metadata", () => {
  it("sets an absolute canonical and Open Graph URL when the site URL is configured", () => {
    const m = buildPageMetadata({ title: "About", description: "D", path: "/about" }, SITE);
    expect(m.alternates?.canonical).toBe("https://www.example.com/about");
    expect(m.openGraph).toMatchObject({ url: "https://www.example.com/about", title: "About | Datatechhub Consulting" });
    expect(m.robots).toBeUndefined();
    expect(m.openGraph?.images).toEqual([expect.objectContaining({ url: "/opengraph-image", width: 1200 })]);
  });

  it("is noindex with no canonical when the site URL is missing", () => {
    const m = buildPageMetadata({ title: "About", description: "D", path: "/about" }, null);
    expect(m.alternates).toBeUndefined();
    expect(m.robots).toEqual({ index: false, follow: true });
  });

  it("honours noindex for unapproved content even with a site URL", () => {
    expect(buildPageMetadata({ title: "X", description: "D", path: "/x", noindex: true }, SITE).robots).toEqual({ index: false, follow: true });
  });

  it("uses the homepage canonical without a doubled slash", () => {
    expect(buildPageMetadata({ description: "D", path: "/" }, SITE).alternates?.canonical).toBe("https://www.example.com/");
  });
});

describe("sitemap", () => {
  const urls = (s: ReturnType<typeof buildSitemap>) => s.map((e) => e.url);

  it("is empty without a verified site URL", () => {
    expect(buildSitemap(null, { caseStudies, insights, privacyApproved: true })).toEqual([]);
  });

  it("lists every static public page and excludes dummy content and the draft privacy notice", () => {
    const list = urls(buildSitemap(SITE, { caseStudies, insights, privacyApproved: false }));
    expect(list).toHaveLength(STATIC_PUBLIC_PATHS.length);
    expect(list).toContain("https://www.example.com/services/ai-automation");
    expect(list.some((u) => u.includes("sample") || u.includes("/case-studies") || u.includes("/insights") || u.includes("/privacy"))).toBe(false);
  });

  it("adds approved articles (with their date), their index and an approved privacy notice", () => {
    const s = buildSitemap(SITE, { caseStudies: [], insights: [...insights, approvedInsight], privacyApproved: true });
    expect(urls(s)).toEqual(expect.arrayContaining([`${SITE}/insights`, `${SITE}/insights/real-article`, `${SITE}/privacy`]));
    expect(s.find((e) => e.url.endsWith("/real-article"))?.lastModified).toBe("2026-10-01");
    expect(urls(s).some((u) => u.includes("sample-article"))).toBe(false);
  });
});

describe("robots", () => {
  it("blocks all crawling without a site URL or outside production", () => {
    expect(buildRobots(null, true).rules).toEqual({ userAgent: "*", disallow: "/" });
    expect(buildRobots(SITE, false).rules).toEqual({ userAgent: "*", disallow: "/" });
  });

  it("allows crawling in production with a site URL, hides the API and points to the sitemap", () => {
    const r = buildRobots(SITE, true);
    expect(r.rules).toEqual({ userAgent: "*", allow: "/", disallow: "/api/" });
    expect(r.sitemap).toBe("https://www.example.com/sitemap.xml");
  });
});

describe("structured data", () => {
  it("states only verified organisation facts", () => {
    expect(Object.keys(organizationJsonLd(SITE)).sort()).toEqual(["@context", "@type", "logo", "name", "url"]);
  });

  it("omits the author when none is verified", () => {
    expect(articleJsonLd(SITE, approvedInsight.data)).not.toHaveProperty("author");
    expect(articleJsonLd(SITE, { ...approvedInsight.data, author: "Real Name" })).toHaveProperty("author.name", "Real Name");
  });
});
