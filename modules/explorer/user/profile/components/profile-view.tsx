import React from "react";
import { Profile } from "@/lib/const/types/profile";

interface Props {
  user: Profile;
}
const ProfileView = ({ user }: Props) => {
  return (
    <main className="bg-brand-sand">
      {/* Content */}
      <div className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
        {/* Main column */}
        <div className="space-y-6">
          {/* About */}
          <section className="rounded-[1.75rem] border border-brand-night/5 bg-white p-6 shadow-sm sm:p-7">
            <SectionHeading eyebrow="Profile" title="About" />

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <InfoItem
                label="Full name"
                value={
                  user.name ||
                  [user.firstName, user.lastName].filter(Boolean).join(" ")
                }
              />

              <InfoItem label="Email" value={user.email} />

              <InfoItem label="Phone" value={user.phone} />

              <InfoItem
                label="Date of birth"
                value={
                  user.dateOfBirth
                    ? new Date(user.dateOfBirth).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })
                    : null
                }
              />

              <InfoItem
                label="Gender"
                value={
                  user.gender
                    ? user.gender
                        .replaceAll("_", " ")
                        .toLowerCase()
                        .replace(/\b\w/g, (c) => c.toUpperCase())
                    : null
                }
              />

              <InfoItem
                label="Member since"
                value={
                  user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString("en-US", {
                        month: "long",
                        year: "numeric",
                      })
                    : null
                }
              />
            </div>
          </section>

          {/* Location */}
          <section className="rounded-[1.75rem] border border-brand-night/5 bg-white p-6 shadow-sm sm:p-7">
            <SectionHeading eyebrow="Location" title="Where i'm based" />

            <div className="mt-5 flex items-center gap-4 rounded-2xl bg-brand-sand/60 p-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-orange/10 text-xl">
                📍
              </div>

              <div>
                <p className="font-semibold text-brand-night">
                  {user.neighborhood || "Location not provided"}
                </p>

                {user.city && (
                  <p className="mt-0.5 text-sm text-brand-night/45">
                    {user.city}
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* Socials */}
          <section className="rounded-[1.75rem] border border-brand-night/5 bg-white p-6 shadow-sm sm:p-7">
            <SectionHeading eyebrow="Social" title="Find me online" />

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <SocialLink label="Instagram" url={user.instagramUrl} icon="◎" />

              <SocialLink label="TikTok" url={user.tiktokUrl} icon="♪" />

              <SocialLink label="X" url={user.xUrl} icon="𝕏" />

              <SocialLink label="Snapchat" url={user.snapchatUrl} icon="◉" />
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          {/* Account */}
          <section className="rounded-[1.75rem] border border-brand-night/5 bg-white p-6 shadow-sm">
            <SectionHeading eyebrow="Account" title="Account details" />

            <div className="mt-5 space-y-4">
              <AccountRow
                label="Profile visibility"
                value={user.isProfilePublic ? "Public" : "Private"}
                active={user.isProfilePublic}
              />

              <AccountRow label="Email" value={user.email} />

              <AccountRow
                label="Member since"
                value={new Date(user.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                })}
              />
            </div>
          </section>

          {/* Notifications */}
          <section className="rounded-[1.75rem] border border-brand-night/5 bg-white p-6 shadow-sm">
            <SectionHeading eyebrow="Preferences" title="Notifications" />

            <div className="mt-5 space-y-3">
              <Preference label="Link Ups" enabled={user.notifyLinkUps} />

              <Preference label="Events" enabled={user.notifyEvents} />

              <Preference label="Reviews" enabled={user.notifyReviews} />
            </div>
          </section>

          {/* Quick stats */}
          <section className="overflow-hidden rounded-[1.75rem] bg-brand-night p-6 text-white">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/40">
              Community
            </p>

            <h3 className="mt-2 font-display text-xl font-bold">
              Your activity
            </h3>

            <div className="mt-6 grid grid-cols-3 gap-2">
              <MiniStat value={user._count.ratings} label="Reviews" />
              <MiniStat value={user._count.comments} label="Comments" />
              <MiniStat value={user._count.linkUpsCreated} label="Link Ups" />
            </div>
          </section>
        </aside>
      </div>
    </main>
  );
};

export default ProfileView;

function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-orange">
        {eyebrow}
      </p>

      <h2 className="mt-1 font-display text-xl font-bold tracking-tight text-brand-night">
        {title}
      </h2>
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value?: string | null }) {
  return (
    <div className="rounded-xl bg-brand-sand/50 p-4">
      <p className="text-[10px] font-bold uppercase tracking-wider text-brand-night/35">
        {label}
      </p>

      <p className="mt-1.5 truncate text-sm font-semibold text-brand-night">
        {value || "Not provided"}
      </p>
    </div>
  );
}

function SocialLink({
  label,
  url,
  icon,
}: {
  label: string;
  url?: string | null;
  icon: string;
}) {
  if (!url) {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-dashed border-brand-night/10 p-4 opacity-40">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-sand font-bold">
          {icon}
        </span>
        <span className="text-sm font-medium">{label}</span>
      </div>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-3 rounded-xl border border-brand-night/5 p-4 transition hover:border-brand-orange/20 hover:bg-brand-orange/3"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-sand font-bold text-brand-night">
        {icon}
      </span>

      <div className="min-w-0">
        <p className="text-sm font-semibold text-brand-night">{label}</p>

        <p className="truncate text-xs text-brand-night/40">
          {url.replace(/^https?:\/\//, "")}
        </p>
      </div>

      <span className="ml-auto text-brand-night/20 transition group-hover:text-brand-orange">
        ↗
      </span>
    </a>
  );
}

function AccountRow({
  label,
  value,
  active,
}: {
  label: string;
  value: string;
  active?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-sm text-brand-night/50">{label}</span>

      <span className="flex items-center gap-2 text-right text-sm font-semibold text-brand-night">
        {active !== undefined && (
          <span
            className={`h-2 w-2 rounded-full ${
              active ? "bg-brand-lagoon" : "bg-brand-night/20"
            }`}
          />
        )}
        {value}
      </span>
    </div>
  );
}

function Preference({ label, enabled }: { label: string; enabled: boolean }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-brand-sand/50 px-4 py-3">
      <span className="text-sm font-medium text-brand-night">{label}</span>

      <span
        className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${
          enabled
            ? "bg-brand-lagoon/10 text-brand-lagoon"
            : "bg-brand-night/5 text-brand-night/30"
        }`}
      >
        {enabled ? "ON" : "OFF"}
      </span>
    </div>
  );
}

function MiniStat({ value, label }: { value: number; label: string }) {
  return (
    <div className="rounded-xl bg-white/5 p-3 text-center">
      <p className="font-display text-lg font-bold">{value}</p>

      <p className="mt-1 text-[9px] font-semibold uppercase tracking-wider text-white/35">
        {label}
      </p>
    </div>
  );
}
