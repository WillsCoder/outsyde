"use client";

import { IconArrowUpRight, IconBriefcase, IconCompass, IconSparkles } from "@tabler/icons-react";
import Link from "next/link";


export default function CareersPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-brand-sand text-brand-night">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-brand-orange/10 blur-3xl animate-float-slow" />
        <div className="absolute -right-35 top-[35%] h-120 w-120 rounded-full bg-brand-lagoon/10 blur-3xl animate-float-reverse" />
      </div>

      <div className="grid-wrapper pointer-events-none absolute inset-0">
        <div className="grid-background" />
      </div>

      <section className="relative flex flex-col min-h-screen items-center py-20">
        <div className="box">
          <div className="text-center">
            <div className="mx-auto mb-8 flex w-fit items-center gap-3 rounded-full border border-black/10 bg-white/50 px-4 py-2 backdrop-blur-sm animate-fade-up">
              <span className="h-2 w-2 animate-pulse rounded-full bg-brand-orange" />

              <span className="text-xs font-bold uppercase tracking-[0.2em]">
                Careers · Coming soon
              </span>
            </div>

            <div className="relative">
              <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[clamp(10rem,30vw,28rem)] font-black leading-none text-black/2.5">
                01
              </span>

              <h1 className="relative font-display text-[clamp(4rem,11vw,10rem)] font-black leading-[0.8] tracking-[-0.075em] animate-fade-up [animation-delay:100ms]">
                Build
                <br />
                <span className="text-brand-orange">Outsyde.</span>
              </h1>
            </div>

            <p className="mx-auto mt-10 max-w-2xl text-lg leading-8 text-black/55 md:text-xl animate-fade-up [animation-delay:200ms]">
              We&apos;re building the place where Africa discovers what&apos;s
              worth leaving the house for. We&apos;ll be looking for curious
              people who want to help us build it.
            </p>

            <div className="mx-auto mt-12 grid max-w-3xl gap-4 sm:grid-cols-3 animate-fade-up [animation-delay:300ms]">
              {[
                {
                  icon: IconCompass,
                  text: "Culture",
                  color: "bg-brand-orange",
                },
                {
                  icon: IconSparkles,
                  text: "Technology",
                  color: "bg-brand-gold text-brand-night",
                },
                {
                  icon: IconBriefcase,
                  text: "Community",
                  color: "bg-brand-lagoon",
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.text}
                    className="group flex items-center gap-3 rounded-2xl border border-black/10 bg-white/40 p-4 text-left backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:bg-white/70"
                  >
                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white ${item.color}`}
                    >
                      <Icon size={19} />
                    </span>

                    <span className="font-bold">{item.text}</span>
                  </div>
                );
              })}
            </div>

            <div className="mt-12 animate-fade-up [animation-delay:400ms]">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 rounded-xl bg-brand-night px-6 py-4 font-bold text-white transition-all duration-500 hover:-translate-y-1 hover:bg-brand-orange hover:shadow-xl"
              >
                Say hello anyway
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10">
                  <IconArrowUpRight
                    size={15}
                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </span>
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-20 overflow-hidden border-y border-black/10 py-5">
          <div className="flex w-max animate-marquee">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="flex items-center">
                {[
                  "BUILD SOMETHING",
                  "MAKE IT MATTER",
                  "GO OUTSYDE",
                  "SEE YOU SOON",
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
      </section>
    </main>
  );
}
