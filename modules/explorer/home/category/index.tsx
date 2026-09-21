"use client";

import { Button } from "@/components/ui";
// import { PlaceType } from "@prisma/client";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import Image from "next/image";
import { Category } from "@/lib/const/types/category";
import { iconMap } from "@/lib/const/icon/icon-map";

gsap.registerPlugin(useGSAP);

const categories = [
  {
    name: "Bars",
    slug: "bars",
    icon: "🍾",
    description: "Cocktail bars, lounges with drinks, and nightlife spots",
    order: 1,
    image: "https://ik.imagekit.io/willsbucket/Outsyde/bar.png",
    count: 78,
  },
  {
    name: "Restaurants",
    slug: "restaurants",
    icon: "🍝",
    description: "Dine-in spots, casual eats, and fine dining",
    order: 2,
    image: "https://ik.imagekit.io/willsbucket/Outsyde/Restuarant.png",
    count: 128,
  },
  {
    name: "Lounges",
    slug: "lounges",
    icon: "🛋️",
    description: "Chill spots to relax with drinks and good music",
    order: 3,
    image: "https://ik.imagekit.io/willsbucket/Outsyde/lounge.jpg",
    count: 58,
  },
  {
    name: "Beaches",
    slug: "beaches",
    icon: "🏝️",
    description: "Beachfront spots for sun, sand, and good vibes",
    order: 4,
    image: "https://ik.imagekit.io/willsbucket/Outsyde/beach.webp",
    count: 22,
  },
  {
    name: "Parks",
    slug: "parks",
    icon: "🏕️",
    description: "Green spaces and outdoor hangout spots",
    order: 5,
    image: "https://ik.imagekit.io/willsbucket/Outsyde/park.jpg",
    count: 12,
  },
  {
    name: "Clubs",
    slug: "clubs",
    icon: "🪩",
    description: "Nightclubs and dance spots",
    order: 6,
    image: "https://ik.imagekit.io/willsbucket/Outsyde/club.png",
    count: 71,
  },
  {
    name: "Cafes",
    slug: "cafes",
    icon: "☕",
    description: "Coffee shops and casual daytime spots",
    order: 7,
    image: "https://ik.imagekit.io/willsbucket/Outsyde/cafe.jpg",
    count: 23,
  },
  {
    name: "Art & culture",
    slug: "art-culture",
    icon: "🎨",
    description: "Galleries, exhibitions, and cultural spaces",
    order: 8,
    image: "https://ik.imagekit.io/willsbucket/Outsyde/beach.webp",
    count: 18,
  },
  {
    name: "Other",
    slug: "other",
    icon: "📍",
    description: "Everything else worth checking out",
    order: 9,
    image: "https://ik.imagekit.io/willsbucket/Outsyde/lounge.jpg",
    count: 202,
  },
];

interface PlacesCategoryProps {
  categories: Category[];
}

