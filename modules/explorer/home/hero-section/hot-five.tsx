import React from "react";
import Image from "next/image";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

import { EventDetail } from "@/lib/const/types/event";

interface Props {
  event: EventDetail;
}

const HotFive = ({ event }: Props) => {

  const router = useRouter()

  return (
    <div className="relative flex h-full w-full flex-col justify-between overflow-hidden bg-brand-orange/90 cursor-pointer" onClick={() => router.push(`events/${event.slug}`)}>
      <Image
        src={
          event.imageUrl ||
          "https://ik.imagekit.io/willsbucket/Outsyde/rave.jpg"
        }
        alt={event.title || "Event"}
        width={500}
        height={500}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent" />

      <div className="absolute z-20 top-3 right-3">
        <div className="relative w-12 h-12 flex justify-center items-center">
          <div className="bg-brand-gold/80 absolute top-0 left-0 w-full h-1/2 rounded-t-lg"></div>
          <div className="bg-brand-gold/60 absolute bottom-0 left-0 w-full h-1/2 rounded-b-lg"></div>
          <div className="bg-brand-orange rounded-t-full absolute -top-1.5 left-2 w-1.5 h-1.5"></div>
          <div className="bg-brand-orange rounded-t-full absolute -top-1.5 right-2 w-1.5 h-1.5"></div>
          <div className="relative text-center">
            <p className="text-xl font-bold text-brand-sand">
              {format(event.startTime, "d")}
            </p>
            <p className="text-xs font-bold text-brand-sand pb-1">
              {format(event.startTime, "MMM")}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-end p-5 text-white">
        <h2 className="font-display font-semibold leading-tight">
          {event.title}
        </h2>
      </div>
    </div>
  );
};

export default HotFive;
