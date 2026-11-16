/**
 * Homepage copy (V2). PROPOSED, subject to business review.
 * Rules: problem-first and specific; no testimonials, statistics, client names or results;
 * principles are stated as how we work, not as achievements.
 */
import type { ManagedContent } from "@/lib/content/status";
import { photos, type Photo } from "@/content/media/photos";
import { ctas } from "@/lib/site";
import { dummyCredibilityEvidence } from "./dummy-data";

export type TitledItem = { title: string; text: string };

export const hero = {
  eyebrow: "Data, analytics, AI and technology consulting",
  headline: "Your numbers should settle arguments,",
  headlineAccent: "not start them.",
  body: "We help organisations in Nigeria and across Africa turn scattered data and stubborn manual work into reporting people trust, systems that talk to each other, and automation that earns its place.",
  primary: ctas.consultation,
  secondary: ctas.enquiry,
  note: {
    label: "Field note",
    text: "Most reporting problems aren’t technology problems. They start with a question nobody agreed on.",
  },
};

/** The problem, told as a story (V2 narrative block). */
export const problem = {
  eyebrow: "The problem",
  heading: "Monday’s report took all of Friday.",
  paragraphs: [
    "The board wants one number. Finance has one, sales has another, and the spreadsheet that reconciles them lives on one person’s laptop. Every month it gets rebuilt by hand, and every month someone asks which version is right.",
    "Most organisations don’t have a data team to untangle this. So it lands on someone who already has a full-time job.",
  ],
  turn: "There’s a calmer way to run on data.",
};

/** Photo strip: where data actually starts. Captions describe settings, not clients. */
export const dataPlaces = {
  eyebrow: "Where the data comes from",
  heading: "Most data starts a long way from a dashboard.",
  lead: "In shops, fields, stores and offices, recorded however people can manage. Our work starts there, with the records you already keep.",
  places: [
    { caption: "Daily sales, still totted up on a board", photo: photos.stallRecords },
    { caption: "Field records captured on a phone", photo: photos.fieldPhone },
    { caption: "Stock and takings across many outlets", photo: photos.storeCounter },
    { caption: "Inputs, yields and payments to keep track of", photo: photos.farmCrops },
    { caption: "And the monthly report someone has to assemble", photo: photos.tabletProfessional },
  ],
};

/** "What the work looks like": each item is illustrated by a coded mockup (chosen in src/app/page.tsx). */
export const showcase = {
  eyebrow: "What the work looks like",
  heading: "What we build and hand over.",
  lead: "Three examples of the kind of work we deliver. The figures in them are illustrative.",
  items: [
    {
      key: "pipeline",
      kicker: "Data infrastructure",
      title: "One reporting store everyone reads from.",
      text: "Your systems keep doing their jobs. We connect them, clean what comes out, and load one reporting store everyone reads from.",
      href: "/services/data-infrastructure",
      linkLabel: "Explore data infrastructure",
    },
    {
      key: "workflow",
      kicker: "AI & automation",
      title: "Automation with a person in the loop.",
      text: "Routine steps run on their own. Anything unusual stops for a named person to check, so nothing important is decided unseen.",
      href: "/services/ai-automation",
      linkLabel: "Explore AI and automation",
    },
    {
      key: "options",
      kicker: "Business & technology consulting",
      title: "Options weighed before money is spent.",
      text: "When a decision is expensive to reverse, we lay the routes side by side, rate them against your constraints and recommend one, including “fix what you have”.",
      href: "/services/business-technology-consulting",
      linkLabel: "Explore technology consulting",
    },
  ],
} as const;

export const challenges = {
  heading: "Sound familiar?",
  lead: "Not every organisation has all of these. One is usually enough to start a conversation.",
  items: [
    { title: "Reports built by hand", text: "The same report is rebuilt every period, and only one person knows how." },
    { title: "Data in ten places", text: "Systems, spreadsheets and inboxes that never meet, so nobody sees the whole picture." },
    { title: "Numbers nobody trusts", text: "Two teams, two figures, and a decision waiting on which one is right." },
    { title: "AI pressure, no plan", text: "Everyone is talking about AI. Nobody has said what it should actually do for you." },
    { title: "Skilled people, copying cells", text: "Hours of checking, chasing and re-typing that a better process would remove." },
  ] satisfies TitledItem[],
};

