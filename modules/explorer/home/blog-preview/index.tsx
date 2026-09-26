import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Tag } from "@/components/ui";
import { IconArrowRight } from "@tabler/icons-react";
import BlogCard from "../../blog/components/blog-card";

const BlogPreview = async () => {
  const posts = await prisma.post.findMany({
    where: { isPublished: true },
    include: { author: true, tags: true },
    orderBy: { publishedAt: "desc" },
    take: 2,
  });

  if (posts.length === 0) return null;

  return (
    <section className="section">
      <div className="box">
        <div className="flex items-end justify-between mb-8">
          <div>
            <Tag text="From the blog" />
            <h2 className="pt-3 text-3xl lg:text-6xl font-display font-medium tracking-tight text-brand-night">
              Stories from
              <br className="hidden lg:block" /> the streets of Lagos
            </h2>
          </div>
          <Link
            href="/blog"
            className="hidden md:flex items-center gap-2 text-sm font-medium text-brand-orange hover:gap-3 transition-all"
          >
            Read all posts <IconArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post, i) => (
            <BlogCard
              key={post.id}
              post={post}
              featured={i === 0}
            />
          ))}
        </div>

        <Link
          href="/blog"
          className="md:hidden flex items-center justify-center gap-2 text-sm font-medium text-brand-orange mt-6"
        >
          Read all posts <IconArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
};

export default BlogPreview;
