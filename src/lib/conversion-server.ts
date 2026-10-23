import "server-only";
import { getContactAvailability } from "@/lib/contact/availability";
import { getBookingUrl, getPublicContactEmail } from "@/lib/env";
import { resolveConversionPaths, type ConversionPaths } from "./conversion";

export function getConversionPaths(): ConversionPaths {
  return resolveConversionPaths({
    formAvailable: getContactAvailability().available,
    bookingUrl: getBookingUrl(),
    publicEmail: getPublicContactEmail(),
  });
}
