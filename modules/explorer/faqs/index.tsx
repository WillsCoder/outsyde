"use client"
import React, { useState } from 'react'
import { IconArrowUpRight, IconCalendar, IconChevronDown, IconCompass, IconMapPin, IconSparkles } from "@tabler/icons-react";
import { faqs } from './components/questions';
import Link from 'next/link';

const categories = [
  {
    id: "about",
    label: "Outsyde",
    icon: IconCompass,
  },
  {
    id: "spots",
    label: "Spots",
    icon: IconMapPin,
  },
  {
    id: "events",
    label: "Events",
    icon: IconCalendar,
  },
  {
    id: "community",
    label: "Community",
    icon: IconSparkles,
  },
];

const FaqsIndex = () => {

      const [activeCategory, setActiveCategory] = useState("about");
      const [openIndex, setOpenIndex] = useState<number | null>(0);

      const filteredFaqs = faqs.filter(
        (faq) => faq.category === activeCategory,
      );


  return (
    <main className="relative min-h-screen overflow-hidden bg-brand-sand text-brand-night">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-brand-orange/10 blur-3xl animate-float-slow" />

        <div className="absolute -right-37.5 top-[40%] h-128 w-lg rounded-full bg-brand-lagoon/10 blur-3xl animate-float-reverse" />

        <div className="absolute -bottom-37.5 left-[40%] h-96 w-96 rounded-full bg-brand-gold/10 blur-3xl animate-pulse-soft" />
      </div>

      {/* Grid */}
      <div className="grid-wrapper pointer-events-none absolute inset-0">
        <div className="grid-background" />
      </div>

      <section className="section relative">
        <div className="box">
          {/* Hero */}
          <div className="relative grid gap-8 lg:grid-cols-[1fr_380px] lg:items-end">
            <div>
              <div className="mb-7 flex items-center gap-3 animate-fade-up">
                <span className="h-2.5 w-2.5 rounded-full bg-brand-orange animate-pulse" />

                <span className="text-sm font-bold uppercase tracking-[0.22em]">
                  Frequently asked
                </span>
              </div>

              <h1 className="max-w-5xl font-display text-[clamp(4rem,10vw,9rem)] font-black leading-[0.83] tracking-[-0.07em] animate-fade-up [animation-delay:100ms]">
                Got
                <br />
                <span className="relative inline-block text-brand-orange">
                  questions?
                  <svg
                    className="absolute -bottom-7 left-0 w-full"
                    viewBox="0 0 500 25"
                    fill="none"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M4 17C115 4 360 4 496 14"
                      stroke="#F5A623"
                      strokeWidth="7"
                      strokeLinecap="round"
                      className="animate-draw-line"
                    />
                  </svg>
                </span>
              </h1>
            </div>

            <div className="animate-fade-up [animation-delay:200ms] lg:pb-3">
              <p className="text-lg leading-8 text-black/60 md:text-xl">
                Everything you need to know about finding your next reason to go
                Outsyde.
              </p>

              <Link
                href="/contact"
                className="group mt-6 inline-flex items-center gap-2 font-bold"
              >
                Still curious?
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-night text-white transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:bg-brand-orange">
                  <IconArrowUpRight size={15} />
                </span>
              </Link>
            </div>
          </div>

          {/* FAQ section */}
          <div className="mt-20 grid gap-12 lg:grid-cols-[230px_1fr]">
            {/* Category navigation */}
            <aside className="lg:sticky lg:top-8 lg:self-start">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-black/40">
                Browse by
              </p>

              <nav className="flex gap-2 overflow-x-auto pb-2 scrollbar-none lg:block lg:space-y-1">
                {categories.map((category) => {
                  const Icon = category.icon;
                  const active = category.id === activeCategory;

                  return (
                    <button
                      key={category.id}
                      onClick={() => {
                        setActiveCategory(category.id);
                        setOpenIndex(0);
                      }}
                      className={`group flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-bold transition-all duration-300 lg:w-full ${
                        active
                          ? "bg-brand-night text-white shadow-lg shadow-black/10"
                          : "text-black/50 hover:bg-white/60 hover:text-brand-night"
                      }`}
                    >
                      <Icon
                        size={17}
                        className={
                          active
                            ? "text-brand-orange"
                            : "text-black/30 group-hover:text-brand-orange"
                        }
                      />

                      {category.label}

                      {active && (
                        <span className="ml-auto hidden h-1.5 w-1.5 rounded-full bg-brand-orange lg:block" />
                      )}
                    </button>
                  );
                })}
              </nav>

              {/* Side decoration */}
              <div className="mt-10 hidden overflow-hidden rounded-2xl border border-black/10 bg-white/30 p-5 lg:block">
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-display text-4xl font-black text-brand-orange">
                    ?
                  </span>

                  <span className="h-2 w-2 rounded-full bg-brand-lagoon" />
                </div>

                <p className="text-sm font-semibold leading-6 text-black/50">
                  Can't find what you're looking for?
                </p>

                <Link
                  href="/contact"
                  className="mt-4 inline-flex items-center gap-1 text-sm font-bold"
                >
                  Ask us
                  <IconArrowUpRight size={14} />
                </Link>
              </div>
            </aside>

            {/* Accordion */}
            <div className="max-w-4xl">
              <div className="mb-6 flex items-center justify-between">
                <span className="text-sm font-bold text-black/40">
                  {String(filteredFaqs.length).padStart(2, "0")} questions
                </span>

                <span className="h-px flex-1 bg-black/10 ml-5" />
              </div>

              <div>
                {filteredFaqs.map((faq, index) => {
                  const isOpen = openIndex === index;

                  return (
                    <div
                      key={faq.question}
                      className={`border-b border-black/10 transition-colors duration-300 ${
                        isOpen ? "border-black/20" : ""
                      }`}
                    >
                      <button
                        onClick={() => setOpenIndex(isOpen ? null : index)}
                        className="group flex w-full items-center gap-5 py-6 text-left md:py-7"
                        aria-expanded={isOpen}
                      >
                        <span
                          className={`font-mono text-xs font-bold transition-colors duration-300 ${
                            isOpen ? "text-brand-orange" : "text-black/25"
                          }`}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <span
                          className={`flex-1 font-display text-lg font-extrabold tracking-tight transition-colors duration-300 md:text-xl ${
                            isOpen
                              ? "text-brand-night"
                              : "text-black/70 group-hover:text-brand-night"
                          }`}
                        >
                          {faq.question}
                        </span>

                        <span
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-500 ${
                            isOpen
                              ? "rotate-180 bg-brand-orange text-white"
                              : "bg-black/5 text-black/50 group-hover:bg-black/10"
                          }`}
                        >
                          <IconChevronDown size={18} />
                        </span>
                      </button>

                      <div
                        className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${
                          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <div className="pb-7 pl-10 pr-12 md:pl-14">
                            <p className="max-w-2xl text-base leading-8 text-black/55 md:text-lg">
                              {faq.answer}
                            </p>

                            {index === 0 && (
                              <div className="mt-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-brand-orange">
                                <span className="h-1.5 w-1.5 rounded-full bg-brand-orange" />
                                Go Outsyde
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="relative mt-24 overflow-hidden rounded-4xl bg-brand-night px-7 py-12 text-white md:px-12 md:py-16">
            <div className="pointer-events-none absolute inset-0 opacity-40">
              <div className="absolute inset-0 bg-pattern-grid" />
            </div>

            <div className="pointer-events-none absolute -right-20 -top-40 h-80 w-80 rounded-full bg-brand-orange/20 blur-3xl" />

            <div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
              <div>
                <span className="mb-4 block text-xs font-bold uppercase tracking-[0.2em] text-white/40">
                  One more thing
                </span>

                <h2 className="max-w-2xl font-display text-4xl font-black leading-tight tracking-tight md:text-6xl">
                  The city is out there.
                  <br />
                  <span className="text-brand-orange">Go find it.</span>
                </h2>
              </div>

              <Link
                href="/places"
                className="group flex w-fit items-center gap-3 rounded-xl bg-brand-orange px-6 py-4 font-bold text-white transition-all duration-500 hover:-translate-y-1 hover:bg-[#ff6d40] hover:shadow-[0_15px_40px_rgba(255,92,43,0.25)]"
              >
                Start exploring
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                  <IconArrowUpRight size={15} />
                </span>
              </Link>
            </div>
          </div>
        </div>
        {/* Marquee */}
        <div className="mt-16 overflow-hidden border-y border-black/10 py-5">
          <div className="flex w-max animate-marquee">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="flex items-center" aria-hidden={i === 1}>
                {[
                  "FIND YOUR VIBE",
                  "TOUCH GRASS",
                  "GO OUTSYDE",
                  "MAKE SOME PLANS",
                ].map((text) => (
                  <div
                    key={text}
                    className="flex items-center whitespace-nowrap"
                  >
                    <span className="mx-8 font-display text-xl font-black tracking-tight md:text-2xl">
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

export default FaqsIndex