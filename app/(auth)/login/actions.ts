"use server";

import { AuthError } from "next-auth";
import bcrypt from "bcryptjs";
import { signIn } from "@/auth";
import { prisma } from "@/lib/prisma";
import { sendOTPEmail, generateOTP } from "@/lib/email";
import { sendWelcomeEmail } from "@/lib/emails";

export type AuthState = {
  error: string | null;
  success?: string | null;
  step?: "form" | "otp";
  email?: string;
  password?: string
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_OTP_ATTEMPTS = 5;

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

  // ─── Sign up ───────────────────────────────────────────────────────────────
  if (mode === "signup") {
    const firstName = String(formData.get("firstName") || "").trim();
    const lastName = String(formData.get("lastName") || "").trim();

    if (!firstName || !lastName) {
      return { error: "Enter your first and last name." };
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing?.emailVerified) {
      return {
        error: "An account with this email already exists — sign in instead.",
      };
    }

    const hashed = await bcrypt.hash(password, 12);

    // Create or update unverified user
    await prisma.user.upsert({
      where: { email },
      update: {
        firstName,
        lastName,
        name: `${firstName} ${lastName}`,
        password: hashed,
      },
      create: {
        firstName,
        lastName,
        name: `${firstName} ${lastName}`,
        email,
        password: hashed,
        emailVerified: null,
      },
    });

    // Generate and store OTP
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 1000 * 60 * 10); // 10 minutes

    await prisma.verificationToken.deleteMany({ where: { email } }); // clear old OTPs
    await prisma.verificationToken.create({
      data: { otp, email, expiresAt, attempts: 0 },
    });

    try {
      await sendOTPEmail(email, otp);
    } catch (e) {
      console.error("Failed to send OTP:", e);
      return { error: "Couldn't send verification email. Try again." };
    }

    return {
      error: null,
      success: `We sent a 6-digit code to ${email}`,
      step: "otp",
      email,
    };
  }

  // ─── Sign in ───────────────────────────────────────────────────────────────
  const user = await prisma.user.findUnique({ where: { email } });

  if (user && !user.emailVerified) {
    // Resend OTP
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 1000 * 60 * 10);

    await prisma.verificationToken.deleteMany({ where: { email } });
    await prisma.verificationToken.create({
      data: { otp, email, expiresAt, attempts: 0 },
    });

    await sendOTPEmail(email, otp);

    return {
      error: null,
      success: `Your email isn't verified. We sent a new code to ${email}`,
      step: "otp",
      email,
    };
  }

  try {
    await signIn("credentials", { email, password, redirectTo: "/" });
    return { error: null };
  } catch (err) {
    if (err instanceof AuthError) {
      return { error: "Invalid email or password." };
    }
    throw err;
  }
}

// ─── Verify OTP action ────────────────────────────────────────────────────────

export async function verifyOTP(
  prevState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const email = String(formData.get("email") || "")
    .toLowerCase()
    .trim();
  const otp = String(formData.get("otp") || "").trim();
  const password = String(formData.get("password") || "");
   const firstName = String(formData.get("firstName") || "");

  if (!otp || otp.length !== 6 || !/^\d+$/.test(otp)) {
    return { error: "Enter a valid 6-digit code.", step: "otp", email };
  }

  const record = await prisma.verificationToken.findFirst({
    where: { email },
    orderBy: { createdAt: "desc" },
  });

  if (!record) {
    return {
      error: "No verification code found. Sign up again.",
      step: "form",
      email,
    };
  }

  // Check attempts
  if (record.attempts >= MAX_OTP_ATTEMPTS) {
    await prisma.verificationToken.delete({ where: { id: record.id } });
    return {
      error: "Too many wrong attempts. Please sign up again.",
      step: "form",
      email,
    };
  }

  // Check expiry
  if (record.expiresAt < new Date()) {
    await prisma.verificationToken.delete({ where: { id: record.id } });
    return { error: "Code expired. Request a new one.", step: "otp", email };
  }

  // Wrong code — increment attempts
  if (record.otp !== otp) {
    await prisma.verificationToken.update({
      where: { id: record.id },
      data: { attempts: { increment: 1 } },
    });
    const remaining = MAX_OTP_ATTEMPTS - record.attempts - 1;
    return {
      error: `Wrong code. ${remaining} attempt${remaining !== 1 ? "s" : ""} left.`,
      step: "otp",
      email,
    };
  }

  // ✓ Correct — verify user
  await prisma.user.update({
    where: { email },
    data: { emailVerified: new Date() },
  });

  await prisma.verificationToken.delete({ where: { id: record.id } });

  await sendWelcomeEmail(email, `${firstName}`);

  // Auto sign in after verification
  try {
    await signIn("credentials", { email, password });
  } catch (err) {
    throw err;
  }

  return {
    error: null,
    success: "Email verified! You can now sign in.",
    step: "form",
  };
}

// ─── Resend OTP action ────────────────────────────────────────────────────────

export async function resendOTP(
  email: string,
): Promise<{ error: string | null }> {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return { error: "No account found for this email." };
  if (user.emailVerified) return { error: "This account is already verified." };

  // Rate limit — don't resend if a fresh OTP exists (< 1 min old)
  const recent = await prisma.verificationToken.findFirst({
    where: {
      email,
      createdAt: { gte: new Date(Date.now() - 60 * 1000) },
    },
  });
  if (recent) return { error: "Wait a moment before requesting a new code." };

  const otp = generateOTP();
  const expiresAt = new Date(Date.now() + 1000 * 60 * 10);

  await prisma.verificationToken.deleteMany({ where: { email } });
  await prisma.verificationToken.create({
    data: { otp, email, expiresAt, attempts: 0 },
  });

  try {
    await sendOTPEmail(email, otp);
    return { error: null };
  } catch {
    return { error: "Couldn't send code. Try again." };
  }
}
