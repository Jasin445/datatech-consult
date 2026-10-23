import type { MetadataRoute } from "next";
import { isProduction } from "@/lib/content/status";
import { getSiteUrl } from "@/lib/env";
import { buildRobots } from "@/lib/seo/discovery";

export default function robots(): MetadataRoute.Robots {
  return buildRobots(getSiteUrl(), isProduction());
}
