import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import AdminPlaceIndex from "@/modules/admin/places";
import { PlaceDetail } from "@/lib/const/types/places";

async function deletePlace(id: string) {
  "use server";
  await prisma.place.delete({ where: { id } });
  revalidatePath("/admin/places");
}

export default async function AdminPlacesPage() {
  const places = await prisma.place.findMany({
    include: {
      category: true,
      _count: { select: { ratings: true, comments: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <AdminPlaceIndex places={places as unknown as PlaceDetail[]} deletePlace={deletePlace} />
  );
}
