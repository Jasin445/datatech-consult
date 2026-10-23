import Link from "next/link";
import { Ornament } from "@/components/ui/Ornament";
import { Photo } from "@/components/ui/Photo";
import { statusPillClass } from "@/components/ui/styles";
import type { Insight } from "@/content/insights/types";
import { formatPublishedDate, readingTimeMinutes } from "@/lib/content/insights";
import type { ContentStatus } from "@/lib/content/status";

/** Article card: optional cover photo (or a quiet typographic panel), date and reading time, serif title. Whole card clickable. */
export function InsightCard({ status, insight }: { status: ContentStatus; insight: Insight }) {
  return (
    <article className="group relative flex h-full flex-col">
      <div className="relative aspect-[3/2] overflow-hidden bg-gold-tint">
        {insight.cover ? (
          <Photo photo={insight.cover} fill decorative sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="transition-transform duration-700 group-hover:scale-[1.04]" />
        ) : (
          <div aria-hidden="true" className="flex h-full items-center justify-center">
            <Ornament className="size-12 text-gold transition-transform duration-500 group-hover:rotate-45" />
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col border-b border-charcoal/15 py-6">
        <p className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted">
          <time dateTime={insight.publishedOn}>{formatPublishedDate(insight.publishedOn)}</time>
          <span aria-hidden="true" className="text-gold">·</span>
          <span>{readingTimeMinutes(insight)} min read</span>
          {status !== "approved" && <span className={statusPillClass}>{status === "dummy" ? "Dummy data" : "Draft"}</span>}
        </p>
        <h3 className="mb-3 text-3xl">
          <Link href={`/insights/${insight.slug}`} className="text-charcoal no-underline after:absolute after:inset-0 group-hover:text-gold">
            {insight.title}
          </Link>
        </h3>
        <p className="mb-0 text-muted">{insight.summary}</p>
      </div>
    </article>
  );
}
