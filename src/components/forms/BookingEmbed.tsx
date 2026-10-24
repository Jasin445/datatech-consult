import type { BookingEmbed as Embed } from "@/lib/booking";

/**
 * The scheduling provider's booking page, framed inline. The provider handles availability, time zones,
 * confirmation and rescheduling. A plain link to the same page is shown beneath as a fallback.
 */
export function BookingEmbed({ embed, bookingUrl }: { embed: Embed; bookingUrl: string }) {
  return (
    <div>
      <div className="overflow-hidden rounded-md border border-border bg-white">
        <iframe
          src={embed.src}
          title={`Available consultation times (booking calendar by ${embed.provider})`}
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          className="block h-[56rem] w-full border-0 md:h-[46rem]"
        />
      </div>
      <p className="mt-4 mb-0 text-sm text-muted">
        Calendar not loading?{" "}
        <a href={bookingUrl} target="_blank" rel="noopener noreferrer">
          Open the booking page in a new tab
        </a>
        .
      </p>
    </div>
  );
}
