import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, "1 m"),
  analytics: true,
  prefix: "contact",
});

const MAX_NAME_LENGTH = 100;
const MAX_SUBJECT_LENGTH = 200;
const MAX_MESSAGE_LENGTH = 5000;

export async function POST(req: Request) {
  try {
    // Get client IP from Vercel's forwarded headers
    const forwardedFor = req.headers.get("x-forwarded-for");

    const ip =
      forwardedFor?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    // Rate limit: 5 submissions per minute per IP
    const { success, reset } = await ratelimit.limit(ip);

    if (!success) {
      const retryAfter = Math.max(1, Math.ceil((reset - Date.now()) / 1000));

      return NextResponse.json(
        {
          message: "Too many submissions. Please try again later.",
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

    const { name, email, subject, message } = body;

    // Validate required field types
    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof message !== "string"
    ) {
      return NextResponse.json(
        {
          message: "Please complete all required fields.",
        },
        { status: 400 },
      );
    }

    // Normalize values
    const normalizedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedSubject = typeof subject === "string" ? subject.trim() : "";
    const normalizedMessage = message.trim();

    // Validate required fields
    if (!normalizedName) {
      return NextResponse.json(
        {
          message: "Please enter your name.",
        },
        { status: 400 },
      );
    }

    if (!normalizedEmail || !EMAIL_REGEX.test(normalizedEmail)) {
      return NextResponse.json(
        {
          message: "Enter a valid email address.",
        },
        { status: 400 },
      );
    }

    if (!normalizedMessage) {
      return NextResponse.json(
        {
          message: "Please tell us what you have in mind.",
        },
        { status: 400 },
      );
    }

    // Validate lengths
    if (normalizedName.length > MAX_NAME_LENGTH) {
      return NextResponse.json(
        {
          message: "Name is too long.",
        },
        { status: 400 },
      );
    }

    if (normalizedSubject.length > MAX_SUBJECT_LENGTH) {
      return NextResponse.json(
        {
          message: "Subject is too long.",
        },
        { status: 400 },
      );
    }

    if (normalizedMessage.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json(
        {
          message: "Message is too long.",
        },
        { status: 400 },
      );
    }

    // Store contact submission
    await prisma.contactSubmission.create({
      data: {
        name: normalizedName,
        email: normalizedEmail,
        subject: normalizedSubject || null,
        message: normalizedMessage,
      },
    });

    return NextResponse.json(
      {
        message: "Thanks for reaching out. We'll get back to you soon.",
      },
      {
        status: 201,
      },
    );
  } catch (err) {
    // Log unexpected errors server-side
    console.error("Contact submission failed:", err);

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
