import Link from "next/link";
import Image from "next/image";
import { Post, PostTag, User } from "@/app/generated/prisma/client";
import { formatDistanceToNow } from "date-fns";
import { IconClock } from "@tabler/icons-react";

export type PostWithRelations = Post & {
  author: Pick<User, "name" | "image">;
  tags: PostTag[];
};

const categoryColors: Record<string, string> = {
  LIFESTYLE: "bg-brand-sand text-brand-night/60",
  FOOD: "bg-brand-gold/10 text-brand-gold",
  NIGHTLIFE: "bg-[#534AB7]/10 text-[#534AB7]",
  TRAVEL: "bg-brand-lagoon/10 text-brand-lagoon",
  CULTURE: "bg-brand-orange/10 text-brand-orange",
  EVENTS: "bg-pink-50 text-pink-500",
  GUIDES: "bg-brand-night/5 text-brand-night/60",
};

const BlogCard = ({
  post,
  featured = false,
}: {
  post: PostWithRelations;
  featured?: boolean;
}) => {

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group flex flex-col bg-white rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-200 ${featured ? "md:flex-row md:col-span-2" : ""}`}
    >
      {/* Cover image */}
      <div
        className={`relative overflow-hidden ${featured ? "md:w-1/2 h-56 md:h-auto" : "h-48"}`}
      >
        {post.coverImage ? (
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-brand-night/5" />
        )}
        <span
          className={`absolute top-3 left-3 text-[11px] font-medium px-2.5 py-1 rounded-full ${categoryColors[post.category] ?? categoryColors.LIFESTYLE}`}
        >
          {post.category.charAt(0) + post.category.slice(1).toLowerCase()}
        </span>
      </div>

      {/* Body */}
      <div
        className={`flex flex-col gap-3 p-5 ${featured ? "md:w-1/2 md:justify-center" : ""}`}
      >
        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex gap-1.5 flex-wrap">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag.id}
                className="text-[10px] font-medium text-brand-night/40 bg-brand-night/5 rounded-full px-2 py-0.5"
              >
                #{tag.name}
              </span>
            ))}
          </div>
        )}

        <h3
          className={`font-bold text-brand-night tracking-tight leading-tight group-hover:text-brand-orange transition-colors ${featured ? "text-2xl" : "text-base"}`}
        >
          {post.title}
        </h3>

        <p className="text-sm text-brand-night/50 leading-relaxed line-clamp-2">
          {post.excerpt}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-3 mt-auto pt-3 border-t border-brand-night/7">
          <div className="flex items-center gap-2">
            {post.author.image ? (
              <Image
                src={post.author.image}
                alt={post.author.name ?? ""}
                width={24}
                height={24}
                className="rounded-full"
              />
            ) : (
              <div className="w-6 h-6 rounded-full bg-brand-orange flex items-center justify-center text-white text-[10px] font-bold">
                {post.author.name?.charAt(0)}
              </div>
            )}
            <span className="text-xs font-medium text-brand-night/60">
              {post.author.name}
            </span>
          </div>
          <span className="text-brand-night/20">·</span>
          <span className="flex items-center gap-1 text-xs text-brand-night/40">
            <IconClock size={11} /> {post.readTime} min read
          </span>
          {post.publishedAt && (
            <>
              <span className="text-brand-night/20">·</span>
              <span className="text-xs text-brand-night/40 ml-auto">
                {formatDistanceToNow(new Date(post.publishedAt), {
                  addSuffix: true,
                })}
              </span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}

export default BlogCard;
