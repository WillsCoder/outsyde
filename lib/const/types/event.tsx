import type { Event, Place, Comment, TicketType, EventCategory } from "@/app/generated/prisma/client"

// Base event type straight from Prisma
export type EventWithRelations = Event & {
  place: Place | null
  comments: {
    id: string;
    body: string;
    user: { name: string | null; image: string | null };
    createdAt: Date;
  }[];
}

// For list/card views (lighter)
export type EventCard = Pick<
  Event,
  | "id"
  | "slug"
  | "title"
  | "description"
  | "category"
  | "imageUrl"
  | "ticketType"
  | "ticketPrice"
  | "ticketUrl"
  | "startTime"
  | "endTime"
  | "address"
  | "city"
  | "isFeatured"
  | "isPublished"
> & {
  place: Pick<Place, "id" | "name" | "slug"> | null
}

export const CATEGORIES = [
  "MUSIC",
  "ART",
  "TECH",
  "FOOD",
  "COMEDY",
  "SPORTS",
  "OTHER",
] as const;

export const CATEGORY_LABELS: Record<EventCategory, string> = {
  MUSIC: "Music",
  ART: "Art",
  TECH: "Tech",
  FOOD: "Food",
  COMEDY: "Comedy",
  SPORTS: "Sports",
  FASHION: "Fashion",
  OTHER: "Other",
};

export const WHEN_OPTIONS = [
  { value: "today", label: "Today" },
  { value: "week", label: "This week" },
  { value: "month", label: "This month" },
] as const;

export const TICKET_OPTIONS = [
  { value: "FREE", label: "Free" },
  { value: "PAID", label: "Paid" },
] as const;

// For the detail page (full)
type EventDetail = EventWithRelations

// Re-export enums for convenience
export type { TicketType, EventCategory, EventDetail }