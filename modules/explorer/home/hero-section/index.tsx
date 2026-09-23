"use client";

import React, { useState } from "react";
import PromoSlides from "./promo-slides";
import PlacesSlide from "./places-slide";
import TravelAgents from "./travel-agents";
import HotFive from "./hot-five";
import { Place } from "@/lib/const/types/places";

interface HeroSectionProps {
  places: Place[];
}
const HeroSection = ({ places }: HeroSectionProps) => {
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
      <div className="min-h-125 max-h-200 h-[80vh] hidden md:flex items-center py-6">
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
            <PlacesSlide places={places} />
          </div>
        </div>
      </div>
      <div className="md:hidden flex flex-col gap-4 pb-6">
        <div className="h-[50vh] absolute inset-0 z-0 bg-brand-orange/10 rounded-br-full" />
        {/* Ambient blob */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/10 rounded-bl-full blur-2xl pointer-events-none z-0" />

        {/* Tag */}
        <div className="relative z-10 flex flex-col gap-4 pt-5">
          {/* Heading */}
          <div className="flex flex-col border-l-2 border-brand-orange pl-4 gap-2">
            <span className="inline-flex items-center gap-2 text-[8px] font-medium tracking-widest uppercase bg-brand-night text-white rounded-full px-3 py-1 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
              Location-based discovery
            </span>
            <h1 className="text-[32px] font-display font-extrabold text-brand-night tracking-tight leading-[1.1]">
              We outside, you <span className="text-brand-orange">coming?</span>
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
        <div className="flex gap-3 h-[50vh] mt-2">
          {/* Swiper — 10/12 width */}
          <div className="w-11/12 border rounded-2xl border-brand-night/30 overflow-hidden">
            <PlacesSlide places={places} />
          </div>

          {/* Scroll hint — 2/12 width */}
          <div className="w-1/12 flex flex-col items-center justify-between py-4">
            {/* Top — swipe indicator */}
            <div className="flex flex-col items-center gap-1.5">
              <div className="flex flex-col gap-1">
                <div className="w-0.5 h-4 bg-brand-night/15 rounded-full mx-auto" />
                <div className="w-0.5 h-3 bg-brand-night/10 rounded-full mx-auto" />
                <div className="w-0.5 h-2 bg-brand-night/5 rounded-full mx-auto" />
              </div>
              <p
                className="text-[12px] text-brand-night/30 uppercase tracking-widest writing-mode-vertical rotate-180"
                style={{ writingMode: "vertical-rl" }}
              >
                swipe
              </p>
            </div>

            {/* Middle — scroll past hint */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-brand-sand border border-brand-night/10 flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M6 2L6 10M6 10L2 6M6 10L10 6"
                    stroke="#ff5c2b"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p
                className="text-[12px] text-brand-night/30 uppercase tracking-widest"
                style={{
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                }}
              >
                scroll
              </p>
            </div>

            {/* Bottom — place count */}
            <div className="flex flex-col items-center gap-1">
              <span className="text-xs font-bold text-brand-orange">
                {places.length}
              </span>
              <p
                className="text-[12px] text-brand-night/30 uppercase tracking-widest"
                style={{
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                }}
              >
                spots
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
