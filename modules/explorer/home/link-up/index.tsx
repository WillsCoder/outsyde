import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { Tag } from "@/components/ui";
import {
  IconMapPin,
  IconArrowRight,
  IconPlus,
} from "@tabler/icons-react";
import { LinkUps } from "@/data/linkups";

const LinkUpSection = () => {
  const linkUps = LinkUps;

  const totalThisWeek = 24;
  const openCount = 12;

  return (
    <section className="section relative overflow-hidden">
      {/* Ambient blob */}
      <div className="absolute inset-0 z-0 bg-brand-orange/10 rounded-br-full lg:w-7/12 aspect-square" />
      <div className="absolute right-0 bottom-0 z-10 bg-brand-gold/10 rounded-tl-full lg:w-9/12 aspect-square" />

      <div className="box relative z-10">
        <div className="flex items-end justify-between mb-8">
          <div>
            <Tag text="New feature" />
            <h2 className="pt-3 text-4xl font-semibold lg:text-6xl font-display tracking-tight text-brand-night">
              Go out with
              <br className="hidden lg:block" />
              <span className="text-brand-orange">{" "}someone new</span>
            </h2>
            <p className="mt-3 text-sm lg:text-base text-brand-night/70 max-w-md">
              Create a Link Up at any place or event. Find people with the same
              plans and vibe together.
            </p>
          </div>
          <Link
            href="/linkups"
            className="hidden md:flex items-center gap-2 text-sm font-medium text-brand-orange hover:gap-3 transition-all"
          >
            See all Link Ups <IconArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Live Link Ups */}
          <div className="bg-white border border-brand-night/8 rounded-2xl p-3 md:p-5 lg:row-span-2">
            <p className="text-[11px] font-semibold tracking-widest uppercase text-brand-night/40 mb-4">
              Open link ups near you
            </p>

            <div className="flex flex-col gap-3">
              {linkUps.map((lu) => {
                const joinedCount = lu.members.length
                const totalPeople = joinedCount + 1; // creator
                const spotsLeft = lu.maxSize - totalPeople;
                const isFull = spotsLeft <= 0;

                return (
                  <div
                    key={lu.id}
                    className="border border-brand-night/7 rounded-2xl p-2 md:p-5 hover:border-brand-orange/30 hover:shadow-sm transition-all"
                  >
                    {/* Top row */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-semibold uppercase tracking-wider bg-brand-lagoon/10 text-brand-lagoon rounded-full px-2.5 py-1">
                          {lu.category}
                        </span>

                        <span className="text-[10px] font-medium text-brand-night/40">
                          {lu.vibe}
                        </span>
                      </div>

                      <span className="hidden md:inline-block text-xs text-brand-night/40">
                        {formatDistanceToNow(lu.date, { addSuffix: true })}
                      </span>
                    </div>

                    {/* Title */}
                    <div className="flex gap-2 items-center">
                      <p className="text-base font-semibold text-brand-night mb-1">
                        {lu.title}
                      </p>
                      <div className="hidden md:flex items-center gap-2 text-xs text-brand-night/55">
                        <IconMapPin size={13} className="text-brand-orange" />
                        <span>{lu.location}</span>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-brand-night/55">
                        <span className="text-brand-orange">◷</span>
                        <span className="whitespace-nowrap">{lu.time}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs leading-relaxed text-brand-night/45 mb-4">
                      {lu.description}
                    </p>

                    {/* People */}
                    <div className="border-t border-brand-night/6 pt-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[10px] uppercase tracking-wider font-semibold text-brand-night/35 mb-2">
                            Going
                          </p>

                          <div className="flex items-center">
                            {/* Creator */}
                            <div className="flex -space-x-2">
                              <div
                                className="w-8 h-8 rounded-full border-2 border-white bg-brand-orange flex items-center justify-center text-white text-[10px] font-bold"
                                title={lu.creator.name ?? ""}
                              >
                                {lu.creator.name?.charAt(0)}
                              </div>

                              {/* Joined users */}
                              {lu.members.slice(0, 4).map((user) => (
                                <div
                                  key={user.id}
                                  className="w-8 h-8 rounded-full border-2 border-white bg-brand-night/10 flex items-center justify-center text-brand-night text-[10px] font-bold"
                                  title={user.name}
                                >
                                  {user.name.charAt(0)}
                                </div>
                              ))}
                            </div>

                            <span className="ml-3 whitespace-nowrap text-xs text-brand-night/50">
                              {totalPeople}{" "}
                              {totalPeople === 1 ? "person" : "people"} going
                            </span>
                          </div>
                        </div>

                        {/* Spots */}
                        <div className="hidden md:block text-right">
                          <p className="text-[10px] uppercase tracking-wider font-semibold text-brand-night/35 mb-1">
                            Spots
                          </p>

                          <p
                            className={`text-xs font-semibold ${
                              isFull
                                ? "text-brand-gold"
                                : spotsLeft === 1
                                  ? "text-brand-orange"
                                  : "text-brand-lagoon"
                            }`}
                          >
                            {isFull
                              ? "Full"
                              : `${spotsLeft} ${spotsLeft === 1 ? "spot" : "spots"} left`}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Stats card */}
          <div className="bg-brand-night rounded-2xl p-6">
            <p className="text-[11px] font-semibold tracking-widest uppercase text-white/30 mb-5">
              This week in Lagos
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  n: openCount,
                  label: "Link Ups",
                  sub: "open right now",
                  color: "text-brand-orange",
                },
                {
                  n: totalThisWeek,
                  label: "People",
                  sub: "linked up this week",
                  color: "text-brand-lagoon",
                },
              ].map((s) => (
                <div key={s.label}>
                  <p className={`text-4xl font-bold ${s.color}`}>{s.n}</p>
                  <p className="text-sm text-white/60 mt-1">{s.label}</p>
                  <p className="text-xs text-white/30 mt-0.5">{s.sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Create CTA card */}
          <div className="bg-brand-orange rounded-2xl p-6 flex flex-col justify-between min-h-50">
            <div>
              <h3 className="text-xl font-bold text-white tracking-tight mb-2">
                Create your own Link Up
              </h3>
              <p className="text-sm text-white/70 mb-5 leading-relaxed">
                Pick a spot or event, set a time, and let others join your
                plans.
              </p>
              <div className="flex flex-col gap-2.5">
                {[
                  {
                    n: "1",
                    title: "Pick a place or event",
                    sub: "Anywhere on Outsyde",
                  },
                  {
                    n: "2",
                    title: "Set your plans",
                    sub: "Date, time, group size",
                  },
                  {
                    n: "3",
                    title: "Accept requests",
                    sub: "You decide who joins",
                  },
                ].map((s) => (
                  <div key={s.n} className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-white/15 flex items-center justify-center text-[10px] font-bold text-white shrink-0 mt-0.5">
                      {s.n}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-white">
                        {s.title}
                      </p>
                      <p className="text-xs text-white/50">{s.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <Link
              href="/places"
              className="inline-flex items-center gap-2 text-sm font-medium bg-white text-brand-night rounded-full px-5 py-2.5 hover:opacity-90 transition-opacity mt-5 w-fit"
            >
              <IconPlus size={14} /> Create a Link Up
            </Link>
          </div>
        </div>

        <Link
          href="/linkups"
          className="md:hidden flex items-center justify-center gap-2 text-sm font-medium text-brand-orange mt-6"
        >
          See all Link Ups <IconArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
};

export default LinkUpSection;
