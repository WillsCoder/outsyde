import React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import SavedPlacesIndex from "@/modules/explorer/user/saved-places";
import { Place } from "@/lib/const/types/places";

const LinkupPage = async () => {
  const session = await auth();
  if (!session?.user?.email) redirect("/login");

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    select: {
      savedPlaces: {
        orderBy: {
          createdAt: "desc",
        },
        include: {
          place: {
            include: {
              category: true,
              images: true,
              ratings: true,
            },
          },
        },
      },
    },
  });
  if (!user) redirect("/login");

  const places = user?.savedPlaces.map((savedPlace) => savedPlace.place) || [];


  return (
    <>
      <SavedPlacesIndex places={places as unknown as Place[]} />
    </>
  );
};

export default LinkupPage;
