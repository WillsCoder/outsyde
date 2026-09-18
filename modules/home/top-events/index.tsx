import React from 'react'
import HeaderSection from './display/header-section';
import SwiperSection from './display/swiper-section';

const TopEvents = () => {
  return (
    <div>
      <div className="section">
        <div className="relative h-[700px] lg:h-[850px] py-6">
          {/* content */}
          <div className="relative z-10">
            <div>
              <HeaderSection />
            </div>
            <div>
              <SwiperSection />
            </div>
          </div>
          {/* center background */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="w-[87%] lg:w-[55%] mx-auto h-full bg-white dark:bg-[#010B18] rounded-[30px]"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopEvents