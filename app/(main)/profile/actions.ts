"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

import bcrypt from "bcryptjs";

export type ProfileState = {
  error: string | null;
  success: string | null;
};

export async function updateProfile(
  prevState: ProfileState,
  formData: FormData,
): Promise<ProfileState> {
  const session = await auth();

  if (!session?.user?.email) {
    return { error: "Unauthorised", success: null };
  }

  const firstName = formData.get("firstName")?.toString().trim();
  const lastName = formData.get("lastName")?.toString().trim();
  const username = formData.get("username")?.toString().trim().toLowerCase();
  const bio = formData.get("bio")?.toString().trim();
  const phone = formData.get("phone")?.toString().trim();
  const city = formData.get("city")?.toString().trim();
  const neighborhood = formData.get("neighborhood")?.toString().trim();
  const image = formData.get("image")?.toString().trim();

  const instagramUrl = formData.get("instagramUrl")?.toString().trim();
  const tiktokUrl = formData.get("tiktokUrl")?.toString().trim();
  const xUrl = formData.get("xUrl")?.toString().trim();
  const snapchatUrl = formData.get("snapchatUrl")?.toString().trim();

  const isProfilePublic = formData.get("isProfilePublic");
  const notifyLinkUps = formData.get("notifyLinkUps");
  const notifyEvents = formData.get("notifyEvents");
  const notifyReviews = formData.get("notifyReviews");

  // Validate only if provided
  if (firstName && firstName.length < 2) {
    return {
      error: "First name is too short",
      success: null,
    };
  }

  if (lastName && lastName.length < 2) {
    return {
      error: "Last name is too short",
      success: null,
    };
  }

  // Check username only if provided
  if (username) {
    const taken = await prisma.user.findFirst({
      where: {
        username,
        NOT: {
          email: session.user.email,
        },
      },
    });

    if (taken) {
      return {
        error: "That username is already taken",
        success: null,
      };
    }
  }

  // Only include fields that were actually submitted
  const data: Record<string, unknown> = {};

  if (firstName !== undefined) data.firstName = firstName || null;
  if (lastName !== undefined) data.lastName = lastName || null;
  if (username !== undefined) data.username = username || null;
  if (bio !== undefined) data.bio = bio || null;
  if (phone !== undefined) data.phone = phone || null;
  if (city !== undefined) data.city = city || null;
  if (neighborhood !== undefined) data.neighborhood = neighborhood || null;
  if (image !== undefined) data.image = image || null;
  if (instagramUrl !== undefined) {
    data.instagramUrl = instagramUrl || null;
  }

  if (tiktokUrl !== undefined) {
    data.tiktokUrl = tiktokUrl || null;
  }

  if (xUrl !== undefined) {
    data.xUrl = xUrl || null;
  }

  if (snapchatUrl !== undefined) {
    data.snapchatUrl = snapchatUrl || null;
  }

  if (isProfilePublic !== null) {
    data.isProfilePublic = isProfilePublic === "true";
  }

  if (notifyLinkUps !== null) {
    data.notifyLinkUps = notifyLinkUps === "true";
  }

  if (notifyEvents !== null) {
    data.notifyEvents = notifyEvents === "true";
  }

  if (notifyReviews !== null) {
    data.notifyReviews = notifyReviews === "true";
  }

  // Update name only when name fields were submitted
  if (firstName !== undefined || lastName !== undefined) {
    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      select: {
        firstName: true,
        lastName: true,
      },
    });

    const finalFirstName = firstName ?? currentUser?.firstName ?? "";
    const finalLastName = lastName ?? currentUser?.lastName ?? "";

    data.name = `${finalFirstName} ${finalLastName}`.trim();
  }

  await prisma.user.update({
    where: {
      email: session.user.email,
    },
    data,
  });

  revalidatePath("/profile");

  return {
    error: null,
    success: "Profile updated!",
  };
}



export type PasswordState = {
  error: string | null;
  success: string | null;
};

export async function changePassword(
  prevState: PasswordState,
  formData: FormData,
): Promise<PasswordState> {
  const session = await auth();

  if (!session?.user?.email) {
    return {
      error: "Unauthorised",
      success: null,
    };
  }

  const currentPassword = formData.get("currentPassword")?.toString() ?? "";
  const newPassword = formData.get("newPassword")?.toString() ?? "";
  const confirmPassword = formData.get("confirmPassword")?.toString() ?? "";

  // Basic validation
  if (!currentPassword || !newPassword || !confirmPassword) {
    return {
      error: "All password fields are required",
      success: null,
    };
  }

  if (newPassword.length < 8) {
    return {
      error: "New password must be at least 8 characters",
      success: null,
    };
  }

  if (newPassword !== confirmPassword) {
    return {
      error: "New passwords do not match",
      success: null,
    };
  }

  if (currentPassword === newPassword) {
    return {
      error: "New password must be different from your current password",
      success: null,
    };
  }

  // Get current password hash
  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    select: {
      id: true,
      password: true,
    },
  });

  if (!user) {
    return {
      error: "User not found",
      success: null,
    };
  }

  // User may have signed up with OAuth and have no password
  if (!user.password) {
    return {
      error: "You don't have a password set on this account",
      success: null,
    };
  }

  // Verify current password
  const isCurrentPasswordValid = await bcrypt.compare(
    currentPassword,
    user.password,
  );

  if (!isCurrentPasswordValid) {
    return {
      error: "Current password is incorrect",
      success: null,
    };
  }

  // Hash new password
  const hashedPassword = await bcrypt.hash(newPassword, 12);

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      password: hashedPassword,
    },
  });

  revalidatePath("/profile");

  await prisma.session.deleteMany({
    where: {
      userId: user.id,
    },
  });
  
  return {
    error: null,
    success: "Password changed successfully",
  };
}

