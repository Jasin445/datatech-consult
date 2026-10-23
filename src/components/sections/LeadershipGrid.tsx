import { DevNotice } from "@/components/ui/DevNotice";
import type { LeadershipProfile } from "@/content/leadership/profiles";
import { DUMMY_MARKER, type ManagedContent } from "@/lib/content/status";

/** Renders only the profiles passed in. Development-only warnings appear for non-approved profiles. */
export function LeadershipGrid({ profiles }: { profiles: readonly ManagedContent<LeadershipProfile>[] }) {
  const hasUnapproved = profiles.some((p) => p.status !== "approved");
  return (
    <>
      {hasUnapproved && <DevNotice>{DUMMY_MARKER}. Unapproved leadership profiles are hidden in production.</DevNotice>}
      <ul className="item-grid item-grid--3 item-grid--card leadership-grid">
        {profiles.map(({ status, data }) => (
          <li key={data.id}>
            {status !== "approved" && <p className="status-badge">{status === "dummy" ? "Dummy data" : "Draft"}</p>}
            <h3>{data.name}</h3>
            <p className="leadership-role">{data.role}</p>
            <p>{data.bio}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
