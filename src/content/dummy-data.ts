/**
 * DUMMY DATA, REPLACE BEFORE LAUNCH.
 *
 * Fully written, FICTIONAL content so the case study, Insights, leadership and credibility layouts can be seen
 * with realistic amounts of text. Every item has status "dummy": shown only in development, with visible
 * "Dummy data" badges and notices, and excluded from production pages, navigation, metadata and the sitemap
 * (enforced by src/lib/content/* and the tests).
 *
 * Nothing here describes a real client, project, person, result or publication. Organisations are unnamed or
 * generic; people are marked "(sample)". When real, approved content exists, add it to the registries with status
 * "approved" and remove the matching dummy items from this file.
 */
import type { CaseStudy } from "./case-studies/types";
import type { CredibilityEvidence } from "./home";
import type { Insight } from "./insights/types";
import type { LeadershipProfile } from "./leadership/profiles";
import { photos } from "./media/photos";
import type { ManagedContent } from "@/lib/content/status";

export const dummyCaseStudies: ManagedContent<CaseStudy>[] = [
  {
    status: "dummy",
    data: {
      slug: "sample-case-study",
      title: "One monthly sales pack instead of five spreadsheets",
      summary: "A multi-branch distributor replaced a three-day manual reporting cycle with a single dashboard fed from its accounting and sales systems.",
      metaDescription: "Sample case study: consolidating branch sales reporting into one automated dashboard.",
      projectType: "completed-work",
      challenge: [
        "Each of the distributor’s branches kept its own sales spreadsheet. At month end, the finance team copied the figures into a master workbook, reconciled them against the accounting system and rebuilt the board pack by hand.",
        "The process took three working days, depended on one analyst, and regularly produced totals that did not match the accounting records.",
      ],
      objectives: ["Produce the monthly sales pack from one source", "Agree a single definition of revenue and margin", "Reduce the dependency on one person"],
      contribution: [
        "We ran the discovery, agreed the measures with finance and sales, built the data pipeline and dashboard, and trained two members of the finance team to maintain it.",
      ],
      approach: [
        { title: "Understand", text: "Interviews with finance, sales and two branch managers to map how the pack was built." },
        { title: "Diagnose", text: "Traced every figure in the pack back to its source and listed the mismatches." },
        { title: "Design", text: "Agreed the KPI definitions and a simple reporting store fed nightly." },
        { title: "Implement", text: "Built the pipeline and dashboard, then ran it alongside the old pack for two months." },
      ],
      solution: [
        "A nightly job now pulls invoices from the accounting system and orders from the sales app, cleans and joins them, and loads one reporting table. The dashboard shows revenue, margin and collections by branch and product line.",
      ],
      deliverables: ["Branch performance dashboard", "KPI definitions document", "Automated nightly data pipeline", "Run guide and handover training"],
      results: ["Month-end pack produced in under an hour", "Branch totals reconcile with the accounting system", "Two people can now maintain the reporting"],
      lessons: [
        "Agreeing what “revenue” means took longer than building the dashboard, and mattered more. Running old and new reports side by side for two months built the trust needed to switch off the spreadsheets.",
      ],
      relatedServices: ["data-analytics", "data-infrastructure"],
    },
  },
  {
    status: "dummy",
    data: {
      slug: "sample-invoice-automation",
      title: "Supplier invoices checked and posted with a person in the loop",
      summary: "A prototype that reads supplier invoices, checks them against purchase orders and routes only the exceptions to a person for review.",
      metaDescription: "Sample prototype: AI-assisted invoice processing with human review of exceptions.",
      projectType: "prototype",
      challenge: [
        "An operations team received several hundred supplier invoices a month by email. Staff re-typed each one into the accounting system and checked it against the purchase order by eye.",
        "Errors were rare but costly, and the work crowded out supplier follow-up.",
      ],
      objectives: ["Test whether invoice fields can be extracted reliably", "Keep a person accountable for every posting", "Measure time saved on a sample month"],
      contribution: ["We assessed the process, built the prototype and measured it on a month of historical invoices with the team."],
      approach: [
        { title: "Understand", text: "Shadowed the team for a week and sampled a month of invoices." },
        { title: "Design", text: "Defined which checks could be automated and which needed judgement." },
        { title: "Implement", text: "Built a prototype that extracts fields, runs rule checks and queues exceptions." },
        { title: "Review", text: "Compared the prototype’s output with what the team had actually posted." },
      ],
      solution: [
        "Invoices arriving in a shared inbox are read automatically. Totals, supplier details and purchase-order numbers are checked by rules. Anything that fails a check, or falls below a confidence threshold, goes to a named reviewer before posting.",
      ],
      deliverables: ["Working prototype", "Exception rules and thresholds", "Evaluation report on a historical month", "Recommendation on whether to proceed"],
      results: ["Most invoices passed every check on the sample month", "Every exception was caught for review", "The team recommended a production pilot"],
      lessons: ["The value came from the rule checks as much as from the AI. Clear exception handling made the team comfortable with automation they could see and overrule."],
      relatedServices: ["ai-automation", "business-technology-consulting"],
    },
  },
  {
    status: "dummy",
    data: {
      slug: "sample-programme-monitoring",
      title: "Field data that reaches the funder report on time",
      summary: "An ongoing project helping a development organisation move programme monitoring from paper forms and spreadsheets to mobile data capture.",
      metaDescription: "Sample ongoing project: mobile data capture and reporting for programme monitoring.",
      projectType: "ongoing",
      challenge: [
        "Field officers recorded visits on paper, and coordinators typed the forms into spreadsheets at the end of each month. Funder reports were late, and figures changed after submission when missing forms turned up.",
      ],
      objectives: ["Capture field data once, on a phone, even offline", "Give coordinators a live view of progress", "Produce funder indicators directly from the data"],
      contribution: ["We are leading the design of the data model and reports, and supporting the organisation’s team as they roll out mobile capture in phases."],
      approach: [
        { title: "Understand", text: "Workshops with field officers, coordinators and the M&E lead." },
        { title: "Design", text: "One form per activity, mapped directly to the funder’s indicators." },
        { title: "Implement", text: "Phased rollout, starting with two districts." },
        { title: "Support", text: "Monthly reviews of data quality with coordinators." },
      ],
      solution: [
        "Field officers use an offline-capable mobile form that syncs when a connection is available. A simple pipeline loads the submissions into a reporting store, and a dashboard tracks progress against the funder’s indicators.",
      ],
      deliverables: ["Mobile data collection forms", "Indicator definitions mapped to the funder framework", "Progress dashboard", "Data quality review routine"],
      results: [],
      lessons: ["Designing the forms with field officers, not for them, cut rework sharply in the first district."],
      relatedServices: ["data-infrastructure", "data-analytics"],
    },
  },
];

