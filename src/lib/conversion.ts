/**
 * Which ways of reaching the business actually work right now. Pure, so it can be tested; the
 * server wrapper is getConversionPaths in conversion-server.ts.
 * Pages use this so a fallback never points at another unavailable path (no circular dead ends).
 */
export type ConversionInputs = { formAvailable: boolean; bookingUrl: string | null; publicEmail: string | null };

export type ConversionPaths = {
  form: boolean;
  booking: boolean;
  email: string | null;
  /** True when a visitor has at least one working way to reach the business. */
  any: boolean;
};

export function resolveConversionPaths({ formAvailable, bookingUrl, publicEmail }: ConversionInputs): ConversionPaths {
  const booking = Boolean(bookingUrl);
  return { form: formAvailable, booking, email: publicEmail, any: formAvailable || booking || Boolean(publicEmail) };
}

/** Operator-facing launch warnings (logged at production server start). Empty when all paths work. */
export function conversionWarnings(paths: ConversionPaths): string[] {
  const w: string[] = [];
  if (!paths.form) w.push("Enquiry form is disabled (email not configured or privacy notice not approved).");
  if (!paths.booking) w.push("Booking is not configured (NEXT_PUBLIC_BOOKING_URL).");
  if (!paths.email) w.push("No public contact email (NEXT_PUBLIC_CONTACT_EMAIL).");
  if (!paths.any) w.push("LAUNCH BLOCKER: visitors have no working way to contact the business.");
  return w;
}
