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

export type BookingEmbed = { src: string; provider: string };

/**
 * Inline-embed address for a booking link, or null when the link cannot (or must not) be embedded.
 * Only known scheduling providers are ever framed:
 *  - Google Calendar appointment schedules: calendar.google.com/calendar/appointments/schedules/<id>  (adds gv=true)
 *    Short links (calendar.app.google/...) redirect and cannot be framed: use the "Website embed" link instead.
 *  - Calendly: calendly.com/<user>/<event>  (adds embed parameters)
 *  - Cal.com: cal.com/<user>/<event>  (adds embed=true)
 */
export function bookingEmbed(url: string | null, embedDomain?: string): BookingEmbed | null {
  if (!url) return null;
  let u: URL;
  try {
    u = new URL(url);
  } catch {
    return null;
  }
  const host = u.hostname.replace(/^www\./, "");
  if (host === "calendar.google.com" && u.pathname.startsWith("/calendar/appointments/schedules/")) {
    u.searchParams.set("gv", "true");
    return { src: u.toString(), provider: "Google Calendar" };
  }
  if (host === "calendly.com" && u.pathname.split("/").filter(Boolean).length >= 1) {
    u.searchParams.set("hide_gdpr_banner", "1");
    u.searchParams.set("embed_type", "Inline");
    if (embedDomain) u.searchParams.set("embed_domain", embedDomain);
    return { src: u.toString(), provider: "Calendly" };
  }
  if (host === "cal.com" && u.pathname.split("/").filter(Boolean).length >= 1) {
    u.searchParams.set("embed", "true");
    return { src: u.toString(), provider: "Cal.com" };
  }
  return null;
}
