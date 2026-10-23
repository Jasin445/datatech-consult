import { DUMMY_MARKER, type ManagedContent } from "@/lib/content/status";

export type LeadershipProfile = {
  id: string;
  name: string;
  role: string;
  bio: string;
};

/**
 * Leadership profiles. No real people have been supplied yet.
 * The single entry below is fictional development data (status "dummy"): it is shown only outside production,
 * with a visible warning, and is excluded from production output. Add real profiles only with business approval,
 * and set status to "approved" only once the person and their details are verified.
 */
export const leadershipProfiles: ManagedContent<LeadershipProfile>[] = [
  {
    status: "dummy",
    data: {
      id: "dummy-profile-1",
      name: "Sample Person",
      role: "Placeholder role",
      bio: `${DUMMY_MARKER}. Fictional profile used to test the layout. Not a real person.`,
    },
  },
];
