import type { Event, Place, Comment, TicketType, EventCategory } from "@/app/generated/prisma/client"

// Base event type straight from Prisma
export type EventWithRelations = Event & {
  place: Place | null
  comments: Comment[]
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

// For the detail page (full)
export type EventDetail = EventWithRelations

// Re-export enums for convenience
export type { TicketType, EventCategory }