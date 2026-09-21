import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { Prisma } from "@/app/generated/prisma/client";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, "1 m"),
  analytics: true,
  prefix: "waitlist",
});

export async function POST(req: Request) {
  try {
    // Get client IP from Vercel's forwarded headers
    const forwardedFor = req.headers.get("x-forwarded-for");
    const ip =
      forwardedFor?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    // Rate limit: 5 requests per minute per IP
    const { success, reset } = await ratelimit.limit(ip);

    if (!success) {
      const retryAfter = Math.max(1, Math.ceil((reset - Date.now()) / 1000));

      return NextResponse.json(
        {
          message: "Too many requests. Please try again later.",
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(retryAfter),
          },
        },
      );
    }

    const body = await req.json();
    const { email } = body;

    // Validate type
    if (typeof email !== "string") {
      return NextResponse.json(
        { message: "Enter a valid email address." },
        { status: 400 },
      );
    }

    // Normalize email
    const normalizedEmail = email.trim().toLowerCase();

    // Validate email
    if (!EMAIL_REGEX.test(normalizedEmail)) {
      return NextResponse.json(
        { message: "Enter a valid email address." },
        { status: 400 },
      );
    }

    // Add to waitlist
    await prisma.waitlistEntry.create({
      data: {
        email: normalizedEmail,
      },
    });

    return NextResponse.json(
      {
        message: "You're on the list.",
      },
      {
        status: 201,
      },
    );
  } catch (err) {
    // Duplicate email
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2002"
    ) {
      return NextResponse.json(
        { message: "You're already on the list." },
        { status: 200 },
      );
    }

    // Log unexpected errors server-side
    console.error("Waitlist signup failed:", err);

    return NextResponse.json(
      {
        message: "Something went wrong. Try again.",
      },
      {
        status: 500,
      },
    );
  }
}
