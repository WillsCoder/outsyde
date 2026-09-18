import { NextResponse } from "next/server";
import {
  PrismaClient,
  Prisma,
} from "../../generated/prisma/client";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string" || !EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { message: "Enter a valid email address." },
        { status: 400 },
      );
    }

    // await prisma.waitlistEntry.create({
    //   data: { email: email.toLowerCase().trim() },
    // });

    // return NextResponse.json(
    //   { message: "You're on the list." },
    //   { status: 201 },
    // );
  } catch (err) {
    // Duplicate email — treat as success, don't leak info
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2002"
    ) {
      return NextResponse.json(
        { message: "You're already on the list." },
        { status: 200 },
      );
    }
    return NextResponse.json(
      { message: "Something went wrong. Try again." },
      { status: 500 },
    );
  }
}
