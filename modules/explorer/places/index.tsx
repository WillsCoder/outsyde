import { useSession } from "next-auth/react";
import { prisma } from "@/lib/prisma";
import PlacesGrid from "./components/places-grid";
import PlacesFilters from "./components/places-filter";
import { Place } from "@/lib/const/types/places";
import { auth } from "@/auth";

type SearchParams = {
  category?: string;
  area?: string;
  cost?: string;
  q?: string;
  sort?: string;
};

type Props = {
  searchParams: SearchParams;
};

const PlacesIndex = async ({ searchParams }: Props) => {

  const session = await auth()

  const places = await prisma.place.findMany({
    where: {
      isPublished: true,

      ...(searchParams?.category && {
        category: {
          slug: searchParams.category,
        },
      }),

      ...(searchParams?.area && {
        address: {
          contains: searchParams.area,
        },
      }),

      ...(searchParams?.cost &&
        !Number.isNaN(Number(searchParams.cost)) && {
          costLevel: Number(searchParams.cost),
        }),

      ...(searchParams?.q && {
        OR: [
          {
            name: {
              contains: searchParams.q,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: searchParams.q,
              mode: "insensitive",
            },
          },
        ],
      }),
    },

    include: {
      category: true,
      images: true,
      ratings: true,
    },

    orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
  });

 let placeIds: string[] = [];

 if (session?.user?.id) {
   const savedPlaces = await prisma.savedPlace.findMany({
     where: {
       userId: session.user.id,
     },
     select: {
       placeId: true,
     },
   });

   placeIds = savedPlaces.map(({ placeId }) => placeId);
 }


  const categories = await prisma.category.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <main className="box py-5 md:py-8">
      <PlacesFilters categories={categories} total={places.length} />

      <PlacesGrid places={places as Place[]} savedPlaces={placeIds}/>
    </main>
  );
};

export default PlacesIndex;