export const servicesIntro = {
  eyebrow: "What we do",
  heading: "Four services that hand work to each other.",
  lead: "Start wherever the problem costs you most; most engagements end up touching more than one.",
};

/** Photo for each service card, keyed by service slug. */
export const servicePhotos: Record<string, Photo> = {
  "data-analytics": photos.analystWindow,
  "data-infrastructure": photos.riverCity,
  "ai-automation": photos.codeLaptop,
  "business-technology-consulting": photos.threeColleagues,
};

/** Statement band: large serif statement on solid ink (no photograph). */
export const statement = {
  text: "The best sign the work is done:",
  accent: "the meeting gets shorter.",
  photo: photos.bridgeNight,
};

export const process = {
  eyebrow: "How we work",
  heading: "From first conversation to working system.",
  lead: "Every engagement is scoped to the problem. The last two stages happen only where we agree them.",
  photo: photos.workshop,
  steps: [
    { title: "Understand", text: "Your goals, your constraints, and the challenge in your own words." },
    { title: "Diagnose", text: "We look at the data, systems and processes to find what is really causing it." },
    { title: "Design", text: "A practical approach with options, trade-offs and a clear scope." },
    { title: "Implement, where agreed", text: "We build or configure the agreed solution alongside your team." },
    { title: "Support and improve, where agreed", text: "We help you run it and refine it as your needs change." },
  ] satisfies TitledItem[],
};

/**
 * Verified credibility evidence (approved projects, credentials, etc.).
 * Empty until the business supplies approved items; the homepage then shows the
 * commitments fallback below. Never add unverified items with status "approved".
 */
export type CredibilityEvidence = TitledItem;
export const credibilityEvidence: ManagedContent<CredibilityEvidence>[] = [...dummyCredibilityEvidence];

/**
 * "What working with us is like": principles and commitments merged into one short set (V3 fixes).
 * Shown when no approved credibility evidence exists; approved evidence replaces it.
 */
export const workingWithUs = {
  eyebrow: "Working with us",
  heading: "What working with us is like.",
  items: [
    { title: "Problem first", text: "We start with the decision you need to make. The technology comes second." },
    { title: "Straight answers", text: "If a tool, including AI, isn’t the right fit, we’ll say so. Sometimes the answer is to do less." },
    { title: "Scope before work", text: "You see what’s included, what isn’t and what it costs before anything starts." },
    { title: "Work you can own", text: "Documented and handed over, so your team can understand and run it." },
  ] satisfies TitledItem[],
};

export type Audience = TitledItem & { photo: Photo };

export const audiences = {
  eyebrow: "Who we help",
  heading: "Built for organisations doing real work, under real constraints.",
  lead: "We work with organisations in Nigeria and across Africa.",
  items: [
    { title: "SMEs and growing businesses", text: "Reporting, automation and technology choices sized to your team and budget.", photo: photos.smeDesk },
    { title: "Established companies", text: "Joining up data and systems that have grown over years, and getting more from them.", photo: photos.executives },
    { title: "NGOs and development organisations", text: "Dependable data for programme monitoring, funder reporting and operations.", photo: photos.collaborationCouch },
    { title: "Institutions", text: "Information systems and reporting that support planning and accountability.", photo: photos.skyline },
  ] satisfies Audience[],
};

/** Closing section: the two ways to start, as ornament cards. */
export const nextStep = {
  eyebrow: "Your next step",
  heading: "Start with a conversation about the problem.",
  options: [
    {
      title: "Talk it through",
      text: "An initial conversation to understand the situation and whether we’re the right people to help.",
      cta: ctas.consultation.label,
      href: ctas.consultation.href,
      recommended: true,
    },
    {
      title: "Write to us",
      text: "Prefer writing? Describe the challenge in your own words and we’ll reply by email with questions or a next step.",
      cta: ctas.enquiry.label,
      href: ctas.enquiry.href,
    },
  ],
};
