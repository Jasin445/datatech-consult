/**
 * How engagements are shaped and how quoting works. PROPOSED copy for owner confirmation (RELEASE_CHECKLIST.md).
 * It restates commitments already published elsewhere ("scope before work", "some engagements end with a
 * diagnosis and a plan"). Deliberately contains NO prices, rates or durations: add them only when the
 * business supplies and approves them.
 */
/** Short labels for the five engagement stages, in the same order as `process.steps` in home.ts (tests/engagement.test.ts). */
export const STAGE_LABELS = ["Understand", "Diagnose", "Design", "Implement", "Support and improve"] as const;

export type EngagementShape = {
  name: string;
  /** Indexes into STAGE_LABELS: which stages this shape covers. */
  stages: number[];
  bestWhen: string;
  text: string;
  youGet: string;
};

export const engagement = {
  eyebrow: "How we work",
  heading: "Three ways to start. One honest quote.",
  lead: "Every engagement moves through the same five stages: understand, diagnose, design, implement, support. Each way of working covers some of them. Start with whichever fits; if you’re not sure, a diagnostic is a sensible first step.",
  shapes: [
    {
      name: "Diagnostic",
      stages: [0, 1, 2],
      bestWhen: "You know something isn’t working, but not what to do about it.",
      text: "A fixed-scope look at one problem: the data, systems and process behind it.",
      youGet: "A written assessment and a recommended plan you can act on, with us or without us.",
    },
    {
      name: "Project",
      stages: [2, 3],
      bestWhen: "You know what you need built or fixed.",
      text: "We build or configure an agreed solution, such as a dashboard, a pipeline or an automation, against a written scope.",
      youGet: "A working, tested solution, handed over with documentation your team can use.",
    },
    {
      name: "Ongoing support",
      stages: [4],
      bestWhen: "Something we built needs looking after as your needs change.",
      text: "Monitoring, maintenance and improvements on terms agreed in advance.",
      youGet: "A named contact and a clear understanding of what is covered.",
    },
  ] satisfies EngagementShape[],
  pricing: {
    heading: "How pricing works",
    points: [
      "We quote after the first conversation, once we understand the problem.",
      "Every quote comes with a written scope: what’s included, what isn’t, and what we need from you.",
      "No work starts until you’ve agreed the scope. Changes are agreed in writing first.",
    ],
  },
};
