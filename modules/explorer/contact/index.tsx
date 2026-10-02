
import {
  IconArrowUpRight,
  IconMail,
  IconMapPin,
  IconPhone,
  IconSend,
} from "@tabler/icons-react";
import ContactForm from "./components/contact-form";

const contactDetails = [
  {
    icon: IconMail,
    label: "Email",
    value: "hello@outsyde.org",
    href: "mailto:hello@outsyde.org",
    color: "orange",
  },
  {
    icon: IconPhone,
    label: "Phone",
    value: "+234 806 860 0041",
    href: "tel:+2348068600041",
    color: "gold",
  },
  {
    icon: IconMapPin,
    label: "Visit us",
    value: "Lagos, Nigeria",
    href: "#location",
    color: "lagoon",
  },
];

const ContactIndex = () => {

  return (
    <main className="relative min-h-screen overflow-hidden bg-brand-sand text-brand-night">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-brand-orange/10 blur-3xl animate-float-slow" />
        <div className="absolute -right-30 top-[30%] h-96 w-96 rounded-full bg-brand-lagoon/10 blur-3xl animate-float-reverse" />
        <div className="absolute -bottom-25 left-[35%] h-80 w-80 rounded-full bg-brand-gold/10 blur-3xl animate-pulse-soft" />
      </div>

      {/* Grid */}
      <div className="grid-wrapper absolute inset-0 pointer-events-none">
        <div className="grid-background" />
      </div>

      <section className="section relative">
        <div className="box">
          {/* Header */}
          <div className="grid items-end gap-10 lg:grid-cols-[1fr_420px]">
            <div>
              <div className="mb-7 flex items-center gap-3 animate-fade-up">
                <span className="h-2.5 w-2.5 rounded-full bg-brand-orange animate-pulse" />
                <span className="text-sm font-bold uppercase tracking-[0.22em]">
                  Get in touch
                </span>
              </div>

              <h1 className="max-w-4xl font-display text-[clamp(4rem,10vw,9rem)] font-black leading-[0.84] tracking-[-0.07em] animate-fade-up [animation-delay:100ms]">
                Let&apos;s
                <br />
                <span className="relative inline-block text-brand-orange">
                  talk
                  <svg
                    className="absolute -bottom-4 left-0 w-full"
                    viewBox="0 0 300 25"
                    fill="none"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M3 17C73 4 205 4 297 14"
                      stroke="#F5A623"
                      strokeWidth="7"
                      strokeLinecap="round"
                      className="animate-draw-line"
                    />
                  </svg>
                </span>
                <span>.</span>
              </h1>
            </div>

            <div className="animate-fade-up [animation-delay:200ms] lg:pb-3">
              <p className="max-w-lg text-base leading-8 text-black/60 md:text-lg">
                We&apos;re building the place where Nigeria&apos;s best spots,
                events, and experiences live — and we&apos;re always looking for
                people, places, and ideas to add to the mix.
              </p>
            </div>
          </div>

          {/* Main content */}
          <div className="mt-20 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            {/* Left */}
            <div className="relative">
              {/* Decorative number */}
              <div className="absolute -left-4 -top-10 hidden font-display text-[11rem] font-black leading-none text-black/[0.035] lg:block">
                01
              </div>

              <div className="relative">
                <p className="mb-8 max-w-md text-2xl font-semibold leading-tight tracking-tight">
                  Tell us what you&apos;ve got. Whether it&apos;s a hidden gem
                  in Yaba, an event coming up, or an idea for making Outsyde
                  better — we&apos;re listening.
                </p>

                <div className="space-y-3">
                  {contactDetails.map((item, index) => {
                    const Icon = item.icon;

                    return (
                      <a
                        key={item.label}
                        href={item.href}
                        className="group flex items-center gap-4 rounded-2xl border border-black/10 bg-white/40 p-4 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-black/20 hover:bg-white/80 hover:shadow-[0_15px_40px_rgba(17,17,16,0.08)] animate-fade-up"
                        style={{
                          animationDelay: `${300 + index * 100}ms`,
                        }}
                      >
                        <span
                          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                            item.color === "orange"
                              ? "bg-brand-orange text-white"
                              : item.color === "gold"
                                ? "bg-brand-gold text-brand-night"
                                : "bg-brand-lagoon text-white"
                          } transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110`}
                        >
                          <Icon size={20} />
                        </span>

                        <span className="min-w-0">
                          <span className="block text-xs font-bold uppercase tracking-[0.18em] text-black/40">
                            {item.label}
                          </span>
                          <span className="mt-1 block truncate font-bold">
                            {item.value}
                          </span>
                        </span>

                        <IconArrowUpRight
                          size={19}
                          className="ml-auto shrink-0 text-black/30 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-brand-orange"
                        />
                      </a>
                    );
                  })}
                </div>

                {/* Availability badge */}
                <div className="mt-8 flex items-center gap-3 text-sm text-black/50">
                  <span className="relative flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-lagoon opacity-50" />
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-brand-lagoon" />
                  </span>
                  Usually responds within 1 business day
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="relative animate-fade-up [animation-delay:300ms]">
              <div className="absolute -inset-1 rounded-4xl bg-linear-to-br from-brand-orange/20 via-transparent to-brand-lagoon/20 opacity-70 blur-xl" />

              <div className="relative overflow-hidden rounded-4xl border border-black/10 bg-brand-night p-6 text-white shadow-2xl shadow-black/10 md:p-10">
                {/* Form pattern */}
                <div className="pointer-events-none absolute inset-0 opacity-40">
                  <div className="absolute inset-0 bg-pattern-grid opacity-40" />
                </div>

                {/* Orange glow */}
                <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-brand-orange/20 blur-3xl" />

                <div className="relative">
                  <div className="mb-10 flex items-start justify-between">
                    <div>
                      <span className="mb-3 block text-xs font-bold uppercase tracking-[0.2em] text-white/40">
                        Start a conversation
                      </span>

                      <h2 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">
                        Send us a message.
                      </h2>
                    </div>

                    <div className="hidden h-12 w-12 rotate-6 items-center justify-center rounded-xl bg-brand-orange sm:flex">
                      <IconSend size={20} />
                    </div>
                  </div>

                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Bottom marquee */}
        <div className="mt-20 overflow-hidden border-y border-black/10 py-5">
          <div className="flex w-max animate-marquee">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="flex items-center" aria-hidden={i === 1}>
                {[
                  "LET'S CREATE",
                  "SAY HELLO",
                  "START SOMETHING",
                  "MAKE IT HAPPEN",
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
};

export default ContactIndex;

