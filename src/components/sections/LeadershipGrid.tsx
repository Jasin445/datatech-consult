import { DevNotice } from "@/components/ui/DevNotice";
import { statusPillClass } from "@/components/ui/styles";
import type { LeadershipProfile } from "@/content/leadership/profiles";
import { DUMMY_MARKER, type ManagedContent } from "@/lib/content/status";

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join("");
}

/**
 * Renders only the profiles passed in (callers filter by status). Development-only warnings for non-approved profiles.
 * No portraits until approved photographs exist: a serif monogram stands in, never a stock face.
 */
export function LeadershipGrid({ profiles }: { profiles: readonly ManagedContent<LeadershipProfile>[] }) {
  const hasUnapproved = profiles.some((p) => p.status !== "approved");
  return (
    <>
      {hasUnapproved && <DevNotice>{DUMMY_MARKER}. Unapproved leadership profiles are hidden in production.</DevNotice>}
      <ul className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {profiles.map(({ status, data }) => (
          <li key={data.id} className="relative flex flex-col border border-border bg-white p-8">
            <span aria-hidden="true" className="absolute -top-px -right-px size-12 bg-[linear-gradient(to_bottom_left,var(--color-surface)_50%,var(--color-border)_50%)]" />
            {status !== "approved" && <p className={`mb-4 self-start ${statusPillClass}`}>{status === "dummy" ? "Dummy data" : "Draft"}</p>}
            <span aria-hidden="true" className="mb-6 grid size-20 place-items-center rounded-full bg-gold-tint font-display text-3xl text-charcoal italic">
              {initials(data.name)}
            </span>
            <h3 className="mb-1 text-3xl">{data.name}</h3>
            <p className="mb-4 text-sm font-semibold tracking-[0.14em] text-gold uppercase">{data.role}</p>
            <p className="mb-0 text-muted">{data.bio}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