export const dummyInsights: ManagedContent<Insight>[] = [
  {
    status: "dummy",
    data: {
      slug: "sample-article",
      title: "Before you buy a dashboard tool, agree what you are measuring",
      summary: "Most reporting projects stall on definitions, not software. A short exercise on measures saves months of rework.",
      metaDescription: "Sample article: why agreeing KPI definitions comes before choosing a dashboard tool.",
      publishedOn: "2026-09-15",
      author: "Amaka Obi (sample)",
      keyTakeaways: [
        "Write down each measure, its formula and its owner before building anything",
        "Two teams using the same word for different numbers is the most common problem",
        "A dashboard is only as trusted as its definitions",
      ],
      sections: [
        {
          heading: "The tool is rarely the problem",
          paragraphs: [
            "When reporting is painful, the instinct is to buy better software. But in most organisations the numbers disagree because people define them differently: one team counts revenue when an invoice is raised, another when it is paid.",
            "A new tool built on top of that disagreement simply shows it faster.",
          ],
        },
        {
          heading: "A one-page definitions exercise",
          paragraphs: ["Before any build, list the ten or so measures leadership actually uses. For each one, agree three things."],
          bullets: ["What it means, in plain words", "How it is calculated, and from which system", "Who owns it and signs off changes"],
        },
        {
          heading: "Then choose the tool",
          paragraphs: [
            "With definitions agreed, choosing a tool becomes a practical decision about cost, skills and where your data lives. Often the tool you already have is enough.",
          ],
        },
      ],
      relatedServices: ["data-analytics", "business-technology-consulting"],
      cover: photos.marketAerial,
    },
  },
  {
    status: "dummy",
    data: {
      slug: "sample-ai-first-task",
      title: "Choosing the first task to automate",
      summary: "The best first automation is usually boring, frequent and easy to check. Here is a simple way to find it.",
      metaDescription: "Sample article: a practical way to choose a first process for automation or AI.",
      publishedOn: "2026-08-28",
      author: "Tunde Bello (sample)",
      keyTakeaways: ["Start with frequent, rule-based work", "Pick a task where mistakes are easy to spot", "Measure the time it takes today before changing anything"],
      sections: [
        {
          heading: "Look for frequency and rules",
          paragraphs: [
            "Tasks that happen many times a week and follow clear rules, such as copying figures between systems, chasing approvals or sorting requests, are where automation pays back first.",
          ],
        },
        {
          heading: "Make checking easy",
          paragraphs: ["For a first project, choose work where a person can quickly see whether the output is right. That keeps risk low and builds confidence."],
          bullets: ["Clear right and wrong answers", "A named person who reviews exceptions", "A way to switch back to the manual process"],
        },
        {
          heading: "Measure before you start",
          paragraphs: ["Time the task as it is done today. Without a baseline, nobody can say whether the automation helped."],
        },
      ],
      relatedServices: ["ai-automation"],
      cover: photos.focusedWork,
    },
  },
  {
    status: "dummy",
    data: {
      slug: "sample-data-foundations",
      title: "Small data foundations for growing organisations",
      summary: "You probably do not need a data warehouse. You do need one dependable place your reports read from.",
      metaDescription: "Sample article: right-sized data foundations for small and growing organisations.",
      publishedOn: "2026-07-10",
      keyTakeaways: ["One reporting store beats ten exports", "Automate the joins people currently do by hand", "Document what each field means"],
      sections: [
        {
          heading: "Where most organisations start",
          paragraphs: [
            "Data lives in an accounting package, a sales tool, a few spreadsheets and someone’s inbox. Reports are assembled by exporting from each and joining them by hand.",
          ],
        },
        {
          heading: "The smallest useful step",
          paragraphs: ["A scheduled job that pulls from your main systems into one well-structured database is often enough to end the monthly scramble."],
          bullets: ["Pull data on a schedule", "Clean it the same way every time", "Load it into one place that every report uses"],
        },
        {
          heading: "Grow it when you need to",
          paragraphs: ["Add tools only when volume or reliability demands it. Foundations should be sized to the problem in front of you."],
        },
      ],
      relatedServices: ["data-infrastructure"],
      cover: photos.riverCity,
    },
  },
];

