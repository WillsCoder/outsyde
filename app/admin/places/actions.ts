"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function requireAdmin() {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") throw new Error("Unauthorised");
  return session;
}

export async function createPlace(prevState: any, formData: FormData) {
  await requireAdmin();

  const name = String(formData.get("name") || "").trim();
  const slug = String(formData.get("slug") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const categoryId = String(formData.get("categoryId") || "");
  const costLevel = Number(formData.get("costLevel") || 2);
  const address = String(formData.get("address") || "").trim();
  const city = String(formData.get("city") || "Lagos").trim();
  const lat = parseFloat(String(formData.get("lat") || "0"));
  const lng = parseFloat(String(formData.get("lng") || "0"));
  const coverImage = String(formData.get("coverImage") || "").trim();
  const view360Url = String(formData.get("view360Url") || "").trim();
  const isPublished = formData.get("isPublished") === "on";
  const isFeatured = formData.get("isFeatured") === "on";

  if (!name || !slug || !description || !categoryId || !address) {
    return { error: "All required fields must be filled", success: null };
  }

  const existing = await prisma.place.findUnique({ where: { slug } });
  if (existing)
    return { error: "A place with this slug already exists", success: null };

  await prisma.place.create({
    data: {
      name,
      slug,
      description,
      categoryId,
      costLevel,
      address,
      city,
      lat,
      lng,
      view360Url: view360Url || null,
      isPublished,
      isFeatured,
      images: coverImage
        ? { create: [{ url: coverImage, isPrimary: true }] }
        : undefined,
    },
  });

  revalidatePath("/admin/places");
  revalidatePath("/places");
  redirect("/admin/places");
}

export async function updatePlace(prevState: any, formData: FormData) {
  await requireAdmin();

  const id = String(formData.get("id") || "");
  const name = String(formData.get("name") || "").trim();
  const slug = String(formData.get("slug") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const categoryId = String(formData.get("categoryId") || "");
  const costLevel = Number(formData.get("costLevel") || 2);
  const address = String(formData.get("address") || "").trim();
  const city = String(formData.get("city") || "Lagos").trim();
  const lat = parseFloat(String(formData.get("lat") || "0"));
  const lng = parseFloat(String(formData.get("lng") || "0"));
  const view360Url = String(formData.get("view360Url") || "").trim();
  const isPublished = formData.get("isPublished") === "on";
  const isFeatured = formData.get("isFeatured") === "on";

  await prisma.place.update({
    where: { id },
    data: {
      name,
      slug,
      description,
      categoryId,
      costLevel,
      address,
      city,
      lat,
      lng,
      view360Url: view360Url || null,
      isPublished,
      isFeatured,
    },
  });

  revalidatePath("/admin/places");
  revalidatePath(`/places/${slug}`);
  return { error: null, success: "Place updated!" };
}
