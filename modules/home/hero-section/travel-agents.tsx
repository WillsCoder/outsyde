import React from "react";
import { Button } from "@/components/ui";
import Image from "next/image";

const TravelAgents = () => {
  return (
    <div className="w-full h-full bg-brand-lagoon px-3 py-2 flex flex-col justify-between relative">
      {/* Travel image */}
      <Image
        src={"https://ik.imagekit.io/willsbucket/Outsyde/travel-agent.png"}
        alt="travel-agent"
        width={500}
        height={500}
        className="absolute bottom-0 right-0 rotate-45 opacity-40 scale-125 w-8/12"
      />
      {/* Trip planner — lagoon */}
      <div className="relative">
        <span className="inline-flex items-center gap-1 text-[11px] font-medium tracking-widest uppercase bg-white/20 text-white/90 rounded-full px-3 py-1 mb-2">
          🗺️ Plan your trip
        </span>
        <h2 className="text-white font-bold text-xl leading-tight tracking-tight mb-1">
          Let us plan your trip!
        </h2>
        <p className="text-white/90 text-sm font-medium leading-relaxed">
          Tell us your vibe — we'll find the best spots in Lagos for you.
        </p>
      </div>
      <Button variant="secondary" className="relative">
        Start planning →
      </Button>
    </div>
  );
};

export default TravelAgents;
