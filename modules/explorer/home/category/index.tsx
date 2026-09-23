"use client";

import { Button } from "@/components/ui";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Category } from "@/lib/const/types/category";
import { iconMap } from "@/lib/const/icon/icon-map";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

gsap.registerPlugin(useGSAP);

interface PlacesCategoryProps {
  categories: Category[];
}

const PlacesCategory = ({ categories }: PlacesCategoryProps) => {
  const router = useRouter();
  const rowRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const timelines = useRef<gsap.core.Timeline[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [showLeft, setShowLeft] = useState<boolean>(false);
  const [showRight, setShowRight] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const categoriesWithCount = categories.map((cat) => ({
    ...cat,
    count: Math.floor(Math.random() * 31) + 20,
  }));

  const updateButtons = () => {
    const row = rowRef.current;
    if (!row) return;
    const maxScroll = row.scrollWidth - row.clientWidth;
    setShowLeft(row.scrollLeft > 4);
    setShowRight(row.scrollLeft < maxScroll - 4);
  };

  // Activate a card by index — plays its timeline, reverses others
  const activateCard = (i: number) => {
    timelines.current.forEach((tl, j) => {
      if (j === i) tl?.play();
      else tl?.reverse();
    });
    setActiveIndex(i);
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

      // Always start with first card active
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

  // Mobile: cycle to next/prev category
  const cycleCategory = (dir: "prev" | "next") => {
    const next =
      dir === "next"
        ? (activeIndex + 1) % categoriesWithCount.length
        : (activeIndex - 1 + categoriesWithCount.length) %
          categoriesWithCount.length;

    activateCard(next);

    // Scroll the active card into view
    const card = cardRefs.current[next];
    if (card) {
      card.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  };

  return (
    <section className="section bg-white/50">
      <div className="box py-6 lg:py-12">
        <div className="lg:flex gap-6 lg:gap-12">
          {/* Heading */}
          <div className="shrink-0 flex lg:flex-col items-baseline justify-between mb-4 lg:mb-0">
            <div>
              <h2 className="text-3xl lg:text-7xl font-display font-medium text-brand-night tracking-tight">
                Browse by vibe
              </h2>
              <p className="text-brand-night/50 lg:mt-3">
                Find exactly what you're in the mood for
              </p>
            </div>
            <Button variant="ghost" className="hidden! lg:inline-flex">
              <Link href="/places">See all ➔</Link>
            </Button>
          </div>

          {/* Cards row */}
          <div className="relative w-full overflow-hidden">
            {/* Desktop scroll left */}
            {showLeft && !isMobile && (
              <Button
                variant="ghost"
                onClick={() => scroll("left")}
                className="absolute text-brand-night/50 left-2 top-1/2 -translate-y-1/2 z-10 aspect-square"
              >
                <IconArrowLeft />
              </Button>
            )}

            <div
              ref={rowRef}
              onScroll={updateButtons}
              className="flex gap-2.5 overflow-x-auto scrollbar-none"
            >
              {categoriesWithCount.map((cat, i) => (
                <Link
                  key={cat.slug}
                  href={`/places?category=${cat.slug}`}
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  // Desktop: hover to activate
                  onMouseEnter={() => {
                    if (isMobile) return;
                    activateCard(i);
                    if (i === categoriesWithCount.length - 1) {
                      const row = rowRef.current;
                      if (row)
                        gsap.to(row, {
                          scrollLeft: row.scrollWidth - row.clientWidth,
                          duration: 0.35,
                          ease: "power2.out",
                        });
                    }
                  }}
                  // Mobile: tap activates, second tap navigates
                  onClick={(e) => {
                    if (isMobile) {
                      if (activeIndex !== i) {
                        e.preventDefault();
                        activateCard(i);
                        const card = cardRefs.current[i];
                        if (card)
                          card.scrollIntoView({
                            behavior: "smooth",
                            block: "nearest",
                            inline: "center",
                          });
                      }
                      // if already active, allow navigation (default Link behavior)
                    }
                  }}
                  className="relative group shrink-0 w-32.5 h-96 bg-brand-sand rounded-xl p-4 flex flex-col justify-between overflow-hidden"
                >
                  {/* Background image */}
                  {cat.image && (
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      width={500}
                      height={600}
                      className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300 ${activeIndex === i ? "opacity-100" : "opacity-0"}`}
                    />
                  )}
                  {/* Gradient overlay */}
                  <div
                    className={`absolute inset-0 bg-linear-to-bl from-black/10 via-black/30 to-black/80 transition-opacity duration-300 ${activeIndex === i ? "opacity-100" : "opacity-0"}`}
                  />

                  <div className="relative icon w-8 h-8 lg:w-12 lg:h-12 lg:text-2xl rounded-lg bg-white flex items-center justify-center text-brand-orange shrink-0">
                    {iconMap[cat.icon] || cat.icon}
                  </div>

                  <div className="relative">
                    <p className="name text-base font-display font-medium text-brand-night whitespace-nowrap">
                      {cat.name}
                    </p>
                    {activeIndex === i && (
                      <p className="text-sm text-brand-sand line-clamp-2">
                        {cat.description}
                      </p>
                    )}
                    <p
                      className={`count text-xs font-medium mt-0.5 whitespace-nowrap ${activeIndex === i ? "text-brand-orange!" : "text-brand-night/50"}`}
                    >
                      {cat.count} spots
                    </p>
                    {/* Mobile: "Go to page" button on active card */}
                    {isMobile && activeIndex === i && (
                      <Button
                        size="sm"
                        className="mt-3 w-full"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          router.push(`/places?category=${cat.slug}`);
                        }}
                      >
                        Explore {cat.name} →
                      </Button>
                    )}
                  </div>
                </Link>
              ))}
            </div>

            {/* Desktop scroll right */}
            {showRight && !isMobile && (
              <Button
                variant="ghost"
                onClick={() => scroll("right")}
                className="absolute text-brand-night/50 right-2 top-1/2 -translate-y-1/2 z-10 aspect-square"
              >
                <IconArrowRight />
              </Button>
            )}

            {/* Mobile navigation arrows */}
            {isMobile && (
              <div className="flex items-center justify-between mt-4">
                <Button
                  variant="ghost"
                  onClick={() => cycleCategory("prev")}
                  className="aspect-square text-brand-night/50"
                  disabled={activeIndex === 0}
                >
                  <IconArrowLeft />
                </Button>

                {/* Dot indicators */}
                <div className="flex gap-1.5">
                  {categoriesWithCount.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => activateCard(i)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        activeIndex === i
                          ? "w-5 bg-brand-orange"
                          : "w-1.5 bg-brand-night/20"
                      }`}
                    />
                  ))}
                </div>

                <Button
                  variant="ghost"
                  onClick={() => cycleCategory("next")}
                  className="aspect-square text-brand-night/50"
                  disabled={activeIndex === categoriesWithCount.length - 1}
                >
                  <IconArrowRight />
                </Button>
              </div>
            )}

            {/* Mobile "See all" link */}
            {isMobile && (
              <Button variant="ghost" className="w-full mt-3">
                <Link href="/places">See all places ➔</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlacesCategory;
