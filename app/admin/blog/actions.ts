"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

async function requireAdmin() {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") throw new Error("Unauthorised");
  const user = await prisma.user.findUnique({
    where: { email: session.user.email! },
  });
  return user!;
}

export async function createPost(prevState: any, formData: FormData) {
  const user = await requireAdmin();

  const title = String(formData.get("title") || "").trim();
  const slug = String(formData.get("slug") || "").trim();
  const excerpt = String(formData.get("excerpt") || "").trim();
  const content = String(formData.get("content") || "").trim();
  const category = String(formData.get("category") || "");
  const readTime = Number(formData.get("readTime") || 5);
  const coverImage = String(formData.get("coverImage") || "").trim();
  const publishedAt = formData.get("publishedAt")
    ? new Date(String(formData.get("publishedAt")))
    : null;
  const isPublished = formData.get("isPublished") === "on";
  const isFeatured = formData.get("isFeatured") === "on";

  if (!title || !slug || !excerpt || !content || !category) {
    return { error: "All required fields must be filled", success: null };
  }

  await prisma.post.create({
    data: {
      title,
      slug,
      excerpt,
      content,
      category: category as any,
      readTime,
      coverImage: coverImage || null,
      publishedAt,
      isPublished,
      isFeatured,
      authorId: user.id,
    },
  });

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  redirect("/admin/blog");
}

export async function updatePost(prevState: any, formData: FormData) {
  await requireAdmin();

  const id = String(formData.get("id") || "");
  const title = String(formData.get("title") || "").trim();
  const slug = String(formData.get("slug") || "").trim();
  const excerpt = String(formData.get("excerpt") || "").trim();
  const content = String(formData.get("content") || "").trim();
  const category = String(formData.get("category") || "");
  const readTime = Number(formData.get("readTime") || 5);
  const coverImage = String(formData.get("coverImage") || "").trim();
  const publishedAt = formData.get("publishedAt")
    ? new Date(String(formData.get("publishedAt")))
    : null;
  const isPublished = formData.get("isPublished") === "on";
  const isFeatured = formData.get("isFeatured") === "on";

  await prisma.post.update({
    where: { id },
    data: {
      title,
      slug,
      excerpt,
      content,
      category: category as any,
      readTime,
      coverImage: coverImage || null,
      publishedAt,
      isPublished,
      isFeatured,
    },
  });

  revalidatePath("/admin/blog");
  revalidatePath(`/blog/${slug}`);
  return { error: null, success: "Post updated!" };
}
