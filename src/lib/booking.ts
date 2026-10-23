/**
 * Booking-link rules. Pure (no env access) so they can be unit-tested; the env read lives in
 * `getBookingUrl` in src/lib/env.ts.
 *
 * Only HTTPS links are accepted: the link sends visitors to a third-party scheduling provider,
 * which handles availability, time zones, confirmations, cancellations and rescheduling.
 */
export function parseBookingUrl(value: string | undefined | null): string | null {
  if (!value) return null;
  try {
    const url = new URL(value.trim());
    if (url.protocol !== "https:" || !url.hostname.includes(".")) return null;
    return url.toString();
  } catch {
    return null;
  }
}

/** Hostname shown next to the booking button so visitors know they are leaving the site. */
export function bookingProviderHost(url: string): string {
  return new URL(url).hostname.replace(/^www\./, "");
}
