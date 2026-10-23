import "server-only";
import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/env";
import { buildPageMetadata, type PageSeo } from "./metadata";

/** Metadata for a route, using the configured production URL. See buildPageMetadata for the indexing policy. */
export function pageMetadata(seo: PageSeo): Metadata {
  return buildPageMetadata(seo, getSiteUrl());
}
