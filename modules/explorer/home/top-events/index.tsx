import React from "react";
import { prisma } from "@/lib/prisma";
import HeaderSection from "./display/header-section";
import SwiperSection from "./display/swiper-section";
import { EventCard } from "@/lib/const/types/event";

const TopEvents = async () => {
  const events = await prisma.event.findMany({
    where: { isPublished: true },
    include: {
      place: { select: { id: true, name: true, slug: true } },
    },
    orderBy: [
      { isFeatured: "desc" },
      { startTime: "asc" }, // earliest upcoming first
    ],
    take: 10,
  });

  return (
    <div>
      <div className="section">
        <div className="relative h-175 lg:h-212.5 py-6">
          {/* content */}
          <div className="relative z-10">
            <div>
              <HeaderSection />
            </div>
            <div>
              <SwiperSection events={events as unknown as EventCard[]} />
            </div>
          </div>
          {/* center background */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="w-[87%] lg:w-[55%] mx-auto h-full bg-white rounded-[30px]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopEvents;
