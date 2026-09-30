import type {
  LinkUp as LinkUpType,
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
    sender: Pick<User, "id" | "name" | "image" | "username" | "bio" | "instagramUrl" | "tiktokUrl" | "xUrl" | "snapchatUrl">
  })[]
  _count: { requests: number }
}

export type LinkUpCard = Pick<
  LinkUpType,
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

export type Sender = {
  id: string
  name: string | null
  image: string | null
  username: string | null
  bio: string | null
  instagramUrl: string | null
  tiktokUrl: string | null
  xUrl: string | null
  snapchatUrl: string | null
}

export type Request = {
  id: string
  message: string | null
  status: "PENDING" | "ACCEPTED" | "DECLINED"
  shareSocials: boolean
  createdAt: Date
  sender: Sender
}

export type LinkUp = {
  id: string
  title: string
  description: string | null
  date: Date
  maxSize: number
  status: "OPEN" | "CLOSED" | "FULL"
  shareSocials: boolean
  createdAt: Date
  place: { id: string; name: string; slug: string } | null
  event: { id: string; title: string; slug: string } | null
  requests: Request[]
  _count: { requests: number }
}

export type UserSocials = {
  instagramUrl: string | null
  tiktokUrl: string | null
  xUrl: string | null
  snapchatUrl: string | null
}