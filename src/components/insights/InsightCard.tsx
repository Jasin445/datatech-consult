import Link from "next/link";
import { Mark } from "@/components/ui/Mark";
import { Photo } from "@/components/ui/Photo";
import { statusPillClass } from "@/components/ui/styles";
import type { Insight } from "@/content/insights/types";
import { formatPublishedDate, readingTimeMinutes } from "@/lib/content/insights";
import type { ContentStatus } from "@/lib/content/status";
import { statusLabel } from "@/components/ui/SampleNotice";

/** Article card: optional cover photo (or a quiet typographic panel), date and reading time, serif title. Whole card clickable. */
export function InsightCard({ status, insight }: { status: ContentStatus; insight: Insight }) {
  return (
    <article className="group relative flex h-full flex-col rounded-[1.25rem] bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
      <div className="relative aspect-[3/2] overflow-hidden rounded-t-[1.25rem] bg-gold-tint">
        {insight.cover ? (
          <Photo photo={insight.cover} fill decorative sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="transition-transform duration-700 group-hover:scale-[1.04]" />
        ) : (
          <div aria-hidden="true" className="flex h-full items-center justify-center">
            <Mark className="size-12 text-gold" />
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted">
          <time dateTime={insight.publishedOn}>{formatPublishedDate(insight.publishedOn)}</time>
          <span aria-hidden="true" className="text-gold">·</span>
          <span>{readingTimeMinutes(insight)} min read</span>
          {status !== "approved" && <span className={statusPillClass}>{statusLabel(status)}</span>}
        </p>
        <h3 className="mb-3 text-3xl">
          <Link href={`/insights/${insight.slug}`} className="text-charcoal no-underline after:absolute after:inset-0 group-hover:text-gold">
            {insight.title}
          </Link>
        </h3>
        <p className="mobile-detail mb-0 text-muted">{insight.summary}</p>
      </div>
    </article>
  );
}
