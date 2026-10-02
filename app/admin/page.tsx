import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
  IconMapPin,
  IconCalendarEvent,
  IconFileText,
  IconUsers,
  IconStar,
  IconArrowRight,
} from "@tabler/icons-react";
import AdminDashboard from "@/modules/admin/dashboard";

export default async function AdminOverviewPage() {
  const [
    placesCount,
    eventsCount,
    postsCount,
    usersCount,
    ratingsCount,
    recentPlaces,
    recentPosts,
  ] = await Promise.all([
    prisma.place.count(),
    prisma.event.count(),
    prisma.post.count(),
    prisma.user.count(),
    prisma.rating.count(),
    prisma.place.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      select: {
        id: true,
        name: true,
        slug: true,
        isPublished: true,
        createdAt: true,
        category: { select: { name: true } },
      },
    }),
    prisma.post.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      select: {
        id: true,
        title: true,
        slug: true,
        isPublished: true,
        createdAt: true,
        category: true,
      },
    }),
  ]);

  const stats = [
    {
      label: "Places",
      value: placesCount,
      icon: IconMapPin,
      href: "/admin/places",
      color: "text-brand-orange",
    },
    {
      label: "Events",
      value: eventsCount,
      icon: IconCalendarEvent,
      href: "/admin/events",
      color: "text-brand-lagoon",
    },
    {
      label: "Posts",
      value: postsCount,
      icon: IconFileText,
      href: "/admin/blog",
      color: "text-[#534AB7]",
    },
    {
      label: "Users",
      value: usersCount,
      icon: IconUsers,
      href: "#",
      color: "text-brand-gold",
    },
    {
      label: "Reviews",
      value: ratingsCount,
      icon: IconStar,
      href: "#",
      color: "text-brand-night",
    },
  ];

  return (
    <><AdminDashboard stats={stats} recentPlaces={recentPlaces} recentPosts={recentPosts} /></>
  );
}
