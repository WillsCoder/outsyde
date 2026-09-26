import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { PostDetail } from "@/lib/const/types/post";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import ShareButtons from "../components/share-buttons";
import BlogCard from "../components/blog-card";

interface Props {
  post: PostDetail;
  related: PostDetail[];
}

const BlogDetailIndex = ({ post, related }: Props) => {
  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      <div className="max-w-3xl mx-auto">
        {/* Back */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-brand-night/50 hover:text-brand-night transition-colors mb-8"
        >
          <IconArrowLeft size={14} /> Back to blog
        </Link>

        {/* Category + tags */}
        <div className="flex items-center gap-2 flex-wrap mb-4">
          <span className="text-xs font-medium bg-brand-orange/10 text-brand-orange rounded-full px-3 py-1">
            {post.category.charAt(0) + post.category.slice(1).toLowerCase()}
          </span>
          {post.tags.map((tag) => (
            <Link
              key={tag.id}
              href={`/blog?tag=${tag.slug}`}
              className="text-xs text-brand-night/40 hover:text-brand-orange transition-colors"
            >
              #{tag.name}
            </Link>
          ))}
        </div>

        {/* Title */}
        <h1 className="text-3xl lg:text-5xl font-display font-bold text-brand-night tracking-tight leading-tight mb-4">
          {post.title}
        </h1>

        <p className="text-lg text-brand-night/50 leading-relaxed mb-6">
          {post.excerpt}
        </p>

        {/* Author + meta */}
        <div className="flex items-center justify-between gap-4 mb-8 pb-6 border-b border-brand-night/7">
          <div className="flex items-center gap-3">
            {post.author.image ? (
              <Image
                src={post.author.image}
                alt={post.author.name ?? ""}
                width={40}
                height={40}
                className="rounded-full"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-brand-orange flex items-center justify-center text-white font-bold">
                {post.author.name?.charAt(0)}
              </div>
            )}
            <div>
              <p className="text-sm font-medium text-brand-night">
                {post.author.name}
              </p>
              <p className="text-xs text-brand-night/40">
                {post.publishedAt &&
                  format(new Date(post.publishedAt), "MMM d, yyyy")}
                {" · "}
                {post.readTime} min read
              </p>
            </div>
          </div>
          <ShareButtons title={post.title} slug={post.slug} />
        </div>

        {/* Cover image */}
        {post.coverImage && (
          <div className="relative w-full h-64 lg:h-96 rounded-2xl overflow-hidden mb-10">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Content */}
        <article
          className="prose prose-lg max-w-none
            prose-headings:font-display prose-headings:text-brand-night prose-headings:tracking-tight
            prose-p:text-brand-night/70 prose-p:leading-relaxed
            prose-a:text-brand-orange prose-a:no-underline hover:prose-a:underline
            prose-strong:text-brand-night
            prose-ul:text-brand-night/70
            prose-li:marker:text-brand-orange
            prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
            prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Bottom share */}
        <div className="mt-12 pt-8 border-t border-brand-night/7 flex items-center justify-between flex-wrap gap-4">
          <ShareButtons title={post.title} slug={post.slug} />
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-brand-night/50 hover:text-brand-night transition-colors"
          >
            More posts <IconArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* Related posts */}
      {related.length > 0 && (
        <div className="mt-16 pt-10 border-t border-brand-night/7">
          <h2 className="text-xl font-bold text-brand-night mb-6">
            More like this
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {related.map((p) => (
              <BlogCard key={p.id} post={p} />
            ))}
          </div>
        </div>
      )}
    </main>
  );
};

export default BlogDetailIndex;
