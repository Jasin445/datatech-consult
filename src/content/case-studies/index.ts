import type { ManagedContent } from "@/lib/content/status";
import { dummyCaseStudies } from "../dummy-data";
import type { CaseStudy } from "./types";

/**
 * Case studies. No real projects have been supplied yet.
 * The entries come from src/content/dummy-data.ts: fictional development data (status "dummy"): shown only outside production,
 * with visible warnings, and excluded from production output, routes, navigation and any future sitemap.
 * Add a real case study only with business approval and verified facts, and set status to "approved"
 * only once every claim (especially results) is confirmed. Never present a prototype or demonstration as client work.
 */
export const caseStudies: ManagedContent<CaseStudy>[] = [...dummyCaseStudies];
