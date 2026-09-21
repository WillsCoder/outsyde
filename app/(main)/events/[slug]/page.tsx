import React from "react";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const events = await prisma.event.findMany({ select: { slug: true } });
  return events.map((e) => ({ slug: e.slug }));
}

export default async function EventDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const event = await prisma.event.findUnique({
    where: { slug: params.slug },
    include: {
      category: true,
      comments: { include: { user: true }, orderBy: { createdAt: "desc" } },
    },
  });

  if (!event || !event.isPublished) notFound();

  return <></>;
}
