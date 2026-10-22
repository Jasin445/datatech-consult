/** /services overview copy. Subject to business review. No guarantees or invented outcomes. */
import type { TitledItem } from "./home";

export const servicesPage = {
  title: "Services",
  metaDescription:
    "Data analytics, data infrastructure, AI and automation, and business and technology consulting for organisations in Nigeria and across Africa.",
  heading: "Services that start with your business problem",
  lead: "We offer four connected service areas. Some organisations need one; many need a combination. We agree the scope with you before any work begins.",
};

export const fit = {
  heading: "Which service fits your situation?",
  lead: "Start from the problem you recognise. If you’re not sure which applies, that’s fine: a first conversation usually clarifies it.",
  items: [
    { situation: "Reports take too long to produce, or nobody agrees on the numbers.", slug: "data-analytics" },
    { situation: "Our information is spread across systems that don’t connect.", slug: "data-infrastructure" },
    { situation: "People spend hours on repetitive tasks, or we’re unsure whether AI would help.", slug: "ai-automation" },
    { situation: "We know something needs to change but not yet what, or what it would take.", slug: "business-technology-consulting" },
  ],
};

export type Connection = TitledItem & { slugs: string[] };

export const together = {
  heading: "How the services work together",
  lead: "The areas overlap in practice. Which ones apply depends on your engagement, and you can use any of them on its own.",
  items: [
    {
      title: "Reporting depends on dependable data",
      text: "Dashboards are only as useful as the data behind them. Where data is inconsistent or scattered, preparing it properly often comes first.",
      slugs: ["data-analytics", "data-infrastructure"],
    },
    {
      title: "Automation needs the right process",
      text: "Before automating a workflow or applying AI, it helps to understand the process and decide whether the effort is justified.",
      slugs: ["ai-automation", "business-technology-consulting"],
    },
    {
      title: "Plans are more useful when they can be delivered",
      text: "Advice on technology choices is stronger when it considers how the work will be built, run and maintained.",
      slugs: ["business-technology-consulting", "data-infrastructure"],
    },
  ] satisfies Connection[],
};

export const engagement = {
  heading: "What an engagement looks like",
  lead: "The stages are the same whichever services you use. Later stages apply where agreed.",
  notes: [
    "Some engagements end with a diagnosis and a plan. Others continue into implementation and ongoing support. We agree which at the start.",
    "Scope, timing and cost depend on the problem and your organisation. We won’t recommend technology you don’t need.",
  ],
};
