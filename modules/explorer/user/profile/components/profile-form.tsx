"use client";

import { useActionState, useState } from "react";
import {
  IconUser,
  IconAt,
  IconPhone,
  IconMapPin,
  IconBrandInstagram,
  IconBrandTiktok,
  IconBrandX,
  IconBrandSnapchat,
  IconCheck,
  IconBell,
  IconLock,
  IconLink,
} from "@tabler/icons-react";
import {
  updateProfile,
  changePassword,
  type PasswordState,
} from "@/app/(main)/profile/actions";
import { Button } from "@/components/ui";

type Tab = "profile" | "socials" | "notifications" | "privacy";

const tabs: { key: Tab; label: string; icon: any }[] = [
  { key: "profile", label: "Profile", icon: IconUser },
  { key: "socials", label: "Socials", icon: IconLink },
  { key: "notifications", label: "Notifications", icon: IconBell },
  { key: "privacy", label: "Privacy", icon: IconLock },
];

const inputClass =
  "w-full h-11 border border-brand-night/12 rounded-xl px-4 text-sm text-brand-night placeholder:text-brand-night/30 outline-none focus:border-brand-orange transition-colors bg-white";
const labelClass = "text-xs font-medium text-brand-night/60 mb-1.5 block";

type Props = {
  user: any;
};

