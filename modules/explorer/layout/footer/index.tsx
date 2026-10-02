import React from "react";
import Image from "next/image";
import Link from "next/link";

const exploreLinks = [
  { label: "Places", href: "/places" },
  { label: "Events", href: "/events" },
  { label: "Categories", href: "/places" },
  { label: "Blog", href: "/blog" },
];

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "For venues", href: "/venues" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

const supportLinks = [
  { label: "FAQs", href: "/faqs" },
  { label: "Privacy policy", href: "#" },
  { label: "Terms of use", href: "#" },
];

const socials = [
  {
    name: "Instagram",
    href: "https://instagram.com/outsyde.ng",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    href: "https://tiktok.com/@outsyde.ng",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.5z" />
      </svg>
    ),
  },
  {
    name: "X",
    href: "https://x.com/outsyde_ng",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/2340000000000",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
      </svg>
    ),
  },
];

const Footer = () => {
  return (
    <footer
      id="footer"
      className="relative overflow-hidden bg-brand-gold/10 text-brand-night"
    >
      {/* oversized background wordmark */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[-5vw] left-1/2 -translate-x-1/2 select-none whitespace-nowrap font-display text-[28vw] font-black leading-none tracking-[-0.08em] text-brand-night/[0.035]"
      >
        OUTSYDE
      </div>

      {/* orange accent */}
      <div
        aria-hidden
        className="absolute right-0 top-0 h-40 w-40 translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-orange/10 blur-3xl"
      />

      <div aria-hidden className="grid-background z-10 w-full h-full" />

      <div className="section relative z-10 ">
        <div className="box">
          {/* top statement */}
          <div className="pb-6 md:pb-16">
            <div className="max-w-5xl">
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-brand-orange">
                📍 Nigeria
              </p>

              <h2 className="max-w-4xl font-display text-5xl font-black leading-[0.9] tracking-[-0.04em] sm:text-6xl md:text-8xl">
                WE OUTSIDE.
                <span className="text-brand-orange"> YOU COMING?</span>
              </h2>
            </div>
          </div>

          {/* main footer content */}
          <div className="grid gap-12 py-12 md:grid-cols-[1.2fr_2fr] md:py-16 lg:gap-24">
            {/* brand */}
            <div className="flex flex-col justify-between">
              <div>
                <Link href="/" className="inline-flex items-center gap-2">
                  <Image
                    src="/logo.png"
                    alt="Outsyde Logo"
                    width={500}
                    height={500}
                    className="w-11 md:w-14"
                  />

                  <span className="font-display text-2xl font-black tracking-tight md:text-2xl">
                    <span className="text-brand-orange">ut</span>syde
                  </span>
                </Link>

                <p className="mt-5 max-w-xs text-sm leading-relaxed text-brand-night/60">
                  Your guide to Nigeria after dark, under the sun, and
                  everywhere worth being.
                </p>
              </div>

              {/* socials */}
              <div className="mt-8 flex gap-2">
                {socials.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                    className="group flex h-11 w-11 items-center justify-center rounded-full border border-brand-night/10 bg-brand-sand transition-all duration-200 hover:-translate-y-1 hover:border-brand-orange hover:bg-brand-orange"
                  >
                    <span className="text-brand-night/70 transition-colors group-hover:text-brand-night">
                      {s.icon}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* links */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3">
              {[
                { title: "Explore", links: exploreLinks },
                { title: "Company", links: companyLinks },
                { title: "Support", links: supportLinks },
              ].map((col) => (
                <div key={col.title}>
                  <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-orange">
                    {col.title}
                  </h3>

                  <ul className="mt-5 space-y-3">
                    {col.links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className="group inline-flex items-center gap-1 text-sm text-brand-night/60 transition-colors hover:text-brand-night"
                        >
                          <span>{link.label}</span>
                          <span className="translate-y-px opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100">
                            ↗
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* bottom bar */}
          <div className="flex flex-col gap-5 border-t border-brand-night/10 py-6 text-xs text-brand-night/45 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} Outsyde. Made in Nigeria 🇳🇬</p>

            <p className="font-medium">
              We outside<span className="text-brand-orange">.</span>
            </p>

            <a
              href="#top"
              className="group font-semibold uppercase tracking-[0.15em] transition-colors hover:text-brand-orange"
            >
              Back to top
              <span className="ml-2 inline-block transition-transform group-hover:-translate-y-1">
                ↑
              </span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
