import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string; requestId: string } },
) {
  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  const { status } = await req.json(); // 'ACCEPTED' | 'DECLINED'

  if (!["ACCEPTED", "DECLINED"].includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  const linkUp = await prisma.linkUp.findUnique({ where: { id: params.id } });
  if (!linkUp)
    return NextResponse.json({ error: "Link Up not found" }, { status: 404 });

  // Only the creator can accept/decline
  if (linkUp.creatorId !== user.id) {
    return NextResponse.json({ error: "Not authorised" }, { status: 403 });
  }

  const updated = await prisma.linkUpRequest.update({
    where: { id: params.requestId },
    data: { status },
  });

  // If accepted, check if now full
  if (status === "ACCEPTED") {
    const acceptedCount = await prisma.linkUpRequest.count({
      where: { linkUpId: params.id, status: "ACCEPTED" },
    });
    if (acceptedCount >= linkUp.maxSize - 1) {
      await prisma.linkUp.update({
        where: { id: params.id },
        data: { status: "FULL" },
      });
    }
  }

  return NextResponse.json({ ok: true, request: updated });
}
