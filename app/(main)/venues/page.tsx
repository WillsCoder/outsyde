"use client";

import {
  IconArrowUpRight,
  IconCake,
  IconGlassChampagne,
  IconHeart,
  IconMapPin,
  IconUsers,
} from "@tabler/icons-react";
import Link from "next/link";

const occasions = [
  {
    icon: IconHeart,
    title: "Weddings",
    color: "bg-brand-orange",
  },
  {
    icon: IconCake,
    title: "Birthdays",
    color: "bg-brand-gold text-brand-night",
  },
  {
    icon: IconGlassChampagne,
    title: "Parties",
    color: "bg-brand-lagoon",
  },
  {
    icon: IconUsers,
    title: "Celebrations",
    color: "bg-brand-night",
  },
];

export default function VenuesPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-brand-sand text-brand-night">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-brand-orange/10 blur-3xl animate-float-slow" />

        <div className="absolute -right-37.5 top-[30%] h-128 w-lg rounded-full bg-brand-lagoon/10 blur-3xl animate-float-reverse" />

        <div className="absolute -bottom-37.5 left-[35%] h-96 w-96 rounded-full bg-brand-gold/10 blur-3xl animate-pulse-soft" />
      </div>

      {/* Grid */}
      <div className="grid-wrapper pointer-events-none absolute inset-0">
        <div className="grid-background" />
      </div>

      <section className="section relative">
        <div className="box">
          {/* Hero */}
          <div className="grid gap-10 lg:grid-cols-[1fr_400px] lg:items-end">
            <div>
              <div className="mb-7 flex items-center gap-3 animate-fade-up">
                <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-brand-orange" />

                <span className="text-xs font-bold uppercase tracking-[0.22em]">
                  Venues · Coming soon
                </span>
              </div>

              <h1 className="font-display text-[clamp(4rem,10vw,9rem)] font-black leading-[0.82] tracking-[-0.075em] animate-fade-up [animation-delay:100ms]">
                Somewhere
                <br />
                to
                <br />
                <span className="text-brand-orange">celebrate.</span>
              </h1>
            </div>

            <div className="pb-2 animate-fade-up [animation-delay:200ms]">
              <p className="text-lg leading-8 text-black/55 md:text-xl">
                Looking for somewhere to host the big day, the birthday, the
                party, or just a really good excuse to get everyone together?
              </p>
            </div>
          </div>

          {/* Coming soon card */}
          <div className="relative mt-16 overflow-hidden rounded-4xl bg-brand-night text-white shadow-2xl shadow-black/10 animate-fade-up [animation-delay:300ms]">
            {/* Pattern */}
            <div className="pointer-events-none absolute inset-0 opacity-40">
              <div className="absolute inset-0 bg-pattern-grid" />
            </div>

            {/* Glow */}
            <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-brand-orange/20 blur-3xl" />

            <div className="relative grid gap-12 p-7 md:p-12 lg:grid-cols-[0.9fr_1.1fr] lg:p-16">
              {/* Copy */}
              <div>
                <div className="mb-7 flex h-14 w-14 rotate-[-5deg] items-center justify-center rounded-2xl bg-brand-orange">
                  <IconMapPin size={24} />
                </div>

                <h2 className="max-w-lg font-display text-3xl font-black leading-tight tracking-tight md:text-5xl">
                  Find the right space for{" "}
                  <span className="text-brand-orange">your kind of day.</span>
                </h2>

                <p className="mt-6 max-w-lg text-base leading-7 text-white/50 md:text-lg">
                  We&apos;re building a better way to discover venues across
                  Nigeria — with the details that actually matter when choosing
                  somewhere to host your celebration.
                </p>

                <div className="mt-8 flex items-center gap-3 text-sm text-white/40">
                  <span className="relative flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-lagoon opacity-50" />
                    <span className="relative h-3 w-3 rounded-full bg-brand-lagoon" />
                  </span>
                  Coming to Nigeria, city by city
                </div>
              </div>

              {/* Occasion cards */}
              <div>
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-white/30">
                  What are you planning?
                </p>

                <div className="grid grid-cols-2 gap-3">
                  {occasions.map((occasion, index) => {
                    const Icon = occasion.icon;

                    return (
                      <div
                        key={occasion.title}
                        className="group rounded-2xl border border-white/10 bg-white/4 p-5 transition-all duration-500 hover:-translate-y-1 hover:bg-white/8"
                        style={{
                          animationDelay: `${400 + index * 100}ms`,
                        }}
                      >
                        <div
                          className={`mb-8 flex h-11 w-11 items-center justify-center rounded-xl text-white ${occasion.color}`}
                        >
                          <Icon size={19} />
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="font-bold">{occasion.title}</span>

                          <IconArrowUpRight
                            size={16}
                            className="text-white/20 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-brand-orange"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* What we're building */}
          <div className="mt-20">
            <div className="mb-10 flex items-end justify-between gap-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-black/35">
                  Coming soon
                </span>

                <h2 className="mt-3 font-display text-3xl font-black tracking-tight md:text-5xl">
                  The details matter.
                </h2>
              </div>

              <span className="hidden font-display text-7xl font-black text-black/4 md:block">
                02
              </span>
            </div>

            <div className="grid gap-px overflow-hidden rounded-2xl border border-black/10 bg-black/10 md:grid-cols-3">
              {[
                {
                  number: "01",
                  title: "Know the space",
                  text: "See what a venue is actually like before you make the trip.",
                },
                {
                  number: "02",
                  title: "Find your fit",
                  text: "Discover spaces based on the occasion, vibe, size, and city.",
                },
                {
                  number: "03",
                  title: "Make plans",
                  text: "Get the information you need to take the next step.",
                },
              ].map((item) => (
                <div
                  key={item.number}
                  className="group bg-brand-sand p-7 transition-colors duration-500 hover:bg-white"
                >
                  <span className="font-mono text-xs font-bold text-brand-orange">
                    {item.number}
                  </span>

                  <h3 className="mt-10 font-display text-xl font-black">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-black/50">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Venue submission CTA */}
          <div className="relative mt-20 overflow-hidden rounded-4xl border border-black/10 bg-white/40 p-7 backdrop-blur-sm md:p-12">
            <div className="pointer-events-none absolute -right-15 -top-25 h-64 w-64 rounded-full bg-brand-gold/10 blur-3xl" />

            <div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-black/35">
                  Own a venue?
                </span>

                <h2 className="mt-3 max-w-2xl font-display text-3xl font-black tracking-tight md:text-4xl">
                  Put your space on Outsyde.
                </h2>

                <p className="mt-3 max-w-xl leading-7 text-black/50">
                  We&apos;re looking for the spaces people should know about.
                  Event centres, gardens, rooftops, private spaces, hotels,
                  restaurants and everywhere in between.
                </p>
              </div>

              <Link
                href="/contact"
                className="group flex w-fit items-center gap-3 rounded-xl bg-brand-orange px-6 py-4 font-bold text-white transition-all duration-500 hover:-translate-y-1 hover:bg-[#ff6d40] hover:shadow-[0_15px_40px_rgba(255,92,43,0.25)]"
              >
                Tell us about it
                <IconArrowUpRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </Link>
            </div>
          </div>

          {/* Marquee */}
          <div className="mt-16 overflow-hidden border-y border-black/10 py-5">
            <div className="flex w-max animate-marquee">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="flex items-center">
                  {[
                    "FIND A SPACE",
                    "MAKE SOME PLANS",
                    "CELEBRATE BIG",
                    "GO OUTSYDE",
                  ].map((text) => (
                    <div
                      key={text}
                      className="flex items-center whitespace-nowrap"
                    >
                      <span className="mx-8 font-display text-xl font-black md:text-2xl">
                        {text}
                      </span>

                      <span className="h-2.5 w-2.5 rounded-full bg-brand-orange" />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
