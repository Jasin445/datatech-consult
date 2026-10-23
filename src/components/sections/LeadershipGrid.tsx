import { DevNotice } from "@/components/ui/DevNotice";
import type { LeadershipProfile } from "@/content/leadership/profiles";
import { DUMMY_MARKER, type ManagedContent } from "@/lib/content/status";

/** Renders only the profiles passed in. Development-only warnings appear for non-approved profiles. */
export function LeadershipGrid({ profiles }: { profiles: readonly ManagedContent<LeadershipProfile>[] }) {
  const hasUnapproved = profiles.some((p) => p.status !== "approved");
  return (
    <>
      {hasUnapproved && <DevNotice>{DUMMY_MARKER}. Unapproved leadership profiles are hidden in production.</DevNotice>}
      <ul className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {profiles.map(({ status, data }) => (
          <li key={data.id} className="rounded-md border border-border bg-white p-6">
            {status !== "approved" && <p className="mb-3 inline-block rounded-full border border-dashed border-warning-text bg-warning-bg px-3 py-1 text-sm font-bold text-warning-text">{status === "dummy" ? "Dummy data" : "Draft"}</p>}
            <h3 className="mb-2 text-lg leading-[1.15]">{data.name}</h3>
            <p className="mb-2 font-semibold text-charcoal">{data.role}</p>
            <p className="mb-0 text-muted">{data.bio}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
