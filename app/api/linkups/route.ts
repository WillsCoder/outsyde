import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function POST(req: NextRequest) {
  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  const { title, description, date, maxSize, placeId, eventId } =
    await req.json();

  if (!title || !date) {
    return NextResponse.json(
      { error: "Title and date are required" },
      { status: 400 },
    );
  }

  if (!placeId && !eventId) {
    return NextResponse.json(
      { error: "Must be linked to a place or event" },
      { status: 400 },
    );
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  const linkUp = await prisma.linkUp.create({
    data: {
      title,
      description,
      date: new Date(date),
      maxSize: maxSize ?? 5,
      creatorId: user.id,
      placeId: placeId ?? null,
      eventId: eventId ?? null,
    },
  });

  return NextResponse.json({ ok: true, linkUp });
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const placeId = searchParams.get("placeId");
  const eventId = searchParams.get("eventId");

  const linkUps = await prisma.linkUp.findMany({
    where: {
      status: "OPEN",
      ...(placeId ? { placeId } : {}),
      ...(eventId ? { eventId } : {}),
    },
    include: {
      creator: { select: { id: true, name: true, image: true } },
      _count: { select: { requests: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(linkUps);
}
