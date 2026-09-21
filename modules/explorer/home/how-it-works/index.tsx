"use client";
import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Button, Tag } from "@/components/ui";

gsap.registerPlugin(useGSAP);

const steps = [
  {
    title: "🔍 Discover",
    description:
      "Browse curated bars, restaurants, beaches and events happening near you in Lagos.",
    badges: ["🍹 Bars", "🍽 Restaurants", "🏖 Beaches", "🎵 Events"],
    extra: null,
  },
  {
    title: "📥 Save",
    description:
      "Bookmark spots and events you love. Build a shortlist of places to hit this weekend.",
    badges: null,
    extra: [
      { name: "The Backyard, VI", rating: "4.8", color: "bg-brand-gold" },
      { name: "Cactus Restaurant", rating: "4.6", color: "bg-brand-lagoon" },
      { name: "Afrobeat Live Night", rating: "4.9", color: "bg-brand-orange" },
    ],
  },
  {
    title: "🌟 Go & Review",
    description:
      "Get directions, check the vibe with photos and ratings — then leave your review after.",
    badges: ["📍 Directions", "⭐ Reviews", "📸 Photos"],
    extra: null,
  },
];

const HowItWork = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      cardRefs.current.forEach((card) => {
        if (!card) return;

        const onMove = (e: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const rotateX = ((y - rect.height / 2) / rect.height) * -10;
          const rotateY = ((x - rect.width / 2) / rect.width) * 10;

          gsap.to(card, {
            rotateX,
            rotateY,
            scale: 1.02,
            duration: 0.4,
            ease: "power3.out",
            transformPerspective: 800,
          });
        };

        const onLeave = () => {
          gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            duration: 0.6,
            ease: "elastic.out(1, 0.6)",
          });
        };

        card.addEventListener("mousemove", onMove);
        card.addEventListener("mouseleave", onLeave);

        return () => {
          card.removeEventListener("mousemove", onMove);
          card.removeEventListener("mouseleave", onLeave);
        };
      });
    },
    { scope: containerRef },
  );

  return (
    <section className="section relative" ref={containerRef}>
      {/* Grid bg */}
      <div className="grid-background"></div>
      {/* Content */}
      <div className="box">
        <div className="mb-6">
          <Tag text="How it works" />
          <h2 className="pt-3 text-3xl lg:text-7xl font-display font-medium tracking-tight text-brand-night">
            Going out, made simple
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-24">
          {steps.map((item, idx) => {
            // const Icon = item.icon;
            return (
              <div
                key={idx}
                ref={(el) => {
                  cardRefs.current[idx] = el;
                }}
                style={{
                  transformStyle: "preserve-3d",
                  willChange: "transform",
                }}
                className={`relative overflow-hidden group flex flex-col justify-end border-2 border-brand-gold rounded-2xl cursor-default ${idx === 2 ? "h-[70dvh] max-h-170" : "h-[50dvh] max-h-130"}`}
              >
                {/* Gradient bg */}
                <div className="absolute w-full h-full left-0 top-0 bg-gradient-to-t from-white/80"></div>
                <div className="card-content p-5 relative z-10">
                  <p className="text-[11px] font-semibold tracking-widest uppercase text-brand-night/70 mb-3">
                    Step 0{idx + 1}
                  </p>

                  {/* Badges (card 1 & 3) */}
                  {item.badges && (
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {item.badges.map((b) => (
                        <span
                          key={b}
                          className="text-[11px] font-medium px-2.5 py-1 rounded-full border border-brand-lagoon bg-brand-lagoon/5 text-brand-night/80 backdrop-blur-sm"
                        >
                          {b}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Saved spots list (card 2) */}
                  {item.extra && (
                    <div className="flex flex-col gap-1.5 mb-3">
                      {item.extra.map((spot) => (
                        <div
                          key={spot.name}
                          className="flex items-center gap-2"
                        >
                          <div
                            className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${spot.color}`}
                          />
                          <span className="text-xs lg:text-sm text-brand-night/70">
                            {spot.name}
                          </span>
                          <span className="ml-auto text-xs lg:text-sm text-brand-gold">
                            ★ {spot.rating}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  <p className="font-medium text-xl lg:text-2xl text-brand-night">
                    {item.title}
                  </p>
                  <p className="text-sm lg:text-base text-brand-night/80 mt-2 max-h-0 overflow-hidden opacity-0 group-hover:max-h-20 group-hover:opacity-100 transition-all duration-300 ease-out">
                    {item.description}
                  </p>
                  <Button variant="ghost" size="sm" className="mt-6">
                    {idx === 0
                      ? "Explore spots"
                      : idx === 1
                        ? "View saved"
                        : "Open map"}{" "}
                    →
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWork;
