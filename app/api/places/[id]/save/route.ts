import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function POST(request: Request, { params }: Params) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
    }

    const { id: placeId } = await params;

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

    // Make sure place exists
    const place = await prisma.place.findUnique({
      where: {
        id: placeId,
      },
      select: {
        id: true,
      },
    });

    if (!place) {
      return NextResponse.json({ error: "Place not found" }, { status: 404 });
    }

    // Avoid duplicate saves
    const existing = await prisma.savedPlace.findUnique({
      where: {
        userId_placeId: {
          userId: user.id,
          placeId,
        },
      },
    });

    if (existing) {
      return NextResponse.json({
        success: true,
        saved: true,
        message: "Place already saved",
      });
    }

    await prisma.savedPlace.create({
      data: {
        userId: user.id,
        placeId,
      },
    });

    return NextResponse.json({
      success: true,
      saved: true,
    });
  } catch (error) {
    console.error("Save place error:", error);

    return NextResponse.json(
      { error: "Failed to save place" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request, { params }: Params) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
    }

    const { id: placeId } = await params;

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

    await prisma.savedPlace.deleteMany({
      where: {
        userId: user.id,
        placeId,
      },
    });

    return NextResponse.json({
      success: true,
      saved: false,
    });
  } catch (error) {
    console.error("Unsave place error:", error);

    return NextResponse.json(
      { error: "Failed to remove saved place" },
      { status: 500 },
    );
  }
}

export async function GET(request: Request, { params }: Params) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({
        saved: false,
      });
    }

    const { id: placeId } = await params;

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      select: {
        id: true,
      },
    });

    if (!user) {
      return NextResponse.json({
        saved: false,
      });
    }

    const savedPlace = await prisma.savedPlace.findUnique({
      where: {
        userId_placeId: {
          userId: user.id,
          placeId,
        },
      },
      select: {
        id: true,
      },
    });

    return NextResponse.json({
      saved: !!savedPlace,
    });
  } catch (error) {
    console.error("Check saved place error:", error);

    return NextResponse.json(
      { error: "Failed to check saved status" },
      { status: 500 },
    );
  }
}

