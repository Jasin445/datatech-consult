/** AI & Automation page copy. Subject to business review. AI is presented as one option, never the default answer. */
import { photos } from "../media/photos";
import type { ServiceDetail } from "./types";

export const aiAutomation: ServiceDetail = {
  slug: "ai-automation",
  metaTitle: "AI & Automation",
  metaDescription:
    "Workflow automation, internal tools, system integrations and practical AI, assessed for fit, risk and human oversight.",
  heading: "AI and automation",
  lead: "Reduce repetitive work and apply AI where it genuinely fits, with attention to feasibility, risk and human oversight.",
  intro: [
    "Many organisations lose hours to tasks that follow the same steps every time: copying data between systems, preparing routine documents, chasing approvals. Some of that can be automated. Some can be helped by AI. Some is better left alone.",
    "We help you work out which is which, then build what is worthwhile. AI is one tool among several, and a simpler solution is often the better one.",
  ],
  problems: {
    heading: "Problems this service addresses",
    lead: "You may recognise some of these. Few organisations have all of them.",
    items: [
      { title: "Repetitive manual tasks", text: "Skilled people spend time on routine steps that follow the same pattern each time." },
      { title: "Hand-offs by email and spreadsheet", text: "Work moves between people and systems by hand, with delays and dropped steps." },
      { title: "Disconnected tools", text: "Staff re-enter the same information in several systems because they don’t talk to each other." },
      { title: "Pressure to do something with AI", text: "There is interest in AI, but no clear view of where it would actually help." },
      { title: "Concerns about reliability and risk", text: "Questions about accuracy, confidentiality and control make it hard to decide whether to proceed." },
    ],
  },
  capabilities: {
    heading: "What we can help with",
    items: [
      { title: "Workflow automation", text: "Approvals, reminders, hand-offs and status updates that run on their own, with exceptions routed to a person." },
      { title: "Document and data entry", text: "Invoices, forms and records read and entered into your systems, checked before anything is posted." },
      { title: "AI-assisted drafting and summaries", text: "First drafts and summaries prepared by AI and reviewed by a named person before use." },
      { title: "Sorting and routing requests", text: "Enquiries, tickets and forms sent to the right person or queue automatically." },
      { title: "Internal tools", text: "Small, focused applications for tasks your team still does in spreadsheets and email." },
      { title: "An AI suitability check", text: "Whether AI suits a given problem, what it would take, and what could go wrong." },
    ],
  },
  deliverables: {
    heading: "Example deliverables",
    lead: "These are examples, not a fixed menu. What you receive depends on the scope we agree.",
    items: [
      { title: "Opportunity assessment", text: "A shortlist of processes with notes on benefit, feasibility, risk and whether to proceed." },
      { title: "Automated workflow", text: "A tested workflow that handles an agreed routine process." },
      { title: "Internal tool", text: "A simple application for a specific task your team currently does by hand." },
      { title: "System integration", text: "A connection that moves agreed information between your systems." },
      { title: "AI-assisted process with review steps", text: "A working process where AI helps and a named person checks the output." },
      { title: "Run guide and maintenance notes", text: "Documentation on how it works, who looks after it and what to do when it fails." },
    ],
  },
  considerations: {
    heading: "Feasibility, risk and human oversight",
    lead: "Whether to automate, and how, depends on more than whether it can be done.",
    items: [
      { title: "Fit with the problem", text: "We check whether automation or AI is the right answer at all. Sometimes a change to the process, or doing nothing, is better." },
      { title: "Feasibility", text: "Data quality, system access, cost and the effort to run it decide what is practical." },
      { title: "Risk and accuracy", text: "AI output can be wrong. We look at where errors would matter, how to catch them, and how the data involved is protected." },
      { title: "Human oversight", text: "Decisions with real consequences keep a person involved, with clear responsibility for review." },
      { title: "Maintenance", text: "Automations and AI-assisted processes need monitoring and updating as systems and needs change. We plan who looks after them." },
      { title: "Impact on people", text: "Automation changes how people work. We involve the people affected and consider the effect on their roles." },
    ],
  },
  disclaimer: "Results depend on the process, your systems and how the solution is used. We can’t guarantee cost savings, error-free results or particular staffing outcomes.",
  related: ["business-technology-consulting", "data-infrastructure"],
  cta: {
    heading: "Tell us which task eats the most hours.",
    body: "Describe the task and what you’re considering. We’ll tell you whether automation or AI is likely to help.",
  },
  v2: {
    heroPhoto: photos.codeLaptop,
    hook: {
      heading: "Everyone wants AI; few can say which task it should take on.",
      paragraphs: [
        "Somewhere in your organisation, capable people spend hours re-typing invoices, chasing approvals and copying figures between systems. That is usually where automation helps first, and it rarely needs anything exotic.",
        "Elsewhere, an AI tool is being trialled with no clear problem, no owner and no way to check its answers.",
      ],
      turn: "Start with the task that eats the most hours.",
      photo: photos.focusedWork,
    },
    deliverablesPhoto: photos.laptopFocus,
  },
};
