"use client";

import React, { useState } from "react";
import PromoSlides from "./promo-slides";
import PlacesSlide from "./places-slide";
import TravelAgents from "./travel-agents";
import HotFive from "./hot-five";

const HeroSection = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = [
    { key: "all", label: "All" },
    { key: "BAR", label: "🍹 Bars" },
    { key: "MUSIC", label: "🎵 Events" },
    { key: "BEACH", label: "🏖 Beaches" },
    // { key: "RESTAURANT", label: "🍽 Food" },
  ];

  return (
    <div className="box">
      <div className="min-h-[500px] max-h-[800px] h-[80vh] hidden md:flex items-center py-6">
        <div className="w-full h-full flex gap-3">
          <div className="w-6/12 h-full flex flex-col gap-3">
            <div className="h-1/2 border rounded-2xl border-brand-night/30 overflow-hidden">
              {/* Promo slides */}
              <PromoSlides />
            </div>
            <div className="h-1/2 flex gap-3">
              <div className="w-1/2 border rounded-2xl border-brand-night/30 overflow-hidden">
                <HotFive />
              </div>
              <div className="w-1/2 border rounded-2xl border-brand-night/30 overflow-hidden">
                <TravelAgents />
              </div>
            </div>
          </div>
          <div className="w-6/12 h-full border rounded-2xl border-brand-night/30 overflow-hidden">
            <PlacesSlide />
          </div>
        </div>
      </div>
      <div className="md:hidden flex flex-col gap-4">
        <div className="h-[50vh] absolute inset-0 z-0 bg-brand-orange/10 rounded-br-full" />
        {/* Ambient blob */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/10 rounded-bl-full blur-2xl pointer-events-none -z-0" />

        {/* Tag */}
        <div className="relative z-10 flex flex-col gap-4 pt-5">
          {/* Heading */}
          <div className="flex flex-col border-l-2 border-brand-orange pl-4 gap-2">
            <span className="inline-flex items-center gap-2 text-[8px] font-medium tracking-widest uppercase bg-brand-night text-white rounded-full px-3 py-1 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
              Location-based discovery
            </span>
            <h1 className="text-[32px] font-display font-extrabold text-brand-night tracking-tight leading-[1.1]">
              We outside,
              you <span className="text-brand-orange">coming?</span>
            </h1>
            <p className="mt-1 text-sm font-sans text-brand-night/80 font-semibold leading-relaxed">
              Discover events, places and experiences happening around you right
              now.
            </p>
          </div>

          {/* Category pills */}
          <div className="flex gap-2 flex-wrap">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key)}
                className={`text-[11px] font-medium px-3.5 py-1.5 rounded-full border transition-all ${
                  activeFilter === f.key
                    ? "bg-brand-orange text-white border-brand-orange"
                    : "bg-white text-brand-night/60 border-brand-night/15 hover:border-brand-night/30"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
        <div className="h-[50vh] mt-2 border rounded-2xl border-brand-night/30 overflow-hidden">
          <PlacesSlide />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
