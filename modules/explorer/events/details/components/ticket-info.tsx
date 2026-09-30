import React from "react";
import { EventDetail } from "@/lib/const/types/event";
import { formatNaira } from "@/lib/utils/format-money";

interface Props {
  event: EventDetail;
}
const TicketInfo = ({ event }: Props) => {
  const start = new Date(event.startTime);
  const end = event.endTime ? new Date(event.endTime) : null;
  const venue = event.place?.name ?? event.address ?? "Venue TBA";

  const dateStr = start.toLocaleDateString("en-NG", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const timeStr = start.toLocaleTimeString("en-NG", {
    hour: "numeric",
    minute: "2-digit",
  });
  const endTimeStr = end
    ? end.toLocaleTimeString("en-NG", { hour: "numeric", minute: "2-digit" })
    : null;

  return (
    <div className="rounded-2xl border border-brand-night/10 bg-white p-6">
      <div className="flex items-baseline justify-between">
        {event.ticketType === "FREE" ? (
          <span className="font-display text-2xl font-extrabold text-brand-lagoon">
            Free
          </span>
        ) : (
          <span className="font-display text-2xl font-extrabold text-brand-night">
            {event.ticketPrice != null
              ? formatNaira(event.ticketPrice)
              : "Paid"}
          </span>
        )}
        <span className="text-xs text-brand-night/50">per person</span>
      </div>

      <div className="mt-5 space-y-3 border-t border-brand-night/10 pt-5 text-sm">
        <p className="flex justify-between gap-4">
          <span className="text-brand-night/50">Date</span>
          <span className="text-right font-semibold text-brand-night">
            {dateStr}
          </span>
        </p>
        <p className="flex justify-between gap-4">
          <span className="text-brand-night/50">Time</span>
          <span className="text-right font-semibold text-brand-night">
            {timeStr}
            {endTimeStr ? ` – ${endTimeStr}` : ""}
          </span>
        </p>
        <p className="flex justify-between gap-4">
          <span className="text-brand-night/50">Venue</span>
          <span className="text-right font-semibold text-brand-night">
            {venue}
          </span>
        </p>
      </div>

      {event.ticketUrl ? (
        <a
          href={event.ticketUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 flex h-12 w-full items-center justify-center rounded-full bg-brand-orange text-sm font-bold text-brand-night transition-transform hover:scale-[1.02] active:scale-[0.98]"
        >
          {event.ticketType === "FREE" ? "RSVP" : "Get tickets →"}
        </a>
      ) : (
        <button
          disabled
          className="mt-6 h-12 w-full cursor-not-allowed rounded-full bg-brand-night/10 text-sm font-bold text-brand-night/40"
        >
          Tickets coming soon
        </button>
      )}

      <p className="mt-3 text-center text-[11px] text-brand-night/40">
        Always confirm event details with the venue before heading out.
      </p>
    </div>
  );
};

export default TicketInfo;
