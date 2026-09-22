import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import EventDetailsIndex from "@/modules/explorer/events/details";
import { EventDetail } from "@/lib/const/types/event";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = await prisma.event.findUnique({
    where: { slug },
    select: { title: true, description: true, imageUrl: true },
  });
  if (!event) return { title: "Event not found · Outsyde" };
  return {
    title: `${event.title} · Outsyde`,
    description: event.description.slice(0, 160),
    openGraph: { images: event.imageUrl ? [event.imageUrl] : [] },
  };
}

export default async function PlaceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const event = await prisma.event.findUnique({
    where: { slug },
    include: {
      place: { select: { name: true } },
      comments: {
        orderBy: { createdAt: "desc" },
        include: {
          user: { select: { name: true, firstName: true, image: true } },
        },
      },
    },
  });

  if (!event || !event.isPublished) notFound();

  return (
    <>
      <EventDetailsIndex event={event as EventDetail} />
    </>
  );
}