const Toggle = ({
  name,
  defaultChecked,
  label,
  description,
}: {
  name: string;
  defaultChecked: boolean;
  label: string;
  description: string;
}) => {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <div className="flex items-start justify-between gap-4 py-4 border-b border-brand-night/7 last:border-0">
      <div>
        <p className="text-sm font-medium text-brand-night">{label}</p>
        <p className="text-xs text-brand-night/50 mt-0.5">{description}</p>
      </div>
      <input type="hidden" name={name} value={String(checked)} />
      <button
        type="button"
        onClick={() => setChecked((c) => !c)}
        className={`relative shrink-0 w-11 h-6 rounded-full transition-colors duration-200 ${checked ? "bg-brand-orange" : "bg-brand-night/15"}`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${checked ? "translate-x-5" : "translate-x-0"}`}
        />
      </button>
    </div>
  );
};

const SocialInput = ({
  name,
  defaultValue,
  placeholder,
  icon: Icon,
  prefix,
}: {
  name: string;
  defaultValue?: string | null;
  placeholder: string;
  icon: any;
  prefix?: string;
}) => (
  <div>
    <div className="relative flex items-center">
      <div className="absolute left-3 flex items-center gap-1.5 text-brand-night/40 pointer-events-none">
        <Icon size={15} />
        {prefix && <span className="text-xs font-medium">{prefix}</span>}
      </div>
      <input
        name={name}
        defaultValue={defaultValue ?? ""}
        placeholder={placeholder}
        className={`${inputClass} ${prefix ? "md:pl-30" : "pl-10"}`}
      />
    </div>
  </div>
);

const initialState: PasswordState = {
  error: null,
  success: null,
};

export function ChangePasswordForm() {
  const [state, formAction, isPending] = useActionState(
    changePassword,
    initialState,
  );

  return (
    <form
      action={formAction}
      className="bg-white border border-brand-night/8 rounded-2xl p-5 flex flex-col gap-4"
    >
      <div>
        <p className="text-sm font-semibold text-brand-night mb-1">Security</p>
        <p className="text-xs text-brand-night/50 mb-4">
          Change account password credentials
        </p>
      </div>
      <div>
        <label
          htmlFor="currentPassword"
          className="mb-2 block text-sm font-semibold text-brand-night"
        >
          Current password
        </label>

        <input
          id="currentPassword"
          name="currentPassword"
          type="password"
          autoComplete="current-password"
          required
          className="w-full rounded-xl border border-brand-night/10 bg-brand-sand/30 px-4 py-3 text-sm outline-none transition focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/10"
        />
      </div>

      <div>
        <label
          htmlFor="newPassword"
          className="mb-2 block text-sm font-semibold text-brand-night"
        >
          New password
        </label>

        <input
          id="newPassword"
          name="newPassword"
          type="password"
          autoComplete="new-password"
          minLength={8}
          required
          className="w-full rounded-xl border border-brand-night/10 bg-brand-sand/30 px-4 py-3 text-sm outline-none transition focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/10"
        />

        <p className="mt-1.5 text-xs text-brand-night/40">
          Must be at least 8 characters.
        </p>
      </div>

      <div>
        <label
          htmlFor="confirmPassword"
          className="mb-2 block text-sm font-semibold text-brand-night"
        >
          Confirm new password
        </label>

        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          minLength={8}
          required
          className="w-full rounded-xl border border-brand-night/10 bg-brand-sand/30 px-4 py-3 text-sm outline-none transition focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/10"
        />
      </div>

      {state.error && (
        <div className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
          {state.error}
        </div>
      )}

      {state.success && (
        <div className="rounded-xl bg-brand-lagoon/10 px-4 py-3 text-sm font-medium text-brand-lagoon">
          {state.success}
        </div>
      )}

      <div className="flex justify-end pt-2">
        <Button type="submit" variant="secondary" disabled={isPending}>
          {" "}
          {isPending ? "Changing password..." : "Change password"}
        </Button>
      </div>
    </form>
  );
}


export default function ProfileForm({ user }: Props) {
  const [tab, setTab] = useState<Tab>("profile");
  const [state, action, isPending] = useActionState(updateProfile, {
    error: null,
    success: null,
  });


  return (
    <div className="flex flex-col gap-3">
      {/* Tabs */}
      <div className="flex gap-1 bg-brand-sand rounded-xl p-1">
        {tabs.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            type="button"
            onClick={() => setTab(key)}
            className={`flex-1 flex items-center justify-center gap-1.5 text-xs font-medium py-2 rounded-lg transition-all ${
              tab === key
                ? "bg-white text-brand-night shadow-sm"
                : "text-brand-night/50 hover:text-brand-night"
            }`}
          >
            <Icon size={13} />
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </div>

      {/* Form */}
      <form action={action} className="flex flex-col gap-6">
        {/* Profile tab */}
        {tab === "profile" && (
          <div className="flex flex-col gap-5">
            <div className="bg-white border border-brand-night/8 rounded-2xl p-5">
              <p className="text-sm font-semibold text-brand-night mb-4">
                Basic info
              </p>
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelClass}>First name</label>
                    <input
                      name="firstName"
                      defaultValue={user.firstName ?? ""}
                      placeholder="First name"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Last name</label>
                    <input
                      name="lastName"
                      defaultValue={user.lastName ?? ""}
                      placeholder="Last name"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Username</label>
                  <div className="relative">
                    <IconAt
                      size={15}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-night/40 pointer-events-none"
                    />
                    <input
                      name="username"
                      defaultValue={user.username ?? ""}
                      placeholder="yourhandle"
                      className={`${inputClass} pl-9`}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Bio</label>
                  <textarea
                    name="bio"
                    defaultValue={user.bio ?? ""}
                    placeholder="Tell Lagos something about yourself…"
                    rows={3}
                    className="w-full border border-brand-night/12 rounded-xl px-4 py-3 text-sm text-brand-night placeholder:text-brand-night/30 outline-none focus:border-brand-orange transition-colors resize-none bg-white"
                  />
                </div>

                <div>
                  <label className={labelClass}>Phone</label>
                  <div className="relative">
                    <IconPhone
                      size={15}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-night/40 pointer-events-none"
                    />
                    <input
                      name="phone"
                      defaultValue={user.phone ?? ""}
                      placeholder="+234 800 000 0000"
                      className={`${inputClass} pl-9`}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-brand-night/8 rounded-2xl p-5">
              <p className="text-sm font-semibold text-brand-night mb-4">
                Location
              </p>
              <div className="flex flex-col gap-4">
                <div>
                  <label className={labelClass}>City</label>
                  <div className="relative">
                    <IconMapPin
                      size={15}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-night/40 pointer-events-none"
                    />
                    <input
                      name="city"
                      defaultValue={user.city ?? ""}
                      placeholder="Lagos"
                      className={`${inputClass} pl-9`}
                    />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Neighbourhood</label>
                  <input
                    name="neighborhood"
                    defaultValue={user.neighborhood ?? ""}
                    placeholder="e.g. Lekki Phase 1, Yaba, VI…"
                    className={inputClass}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Socials tab */}
        {tab === "socials" && (
          <div className="bg-white border border-brand-night/8 rounded-2xl p-5">
            <p className="text-sm font-semibold text-brand-night mb-1">
              Social links
            </p>
            <p className="text-xs text-brand-night/50 mb-5">
              Show your socials on your public profile
            </p>
            <div className="flex flex-col gap-4">
              <div>
                <label className={labelClass}>Instagram</label>
                <SocialInput
                  name="instagramUrl"
                  defaultValue={user.instagramUrl}
                  placeholder="yourhandle"
                  icon={IconBrandInstagram}
                  prefix="instagram.com/"
                />
              </div>
              <div>
                <label className={labelClass}>TikTok</label>
                <SocialInput
                  name="tiktokUrl"
                  defaultValue={user.tiktokUrl}
                  placeholder="yourhandle"
                  icon={IconBrandTiktok}
                  prefix="tiktok.com/@"
                />
              </div>
              <div>
                <label className={labelClass}>X (Twitter)</label>
                <SocialInput
                  name="xUrl"
                  defaultValue={user.xUrl}
                  placeholder="yourhandle"
                  icon={IconBrandX}
                  prefix="x.com/"
                />
              </div>
              <div>
                <label className={labelClass}>Snapchat</label>
                <SocialInput
                  name="snapchatUrl"
                  defaultValue={user.snapchatUrl}
                  placeholder="yourhandle"
                  icon={IconBrandSnapchat}
                  prefix="snapchat.com/add/"
                />
              </div>
            </div>
          </div>
        )}

        {/* Notifications tab */}
        {tab === "notifications" && (
          <div className="bg-white border border-brand-night/8 rounded-2xl p-5">
            <p className="text-sm font-semibold text-brand-night mb-1">
              Notifications
            </p>
            <p className="text-xs text-brand-night/50 mb-4">
              Choose what you want to be notified about
            </p>
            <Toggle
              name="notifyLinkUps"
              defaultChecked={user.notifyLinkUps}
              label="Link Up requests"
              description="When someone requests to join your Link Up"
            />
            <Toggle
              name="notifyEvents"
              defaultChecked={user.notifyEvents}
              label="Event reminders"
              description="Reminders for events you've saved"
            />
            <Toggle
              name="notifyReviews"
              defaultChecked={user.notifyReviews}
              label="Review replies"
              description="When someone replies to your review"
            />
          </div>
        )}

        {/* Save button + feedback */}
        {tab !== "privacy" && (
          <div className="flex items-center justify-between">
            {state.error && (
              <p className="text-sm text-red-500 font-medium">{state.error}</p>
            )}
            {state.success && (
              <p className="flex items-center gap-1.5 text-sm text-brand-lagoon font-medium">
                <IconCheck size={14} /> {state.success}
              </p>
            )}
            {!state.error && !state.success && <span />}
            <button
              type="submit"
              disabled={isPending}
              className="flex items-center gap-2 text-sm font-medium bg-brand-orange text-white rounded-xl px-6 py-2.5 hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed ml-auto"
            >
              {isPending ? "Saving…" : "Save changes"}
            </button>
          </div>
        )}
      </form>

      {/* Privacy tab */}
      {tab === "privacy" && (
        <div className="flex flex-col gap-4">
          <div className="bg-white border border-brand-night/8 rounded-2xl p-5">
            <p className="text-sm font-semibold text-brand-night mb-1">
              Privacy
            </p>
            <p className="text-xs text-brand-night/50 mb-4">
              Control who can see your profile
            </p>
            <Toggle
              name="isProfilePublic"
              defaultChecked={user.isProfilePublic}
              label="Public profile"
              description="Anyone on Outsyde can see your profile and reviews"
            />
          </div>

          <div className="bg-white border border-brand-night/8 rounded-2xl p-5">
            <p className="text-sm font-semibold text-brand-night mb-1">
              Account
            </p>
            <p className="text-xs text-brand-night/50 mb-4">
              Manage your account details
            </p>
            <div>
              <label className={labelClass}>Email address</label>
              <input
                value={user.email}
                disabled
                className={`${inputClass} opacity-50 cursor-not-allowed`}
              />
              <p className="text-[11px] text-brand-night/40 mt-1.5">
                Contact support to change your email address
              </p>
            </div>
          </div>

          <div>
            <ChangePasswordForm />
          </div>

          <div className="bg-red-50 border border-red-100 rounded-2xl p-5">
            <p className="text-sm font-semibold text-red-600 mb-1">
              Danger zone
            </p>
            <p className="text-xs text-red-400 mb-4">
              These actions are permanent and cannot be undone
            </p>
            <button
              type="button"
              className="text-sm font-medium text-red-500 border border-red-200 rounded-xl px-4 py-2 hover:bg-red-50 transition-colors"
            >
              Delete account
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
