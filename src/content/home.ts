/** Homepage copy. Subject to business review. No testimonials, statistics or client claims. */
import type { ManagedContent } from "@/lib/content/status";

export type TitledItem = { title: string; text: string };

export const hero = {
  headline: "Make your data and technology work for your business.",
  body: "We help organisations solve business challenges, improve decision-making, and streamline operations through practical data, analytics, AI, automation, and technology solutions.",
  primary: { label: "Discuss a business challenge", href: "/contact" },
  secondary: { label: "Explore our services", href: "/services" },
};

export const challenges = {
  heading: "Challenges we help organisations work through",
  lead: "Not every organisation faces all of these. If one sounds familiar, it’s a good place to start a conversation.",
  items: [
    { title: "Manual reporting", text: "Reports are built by hand each period, which takes time and is hard to repeat consistently." },
    { title: "Fragmented information", text: "Data sits in separate systems, spreadsheets and inboxes, so no one sees the full picture." },
    { title: "Unreliable decision evidence", text: "Figures differ between teams, and it’s unclear which to trust when a decision is due." },
    { title: "Unclear AI or technology opportunities", text: "There’s pressure to adopt AI or new tools, but no clear view of what would actually help." },
    { title: "Repetitive workflows", text: "Skilled people spend hours copying, checking and chasing work that a better process could handle." },
  ] satisfies TitledItem[],
};

export const servicesIntro = {
  heading: "What we do",
  lead: "Four connected service areas. Your engagement may use one or several, depending on the problem.",
};

export const principles = {
  heading: "How we approach the work",
  lead: "These are the principles we work to, not claims about past results.",
  items: [
    { title: "Start with the business problem", text: "We begin with what you are trying to achieve, then choose the technology, not the other way round." },
    { title: "Design for your context", text: "Your people, existing systems, budget and constraints shape the solution." },
    { title: "Connect strategy to implementation", text: "Plans are made with delivery in mind, so recommendations can be acted on." },
    { title: "Focus on useful outcomes", text: "We judge the work by whether it is used and helps decisions, not by how much technology it involves." },
  ] satisfies TitledItem[],
};

export const process = {
  heading: "How we work",
  lead: "Every engagement is scoped to the problem. Later stages apply where agreed.",
  steps: [
    { title: "Understand", text: "We learn about your organisation, goals and the challenge you want to solve." },
    { title: "Diagnose", text: "We review the data, systems and processes involved and identify what’s causing the problem." },
    { title: "Design", text: "We propose a practical approach, with options, trade-offs and a clear scope." },
    { title: "Implement, where agreed", text: "We build or configure the agreed solution, working with your team." },
    { title: "Support and improve, where agreed", text: "We help you run the solution and refine it as needs change." },
  ] satisfies TitledItem[],
};

/**
 * Verified credibility evidence (approved projects, credentials, etc.).
 * Empty until the business supplies approved items; the homepage then shows the
 * working-commitments fallback below. Never add unverified items with status "approved".
 */
export type CredibilityEvidence = TitledItem;
export const credibilityEvidence: ManagedContent<CredibilityEvidence>[] = [];

export const credibilityFallback = {
  heading: "What you can expect when we work together",
  lead: "How we handle an engagement, whatever its size.",
  items: [
    { title: "Clear scope before work begins", text: "You know what is included, what isn’t, and what we need from you." },
    { title: "Honest advice", text: "If a technology, including AI, isn’t the right fit, we’ll say so." },
    { title: "Plain-language communication", text: "We explain findings and options in terms decision-makers can act on." },
    { title: "Work you can maintain", text: "We document what we build so your team can understand and run it." },
  ] satisfies TitledItem[],
};

export const audiences = {
  heading: "Who we help",
  lead: "We work with organisations in Nigeria and across Africa.",
  items: [
    { title: "SMEs and growing businesses", text: "Practical reporting, automation and technology choices that fit your size and budget." },
    { title: "Established companies", text: "Joining up data and systems built up over time, and getting more from what you already have." },
    { title: "NGOs and development organisations", text: "Dependable data for programme monitoring, funder reporting and operational decisions." },
    { title: "Institutions", text: "Reliable information systems and reporting that support planning and accountability." },
  ] satisfies TitledItem[],
};
