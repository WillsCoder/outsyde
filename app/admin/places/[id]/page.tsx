import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import PlaceForm from "@/modules/admin/places/components/place-form";
import { updatePlace } from "../actions";

export default async function EditPlacePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [place, categories] = await Promise.all([
    prisma.place.findUnique({
      where: { id },
      include: { images: true },
    }),
    prisma.category.findMany({ orderBy: { order: "asc" } }),
  ]);
  if (!place) notFound();
  return (
    <PlaceForm place={place} categories={categories} action={updatePlace} />
  );
}
