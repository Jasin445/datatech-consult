import { ButtonLink } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/Mark";
import { pillClass, statusPillClass } from "@/components/ui/styles";
import { projectTypeLabels, type CaseStudy } from "@/content/case-studies/types";
import type { ContentStatus } from "@/lib/content/status";
import { CaseCover } from "./CaseCover";
import { statusLabel } from "@/components/ui/SampleNotice";

/** Case study card: typographic cover, project type (always visible), title, summary, action. */
export function CaseStudyCard({ status, study, index }: { status: ContentStatus; study: CaseStudy; index: number }) {
  const label = projectTypeLabels[study.projectType];
  return (
    <article className="flex h-full flex-col border border-border bg-white">
      <CaseCover number={String(index + 1).padStart(2, "0")} label={label} className="aspect-[16/9]" />
      <div className="flex flex-1 flex-col p-5 sm:p-8">
        <p className="mb-4 flex flex-wrap gap-2">
          <span className={pillClass}>{label}</span>
          {status !== "approved" && <span className={statusPillClass}>{statusLabel(status)}</span>}
        </p>
        <h3 className="mb-3 text-3xl">{study.title}</h3>
        <p className="mobile-detail mb-8 text-muted">{study.summary}</p>
        <ButtonLink href={`/case-studies/${study.slug}`} variant="gold-outline" className="mt-auto self-start">
          Read the case study
          <span className="sr-only">: {study.title}</span>
          <ArrowRight />
        </ButtonLink>
      </div>
    </article>
  );
}
