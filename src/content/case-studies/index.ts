import { DUMMY_MARKER, type ManagedContent } from "@/lib/content/status";
import type { CaseStudy } from "./types";

/**
 * Case studies. No real projects have been supplied yet.
 * The single entry below is fictional development data (status "dummy"): shown only outside production,
 * with visible warnings, and excluded from production output, routes, navigation and any future sitemap.
 * Add a real case study only with business approval and verified facts, and set status to "approved"
 * only once every claim (especially results) is confirmed. Never present a prototype or demonstration as client work.
 */
export const caseStudies: ManagedContent<CaseStudy>[] = [
  {
    status: "dummy",
    data: {
      slug: "sample-case-study",
      title: "Sample case study: reporting dashboard",
      summary: `${DUMMY_MARKER}. Fictional entry used to test the case study layout. Not a real project.`,
      metaDescription: `${DUMMY_MARKER}. Fictional case study.`,
      projectType: "internal-demonstration",
      challenge: [`${DUMMY_MARKER}. Placeholder description of a reporting challenge.`],
      objectives: ["Placeholder objective one", "Placeholder objective two"],
      contribution: ["Placeholder description of what was actually done."],
      approach: [
        { title: "Understand", text: "Placeholder step." },
        { title: "Design", text: "Placeholder step." },
        { title: "Build", text: "Placeholder step." },
        { title: "Review", text: "Placeholder step." },
      ],
      solution: ["Placeholder description of the solution."],
      deliverables: ["Placeholder deliverable one", "Placeholder deliverable two"],
      results: [],
      lessons: ["Placeholder lesson."],
      relatedServices: ["data-analytics", "data-infrastructure"],
    },
  },
];
