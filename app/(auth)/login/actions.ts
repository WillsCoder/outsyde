"use server";

import { AuthError } from "next-auth";
import bcrypt from "bcryptjs";
import { signIn } from "@/auth";
import { prisma } from "@/lib/prisma";

export type AuthState = { error: string | null };

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function authenticate(
  prevState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const mode = formData.get("mode");
  const email = String(formData.get("email") || "")
    .toLowerCase()
    .trim();
  const password = String(formData.get("password") || "");

  if (!email || !EMAIL_REGEX.test(email)) {
    return { error: "Enter a valid email address." };
  }
  if (!password || password.length < 8) {
    return { error: "Password must be at least 8 characters." };
  }

  if (mode === "signup") {
    const firstName = String(formData.get("firstName") || "").trim();
    const lastName = String(formData.get("lastName") || "").trim();

    if (!firstName || !lastName) {
      return { error: "Enter your first and last name." };
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return {
        error: "An account with this email already exists — sign in instead.",
      };
    }

    const hashed = await bcrypt.hash(password, 12);
    await prisma.user.create({
      data: {
        firstName,
        lastName,
        name: `${firstName} ${lastName}`,
        email,
        password: hashed,
      },
    });
  }

  try {
    await signIn("credentials", { email, password, redirectTo: "/" });
    return { error: null }; // unreachable — redirect throws
  } catch (err) {
    if (err instanceof AuthError) {
      return {
        error:
          mode === "signup"
            ? "Account created, but sign-in failed. Try signing in."
            : "Invalid email or password.",
      };
    }
    throw err; // NEXT_REDIRECT must propagate
  }
}
