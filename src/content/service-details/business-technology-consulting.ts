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
      { title: "Business and technical discovery", text: "Understanding your goals, processes, systems and constraints before proposing anything." },
      { title: "Requirements gathering", text: "Turning stakeholder needs into clear, prioritised requirements that people have agreed." },
      { title: "Technology assessment", text: "Comparing the options, including your current tools, against your actual requirements." },
      { title: "Solution architecture", text: "Outlining how the parts of a solution fit together, with trade-offs explained." },
      { title: "Implementation planning", text: "Breaking the work into realistic stages, with dependencies, risks and resources identified." },
      { title: "Technology advisory", text: "Independent advice on technology decisions as they arise, within an agreed scope." },
    ],
  },
  deliverables: {
    heading: "Example advisory deliverables",
    lead: "These are examples of advice and planning outputs, not a fixed menu. Implementation is scoped separately, where agreed.",
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
  approach: {
    heading: "A typical approach",
    lead: "The steps are adapted to your situation. The last step applies where agreed.",
    steps: [
      { title: "Discover", text: "We learn about your goals, people, processes and systems, and talk to the people affected." },
      { title: "Assess and compare", text: "We set out your requirements and weigh the realistic options against them." },
      { title: "Design and plan", text: "We recommend an approach and plan how to deliver it in stages." },
      { title: "Support delivery, where agreed", text: "We stay involved as the plan is carried out, within the scope we agree." },
    ],
  },
  value: {
    heading: "What this can help you achieve",
    lead: "Results depend on your organisation, the decisions you take and how the plan is carried out. We can’t guarantee specific outcomes.",
    items: [
      "A clearer shared understanding of what is needed",
      "Technology choices made against your actual requirements",
      "A realistic plan that can be acted on",
      "Better visibility of scope, effort and dependencies before work begins",
    ],
  },
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
