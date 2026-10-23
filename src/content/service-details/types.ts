import type { TitledItem } from "../home";
import type { Photo } from "../media/photos";

/** Shared shape for every dedicated service page (Checkpoints 4-7). */
export type ServiceDetail = {
  /** Must match a slug in src/content/services.ts */
  slug: string;
  metaTitle: string;
  metaDescription: string;
  heading: string;
  lead: string;
  intro: string[];
  problems: { heading: string; lead?: string; items: TitledItem[] };
  capabilities: { heading: string; lead?: string; items: TitledItem[] };
  /** Optional: where the service is a good fit (rendered after capabilities) */
  useCases?: { heading: string; lead?: string; items: TitledItem[] };
  deliverables: { heading: string; lead?: string; items: TitledItem[] };
  /** Service-specific caveats, risks or prerequisites */
  considerations: { heading: string; lead?: string; items: TitledItem[] };
  approach: { heading: string; lead?: string; steps: TitledItem[] };
  value: { heading: string; lead: string; items: string[] };
  /** Slugs of related services */
  related: string[];
  cta: { heading: string; body: string };
  /** V2 visual layer: photos and a short problem-first story told before the detail. */
  v2: {
    heroPhoto: Photo;
    hook: { heading: string; paragraphs: string[]; turn: string; photo: Photo };
    deliverablesPhoto: Photo;
  };
};
