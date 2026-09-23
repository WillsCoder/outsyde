"use client";

import { CSSProperties, useCallback, useRef, useState } from "react";
import "swiper/css/bundle";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { NavigationControl } from "@/components/ui";
import { EventCard } from "@/lib/const/types/event";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

const getCardStyle = (index: number, activeIndex: number): CSSProperties => {
  const distance = index - activeIndex;
  const absDist = Math.abs(distance);

  const deg =
    absDist === 0 ? 0 : Math.min(absDist * 8, 22) * (distance < 0 ? -1 : 1);

  const topPx = absDist === 0 ? -68 : absDist === 1 ? -45 : 10;

  const zIndex = Math.max(10 - absDist * 2, 0);

  return {
    transform: `rotate(${deg}deg)`,
    top: `${topPx}px`,
    zIndex,
    transition: "transform 300ms ease-out, top 300ms ease-out",
    position: "relative",
  };
};

interface Props{
  events: EventCard[];
}

const SwiperSection = ({ events }: Props) => {
  const router = useRouter()
  const sliderRef = useRef<any>(null);
  const [{ canNext, canPrev }, setNav] = useState({
    canNext: true,
    canPrev: false,
  });

  const [activeIndex, setActiveIndex] = useState(1);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
    setNav({
      canNext: !sliderRef.current.swiper.isEnd,
      canPrev: !sliderRef.current.swiper.isBeginning,
    });
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
    setNav({
      canNext: !sliderRef.current.swiper.isEnd,
      canPrev: !sliderRef.current.swiper.isBeginning,
    });
  }, []);

  return (
    <>
      <div className="">
        <div>
          <Swiper
            ref={sliderRef}
            watchSlidesProgress={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            grabCursor={true}
            initialSlide={1}
            spaceBetween={-70}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            onSwiper={(swiper) => setActiveIndex(swiper.activeIndex)}
            className="p-8!"
          >
            {events.map((event, index) => (
              <SwiperSlide
                key={index}
                className="w-57.5! h-85! lg:w-82.5! lg:h-117.5! px-5 lg:px-10 pb-5 lg:pb-10 pt-14.5"
                onClick={() => router.push(`events/${event.slug}`)}
              >
                <div
                  className={`relative w-full overflow-hidden h-full px-4 py-6 rounded-2xl`}
                  style={getCardStyle(index, activeIndex)}
                >
                  <div className="w-full h-full border-2 border-brand-gold relative rounded-[30px] overflow-hidden flex flex-col justify-end">
                    <div className="absolute z-10 w-full h-full top-0 left-0 cover-gradient"></div>
                    {event.imageUrl && (
                      <img
                        src={event.imageUrl}
                        alt="banner-image"
                        className="w-full h-full object-cover absolute"
                      />
                    )}
                    <div className="relative z-20 text-brand-sand p-5">
                      <p className="text-base lg:text-xl">{event.title}</p>
                      <p className="text-sm lg:text-base text-brand-sand/70">
                        {format(event.startTime, "MMM d, yyyy:00 a • 12M")}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          {/* Navigation arrows positioned below the reviewer content */}
          <div className="flex justify-center relative z-20 -top-16 md:-top-20">
            <NavigationControl
              canNext={canNext}
              canPrev={canPrev}
              next={handleNext}
              prev={handlePrev}
              boxSize=""
              iconSize={20}
              showViewAll={false}
              shouldHide={false}
              noButtons
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SwiperSection;
