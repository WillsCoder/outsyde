import React from "react";
import Link from "next/link";
import { HorizontalGallery } from "@/components/ui";
import places from "@/data/places";
import { IconArrowUpRight, IconMapPin } from "@tabler/icons-react";

const PromoSlides = () => {
  const firstRow =
    places?.slice(0, 12).map((item) => ({
      name: item.name,
      url: item.image_url,
    })) ?? [];

  const secondRow =
    places?.slice(5, 12).map((item) => ({
      name: item.name,
      url: item.image_url,
    })) ?? [];

  return (
    <div className="relative w-full h-full overflow-hidden bg-brand-sand">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 opacity-60 bg-[linear-gradient(to_right,rgba(17,17,16,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(17,17,16,0.06)_1px,transparent_1px)] bg-size-[60px_60px]" />

        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-brand-orange/20 blur-[90px]" />

        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-brand-gold/15 blur-[90px]" />
      </div>

      <div className="relative flex h-full flex-col justify-between  p-3">
        {/* Top */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-3 py-1.5 backdrop-blur-md">
            <span className="h-2 w-2 animate-pulse rounded-full bg-brand-lagoon" />

            <span className="text-[9px] font-bold uppercase tracking-[0.18em]">
              Your city has plans
            </span>
          </div>

          <span className="text-[10px] font-bold uppercase tracking-widest text-black/30">
            Outsyde
          </span>
        </div>

        {/* Copy */}
        <div>
          <div className="flex items-center justify-between">
            <h1 className="pt-1 font-display text-[clamp(2rem,4vw,4.5rem)] font-black leading-[0.8] tracking-[-0.07em]">
              WE&apos;RE
              <span className="text-brand-orange pl-4">OUTSIDE.</span>
            </h1>
            <Link
              href="/places"
              aria-label="Explore what's on"
              className="group flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-brand-night/15 bg-white/50 backdrop-blur-sm transition-all duration-300 hover:border-brand-orange hover:bg-brand-orange hover:text-white hover:scale-105"
            >
              <IconArrowUpRight
                size={17}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>

          <p className="pt-2 max-w-md text-xs font-medium leading-5 text-black/55 md:text-sm">
            Discover events, places, and experiences actually worth leaving your
            house for.
          </p>
        </div>

        {/* Gallery */}
        <div className="relative -mx-5 overflow-hidden md:-mx-7">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-linear-to-r from-brand-sand to-transparent" />

          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-linear-to-l from-brand-sand to-transparent" />

          <div className="space-y-1">
            <HorizontalGallery items={firstRow} speed={45} direction="right" />
          </div>
        </div>

        {/* Bottom */}
        <div className="flex items-center justify-between border-t border-black/10 pt-3">
          <span className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest text-black/35">
            <IconMapPin size={10} />
            Starting in Nigeria
          </span>

          <span className="text-[9px] font-bold uppercase tracking-widest text-black/30">
            Spots · Events · Experiences
          </span>
        </div>
      </div>
    </div>
  );
};

export default PromoSlides;
