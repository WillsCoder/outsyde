"use client";
import Image from "next/image";
import { useState } from "react";
import { IconPlayerPlayFilled } from "@tabler/icons-react";

export default function Gallery({
  images,
  placeName,
}: {
  images: any[];
  placeName: string;
}) {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const main = images[0];
  const thumbs = images.slice(1, 4);

  return (
    <div className="box pt-8">
      <div className="grid grid-cols-2 grid-rows-[280px_180px] gap-1.5 rounded-2xl overflow-hidden">
        {/* Main */}
        <div
          className="row-span-2 relative cursor-pointer"
          onClick={() => setLightbox(0)}
        >
          {main ? (
            <Image
              src={main.url}
              alt={placeName}
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-brand-night/20" />
          )}
        </div>

        {/* Thumbs */}
        {thumbs.map((img, i) => (
          <div
            key={img.id}
            className="relative overflow-hidden cursor-pointer group"
            onClick={() => setLightbox(i + 1)}
          >
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
          </div>
        ))}
      </div>
    </div>
  );
}
