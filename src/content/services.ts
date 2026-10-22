/**
 * Confirmed service categories. Marketing copy is subject to business review.
 * Detail-page content is added per service in Checkpoints 4-7.
 */
export type Service = {
  slug: string;
  href: string;
  title: string;
  shortName: string;
  summary: string;
  /** Problems addressed or likely outcomes, phrased without guarantees. */
  helpsWith: string[];
};

export const services: readonly Service[] = [
  {
    slug: "data-analytics",
    href: "/services/data-analytics",
    title: "Data Analytics & Business Intelligence",
    shortName: "data analytics",
    summary: "Dashboards, KPI reporting and analysis that show how your organisation is performing and where to act.",
    helpsWith: [
      "Replace manual reporting with repeatable dashboards",
      "Agree the KPIs that matter and track them consistently",
      "Spot trends and performance gaps",
    ],
  },
  {
    slug: "data-infrastructure",
    href: "/services/data-infrastructure",
    title: "Data Infrastructure & Engineering",
    shortName: "data infrastructure",
    summary: "Connect and prepare data from your different systems so reporting and analysis rest on dependable foundations.",
    helpsWith: [
      "Bring information from separate systems together",
      "Improve data quality and consistency",
      "Document data so it can be maintained",
    ],
  },
  {
    slug: "ai-automation",
    href: "/services/ai-automation",
    title: "AI & Automation",
    shortName: "AI and automation",
    summary: "Reduce repetitive work and apply AI where it fits, with attention to feasibility, risk and human oversight.",
    helpsWith: [
      "Automate repetitive, rules-based tasks",
      "Assess whether AI suits a given problem",
      "Build internal tools and system integrations",
    ],
  },
  {
    slug: "business-technology-consulting",
    href: "/services/business-technology-consulting",
    title: "Business & Technology Consulting",
    shortName: "business and technology consulting",
    summary: "Turn business needs into practical technical plans, from discovery and requirements to implementation planning.",
    helpsWith: [
      "Clarify requirements before committing to a solution",
      "Assess technology options and architecture",
      "Plan implementation in realistic stages",
    ],
  },
];
