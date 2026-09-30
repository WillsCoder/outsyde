"use client";
import React, { useState } from "react";
import {
  LINKUP_STATUS_LABELS,
  LinkUpWithRelations,
  UserSocials,
} from "@/lib/const/types/link-up";
import Link from "next/link";
import { IconAlertCircle, IconPlus, IconUsers } from "@tabler/icons-react";
import { LinkUpCard } from "./components/link-up-card";

interface Props {
  linkUps: LinkUpWithRelations[];
  userSocials: UserSocials;
}
const LinkupIndex = ({ linkUps, userSocials }: Props) => {
  const [filter, setFilter] = useState<"all" | "OPEN" | "CLOSED" | "FULL">(
    "all",
  );
  const hasSocials = Object.values(userSocials).some(Boolean);

  const filtered =
    filter === "all" ? linkUps : linkUps.filter((l) => l.status === filter);

  const totalPending = linkUps.reduce(
    (acc, l) => acc + l.requests.filter((r) => r.status === "PENDING").length,
    0,
  );

  return (
    <div className="section pt-4">
      <div className="box">
        <div className="flex flex-col gap-6">
          {/* Cover */}
          <div className="relative h-32 bg-brand-night sm:h-44 rounded-2xl">
            <div className="absolute rounded-2xl inset-0 bg-linear-to-br from-brand-night via-brand-night to-brand-orange/80" />

            <div className="absolute -right-20 -top-32 h-72 w-72 rounded-full bg-brand-gold/20 blur-3xl" />
            <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-brand-lagoon/20 blur-3xl" />
            {/* Header */}
            <div className="h-full p-5 flex items-center justify-between relative text-brand-sand">
              <div>
                <h1 className="text-2xl font-bold text-brand-sand tracking-tight">
                  My Link Ups
                </h1>
                <p className="text-sm text-brand-sand/50 mt-1">
                  Manage your Link Ups and respond to requests
                </p>
              </div>
              <Link
                href="/places"
                className="inline-flex items-center gap-1.5 text-sm font-medium bg-brand-orange text-white rounded-xl px-4 py-2.5 hover:opacity-90 transition-opacity"
              >
                <IconPlus size={14} /> New Link Up
              </Link>
            </div>
          </div>

          {/* Socials warning */}
          {!hasSocials && (
            <div className="flex items-start gap-3 bg-brand-gold/10 border border-brand-gold/20 rounded-xl px-4 py-3">
              <IconAlertCircle
                size={16}
                className="text-brand-gold shrink-0 mt-0.5"
              />
              <div className="flex-1">
                <p className="text-sm font-medium text-brand-night">
                  Add your socials
                </p>
                <p className="text-xs text-brand-night/60 mt-0.5">
                  Add your Instagram, TikTok, X or Snapchat to share with people
                  who join your Link Ups.{" "}
                  <Link
                    href="/profile?tab=socials"
                    className="text-brand-orange underline"
                  >
                    Add now →
                  </Link>
                </p>
              </div>
            </div>
          )}

          {/* Stats row */}
          {linkUps.length > 0 && (
            <div className="grid grid-cols-4 gap-3">
              {[
                {
                  n: linkUps.length,
                  label: "Total",
                  color: "text-brand-night",
                },
                {
                  n: linkUps.filter((l) => l.status === "OPEN").length,
                  label: "Open",
                  color: "text-brand-lagoon",
                },
                {
                  n: totalPending,
                  label: "Pending",
                  color: "text-brand-orange",
                },
                {
                  n: linkUps.reduce(
                    (a, l) =>
                      a +
                      l.requests.filter((r) => r.status === "ACCEPTED").length,
                    0,
                  ),
                  label: "Accepted",
                  color: "text-brand-lagoon",
                },
              ].map((s) => (
                <div
                  key={s.label}
                  className="bg-white border border-brand-night/8 rounded-xl p-4 text-center"
                >
                  <p className={`text-2xl font-bold ${s.color}`}>{s.n}</p>
                  <p className="text-xs text-brand-night/40 mt-0.5">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Filter pills */}
          {linkUps.length > 0 && (
            <div className="flex gap-2">
              {(["all", "OPEN", "CLOSED", "FULL"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`text-xs font-medium px-3.5 py-1.5 rounded-full border transition-all ${
                    filter === f
                      ? "bg-brand-night text-white border-brand-night"
                      : "bg-white text-brand-night/60 border-brand-night/15 hover:border-brand-night/30"
                  }`}
                >
                  {f === "all" ? "All" : LINKUP_STATUS_LABELS[f]}
                </button>
              ))}
            </div>
          )}

          {/* Link Up list */}
          {filtered.length > 0 ? (
            <div className="flex flex-col gap-4">
              {filtered.map((lu) => (
                <LinkUpCard key={lu.id} linkUp={lu} userSocials={userSocials} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 border border-dashed border-brand-night/15 rounded-2xl">
              <IconUsers
                size={32}
                className="mx-auto mb-3 text-brand-night/20"
              />
              <p className="text-base font-medium text-brand-night/50">
                {linkUps.length === 0
                  ? "No Link Ups yet"
                  : `No ${filter.toLowerCase()} Link Ups`}
              </p>
              <p className="text-sm text-brand-night/30 mt-1 mb-4">
                {linkUps.length === 0
                  ? "Find a place or event and create your first Link Up"
                  : "Try a different filter"}
              </p>
              {linkUps.length === 0 && (
                <Link
                  href="/places"
                  className="inline-flex items-center gap-1.5 text-sm font-medium bg-brand-orange text-white rounded-xl px-5 py-2.5"
                >
                  <IconPlus size={14} /> Browse places
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LinkupIndex;
