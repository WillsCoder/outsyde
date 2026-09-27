import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  const { message } = await req.json();
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  const linkUp = await prisma.linkUp.findUnique({
    where: { id: id },
    include: { _count: { select: { requests: true } } },
  });

  if (!linkUp)
    return NextResponse.json({ error: "Link Up not found" }, { status: 404 });
  if (linkUp.status !== "OPEN")
    return NextResponse.json(
      { error: "This Link Up is no longer open" },
      { status: 400 },
    );
  if (linkUp.creatorId === user.id)
    return NextResponse.json(
      { error: "You can't request to join your own Link Up" },
      { status: 400 },
    );

  // Check if already requested
  const existing = await prisma.linkUpRequest.findFirst({
    where: { linkUpId: id, senderId: user.id },
  });
  if (existing)
    return NextResponse.json(
      { error: "You already sent a request" },
      { status: 400 },
    );

  // Check capacity
  const acceptedCount = await prisma.linkUpRequest.count({
    where: { linkUpId: id, status: "ACCEPTED" },
  });
  if (acceptedCount >= linkUp.maxSize - 1) {
    await prisma.linkUp.update({
      where: { id: id },
      data: { status: "FULL" },
    });
    return NextResponse.json(
      { error: "This Link Up is full" },
      { status: 400 },
    );
  }

  const request = await prisma.linkUpRequest.create({
    data: { linkUpId: id, senderId: user.id, message },
  });

  return NextResponse.json({ ok: true, request });
}
