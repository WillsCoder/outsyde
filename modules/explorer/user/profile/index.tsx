"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Profile } from "@/lib/const/types/profile";
import { Avatar, Button } from "@/components/ui";
import { IconCamera, IconEditCircle } from "@tabler/icons-react";
import { format } from "date-fns";
import ProfileView from "./components/profile-view";
import ProfileForm from "./components/profile-form";

interface Props {
  user: Profile;
}
const ProfileIndex = ({ user }: Props) => {
  const [viewState, setViewState] = useState<"view" | "update">("view");

  return (
    <div className="section">
      <div className="box">
        {/* Profile header */}
        <section className="overflow-hidden rounded-4xl border border-brand-night/5 bg-white shadow-sm">
          {/* Cover */}
          <div className="relative h-32 bg-brand-night sm:h-44">
            <div className="absolute inset-0 bg-linear-to-br from-brand-night via-brand-night to-brand-orange/80" />

            <div className="absolute -right-20 -top-32 h-72 w-72 rounded-full bg-brand-gold/20 blur-3xl" />
            <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-brand-lagoon/20 blur-3xl" />
          </div>

          {/* Profile header */}
          <div className="relative px-5 pb-6 sm:px-8">
            {/* Avatar */}
            <div className="-mt-14 flex items-end justify-between sm:-mt-16">
              <div className="relative">
                <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-[1.75rem] border-4 border-white bg-brand-sand shadow-md sm:h-32 sm:w-32">
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={user.name ?? "Profile"}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="font-display text-4xl font-bold text-brand-night">
                      {(
                        user.firstName?.[0] ??
                        user.name?.[0] ??
                        "?"
                      ).toUpperCase()}
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  className="absolute -top-1.5 -left-1.5 w-7 h-7 bg-white border border-brand-night/12 rounded-full flex items-center justify-center text-brand-night/60 hover:text-brand-night transition-colors shadow-sm"
                >
                  <IconCamera size={13} />
                </button>

                {user.isProfilePublic && (
                  <span className="absolute bottom-2 right-2 h-4 w-4 rounded-full border-2 border-white bg-brand-lagoon" />
                )}
              </div>

              <Button
                variant="secondary"
                onClick={() =>
                  viewState === "view"
                    ? setViewState("update")
                    : setViewState("view")
                }
              >
                {viewState === "update"? "Close Edit" : "Edit Profile"}
              </Button>
            </div>

            {/* Identity */}
            <div className="mt-4">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <h1 className="font-display text-2xl font-bold tracking-tight text-brand-night sm:text-3xl">
                  {user.name ||
                    [user.firstName, user.lastName].filter(Boolean).join(" ")}
                </h1>

                {user.isProfilePublic && (
                  <span className="rounded-full bg-brand-lagoon/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-lagoon">
                    Public
                  </span>
                )}
              </div>

              {user.username && (
                <p className="mt-1 text-sm font-medium text-brand-night/40">
                  @{user.username}
                </p>
              )}

              {user.bio && (
                <p className="mt-4 max-w-2xl text-sm leading-6 text-brand-night/65 sm:text-base">
                  {user.bio}
                </p>
              )}
            </div>

            {/* Stats */}
            <div className="mt-6 flex max-w-md items-center rounded-2xl border border-brand-night/5 bg-brand-sand/50 py-4">
              {[
                { n: user._count.ratings, label: "Reviews" },
                { n: user._count.comments, label: "Comments" },
                { n: user._count.linkUpsCreated, label: "Link Ups" },
              ].map((stat, index) => (
                <div
                  key={stat.label}
                  className={`flex-1 text-center ${
                    index !== 0 ? "border-l border-brand-night/10" : ""
                  }`}
                >
                  <p className="font-display text-lg font-bold text-brand-night">
                    {stat.n}
                  </p>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-brand-night/40">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* Profile views */}
        <div className="pt-5">
          {viewState === "view" && <ProfileView user={user} />}
          {viewState === "update" && <ProfileForm user={user} />}
        </div>
      </div>
    </div>
  );
};

export default ProfileIndex;
