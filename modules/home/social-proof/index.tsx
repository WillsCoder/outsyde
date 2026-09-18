import React from "react";
import { Tag } from "@/components/ui";

type Testimonial = {
  name: string;
  initials: string;
  avatarColor: string;
  location: string;
  rating: number;
  text: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Tunde A.",
    initials: "TA",
    avatarColor: "bg-brand-orange",
    location: "UNILAG",
    rating: 5,
    text: "Found a rooftop in VI I didn't even know existed. We outside fr fr 🔥",
  },
  {
    name: "Amara O.",
    initials: "AO",
    avatarColor: "bg-brand-gold",
    location: "Victoria Island",
    rating: 5,
    text: "Finally one app that actually knows what's popping in Lagos. No more 'where we dey go?' for 2 hours.",
  },
  {
    name: "Chidi E.",
    initials: "CE",
    avatarColor: "bg-brand-lagoon",
    location: "Lekki",
    rating: 4,
    text: "The cost level filter is lowkey genius. I know if my pocket can handle a spot before I even enter.",
  },
  {
    name: "Funke B.",
    initials: "FB",
    avatarColor: "bg-brand-orange",
    location: "Yaba",
    rating: 5,
    text: "Planned my whole birthday crawl with this. 4 spots, zero wahala. 10/10.",
  },
  {
    name: "Seyi K.",
    initials: "SK",
    avatarColor: "bg-brand-gold",
    location: "Ikoyi",
    rating: 5,
    text: "The events page is where it's at. Bought tickets to an art show I would never have heard about otherwise.",
  },
  {
    name: "Zainab M.",
    initials: "ZM",
    avatarColor: "bg-brand-lagoon",
    location: "LASU",
    rating: 4,
    text: "Campus ambassador era loading... my whole school needs this app fr.",
  },
];

const stats = [
  { value: "25+", label: "Curated Lagos spots" },
  { value: "10+", label: "Events this month" },
  { value: "1k+", label: "Youth on the waitlist" },
  { value: "4.8", label: "Average vibe rating" },
];

const Star = ({ filled }: { filled: boolean }) => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const TestimonialCard = ({
  name,
  initials,
  avatarColor,
  location,
  rating,
  text,
}: Testimonial) => (
  <figure className="w-[280px] shrink-0 rounded-2xl border border-brand-night/10 bg-white p-5 shadow-sm sm:w-[320px]">
    <div className="flex items-center gap-3">
      <span
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-brand-night ${avatarColor}`}
      >
        {initials}
      </span>
      <div className="min-w-0">
        <figcaption className="truncate text-sm font-semibold text-brand-night">
          {name}
        </figcaption>
        <span className="text-xs text-brand-night/50">{location}</span>
      </div>
      <div className="ml-auto flex gap-0.5 text-brand-gold">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} filled={i < rating} />
        ))}
      </div>
    </div>
    <blockquote className="mt-4 text-sm leading-relaxed text-brand-night/70">
      &ldquo;{text}&rdquo;
    </blockquote>
  </figure>
);

const SocialProof = () => {
  return (
    <section className="section relative overflow-hidden bg-white/50 bg-pattern-dots text-brand-night">
      {/* glow accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[40rem] -translate-x-1/2 rounded-full bg-brand-orange/10 blur-3xl"
      />

      {/* header */}
      <div className="box relative">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center">
            <Tag text="Word on the street" />
          </div>
          <h2 className="mt-4 font-display text-3xl font-extrabold sm:text-4xl lg:text-5xl">
            Lagos is already <span className="text-brand-orange">outside</span>
          </h2>
          <p className="mt-3 text-sm text-brand-night/60 sm:text-base">
            Real people. Real spots. Real vibes. Here&apos;s what the streets
            are saying.
          </p>
        </div>
      </div>

      {/* testimonial marquee */}
      <div className="relative mt-12 overflow-hidden">
        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-brand-sand to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-brand-sand to-transparent" />

        <div className="animate-marquee flex w-max gap-5 px-4">
          {[...testimonials, ...testimonials].map((t, i) => (
            <TestimonialCard key={`${t.name}-${i}`} {...t} />
          ))}
        </div>
      </div>

      {/* stats */}
      <div className="box relative mt-14">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-brand-night/10 bg-brand-night/10 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-white px-6 py-8 text-center">
              <div className="font-display text-3xl font-extrabold text-brand-orange sm:text-4xl">
                {s.value}
              </div>
              <div className="mt-1 text-[11px] uppercase tracking-widest text-brand-night/50 sm:text-xs">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
