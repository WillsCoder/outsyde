"use client"

import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";


// import required modules
import { Mousewheel, Pagination } from "swiper/modules";
import Image from "next/image";
import { Place } from "@/lib/const/types/places";

interface PlacesSlideProps {
  places: Place[];
}
const PlacesSlide = ({ places }: PlacesSlideProps) => {
  return (
    <div className="h-full">
      <div className="relative bg-gradient-to-r from-brand-orange/30  h-full">
        <span className="absolute top-2 right-2 z-20 inline-flex items-center rounded-full bg-brand-sand px-3 py-1 text-sm font-medium text-brand-night">
          🔥 Trending Places
        </span>
        <Swiper
          direction={"vertical"}
          slidesPerView={1}
          spaceBetween={30}
          mousewheel={true}
          pagination={{
            clickable: true,
          }}
          modules={[Mousewheel, Pagination]}
          className="w-full h-full"
        >
          {places.slice(0,5).map((place, idx) => {
            return (
              <SwiperSlide className="w-full h-full" key={idx}>
                <div className="relative w-full h-full flex items-end p-5">
                  {/* Background image with gradient */}
                  <Image
                    src={place.images[0]?.url}
                    alt={place.name}
                    width={800}
                    height={800}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/10" />
                  {/* Content and description */}
                  <div className="relative z-10 pb-12">
                    <div className="text-brand-sand">
                      <p className="text-3xl font-display font-semibold">
                        {place.name}
                      </p>
                      <p className="pt-2">{place.description}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default PlacesSlide;
