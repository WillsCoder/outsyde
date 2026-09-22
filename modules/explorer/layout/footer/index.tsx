import Image from "next/image";
import React from "react";

const exploreLinks = [
  { label: "Places", href: "/places" },
  { label: "Events", href: "/events" },
  { label: "Categories", href: "/places" },
  { label: "Submit a spot", href: "#" },
];

const companyLinks = [
  { label: "About", href: "#" },
  { label: "For venues", href: "#" },
  { label: "Careers", href: "#" },
  { label: "Contact", href: "mailto:hello@outsyde.ng" },
];

const supportLinks = [
  { label: "FAQs", href: "#" },
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
    <footer className="relative overflow-hidden bg-brand-sand text-brand-night">
      {/* watermark */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 select-none whitespace-nowrap font-display text-[22vw] font-extrabold leading-none tracking-tight text-brand-night/4"
      >
        OUTSYDE
      </div>

      <div className="section relative z-10">
        <div className="box">
          <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
            {/* brand column */}
            <div>
              <div className="flex items-end">
                <Image
                  src="/logo.png"
                  alt="Outsyde Logo"
                  width={500}
                  height={500}
                  className="w-10 md:w-12"
                />
                <span className="text-lg md:text-xl font-display font-bold tracking-tight">
                  <span className="text-brand-orange">ut</span>syde
                </span>
              </div>
              <p className="mt-3 max-w-xs leading-relaxed text-brand-night">
                We outside, you coming? Discover the best spots, vibes, and
                events in Lagos — curated for the streets.
              </p>
              <div className="mt-6 flex gap-1 lg:gap-3">
                {socials.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-brand-night/70 transition-colors hover:border-brand-orange hover:bg-brand-orange hover:text-brand-night"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* link columns */}
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
              {[
                { title: "Explore", links: exploreLinks },
                { title: "Company", links: companyLinks },
                { title: "Support", links: supportLinks },
              ].map((col) => (
                <div key={col.title}>
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-brand-orange">
                    {col.title}
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {col.links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className="text-sm text-brand-night/70 transition-colors hover:text-brand-night"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* bottom bar */}
          <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
            <p className="text-xs text-brand-night/50">
              © {new Date().getFullYear()} Outsyde. Made in Lagos 🇳🇬
            </p>
            <p className="text-xs text-brand-night/50">
              We outside<span className="text-brand-orange">.</span>
            </p>
            <a
              href="#top"
              className="text-xs font-semibold uppercase tracking-widest text-brand-night/60 transition-colors hover:text-brand-orange"
            >
              Back to top ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
