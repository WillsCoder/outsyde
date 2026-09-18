"use client";

import React, { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

const Waitlist = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || status === "loading") return;

    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      setMessage(data.message);
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
      setMessage("Network error. Check your connection and try again.");
    }
  };

  return (
    <section className="section bg-white/50 bg-pattern-dots">
      <div className="box">
        <div className="relative w-full overflow-hidden rounded-3xl bg-brand-orange/50 px-6 py-12 text-center sm:px-12 sm:py-16">
          {/* decorative rings */}
          <div
            aria-hidden
            className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full border-[24px] border-white/10"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-20 -right-12 h-56 w-56 rounded-full bg-brand-night/10 blur-2xl"
          />

          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-night px-4 py-1 text-xs font-semibold uppercase tracking-widest text-brand-sand">
              Launching soon · Lagos first
            </span>

            <h2 className="mt-5 font-display text-3xl font-extrabold text-brand-night sm:text-4xl lg:text-5xl">
              Be first outside.
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm font-medium text-brand-night/70 sm:text-base">
              Join the waitlist and get early access to spots, events, and the
              drop before anybody else.
            </p>

            {status === "success" ? (
              <div className="mx-auto mt-8 max-w-md rounded-2xl bg-white/95 px-6 py-6">
                <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-brand-lagoon text-white">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <path
                      d="M5 13l4 4L19 7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <p className="mt-3 font-display text-lg font-bold text-brand-night">
                  You&apos;re on the list 🎉
                </p>
                <p className="mt-1 text-sm text-brand-night/60">{message}</p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 rounded-full bg-white p-5 text-sm text-brand-night outline-none ring-brand-night/20 transition placeholder:text-brand-night/40 focus:ring-2"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="h-12 shrink-0 rounded-full bg-brand-night px-7 text-sm font-bold text-brand-sand transition-transform duration-200 hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {status === "loading" ? "Joining..." : "Notify me"}
                </button>
              </form>
            )}

            {status === "error" && (
              <p className="mt-3 text-sm font-semibold text-brand-night">
                {message}
              </p>
            )}

            <p className="mt-4 text-xs text-brand-night/50">
              No spam. Just vibes and launch updates.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Waitlist;
