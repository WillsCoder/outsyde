import type {
  Post,
  User,
  PostTag,
  PostCategory,
} from "@/app/generated/prisma/client"

// ─── Base types ───────────────────────────────────────────────────────────────

export type PostWithRelations = Post & {
  author: Pick<User, "id" | "name" | "image">
  tags: PostTag[]
}

// ─── For card / list views (lightweight) ─────────────────────────────────────

export type PostCard = Pick<
  Post,
  | "id"
  | "slug"
  | "title"
  | "excerpt"
  | "coverImage"
  | "category"
  | "readTime"
  | "isFeatured"
  | "isPublished"
  | "publishedAt"
> & {
  author: Pick<User, "id" | "name" | "image">
  tags: Pick<PostTag, "id" | "name" | "slug">[]
}

// ─── For detail / full page ───────────────────────────────────────────────────

export type PostDetail = Post & {
  author: Pick<User, "id" | "name" | "image" | "email">
  tags: PostTag[]
}

// ─── For homepage preview (minimal) ──────────────────────────────────────────

export type PostPreview = Pick<
  Post,
  | "id"
  | "slug"
  | "title"
  | "excerpt"
  | "coverImage"
  | "category"
  | "readTime"
  | "publishedAt"
> & {
  author: Pick<User, "name" | "image">
}

// ─── Re-export enums ─────────────────────────────────────────────────────────

export type { PostCategory }

// ─── Helpers ─────────────────────────────────────────────────────────────────

export const POST_CATEGORY_LABELS: Record<PostCategory, string> = {
  LIFESTYLE: "Lifestyle",
  FOOD:      "Food",
  NIGHTLIFE: "Nightlife",
  TRAVEL:    "Travel",
  CULTURE:   "Culture",
  EVENTS:    "Events",
  GUIDES:    "Guides",
}

export const POST_CATEGORY_COLORS: Record<PostCategory, string> = {
  LIFESTYLE: "bg-brand-sand text-brand-night/60",
  FOOD:      "bg-brand-gold/10 text-brand-gold",
  NIGHTLIFE: "bg-[#534AB7]/10 text-[#534AB7]",
  TRAVEL:    "bg-brand-lagoon/10 text-brand-lagoon",
  CULTURE:   "bg-brand-orange/10 text-brand-orange",
  EVENTS:    "bg-pink-50 text-pink-500",
  GUIDES:    "bg-brand-night/5 text-brand-night/60",
}