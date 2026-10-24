import { describe, expect, it } from "vitest";
import { bookingPage } from "@/content/booking";
import { bookingEmbed, bookingProviderHost, parseBookingUrl } from "@/lib/booking";

describe("booking link rules", () => {
  it("treats a missing or blank value as unconfigured", () => {
    expect(parseBookingUrl(undefined)).toBeNull();
    expect(parseBookingUrl("")).toBeNull();
    expect(parseBookingUrl("   ")).toBeNull();
  });

  it("accepts an HTTPS provider link", () => {
    expect(parseBookingUrl(" https://cal.example.com/datatechhub/consultation ")).toBe(
      "https://cal.example.com/datatechhub/consultation",
    );
  });

  it("rejects non-HTTPS, script and malformed values", () => {
    expect(parseBookingUrl("http://cal.example.com/x")).toBeNull();
    expect(parseBookingUrl("javascript:alert(1)")).toBeNull();
    expect(parseBookingUrl("not a url")).toBeNull();
    expect(parseBookingUrl("https://localhost/x")).toBeNull();
  });

  it("shows the provider host without www", () => {
    expect(bookingProviderHost("https://www.example.com/book")).toBe("example.com");
  });
});

describe("booking page content", () => {
  it("shows meeting length and format only as confirmed, non-empty values (or not at all)", () => {
    // Confirmed by the owner on 2026-10-24; null means "not confirmed" and is not rendered.
    for (const v of [bookingPage.details.duration, bookingPage.details.format]) {
      expect(v === null || (typeof v === "string" && v.trim().length > 0)).toBe(true);
    }
  });

  it("does not claim availability or a booked meeting", () => {
    const text = JSON.stringify(bookingPage).toLowerCase();
    for (const phrase of ["you are booked", "booking confirmed", "available now", "free consultation"]) {
      expect(text).not.toContain(phrase);
    }
  });
});

describe("booking embed", () => {
  it("embeds a Google Calendar appointment schedule (website embed link)", () => {
    const e = bookingEmbed("https://calendar.google.com/calendar/appointments/schedules/AcZssZ123");
    expect(e?.provider).toBe("Google Calendar");
    expect(e?.src).toContain("gv=true");
  });

  it("does not embed Google short links (they redirect and cannot be framed)", () => {
    expect(bookingEmbed("https://calendar.app.google/abc123")).toBeNull();
  });

  it("embeds Calendly and Cal.com links", () => {
    expect(bookingEmbed("https://calendly.com/someone/consultation", "www.example.com")?.src).toContain("embed_domain=www.example.com");
    expect(bookingEmbed("https://cal.com/someone/consultation")?.src).toContain("embed=true");
  });

  it("never frames other sites, including lookalike domains", () => {
    for (const url of ["https://datatech-rho.vercel.app/", "https://calendar.google.com.evil.example/calendar/appointments/schedules/x", "https://evilcalendly.com/x", "https://calendar.google.com/calendar/r"]) {
      expect(bookingEmbed(url)).toBeNull();
    }
  });
});
