/** AI & Automation page copy. Subject to business review. AI is presented as one option, never the default answer. */
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
      { title: "Workflow automation", text: "Automating routine, rules-based steps such as routing, notifications and approvals." },
      { title: "AI-assisted business processes", text: "Using AI to support a task, such as drafting or sorting, with a person reviewing the result." },
      { title: "Internal tools", text: "Simple tools that replace spreadsheet-and-email processes your team relies on." },
      { title: "System integrations", text: "Connecting the tools you already use so information moves without re-entry." },
      { title: "Repetitive-task reduction", text: "Finding and removing steps that add effort but little value." },
      { title: "Practical AI implementation", text: "Putting an agreed AI use case into working use, with testing and clear ownership." },
    ],
  },
  useCases: {
    heading: "Where automation and AI tend to fit",
    lead: "Good candidates are usually tasks that are frequent, follow clear rules, and where mistakes are easy to spot and correct.",
    items: [
      { title: "Routine documents and reports", text: "Preparing standard documents or summaries from information you already hold." },
      { title: "Sorting and routing requests", text: "Directing enquiries, tickets or forms to the right person or process." },
      { title: "Data entry and transfer", text: "Moving information between systems without manual re-keying." },
      { title: "Reminders, approvals and updates", text: "Keeping routine processes moving without someone chasing." },
      { title: "Drafting and summarising for review", text: "AI-prepared first drafts or summaries that a person checks before use." },
      { title: "Checking records for obvious errors", text: "Flagging missing, duplicate or inconsistent entries for a person to resolve." },
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
  approach: {
    heading: "A typical approach",
    lead: "The steps are adapted to your situation. The last step applies where agreed.",
    steps: [
      { title: "Identify candidates", text: "We look at your processes and list the tasks that might be worth improving." },
      { title: "Assess fit and feasibility", text: "We weigh benefit, effort, risk and oversight needs, and recommend what to pursue and what not to." },
      { title: "Build and test", text: "We build a small, working version and test it with the people who will use it." },
      { title: "Run and maintain, where agreed", text: "We help you operate it, monitor it and adjust it as things change." },
    ],
  },
  value: {
    heading: "What this can help you achieve",
    lead: "Results depend on the process, your systems and how the solution is used. We can’t guarantee cost savings, error-free results or particular staffing outcomes.",
    items: [
      "Less time spent on repetitive tasks",
      "More consistent handling of routine work",
      "Information that moves between systems without re-entry",
      "A clearer view of where AI does and doesn’t help",
    ],
  },
  related: ["business-technology-consulting", "data-infrastructure"],
  cta: {
    heading: "Talk to us about a process you’d like to improve",
    body: "Describe the task and what you’re considering. We’ll tell you honestly whether automation or AI is likely to help.",
  },
};
