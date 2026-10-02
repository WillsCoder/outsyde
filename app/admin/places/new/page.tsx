import { prisma } from "@/lib/prisma";
import PlaceForm from "@/modules/admin/places/components/place-form";
import { createPlace } from "../actions";

export default async function NewPlacePage() {
  const categories = await prisma.category.findMany({
    orderBy: { order: "asc" },
  });
  return <PlaceForm categories={categories} action={createPlace} />;
}