export const dummyLeadership: ManagedContent<LeadershipProfile>[] = [
  {
    status: "dummy",
    data: {
      id: "dummy-profile-1",
      name: "Chioma Eze (sample)",
      role: "Managing Consultant",
      bio: "Leads engagements from first conversation to handover, with a focus on reporting and decision support for operations and finance teams.",
    },
  },
  {
    status: "dummy",
    data: {
      id: "dummy-profile-2",
      name: "Ibrahim Musa (sample)",
      role: "Lead Data Engineer",
      bio: "Designs the pipelines and reporting stores behind our dashboards, and makes sure clients’ teams can run them after handover.",
    },
  },
  {
    status: "dummy",
    data: {
      id: "dummy-profile-3",
      name: "Funmi Adebayo (sample)",
      role: "Automation and AI Lead",
      bio: "Assesses where automation and AI fit, builds prototypes with human review built in, and leads the move to production.",
    },
  },
];

export const dummyCredibilityEvidence: ManagedContent<CredibilityEvidence>[] = [
  { status: "dummy", data: { title: "Reporting rebuilt for a multi-branch distributor (sample)", text: "Monthly sales pack moved from five spreadsheets to one automated dashboard." } },
  { status: "dummy", data: { title: "Invoice automation prototype (sample)", text: "Rule checks and AI extraction, with every exception reviewed by a person." } },
  { status: "dummy", data: { title: "Programme monitoring for a development organisation (sample)", text: "Paper forms replaced by offline mobile capture feeding funder indicators." } },
  { status: "dummy", data: { title: "Data foundations for a growing retailer (sample)", text: "One reporting store replacing manual exports from three systems." } },
];
