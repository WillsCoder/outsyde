import { HorizontalGallery } from '@/components/ui';
import places from '@/data/places';
import React from 'react'

const PromoSlides = () => {
  return (
    <div className="p-3 bg-linear-to-bl  via-white/60 to-white/90  h-full flex flex-col justify-between">
      <div className="">
        <h1 className="font-display text-3xl font-black leading-[0.9] tracking-[-0.04em] sm:text-3xl md:text-4xl">
          WE OUTSIDE.
          <span className="text-brand-orange"> YOU COMING?</span>
        </h1>
        <p className="pt-1 text-sm font-medium">
          Discover events, places, and experiences happening around you right
          now.
        </p>
      </div>
      <div>
        <HorizontalGallery
          items={places
            ?.slice(0, 12)
            .map((item) => ({ name: item.name, url: item.image_url }))}
          speed={50}
          direction="right"
        />
        <HorizontalGallery
          items={places
            ?.slice(5, 12)
            .map((item) => ({ name: item.name, url: item.image_url }))}
          speed={50}
          direction="left"
        />
      </div>
    </div>
  );
}

export default PromoSlides