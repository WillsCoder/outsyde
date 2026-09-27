import type {
  LinkUp,
  LinkUpRequest,
  LinkUpStatus,
  LinkUpRequestStatus,
  User,
  Place,
  Event,
} from "@/app/generated/prisma/client"

export type LinkUpWithRelations = LinkUp & {
  creator: Pick<User, "id" | "name" | "image">
  place: Pick<Place, "id" | "name" | "slug"> | null
  event: Pick<Event, "id" | "title" | "slug"> | null
  requests: (LinkUpRequest & {
    sender: Pick<User, "id" | "name" | "image">
  })[]
  _count: { requests: number }
}

export type LinkUpCard = Pick<
  LinkUp,
  | "id"
  | "title"
  | "description"
  | "date"
  | "maxSize"
  | "status"
  | "createdAt"
> & {
  creator: Pick<User, "id" | "name" | "image">
  _count: { requests: number }
}

export type LinkUpRequestWithSender = LinkUpRequest & {
  sender: Pick<User, "id" | "name" | "image">
}

export type { LinkUpStatus, LinkUpRequestStatus }

export const LINKUP_STATUS_LABELS: Record<LinkUpStatus, string> = {
  OPEN:   "Open",
  CLOSED: "Closed",
  FULL:   "Full",
}

export const LINKUP_STATUS_COLORS: Record<LinkUpStatus, string> = {
  OPEN:   "bg-brand-lagoon/10 text-brand-lagoon",
  CLOSED: "bg-brand-night/10 text-brand-night/50",
  FULL:   "bg-brand-gold/10 text-brand-gold",
}