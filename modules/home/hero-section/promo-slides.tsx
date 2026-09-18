import { HorizontalGallery } from '@/components/ui';
import places from '@/data/places';
import React from 'react'

const PromoSlides = () => {
  return (
    <div className="p-3 bg-gradient-to-bl  via-white/60  h-full flex flex-col justify-between">
      <div className="">
        <p className="text-3xl font-semibold font-display">
          We outside, you coming?
        </p>
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