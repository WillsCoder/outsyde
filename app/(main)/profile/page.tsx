import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import ProfileIndex from "@/modules/explorer/user/profile";
import { Profile } from "@/lib/const/types/profile";

const ProfilePage = async () => {
  const session = await auth();
  if (!session?.user?.email) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      name: true,
      email: true,
      image: true,
      username: true,
      bio: true,
      phone: true,
      city: true,
      neighborhood: true,
      instagramUrl: true,
      tiktokUrl: true,
      xUrl: true,
      dateOfBirth: true,
      gender: true,
      snapchatUrl: true,
      isProfilePublic: true,
      notifyLinkUps: true,
      notifyEvents: true,
      notifyReviews: true,
      createdAt: true,
      _count: {
        select: {
          ratings: true,
          comments: true,
          linkUpsCreated: true,
        },
      },
    },
  });

  if (!user) redirect("/login");

  return (
    <>
      <ProfileIndex user={user as Profile} />
    </>
  );
}
export default ProfilePage;