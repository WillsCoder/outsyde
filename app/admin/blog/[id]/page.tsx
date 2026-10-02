import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { updatePost } from "../actions";
import PostForm from "@/modules/admin/blog/components/blog-form";

export default async function EditPostPage({
  params,
}: {
  params:  Promise<{ id: string }>;
}) {
    const { id } = await params;
  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) notFound();
  return <PostForm post={post} action={updatePost} />;
}
