import React from "react";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import PlaceDetailsIndex from "@/modules/explorer/places/details";

export async function generateStaticParams() {
  const places = await prisma.place.findMany({ select: { slug: true } });
  return places.map((p) => ({ slug: p.slug }));
}

export default async function PlaceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const place = await prisma.place.findUnique({
    where: { slug },
    include: {
      category: true,
      images: true,
      menuItems: true,
      ratings: { include: { user: true } },
      comments: { include: { user: true }, orderBy: { createdAt: "desc" } },
    },
  });

  if (!place || !place.isPublished) notFound();

  const avgRating = place.ratings.length
    ? (
        place.ratings.reduce((s, r) => s + r.score, 0) / place.ratings.length
      ).toFixed(1)
    : null;

  const costLabel = ["", "Budget", "Mid-range", "Premium"][place.costLevel];

  return (
    <>
      <PlaceDetailsIndex
        place={place}
        avgRating={avgRating}
        costLabel={costLabel}
      />
    </>
  );
}
