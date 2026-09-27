import React from "react";
import { prisma } from "@/lib/prisma";
import { EventDetail } from "@/lib/const/types/event";
import HeroSection from "./hero-section";
import PlacesCategory from "./category";
import TopEvents from "./top-events";
import HowItWork from "./how-it-works";
import SocialProof from "./social-proof";
import Waitlist from "./waitlist";
import BlogPreview from "./blog-preview";
import LinkUpSection from "./link-up";

const HomeComponents = async () => {
  const places = await prisma.place.findMany({
    where: { isPublished: true },
    include: { images: true },
    orderBy: { isFeatured: "desc" },
    take: 5,
  });

  const categories = await prisma.category.findMany({
    // where: { isPublished: true },
    orderBy: { order: "asc" },
  });

   const events = await prisma.event.findMany({
     where: { isPublished: true },
     include: {
       place: { select: { id: true, name: true, slug: true } },
     },
     orderBy: [
       { isFeatured: "desc" },
       { startTime: "asc" }, // earliest upcoming first
     ],
     take: 1,
   });

  return (
    <main>
      <HeroSection
        categories={categories}
        places={places}
        event={events?.[0] as EventDetail}
      />
      <PlacesCategory categories={categories} />
      <TopEvents />
      <HowItWork />
      <LinkUpSection/>
      <SocialProof />
      <Waitlist />
      <BlogPreview />
    </main>
  );
};

export default HomeComponents;
