import { describe, expect, it } from "vitest";
import { bookingPage } from "@/content/booking";
import { bookingProviderHost, parseBookingUrl } from "@/lib/booking";

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
  it("does not promise a meeting length or format until confirmed", () => {
    expect(bookingPage.details.duration).toBeNull();
    expect(bookingPage.details.format).toBeNull();
  });

  it("does not claim availability or a booked meeting", () => {
    const text = JSON.stringify(bookingPage).toLowerCase();
    for (const phrase of ["you are booked", "booking confirmed", "available now", "free consultation"]) {
      expect(text).not.toContain(phrase);
    }
  });
});
