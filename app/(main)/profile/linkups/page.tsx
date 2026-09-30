import React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import LinkupIndex from "@/modules/explorer/user/link-ups";
import { LinkUpWithRelations } from "@/lib/const/types/link-up";
import { prisma } from "@/lib/prisma";

const LinkupPage = async () => {
  const session = await auth();
  if (!session?.user?.email) redirect("/login");

   const user = await prisma.user.findUnique({
     where: { email: session.user.email },
     select: {
       id: true,
       instagramUrl: true,
       tiktokUrl: true,
       xUrl: true,
       snapchatUrl: true,
     },
   });
   if (!user) redirect("/login");

   const linkUps = await prisma.linkUp.findMany({
     where: { creatorId: user.id },
     include: {
       place: { select: { id: true, name: true, slug: true } },
       event: { select: { id: true, title: true, slug: true } },
       requests: {
         include: {
           sender: {
             select: {
               id: true,
               name: true,
               image: true,
               username: true,
               bio: true,
               instagramUrl: true,
               tiktokUrl: true,
               xUrl: true,
               snapchatUrl: true,
             },
           },
         },
         orderBy: { createdAt: "desc" },
       },
       _count: { select: { requests: true } },
     },
     orderBy: { createdAt: "desc" },
   });

  return (
    <>
      <LinkupIndex
        linkUps={linkUps as unknown as LinkUpWithRelations[]}
        userSocials={{
          instagramUrl: user.instagramUrl,
          tiktokUrl: user.tiktokUrl,
          xUrl: user.xUrl,
          snapchatUrl: user.snapchatUrl,
        }}
      />
    </>
  );
};

export default LinkupPage;