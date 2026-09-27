"use client";

import Image from "next/image";
import { useState } from "react";
import { IconPlayerPlayFilled, IconPhoto } from "@tabler/icons-react";

export default function Gallery({
  images,
  placeName,
}: {
  images: any[];
  placeName: string;
}) {
  const [lightbox, setLightbox] = useState<number | null>(null);

  // Always create 4 gallery slots
  const galleryImages = [...images, ...Array(4 - images.length).fill(null)].slice(
    0,
    4
  );

  const main = galleryImages[0];
  const thumbs = galleryImages.slice(1, 3);

  return (
    <div className="box pt-4 md:pt-8">
      {/* Mobile: horizontal scroll */}
      <div className="md:hidden">
        <div className="flex gap-2 overflow-x-auto snap-x snap-mandatory scrollbar-none">
          {galleryImages.map((img, i) => (
            <div
              key={img?.id ?? `placeholder-${i}`}
              className="relative min-w-10/12! h-70 overflow-hidden rounded-2xl cursor-pointer snap-center"
              onClick={() => img && setLightbox(i)}
            >
              {img ? (
                <>
                  <Image
                    src={img.url}
                    alt={`${placeName} ${i + 1}`}
                    fill
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />

                  {img.url.includes(".mp4") && (
                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-[11px] font-medium bg-brand-night/70 text-white rounded-full px-2.5 py-1 backdrop-blur-sm">
                      <span className="w-5 h-5 rounded-full bg-brand-orange flex items-center justify-center">
                        <IconPlayerPlayFilled size={8} />
                      </span>
                      Watch video
                    </div>
                  )}
                </>
              ) : (
                <Placeholder />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden md:grid grid-cols-2 grid-rows-[280px_180px] gap-1.5 rounded-2xl overflow-hidden">
        {/* Main */}
        <div
          className="row-span-2 relative cursor-pointer"
          onClick={() => main && setLightbox(0)}
        >
          {main ? (
            <Image
              src={main.url}
              alt={placeName}
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <Placeholder />
          )}
        </div>

        {/* Thumbs */}
        {thumbs.map((img, i) => (
          <div
            key={img?.id ?? `placeholder-${i}`}
            className="relative overflow-hidden cursor-pointer group"
            onClick={() => img && setLightbox(i + 1)}
          >
            {img ? (
              <>
                <Image
                  src={img.url}
                  alt={`${placeName} ${i + 2}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {img.url.includes(".mp4") && (
                  <div className="absolute bottom-2 left-2 flex items-center gap-1.5 text-[11px] font-medium bg-brand-night/70 text-white rounded-full px-2.5 py-1 backdrop-blur-sm">
                    <span className="w-5 h-5 rounded-full bg-brand-orange flex items-center justify-center">
                      <IconPlayerPlayFilled size={8} />
                    </span>
                    Watch video
                  </div>
                )}

                {i === thumbs.length - 1 && images.length > 4 && (
                  <div className="absolute inset-0 bg-brand-night/50 flex items-center justify-center text-white text-sm font-medium">
                    +{images.length - 4} photos
                  </div>
                )}
              </>
            ) : (
              <Placeholder />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function Placeholder() {
  return (
    <div className="w-full h-full bg-brand-night/5 flex flex-col items-center justify-center text-brand-night/30">
      <div className="w-12 h-12 rounded-full bg-brand-night/5 flex items-center justify-center mb-2">
        <IconPhoto size={22} stroke={1.5} />
      </div>
      <span className="text-xs font-medium">No photo yet</span>
    </div>
  );
}
