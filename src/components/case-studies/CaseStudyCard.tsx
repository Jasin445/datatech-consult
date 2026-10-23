import Link from "next/link";
import { cardClass, pillClass, statusPillClass } from "@/components/ui/styles";
import { projectTypeLabels, type CaseStudy } from "@/content/case-studies/types";
import type { ContentStatus } from "@/lib/content/status";

export function CaseStudyCard({ status, study }: { status: ContentStatus; study: CaseStudy }) {
  return (
    <article className={cardClass}>
      <p className="mb-3 flex flex-wrap gap-2">
        <span className={pillClass}>{projectTypeLabels[study.projectType]}</span>
        {status !== "approved" && <span className={statusPillClass}>{status === "dummy" ? "Dummy data" : "Draft"}</span>}
      </p>
      <h3 className="mb-3">{study.title}</h3>
      <p className="text-muted">{study.summary}</p>
      <Link className="mt-auto pt-3 font-semibold" href={`/case-studies/${study.slug}`}>
        Read the case study
      </Link>
    </article>
  );
}
