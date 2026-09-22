import React from "react";
import Link from "next/link";
import {
  EventCategory,
  Prisma,
  TicketType,
} from "@/app/generated/prisma/browser";
import {
  CATEGORIES,
  CATEGORY_LABELS,
  TICKET_OPTIONS,
  WHEN_OPTIONS,
} from "@/lib/const/types/event";
import { prisma } from "@/lib/prisma";
import EventCard from "./components/event-card";

type SearchParams = {
  category?: string;
  when?: string;
  ticket?: string;
};
interface Props {
  searchParams: SearchParams;
}
const EventsIndex = async ({ searchParams }: Props) => {
  const { category, when, ticket } = await searchParams;

  const qs = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (when) params.set("when", when);
    if (ticket) params.set("ticket", ticket);
    for (const [k, v] of Object.entries(updates)) {
      if (v === null) params.delete(k);
      else params.set(k, v);
    }
    const s = params.toString();
    return `/events${s ? `?${s}` : ""}`;
  };

  // Time filters on startTime
  const now = new Date();
  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
  );
  const inDays = (n: number) => new Date(now.getTime() + n * 86400000);

  const startTime: Prisma.DateTimeFilter =
    when === "today"
      ? { gte: startOfToday, lt: inDays(1) }
      : when === "week"
        ? { gte: now, lte: inDays(7) }
        : when === "month"
          ? { gte: now, lte: inDays(30) }
          : { gte: now };

  const where: Prisma.EventWhereInput = {
    isPublished: true, // never show drafts
    startTime,
  };

  if (
    category &&
    Object.values(EventCategory).includes(category as EventCategory)
  ) {
    where.category = category as EventCategory;
  }
  if (ticket && Object.values(TicketType).includes(ticket as TicketType)) {
    where.ticketType = ticket as TicketType;
  }

  const events = await prisma.event.findMany({
    where,
    orderBy: [{ isFeatured: "desc" }, { startTime: "asc" }],
    include: { place: { select: { name: true } } },
    take: 48,
  });

  const pill = (active: boolean) =>
    `inline-flex h-9 shrink-0 items-center rounded-full border px-4 text-sm font-semibold transition-colors ${
      active
        ? "border-brand-night bg-brand-night text-brand-sand"
        : "border-brand-night/15 bg-white text-brand-night/60 hover:border-brand-night/40 hover:text-brand-night"
    }`;

  return (
    <main className="min-h-screen bg-brand-sand pb-20">
      {/* filters */}
      <div className="sticky top-0 z-20 border-b border-brand-night/10 bg-brand-sand/90 backdrop-blur">
        <div className="box scrollbar-none flex gap-6 overflow-x-auto py-4!">
          <div className="flex items-center gap-2">
            <Link href={qs({ category: null })} className={pill(!category)}>
              All
            </Link>
            {Object.entries(CATEGORY_LABELS).map(([value, label]) => (
              <Link
                key={value}
                href={qs({ category: value })}
                className={pill(category === value)}
              >
                {label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-2 border-l border-brand-night/10 pl-6">
            <Link href={qs({ when: null })} className={pill(!when)}>
              Anytime
            </Link>
            {WHEN_OPTIONS.map((w) => (
              <Link
                key={w.value}
                href={qs({ when: w.value })}
                className={pill(when === w.value)}
              >
                {w.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-2 border-l border-brand-night/10 pl-6">
            <Link href={qs({ ticket: null })} className={pill(!ticket)}>
              Any price
            </Link>
            {TICKET_OPTIONS.map((t) => (
              <Link
                key={t.value}
                href={qs({ ticket: t.value })}
                className={pill(ticket === t.value)}
              >
                {t.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* grid */}
      <div className="box mt-8">
        {events.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-brand-night/20 bg-white px-6 py-20 text-center">
            <p className="text-4xl">🎪</p>
            <h2 className="mt-4 font-display text-xl font-bold text-brand-night">
              Nothing here yet
            </h2>
            <p className="mx-auto mt-2 max-w-sm text-sm text-brand-night/60">
              No events match these filters right now. Check back soon — new
              drops weekly.
            </p>
            <Link
              href="/events"
              className="mt-6 inline-flex h-11 items-center rounded-full bg-brand-orange px-6 text-sm font-bold text-brand-night transition-transform hover:scale-105"
            >
              Clear filters
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-2">
            {events.map((event, index) => {
              const layout = [
                "col-span-2 row-span-2",
                "col-span-1 row-span-1",
                "col-span-1 row-span-1",
                "col-span-1 row-span-2",
                "col-span-1 row-span-1",
                "col-span-1 row-span-1",
              ];

              return (
                <EventCard
                  key={event.id}
                  event={event}
                  pattern={layout[index % layout.length]}
                />
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
};

export default EventsIndex;
