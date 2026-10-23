import Link from "next/link";
import { cardClass, statusPillClass } from "@/components/ui/styles";
import type { Insight } from "@/content/insights/types";
import { formatPublishedDate, readingTimeMinutes } from "@/lib/content/insights";
import type { ContentStatus } from "@/lib/content/status";

export function InsightCard({ status, insight }: { status: ContentStatus; insight: Insight }) {
  return (
    <article className={`${cardClass} h-full`}>
      <p className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted">
        <time dateTime={insight.publishedOn}>{formatPublishedDate(insight.publishedOn)}</time>
        <span aria-hidden="true">·</span>
        <span>{readingTimeMinutes(insight)} min read</span>
        {status !== "approved" && <span className={statusPillClass}>{status === "dummy" ? "Dummy data" : "Draft"}</span>}
      </p>
      <h3 className="mb-3">{insight.title}</h3>
      <p className="text-muted">{insight.summary}</p>
      <Link className="mt-auto pt-3 font-semibold" href={`/insights/${insight.slug}`}>
        Read the article
      </Link>
    </article>
  );
}
