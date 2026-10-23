import type { ManagedContent } from "@/lib/content/status";
import { dummyLeadership } from "../dummy-data";

export type LeadershipProfile = {
  id: string;
  name: string;
  role: string;
  bio: string;
};

/**
 * Leadership profiles. No real people have been supplied yet.
 * The entries come from src/content/dummy-data.ts: fictional development data (status "dummy"): it is shown only outside production,
 * with a visible warning, and is excluded from production output. Add real profiles only with business approval,
 * and set status to "approved" only once the person and their details are verified.
 */
export const leadershipProfiles: ManagedContent<LeadershipProfile>[] = [...dummyLeadership];
