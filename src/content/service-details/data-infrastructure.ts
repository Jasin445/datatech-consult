/** Data Infrastructure & Engineering page copy. Subject to business review. No assumption that every client needs a complex platform. */
import { photos } from "../media/photos";
import type { ServiceDetail } from "./types";

export const dataInfrastructure: ServiceDetail = {
  slug: "data-infrastructure",
  metaTitle: "Data Infrastructure & Engineering",
  metaDescription:
    "Data pipelines, integration, data quality and reporting foundations that connect information across systems and make it dependable.",
  heading: "Data infrastructure and engineering",
  lead: "Connect information from your different systems and make it consistent, so reporting, analysis and automation rest on data you can trust.",
  intro: [
    "Reliable reporting depends on what happens before the dashboard: how data is collected, moved, checked and stored. When that groundwork is weak, people spend their time reconciling figures instead of using them.",
    "We help you build dependable data foundations sized to your needs. For some organisations that means tidying and connecting the systems they already have. For others it means more.",
  ],
  problems: {
    heading: "Common data infrastructure problems",
    lead: "Not every organisation has all of these. Each one makes reporting slower and less reliable.",
    items: [
      { title: "Systems that don’t connect", text: "Sales, finance, operations and programme data live in separate tools with no easy way to combine them." },
      { title: "Manual copying between systems", text: "Data is exported, reformatted and re-entered by hand, which is slow and easy to get wrong." },
      { title: "Inconsistent figures", text: "The same measure differs between reports because of different definitions, duplicates or gaps." },
      { title: "Data that only one person understands", text: "Spreadsheets and databases rely on someone’s memory, with little or no documentation." },
      { title: "Fragile reporting", text: "Reports break when a file, column or process changes." },
    ],
  },
  capabilities: {
    heading: "What we can help with",
    items: [
      { title: "Connecting your systems", text: "Accounting, CRM, field apps and spreadsheets feeding one place, without re-keying." },
      { title: "Automated data pipelines", text: "Scheduled jobs that extract, clean and load data, and tell someone when they fail." },
      { title: "Data quality checks", text: "Rules that catch duplicates, missing values and inconsistent formats before they reach a report." },
      { title: "A reporting store sized to you", text: "Often a well-structured database; a warehouse only when volume or reliability needs it." },
      { title: "Definitions and documentation", text: "A data dictionary and run notes, so the knowledge isn’t locked in one person’s head." },
      { title: "Fixing what you already have", text: "Cleaning up and connecting existing systems before adding anything new." },
    ],
  },
  deliverables: {
    heading: "Example deliverables",
    lead: "These are examples, not a fixed menu. What you receive depends on the scope we agree.",
    items: [
      { title: "Data flow map", text: "A diagram and description of where data comes from, how it moves and where it ends up." },
      { title: "Automated data pipeline", text: "A repeatable process that moves and prepares data between agreed systems." },
      { title: "Data quality checks", text: "Rules that flag duplicates, gaps and inconsistencies, with a report of what was found." },
      { title: "Architecture recommendation", text: "A proposed approach with alternatives, including simpler options, and the reasons for our advice." },
      { title: "Reporting-ready dataset", text: "A consistent, documented set of data prepared for dashboards and analysis." },
      { title: "Data dictionary and documentation", text: "Definitions of key fields and measures, and notes on how the setup works." },
    ],
  },
  considerations: {
    heading: "Foundations sized to the problem",
    lead: "A bigger platform is not always a better answer. We size the solution to the problem.",
    items: [
      { title: "Start with what you have", text: "Many organisations are better served by cleaning up and connecting existing systems than by adding new ones." },
      { title: "Match the solution to the need", text: "A data warehouse or cloud migration is worth considering only when volume, reliability or reporting needs justify it. We compare options, including doing less." },
      { title: "Plan for running it", text: "Whatever is built has to be understandable and affordable for your team to maintain over time." },
    ],
  },
  disclaimer: "Results depend on your systems, your data and how the foundations are used. We can’t guarantee specific outcomes.",
  related: ["data-analytics", "business-technology-consulting"],
  cta: {
    heading: "Show us where your data lives today.",
    body: "Tell us which systems hold your data and what isn’t working. We’ll tell you what is worth doing, and what isn’t.",
  },
  v2: {
    heroPhoto: photos.dataCentre,
    hook: {
      heading: "Your people are doing the translating your systems should.",
      paragraphs: [
        "The accounting package, the CRM, the field app and a dozen spreadsheets each hold part of the truth. Joining them up means exports, copy and paste, and one person who knows which column means what.",
        "When that person is on leave, the reports stop.",
      ],
      turn: "Dependable data is built on purpose, and it can stay simple.",
      photo: photos.streetAerial,
    },
    deliverablesPhoto: photos.bridgePylon,
  },
};
