/**
 * About page copy (V2). Subject to business review.
 * Deliberately excludes founding year, legal status, history, leadership identities, credentials, mission and partnerships:
 * none have been supplied or verified. Copy describes how we work, not what we have done.
 */
import { photos } from "./media/photos";

export const aboutPage = {
  title: "About",
  metaDescription:
    "Datatechhub Consulting is a practical business problem-solving partner connecting business needs with data, technology and implementation.",
  eyebrow: "About us",
  heading: "A practical partner for problems that don’t fit a template.",
  lead: "Datatechhub Consulting connects business needs with data, technology and implementation, so organisations can make better-informed decisions.",
  photo: photos.teamOffice,
  overview: {
    eyebrow: "Who we are",
    heading: "We’re not here to sell you a platform.",
    statement: "We’re here to make the decision in front of you easier, and the one after it.",
    paragraphs: [
      "We work with organisations in Nigeria and across Africa that want to solve a business problem using data and technology, without taking on more complexity than they need.",
      "Our work spans analytics and reporting, data foundations, AI and automation, and technology consulting. We treat these as connected: the right answer often involves more than one, and sometimes it is simpler than expected.",
    ],
    photos: [photos.roundtable, photos.pairWorking],
  },
  parent: {
    eyebrow: "Part of Datatechhub",
    heading: "Our relationship to Datatechhub",
    paragraphs: [
      "Datatechhub Consulting is associated with the Datatechhub parent brand, whose tagline is “Empowering through data.”",
      "This website describes the consulting business only.",
    ],
  },
  leadership: {
    eyebrow: "The people",
    heading: "Leadership",
    lead: "The people responsible for our work.",
  },
  statement: {
    text: "Context isn’t a detail.",
    accent: "It’s the brief.",
    photo: photos.skylineWide,
  },
  next: {
    heading: "Tell us what you’re trying to solve.",
  },
};