const PlacesCategory = ({ categories }: PlacesCategoryProps) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const timelines = useRef<gsap.core.Timeline[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [showLeft, setShowLeft] = useState<boolean>(false);
  const [showRight, setShowRight] = useState<boolean>(false);

  const updateButtons = () => {
    const row = rowRef.current;
    if (!row) return;
    const maxScroll = row.scrollWidth - row.clientWidth;
    setShowLeft(row.scrollLeft > 4);
    setShowRight(row.scrollLeft < maxScroll - 4);
  };

  useGSAP(
    () => {
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const icon = card.querySelector(".icon");
        const name = card.querySelector(".name");
        const count = card.querySelector(".count");

        const tl = gsap.timeline({ paused: true });
        tl.to(card, {
          width: 260,
          backgroundColor: "#FF5C2B",
          duration: 0.35,
          ease: "power2.out",
        })
          .to(
            icon,
            {
              backgroundColor: "rgba(255,255,255,0.2)",
              color: "#fff",
              duration: 0.35,
              ease: "power2.out",
            },
            0,
          )
          .to(name, { color: "#fff", duration: 0.35, ease: "power2.out" }, 0)
          .to(
            count,
            {
              color: "rgba(255,255,255,0.8)",
              duration: 0.35,
              ease: "power2.out",
            },
            0,
          );

        timelines.current[i] = tl;
      });

      // Default first category to highlighted state
      timelines.current[0]?.play();

      updateButtons();
    },
    { scope: rowRef },
  );

  const scroll = (dir: "left" | "right") => {
    rowRef.current?.scrollBy({
      left: dir === "left" ? -280 : 280,
      behavior: "smooth",
    });
  };

  const categoriesWithCount = categories.map((cat) => ({
    ...cat,
    count: Math.floor(Math.random() * 31) + 20,
  }));

  return (
    <section className="section bg-white/50">
      <div className="box py-6 lg:py-12">
        <div className="lg:flex gap-6 lg:gap-12">
          <div className="shrink-0 flex lg:flex-col items-baseline justify-between">
            <div>
              <h2 className="text-3xl lg:text-7xl font-display font-medium text-brand-night tracking-tight">
                Browse by vibe
              </h2>
              <p className="text-brand-night/50 lg:mt-3">
                Find exactly what you're in the mood for
              </p>
            </div>
            <Button variant="ghost" className="">
              <span className="hidden md:inline-block md:pr-2">See all</span> ➔
            </Button>
          </div>

          <div className="relative w-full overflow-hidden pt-6 lg:pt-0">
            {showLeft && (
              <Button
                variant="ghost"
                onClick={() => scroll("left")}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 aspect-square"
              >
                ⮜
              </Button>
            )}

            <div
              ref={rowRef}
              onScroll={updateButtons}
              className="flex gap-2.5 overflow-x-auto scrollbar-none"
            >
              {categoriesWithCount?.map((cat, i) => (
                <Link
                  key={cat.slug}
                  href={`/places?slug=${cat.slug}`}
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  onMouseEnter={() => {
                    timelines.current[i]?.play();
                    setActiveIndex(i);
                    if (i === categories.length - 1) {
                      const row = rowRef.current;
                      if (row) {
                        gsap.to(row, {
                          scrollLeft: row.scrollWidth - row.clientWidth,
                          duration: 0.35,
                          ease: "power2.out",
                        });
                      }
                    }
                  }}
                  onMouseLeave={() => {
                    timelines.current[i]?.reverse();
                    setActiveIndex(null);
                  }}
                  className="relative group flex-shrink-0 w-[130px] h-96 bg-brand-sand rounded-xl p-4 flex flex-col justify-between overflow-hidden"
                >
                  {cat?.image && (
                    <Image
                      src={cat?.image}
                      alt={cat.name}
                      width={500}
                      height={600}
                      className={`absolute top-0 left-0 w-full h-full object-cover ${activeIndex === i ? "block" : "hidden"}`}
                    />
                  )}
                  {/* Gradient Overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-bl from-black/10 via-black/30 to-black/80 ${activeIndex === i ? "block" : "hidden"}`}
                  />

                  <div className="relative icon w-8 h-8 lg:w-12 lg:h-12 lg:text-2xl rounded-lg bg-white flex items-center justify-center text-brand-orange flex-shrink-0">
                    {iconMap[cat.icon] || cat.icon}
                  </div>
                  <div className="relative">
                    <p className="name text-base font-display font-medium text-brand-night whitespace-nowrap">
                      {cat.name}
                    </p>
                    {activeIndex === i && (
                      <p className="text-sm text-brand-sand">
                        {cat.description}
                      </p>
                    )}
                    <p
                      className={`count text-xs font-medium  ${activeIndex === i ? "text-brand-orange!" : "text-brand-night/50"} mt-0.5 whitespace-nowrap`}
                    >
                      {cat.count} spots
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            {showRight && (
              <Button
                variant="ghost"
                onClick={() => scroll("right")}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 aspect-square"
              >
                ⮞
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlacesCategory;
