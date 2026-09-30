"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { LinkUpStatus } from "@/app/generated/prisma/enums";

export type LinkUpActionState = {
  error: string | null;
  success: string | null;
};

// ─── Update a link up ────────────────────────────────────────────────────────

export async function updateLinkUp(
  prevState: LinkUpActionState,
  formData: FormData,
): Promise<LinkUpActionState> {
  const session = await auth();
  
    if (!session?.user?.email) {
      return {
        error: "Unauthorised",
        success: null,
      };
    }

  const id = String(formData.get("id") || "");
  const title = String(formData.get("title") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const date = String(formData.get("date") || "");
  const maxSize = Number(formData.get("maxSize") || 5);
  const shareSocials = formData.get("shareSocials") === "true";
  const status = String(formData.get("status") || "OPEN");

  if (!id || !title || !date) {
    return { error: "Title and date are required", success: null };
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  if (!user) return { error: "User not found", success: null };

  const linkUp = await prisma.linkUp.findUnique({ where: { id } });
  if (!linkUp || linkUp.creatorId !== user.id) {
    return { error: "Not authorised", success: null };
  }

  await prisma.linkUp.update({
    where: { id },
    data: {
      title,
      description: description || null,
      date: new Date(date),
      maxSize,
      shareSocials,
      status: status as LinkUpStatus,
    },
  });

  revalidatePath("/profile/linkups");
  return { error: null, success: "Link Up updated!" };
}

// ─── Delete a link up ─────────────────────────────────────────────────────────

export async function deleteLinkUp(id: string): Promise<LinkUpActionState> {
 const session = await auth();

 if (!session?.user?.email) {
   return {
     error: "Unauthorised",
     success: null,
   };
 }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  if (!user) return { error: "User not found", success: null };

  const linkUp = await prisma.linkUp.findUnique({ where: { id } });
  if (!linkUp || linkUp.creatorId !== user.id) {
    return { error: "Not authorised", success: null };
  }

  await prisma.linkUp.delete({ where: { id } });
  revalidatePath("/profile/linkups");
  return { error: null, success: "Link Up deleted" };
}

// ─── Respond to a request ────────────────────────────────────────────────────

export async function respondToRequest(
  requestId: string,
  status: "ACCEPTED" | "DECLINED",
): Promise<LinkUpActionState> {
  const session = await auth();

  if (!session?.user?.email) {
    return {
      error: "Unauthorised",
      success: null,
    };
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  if (!user) return { error: "User not found", success: null };

  const request = await prisma.linkUpRequest.findUnique({
    where: { id: requestId },
    include: { linkUp: true },
  });

  if (!request) return { error: "Request not found", success: null };
  if (request.linkUp.creatorId !== user.id) {
    return { error: "Not authorised", success: null };
  }

  await prisma.linkUpRequest.update({
    where: { id: requestId },
    data: { status },
  });

  // Check if full after accepting
  if (status === "ACCEPTED") {
    const acceptedCount = await prisma.linkUpRequest.count({
      where: { linkUpId: request.linkUpId, status: "ACCEPTED" },
    });
    if (acceptedCount >= request.linkUp.maxSize - 1) {
      await prisma.linkUp.update({
        where: { id: request.linkUpId },
        data: { status: "FULL" },
      });
    }
  }

  revalidatePath("/profile/linkups");
  return { error: null, success: `Request ${status.toLowerCase()}` };
}
