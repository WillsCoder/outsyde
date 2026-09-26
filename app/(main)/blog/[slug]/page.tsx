import { prisma } from "@/lib/prisma";
import BlogDetailIndex from "@/modules/explorer/blog/details";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  try {
    const posts = await prisma.post.findMany({
      where: { isPublished: true },
      select: { slug: true },
    });
    return posts.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = await prisma.post.findUnique({ where: { slug: slug } });
  if (!post) return {};
  return {
    title: `${post.title} — Outsyde`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : [],
    },
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = await prisma.post.findUnique({
    where: { slug: slug, isPublished: true },
    include: { author: true, tags: true },
  });

  if (!post) notFound();

  const related = await prisma.post.findMany({
    where: {
      isPublished: true,
      category: post.category,
      id: { not: post.id },
    },
    include: { author: true, tags: true },
    take: 2,
  });

  return <BlogDetailIndex post={post} related={related} />;
}
