/** Data Analytics & Business Intelligence page copy. Subject to business review. No invented client outcomes. */
import { photos } from "../media/photos";
import type { ServiceDetail } from "./types";

export const dataAnalytics: ServiceDetail = {
  slug: "data-analytics",
  metaTitle: "Data Analytics & Business Intelligence",
  metaDescription:
    "Business intelligence dashboards, KPI reporting and analysis that help organisations understand performance and make better-informed decisions.",
  heading: "Data analytics and business intelligence",
  lead: "Turn the information your organisation already holds into reporting people can use to understand performance and make decisions.",
  intro: [
    "Most organisations collect more data than they use. It sits in spreadsheets, accounting or sales systems and programme records, and getting a clear picture means someone assembling it by hand.",
    "We help you decide what to measure, build the reporting around it, and interpret what it shows, so decisions are informed by evidence.",
  ],
  problems: {
    heading: "Problems this service addresses",
    lead: "You may recognise some of these. Few organisations have all of them.",
    items: [
      { title: "Reports built by hand", text: "Regular reports are assembled from spreadsheets, which takes time and risks errors." },
      { title: "No agreed measures", text: "Teams track different numbers, or none, so progress is hard to judge." },
      { title: "Slow answers to simple questions", text: "A straight answer about sales, costs or programme performance means asking someone to pull the data." },
      { title: "Trends that go unnoticed", text: "Patterns and performance gaps are spotted only after they have become problems." },
      { title: "Reports nobody uses", text: "Existing dashboards are too complicated, or don’t answer the questions decision-makers actually ask." },
    ],
  },
  capabilities: {
    heading: "What we can help with",
    items: [
      { title: "Management dashboards", text: "One screen for the measures leadership actually uses, refreshed from your systems instead of rebuilt by hand." },
      { title: "KPI definitions everyone agrees on", text: "What each number means, how it’s calculated and who owns it, written down once." },
      { title: "Automated monthly packs", text: "The recurring report produced on schedule, so the people who built it can analyse it instead." },
      { title: "Answers to a specific question", text: "A focused analysis of sales, costs, collections or programme data, with the evidence and its limits." },
      { title: "Early warnings", text: "Trend views and alerts that flag slipping performance before it shows up at quarter end." },
      { title: "Decision papers", text: "A short summary of findings, options and caveats for one decision on the table." },
    ],
  },
  deliverables: {
    heading: "Example deliverables",
    lead: "These are examples, not a fixed menu. What you receive depends on the scope we agree.",
    items: [
      { title: "Management dashboard", text: "A view of the measures leaders need, kept up to date from your data sources." },
      { title: "KPI definitions", text: "A written record of each indicator, how it is calculated and where the data comes from." },
      { title: "Recurring performance report", text: "A report produced on a regular schedule, automated where suitable." },
      { title: "Analysis report", text: "Findings on a specific question, with the evidence, limits and suggested next steps." },
      { title: "Hand-over notes", text: "Documentation so your team can read, use and maintain what has been built." },
    ],
  },
  considerations: {
    heading: "What useful analytics depends on",
    lead: "Dashboards alone don’t improve decisions. Three things matter more than the tool.",
    items: [
      { title: "Suitable data", text: "Analysis can only be as reliable as the data behind it. We check what exists, how complete it is and what needs fixing first." },
      { title: "Clear business questions", text: "Dashboards built without a question tend to show everything and explain little. We start from the decisions you need to make." },
      { title: "Appropriate interpretation", text: "Numbers need context. We explain what the data does and doesn’t show, including its limits." },
    ],
  },
  disclaimer: "Results depend on your data, your organisation and how the reporting is used. We can’t guarantee specific outcomes.",
  related: ["data-infrastructure", "ai-automation"],
  cta: {
    heading: "Bring us the report everyone argues about.",
    body: "Tell us what you need to measure and where the data lives now. We’ll tell you honestly how we can help.",
  },
  v2: {
    heroPhoto: photos.analystWindow,
    hook: {
      heading: "Everyone has a number. Nobody has the number.",
      paragraphs: [
        "Sales reports one figure, finance another, and the monthly pack takes three days to assemble because the data lives in five places. By the time it reaches the meeting, it describes last month.",
        "Dashboards were supposed to fix this. Too often they just show the disagreement in colour.",
      ],
      turn: "Good reporting starts with agreeing the question.",
      photo: photos.marketAerial,
    },
    deliverablesPhoto: photos.teamOffice,
  },
};
