import type { ManagedContent } from "@/lib/content/status";
import { dummyInsights } from "../dummy-data";
import type { Insight } from "./types";

/**
 * Insights articles. No real articles have been supplied yet.
 * The entries come from src/content/dummy-data.ts: fictional development data (status "dummy"): shown only outside production,
 * with visible warnings, and excluded from production output, routes, navigation and any future sitemap.
 * Add a real article only with business approval and verified facts, and set status to "approved"
 * only once every claim, the publication date and the author credit are confirmed.
 */
export const insights: ManagedContent<Insight>[] = [...dummyInsights];
