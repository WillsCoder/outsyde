"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const STATS = [
  { target: 25, suffix: "+", decimals: 0, label: "Curated Lagos spots" },
  { target: 10, suffix: "+", decimals: 0, label: "Events every month" },
  { target: 1000, suffix: "+", decimals: 0, label: "Youth on the waitlist" },
  { target: 4.8, suffix: "", decimals: 1, label: "Average vibe rating" },
];

const STICKERS = [
  {
    emoji: "🌊",
    label: "Elegushi Beach",
    depth: 28,
    className: "left-[4%] top-[24%] hidden sm:block",
  },
  {
    emoji: "🍹",
    label: "VI Rooftops",
    depth: 18,
    className: "right-[5%] top-[18%] hidden sm:block",
  },
  {
    emoji: "🎨",
    label: "Yaba Art Nights",
    depth: 22,
    className: "left-[8%] bottom-[22%] hidden md:block",
  },
  {
    emoji: "🎶",
    label: "Afrobeats Live",
    depth: 14,
    className: "right-[7%] bottom-[26%] hidden md:block",
  },
  {
    emoji: "🍔",
    label: "Street Food Fairs",
    depth: 34,
    className: "left-[26%] top-[9%] hidden lg:block",
  },
  {
    emoji: "🏖️",
    label: "Tarkwa Bay",
    depth: 24,
    className: "right-[24%] top-[10%] hidden lg:block",
  },
];

const TICKER_ITEMS = [
  "We outside",
  "You coming?",
  "Lekki",
  "Victoria Island",
  "Yaba",
  "Ikoyi",
  "Ikeja",
  "Surulere",
];

const VALUES = [
  {
    icon: "🎯",
    title: "Curated, not scraped",
    text: "Every spot is hand-picked and verified by people who actually go out in Lagos. No empty listings, no stale data.",
  },
  {
    icon: "🌍",
    title: "Lagos first",
    text: "Depth over breadth. We win one city completely before touching the next — and Lagos is the heart of it all.",
  },
  {
    icon: "🗣️",
    title: "Community-driven",
    text: "Real ratings and comments from real people. The streets decide what's popping, not an algorithm.",
  },
  {
    icon: "⚡",
    title: "Youth energy",
    text: "Built for the 'we outside' generation. If it's not worth posting about, it's not on Outsyde.",
  },
];

const PHASES = [
  { n: "01", title: "Pre-MVP", done: true },
  { n: "02", title: "MVP Build", done: true },
  { n: "03", title: "Soft Launch", done: true },
  { n: "04", title: "V1 Launch", done: false },
];

