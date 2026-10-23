/**
 * Business & Technology Consulting page copy. Subject to business review.
 * Advisory deliverables are kept distinct from implementation work. No claims about past clients or engagements.
 */
import { photos } from "../media/photos";
import type { ServiceDetail } from "./types";

export const businessTechnologyConsulting: ServiceDetail = {
  slug: "business-technology-consulting",
  metaTitle: "Business & Technology Consulting",
  metaDescription:
    "Discovery, requirements, technology assessment, solution architecture and implementation planning that turn business needs into practical technical plans.",
  heading: "Business and technology consulting",
  lead: "Turn business needs into practical technical plans, and understand what it will take to deliver them.",
  intro: [
    "Technology decisions are easier when the business problem is clear first. Projects often struggle not because the technology failed, but because requirements were vague, options were never compared, or nobody planned how the work would be delivered and run.",
    "We help you clarify what you need, assess your options and plan a realistic way forward. Strategy and implementation are connected, so our advice takes account of how a solution would be built and maintained. Whether we also carry out implementation depends on the engagement we agree.",
  ],
  problems: {
    heading: "Problems this service addresses",
    lead: "You may recognise some of these. Few organisations have all of them.",
    items: [
      { title: "Unclear requirements", text: "People agree something needs to change, but not what, or each stakeholder describes a different need." },
      { title: "Too many technology options", text: "Vendors and tools compete for attention, and it is hard to tell which suits your situation." },
      { title: "Projects that stall or overrun", text: "Work starts without a clear scope, and delays and rising costs follow." },
      { title: "Plans without a path to delivery", text: "A strategy exists, but nobody has worked out the practical steps to deliver it." },
      { title: "Systems that no longer fit", text: "Tools adopted earlier no longer match how the organisation works, and it is unclear whether to fix, replace or keep them." },
    ],
  },
  capabilities: {
    heading: "What we can help with",
    items: [
      { title: "Discovery and requirements", text: "The problem, the people affected and what “done” looks like, written down before anyone buys anything." },
      { title: "Technology assessment", text: "An honest look at your current systems: what works, what doesn’t and what it costs to keep." },
      { title: "Options appraisal", text: "Routes compared side by side on cost, risk, time and fit, with one recommended." },
      { title: "Solution architecture", text: "How the recommended option fits together, at a level your team and suppliers can build from." },
      { title: "Implementation roadmap", text: "Phases, dependencies and decisions in an order your organisation can actually deliver." },
      { title: "Technology advisory", text: "A second opinion on technology decisions, proposals and quotes before you commit." },
    ],
  },
  deliverables: {
    heading: "Example advisory deliverables",
    lead: "Examples of advice and planning outputs, not a fixed menu. If you want us to build what we recommend, that is scoped as a separate piece of work.",
    items: [
      { title: "Discovery findings", text: "A summary of what we learned about your goals, processes, systems and constraints." },
      { title: "Requirements specification", text: "A written, prioritised statement of what the solution needs to do." },
      { title: "Options assessment", text: "A comparison of the realistic options, with our recommendation and the reasons for it." },
      { title: "Solution architecture", text: "An outline of how the proposed solution fits together and connects to your existing systems." },
      { title: "Implementation plan", text: "Stages, dependencies, risks and resource needs for delivering the chosen approach." },
      { title: "Advisory recommendations", text: "Written advice on a specific technology decision, with the assumptions behind it." },
    ],
  },
  considerations: {
    heading: "Advice and implementation are different work",
    lead: "We keep them distinct so you know what you are getting and what comes next.",
    items: [
      { title: "Advisory work", text: "Assessments, recommendations, architectures and plans. These help you decide and prepare. They do not by themselves deliver a working system." },
      { title: "Implementation work", text: "Building, configuring and deploying the solution. It is scoped separately, and may be carried out by us, by your own team or by another supplier." },
      { title: "Agreeing the boundary", text: "You decide how far we go. Some organisations may prefer to stop at a plan, and others may want continued help. We agree the boundary in the scope." },
    ],
  },
  disclaimer: "Results depend on your organisation, the decisions you take and how the plan is carried out. We can’t guarantee specific outcomes.",
  related: ["data-infrastructure", "ai-automation"],
  cta: {
    heading: "Bring us the decision you’re stuck on.",
    body: "Tell us what you are trying to achieve and what is in the way. We’ll tell you honestly how we can help.",
  },
  v2: {
    heroPhoto: photos.threeColleagues,
    hook: {
      heading: "Something has to change. Nobody agrees on what.",
      paragraphs: [
        "A vendor is pitching a new system. A board member has read about AI. Operations wants the old process fixed first. Every option has a cost, and none comes with a plan your team can actually deliver.",
        "Decisions made in that fog tend to be expensive to reverse.",
      ],
      turn: "Get clear before you commit.",
      photo: photos.executives,
    },
    deliverablesPhoto: photos.whiteboardLaptop,
  },
};
