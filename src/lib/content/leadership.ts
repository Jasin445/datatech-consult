import { leadershipProfiles, type LeadershipProfile } from "@/content/leadership/profiles";
import {
  assertContentValid,
  filterPublishable,
  validateManagedItems,
  type ManagedContent,
} from "./status";

export function validateLeadership(items: readonly ManagedContent<LeadershipProfile>[]) {
  return validateManagedItems(
    items.map((i) => ({
      id: `leadership/${i.data.id}`,
      status: i.status,
      text: [i.data.name, i.data.role, i.data.bio].join(" "),
    })),
  );
}

/** Profiles that may appear on the page. Production: approved only. Throws on critical violations. */
export function getPublishableLeadership(
  items: readonly ManagedContent<LeadershipProfile>[] = leadershipProfiles,
  production?: boolean,
): ManagedContent<LeadershipProfile>[] {
  assertContentValid(validateLeadership(items));
  return filterPublishable(items, production);
}
