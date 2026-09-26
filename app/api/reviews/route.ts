import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  // const { placeId, score, body } = await req.json();
  const { eventId, placeId, score, body } = await req.json();

  if (!eventId && !placeId) {
    return NextResponse.json(
      { error: "Missing eventId or placeId" },
      { status: 400 },
    );
  }

  if (!body || body.trim().length < 10) {
    return NextResponse.json({ error: "Comment too short" }, { status: 400 });
  }

  if (placeId && (score < 1 || score > 5)) {
    return NextResponse.json(
      { error: "Score must be between 1 and 5" },
      { status: 400 },
    );
  }

  if (body.trim().length < 10) {
    return NextResponse.json({ error: "Review too short" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  // Upsert rating (one per user per place)
  if (placeId) {
    await prisma.rating.upsert({
      where: { userId_placeId: { userId: user.id, placeId } },
      update: { score },
      create: { userId: user.id, placeId, score },
    });
  }

  // Create comment
  await prisma.comment.create({
    data: {
      body: body.trim(),
      userId: user.id,
      ...(eventId ? { eventId } : { placeId }),
    },
  });

  return NextResponse.json({ ok: true });
}

