/**
 * Homepage copy (V2). PROPOSED, subject to business review.
 * Rules: problem-first and specific; no testimonials, statistics, client names or results;
 * principles are stated as how we work, not as achievements.
 */
import type { ManagedContent } from "@/lib/content/status";
import { photos, type Photo } from "@/content/media/photos";

export type TitledItem = { title: string; text: string };

export const hero = {
  eyebrow: "Data, analytics, AI and technology consulting",
  headline: "Your numbers should settle arguments,",
  headlineAccent: "not start them.",
  body: "We help organisations in Nigeria and across Africa turn scattered data and stubborn manual work into reporting people trust, systems that talk to each other, and automation that earns its place.",
  primary: { label: "Discuss a business challenge", href: "/contact" },
  secondary: { label: "Explore our services", href: "/services" },
  photo: photos.boardroom,
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
    "The board wants one number. Finance has one, sales has another, and the spreadsheet that reconciles them lives on one person’s laptop. Every month the same people rebuild the same report by hand, and every month someone asks which version is right.",
    "Meanwhile the pressure to “do something with AI” keeps growing, with no clear view of where it would actually help.",
    "Most organisations don’t have a data team to untangle this. So it lands on someone who already has a full-time job.",
  ],
  turn: "There’s a calmer way to run on data.",
  photo: photos.streetAerial,
};

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
  heading: "Four ways in. One joined-up approach.",
  lead: "Start wherever the pain is. Most engagements touch more than one of these.",
};

/** Photo for each service card, keyed by service slug. */
export const servicePhotos: Record<string, Photo> = {
  "data-analytics": photos.analystWindow,
  "data-infrastructure": photos.riverCity,
  "ai-automation": photos.codeLaptop,
  "business-technology-consulting": photos.threeColleagues,
};

/** Full-bleed statement over a photograph. */
export const statement = {
  text: "The best sign the work is done:",
  accent: "the meeting gets shorter.",
  photo: photos.bridgeNight,
};

export const principles = {
  eyebrow: "How we think",
  heading: "Principles we won’t trade away.",
  lead: "This is how we work on every engagement. They are commitments, not claims about past results.",
  items: [
    { title: "Problem first", text: "We start with the decision you need to make or the work you need to remove. The technology comes second." },
    { title: "Built for your context", text: "Your people, systems, budget and connectivity shape the answer. No borrowed blueprints." },
    { title: "Strategy that ships", text: "Every plan is written with delivery in mind, so it can be acted on by the team you have." },
    { title: "Useful over impressive", text: "We judge the work by whether people use it, not by how much technology it contains." },
  ] satisfies TitledItem[],
};

export const process = {
  eyebrow: "How we work",
  heading: "From first conversation to working system.",
  lead: "Every engagement is scoped to the problem. The last two stages happen only where we agree them.",
  photo: photos.oneToOne,
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
export const credibilityEvidence: ManagedContent<CredibilityEvidence>[] = [];

export const credibilityFallback = {
  eyebrow: "Working with us",
  heading: "What you can hold us to.",
  lead: "However big or small the engagement.",
  photo: photos.conversation,
  items: [
    { title: "Scope before work", text: "You know what’s included, what isn’t, and what we need from you." },
    { title: "Honest advice", text: "If a tool, including AI, isn’t the right fit, we’ll tell you." },
    { title: "Plain language", text: "Findings and options explained in terms decision-makers can act on." },
    { title: "Work you can own", text: "We document what we build so your team can understand and run it." },
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
  heading: "Bring us the problem. We’ll bring the plan.",
  options: [
    {
      title: "Send an enquiry",
      text: "Describe the challenge in your own words. We reply by email with questions or a suggested next step.",
      cta: "Start in writing",
      href: "/contact",
    },
    {
      title: "Book a consultation",
      text: "An initial conversation to understand the situation and whether we’re the right people to help.",
      cta: "Pick a time",
      href: "/book-consultation",
    },
  ],
};
