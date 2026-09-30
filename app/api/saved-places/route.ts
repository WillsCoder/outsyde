import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      select: {
        id: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const savedPlaces = await prisma.savedPlace.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        place: true,
      },
    });

    return NextResponse.json({
      savedPlaces,
    });
  } catch (error) {
    console.error("Get saved places error:", error);

    return NextResponse.json(
      { error: "Failed to fetch saved places" },
      { status: 500 },
    );
  }
}
