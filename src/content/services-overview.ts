/** /services overview copy (V2). Subject to business review. No guarantees or invented outcomes. */
import type { TitledItem } from "./home";
import { photos } from "./media/photos";

export const servicesPage = {
  title: "Services",
  metaDescription:
    "Data analytics, data infrastructure, AI and automation, and business and technology consulting for organisations in Nigeria and across Africa.",
  eyebrow: "Services",
  heading: "Start with the problem. We’ll find the service.",
  lead: "Four connected service areas. Some organisations need one; many need a combination. Either way, we agree the scope with you before any work begins.",
  photo: photos.workshop,
  areas: {
    eyebrow: "What we do",
    heading: "Four service areas, built to work together.",
  },
};

export const fit = {
  eyebrow: "Find your starting point",
  heading: "Which of these sounds like you?",
  lead: "Start from the problem you recognise. Not sure? That’s normal. A first conversation usually sorts it out.",
  items: [
    { situation: "Reports take too long to produce, or nobody agrees on the numbers.", slug: "data-analytics" },
    { situation: "Our information is spread across systems that don’t connect.", slug: "data-infrastructure" },
    { situation: "People spend hours on repetitive tasks, or we’re unsure whether AI would help.", slug: "ai-automation" },
    { situation: "We know something needs to change but not yet what, or what it would take.", slug: "business-technology-consulting" },
  ],
};

export type Connection = TitledItem & { slugs: string[] };

export const together = {
  eyebrow: "Better together",
  heading: "Where one service leans on another.",
  lead: "In practice the areas overlap. You can use any of them on its own; these are the joins we see most often.",
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
