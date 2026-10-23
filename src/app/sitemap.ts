import type { MetadataRoute } from "next";
import { caseStudies } from "@/content/case-studies";
import { insights } from "@/content/insights";
import { isPrivacyNoticeApproved } from "@/lib/content/privacy";
import { getSiteUrl } from "@/lib/env";
import { buildSitemap } from "@/lib/seo/discovery";

export default function sitemap(): MetadataRoute.Sitemap {
  return buildSitemap(getSiteUrl(), { caseStudies, insights, privacyApproved: isPrivacyNoticeApproved() });
}