const AboutIndex = () => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Respect reduced motion — skip everything
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // ── Hero: words slide up out of masks ──
      gsap.from(".hero-word", {
        yPercent: 120,
        duration: 1,
        ease: "power4.out",
        stagger: 0.1,
        delay: 0.15,
      });
      gsap.from(".hero-fade", {
        opacity: 0,
        y: 24,
        duration: 0.9,
        ease: "power3.out",
        delay: 0.7,
      });
      gsap.to(".scroll-hint", {
        y: 8,
        repeat: -1,
        yoyo: true,
        duration: 0.7,
        ease: "power1.inOut",
      });

      const els =
        container.current!.querySelectorAll<HTMLElement>("[data-reveal]");
      els.forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 44,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      // ── Stagger groups (cards, phases) ──
      const groups = container.current!.querySelectorAll<HTMLElement>(
        "[data-reveal-group]",
      );
      groups.forEach((group) => {
        gsap.from(group.children, {
          opacity: 0,
          y: 32,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: group, start: "top 85%" },
        });
      });

      // giant outline drifts up + fades as you scroll away
      gsap.to(".hero-outline", {
        yPercent: -30,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-outline",
          start: "top 40%",
          end: "bottom top",
          scrub: true,
        },
      });

      // stickers pop in, then float forever
      const stickers =
        container.current!.querySelectorAll<HTMLElement>(".hero-sticker");
      stickers.forEach((el, i) => {
        const inner = el.querySelector(".hero-sticker-inner")!;
        gsap.from(inner, {
          scale: 0,
          duration: 0.7,
          ease: "back.out(1.8)",
          delay: 1 + i * 0.1,
        });
        gsap.to(inner, {
          y: 12,
          duration: 2 + i * 0.3,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
          delay: 1.8 + i * 0.25,
        });
      });

      // mouse parallax (desktop only — no mousemove on touch)
      const quick = [...stickers].map((el) => ({
        depth: Number(el.dataset.depth || 20),
        x: gsap.quickTo(el, "x", { duration: 0.7, ease: "power3" }),
        y: gsap.quickTo(el, "y", { duration: 0.7, ease: "power3" }),
      }));
      const onMove = (e: MouseEvent) => {
        const dx = e.clientX - window.innerWidth / 2;
        const dy = e.clientY - window.innerHeight / 2;
        quick.forEach((q) => {
          q.x(dx / q.depth);
          q.y(dy / q.depth);
        });
      };

      // ── Count-up stats ──
      container
        .current!.querySelectorAll<HTMLElement>("[data-count]")
        .forEach((el) => {
          const target = Number(el.dataset.count);
          const decimals = Number(el.dataset.decimals || 0);
          const obj = { val: 0 };
          gsap.to(obj, {
            val: target,
            duration: 1.8,
            ease: "power2.out",
            onUpdate: () => {
              el.textContent = obj.val.toLocaleString("en-NG", {
                minimumFractionDigits: decimals,
                maximumFractionDigits: decimals,
              });
            },
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          });
        });

         window.addEventListener("mousemove", onMove);

         // cleanup for the listener (ScrollTriggers are handled by useGSAP)
         return () => window.removeEventListener("mousemove", onMove);
    },
    { scope: container },
  );

  return (
    <main
      ref={container}
      className="min-h-screen bg-brand-sand bg-pattern-dots"
    >
      {/* ── HERO ── */}
      <section className="relative flex min-h-[60dvh] lg:min-h-[92vh] bg-linear-to-b from-brand-sand via-transparent to-transparent items-center justify-center overflow-hidden">
        {/* texture layers */}
        <div className="grid-background" />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 left-1/2 h-72 w-2xl -translate-x-1/2 rounded-full bg-brand-orange/15 blur-3xl"
        />

        {/* giant outlined wordmark */}
        <div
          aria-hidden
          className="hero-outline pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none text-center"
        >
          <span
            className="font-display text-[19vw] font-extrabold leading-none tracking-tighter"
            style={{
              WebkitTextStroke: "2px rgb(17 17 16 / 0.09)",
              color: "transparent",
            }}
          >
            OUTSYDE
          </span>
        </div>

        {/* floating stickers (outer = mouse parallax, inner = float) */}
        {STICKERS.map((s) => (
          <div
            key={s.label}
            data-depth={s.depth}
            className={`hero-sticker absolute ${s.className}`}
          >
            <div className="hero-sticker-inner flex items-center gap-2 rounded-2xl border border-brand-night/10 bg-white px-4 py-2.5 shadow-md">
              <span className="text-lg">{s.emoji}</span>
              <span className="whitespace-nowrap font-display text-xs font-bold text-brand-night">
                {s.label}
              </span>
            </div>
          </div>
        ))}

        {/* center content */}
        <div className="relative z-10 text-center">
          <span className="hero-fade inline-flex rounded-full border border-brand-orange/30 bg-white px-4 py-1 text-xs font-semibold uppercase tracking-widest text-brand-orange">
            About Outsyde
          </span>
          <h1 className="mt-6 font-display text-6xl font-extrabold text-brand-night sm:text-8xl">
            <span className="inline-block overflow-hidden pb-2 align-bottom">
              <span className="hero-word inline-block">We</span>
            </span>{" "}
            <span className="inline-block overflow-hidden pb-2 align-bottom">
              <span className="hero-word inline-block text-brand-orange">
                outside.
              </span>
            </span>
          </h1>
          <p className="hero-fade mx-auto mt-6 max-w-xl text-base leading-relaxed text-brand-night/60 sm:text-lg">
            Outsyde is the lifestyle discovery platform for urban Africa —
            starting with Lagos. We help you find the spots, vibes, and events
            actually worth leaving your house for.
          </p>
        </div>

        {/* ticker */}
        <div className="absolute inset-x-0 bottom-0 border-t border-brand-night/10 bg-white/60 backdrop-blur">
          <div className="animate-marquee flex w-max py-3">
            {[0, 1].map((copy) => (
              <span
                key={copy}
                className="flex gap-8 pr-8 text-xs font-bold uppercase tracking-[0.3em] text-brand-night/50"
              >
                {TICKER_ITEMS.map((t) => (
                  <span key={t}>
                    {t} <span className="text-brand-orange">✦</span>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </section>
      {/* ── STORY ── */}
      <section className="section">
        <div className="box">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
            <h2
              data-reveal
              className="font-display text-3xl font-extrabold text-brand-night lg:sticky lg:top-28 lg:self-start"
            >
              Why we <span className="text-brand-orange">exist</span>
            </h2>
            <div className="space-y-6 text-sm leading-relaxed text-brand-night/70 sm:text-base">
              <p data-reveal>
                Lagos has no shortage of things to do — rooftops in VI, beach
                parties in Elegushi, gallery nights in Yaba, food fairs every
                other weekend. The problem was never supply. It&apos;s that
                discovery still runs on WhatsApp screenshots, Instagram stories
                that expire in 24 hours, and knowing somebody who knows
                somebody.
              </p>
              <p data-reveal>
                So we&apos;re building the place where it all lives. Every spot
                hand-curated, every event with the details that matter — time,
                cost, vibe, and whether it&apos;s actually worth your evening.
              </p>
              <p data-reveal>
                We&apos;re starting with one city and doing it properly. When
                Lagos is sorted, the rest of Africa is next.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* ── STATS ── */}
      <section className="box pb-6">
        <div
          data-reveal
          className="grid grid-cols-2 gap-8 rounded-3xl bg-brand-night px-8 py-12 sm:py-14 lg:grid-cols-4"
        >
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-display text-4xl font-extrabold text-brand-orange sm:text-5xl">
                <span data-count={s.target} data-decimals={s.decimals}>
                  0
                </span>
                {s.suffix}
              </p>
              <p className="mt-2 text-xs uppercase tracking-widest text-brand-sand/50">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>
      {/* ── MISSION ── */}
      <section className="section">
        <div className="box">
          <div
            data-reveal
            className="bg-pattern-dots relative overflow-hidden rounded-3xl bg-brand-orange px-6 py-16 text-center sm:px-12"
          >
            <h2 className="mx-auto max-w-3xl font-display text-3xl font-extrabold leading-tight text-brand-night sm:text-4xl">
              &ldquo;Become the #1 lifestyle discovery platform for urban youth
              in Africa — helping people go out, vibe, and live.&rdquo;
            </h2>
            <p className="mt-6 text-sm font-semibold uppercase tracking-widest text-brand-night/60">
              The Outsyde vision
            </p>
          </div>
        </div>
      </section>
      {/* ── VALUES ── */}
      <section className="section">
        <div className="box">
          <h2
            data-reveal
            className="font-display text-3xl font-extrabold text-brand-night"
          >
            How we <span className="text-brand-orange">move</span>
          </h2>
          <div data-reveal-group className="mt-8 grid gap-5 sm:grid-cols-2">
            {VALUES.map((v) => (
              <div
                key={v.title}
                className="rounded-2xl border border-brand-night/10 bg-white p-6 transition-shadow hover:shadow-lg"
              >
                <span className="text-3xl">{v.icon}</span>
                <h3 className="mt-4 font-display text-lg font-bold text-brand-night">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-night/60">
                  {v.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ── ROADMAP ── */}
      <section className="section">
        <div className="box">
          <h2
            data-reveal
            className="font-display text-3xl font-extrabold text-brand-night"
          >
            Where we <span className="text-brand-orange">are</span>
          </h2>
          <div
            data-reveal-group
            className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {PHASES.map((p) => (
              <div
                key={p.n}
                className={`rounded-2xl border p-6 ${
                  p.done
                    ? "border-brand-lagoon/30 bg-brand-lagoon/10"
                    : "border-brand-night/10 bg-white"
                }`}
              >
                <p
                  className={`font-display text-sm font-extrabold ${
                    p.done ? "text-brand-lagoon" : "text-brand-night/30"
                  }`}
                >
                  {p.n}
                </p>
                <p className="mt-2 font-display text-base font-bold text-brand-night">
                  {p.title}
                </p>
                <p
                  className={`mt-1 text-xs font-semibold ${p.done ? "text-brand-lagoon" : "text-brand-night/40"}`}
                >
                  {p.done ? "✓ Done" : "In progress"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ── CTA ── */}
      <section className="section text-center">
        <div className="box">
          <h2
            data-reveal
            className="font-display text-4xl font-extrabold text-brand-night sm:text-5xl"
          >
            Come outside <span className="text-brand-orange">with us.</span>
          </h2>
          <div
            data-reveal
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Link
              href="/#waitlist"
              className="inline-flex h-12 items-center rounded-full bg-brand-orange px-8 text-sm font-bold text-brand-night transition-transform hover:scale-105 active:scale-95"
            >
              Join the waitlist
            </Link>
            <Link
              href="/events"
              className="inline-flex h-12 items-center rounded-full border border-brand-night/15 px-8 text-sm font-bold text-brand-night transition-colors hover:border-brand-orange hover:text-brand-orange"
            >
              See what&apos;s on
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default AboutIndex
