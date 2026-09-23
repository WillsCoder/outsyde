import Link from "next/link";
import { EventCategory, TicketType } from "@/lib/const/types/event";
import Image from "next/image";

type EventCardProps = {
  event: {
    slug: string;
    title: string;
    category: EventCategory;
    imageUrl: string | null;
    ticketType: TicketType;
    ticketPrice: number | null;
    startTime: Date;
    city: string;
    address: string | null;
    isFeatured: boolean;
    place: { name: string } | null;
  };
  pattern: string
};

const naira = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
});

const EventCard = ({ event, pattern }: EventCardProps) => {
  const d = new Date(event.startTime);
  const venue = event.place?.name ?? event.address ?? "Venue TBA";
  
  return (
    <Link
      href={`/events/${event.slug}`}
      className={`block ${pattern} h-full min-h-70 group overflow-hidden rounded-2xl border border-brand-night/10 bg-white transition-shadow hover:shadow-lg`}
    >
      <div className="relative overflow-hidden bg-brand-sand h-[calc(100%-8rem)]">
        {event.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <Image
            src={event.imageUrl}
            alt={event.title}
            width={1200}
            height={1200}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-brand-orange/20 to-brand-gold/20 text-4xl">
            🎉
          </div>
        )}

        {/* date badge */}
        <div className="absolute left-3 top-3 rounded-xl bg-brand-orange px-3 py-1.5 text-center leading-none">
          <span className="block text-lg font-bold text-brand-sand">
            {d.toLocaleDateString("en-NG", { day: "numeric" })}
          </span>
          <span className="block text-[10px] font-bold uppercase tracking-wide text-brand-sand/80">
            {d.toLocaleDateString("en-NG", { month: "short" })}
          </span>
        </div>

        {/* chips */}
        <div className="absolute right-3 top-3 flex flex-col items-end gap-1.5">
          {event.isFeatured && (
            <span className="rounded-full bg-brand-gold px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-brand-night">
              ⭐ Featured
            </span>
          )}
          <span className="rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-brand-night backdrop-blur">
            {event.category}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="line-clamp-1 font-display text-base font-bold text-brand-night">
          {event.title}
        </h3>
        <p className="mt-1 flex items-center gap-1.5 text-xs text-brand-night/60">
          <svg
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span className="truncate">
            {venue} · {event.city}
          </span>
        </p>

        <div className="mt-3 flex items-center justify-between border-t border-brand-night/5 pt-3">
          <span className="flex items-center gap-1.5 text-xs text-brand-night/60">
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
            {d.toLocaleTimeString("en-NG", {
              hour: "numeric",
              minute: "2-digit",
            })}
          </span>
          {event.ticketType === "FREE" ? (
            <span className="rounded-full bg-brand-lagoon/10 px-3 py-1 text-xs font-bold text-brand-lagoon">
              Free
            </span>
          ) : (
            <span className="rounded-full bg-brand-orange/10 px-3 py-1 text-xs font-bold text-brand-orange">
              {event.ticketPrice != null
                ? naira.format(event.ticketPrice)
                : "Paid"}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
