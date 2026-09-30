// ─── Edit modal ───────────────────────────────────────────────────────────────

import { useActionState, useState } from "react";
import { updateLinkUp } from "@/app/(main)/profile/linkups/actions";
import { LinkUp, UserSocials } from "@/lib/const/types/link-up";
import { IconShare, IconX } from "@tabler/icons-react";
import { format } from "date-fns";
import { SocialLinks } from "./social-links";
import Link from "next/link";

export const EditModal = ({
  linkUp,
  userSocials,
  onClose,
}: {
  linkUp: LinkUp;
  userSocials: UserSocials;
  onClose: () => void;
}) => {
  const [state, action, isPending] = useActionState(updateLinkUp, {
    error: null,
    success: null,
  });
  const [shareSocials, setShareSocials] = useState(linkUp.shareSocials);
  const hasSocials = Object.values(userSocials).some(Boolean);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-brand-night/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-bold text-brand-night">Edit Link Up</h2>
          <button
            onClick={onClose}
            className="text-brand-night/40 hover:text-brand-night transition-colors"
          >
            <IconX size={18} />
          </button>
        </div>

        <form action={action} className="flex flex-col gap-4">
          <input type="hidden" name="id" value={linkUp.id} />
          <input
            type="hidden"
            name="shareSocials"
            value={String(shareSocials)}
          />

          <div>
            <label className="text-xs font-medium text-brand-night/60 mb-1.5 block">
              Title
            </label>
            <input
              name="title"
              defaultValue={linkUp.title}
              className="w-full h-11 border border-brand-night/12 rounded-xl px-4 text-sm outline-none focus:border-brand-orange transition-colors"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-brand-night/60 mb-1.5 block">
              Description
            </label>
            <textarea
              name="description"
              defaultValue={linkUp.description ?? ""}
              rows={2}
              placeholder="Any extra details? (optional)"
              className="w-full border border-brand-night/12 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-orange transition-colors resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-brand-night/60 mb-1.5 block">
                Date & time
              </label>
              <input
                type="datetime-local"
                name="date"
                defaultValue={format(
                  new Date(linkUp.date),
                  "yyyy-MM-dd'T'HH:mm",
                )}
                className="w-full h-11 border border-brand-night/12 rounded-xl px-3 text-sm outline-none focus:border-brand-orange transition-colors"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-brand-night/60 mb-1.5 block">
                Max group size
              </label>
              <select
                name="maxSize"
                defaultValue={linkUp.maxSize}
                className="w-full h-11 border border-brand-night/12 rounded-xl px-3 text-sm outline-none focus:border-brand-orange transition-colors bg-white"
              >
                {[2, 3, 4, 5, 6, 8, 10].map((n) => (
                  <option key={n} value={n}>
                    Max {n}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-brand-night/60 mb-1.5 block">
              Status
            </label>
            <select
              name="status"
              defaultValue={linkUp.status}
              className="w-full h-11 border border-brand-night/12 rounded-xl px-3 text-sm outline-none focus:border-brand-orange transition-colors bg-white"
            >
              <option value="OPEN">Open — accepting requests</option>
              <option value="CLOSED">Closed — no new requests</option>
              <option value="FULL">Full</option>
            </select>
          </div>

          {/* Share socials toggle */}
          <div className="flex items-start justify-between gap-4 bg-brand-sand rounded-xl p-4">
            <div className="flex-1">
              <p className="text-sm font-medium text-brand-night flex items-center gap-1.5">
                <IconShare size={14} className="text-brand-orange" />
                Share my socials
              </p>
              <p className="text-xs text-brand-night/50 mt-0.5">
                {hasSocials
                  ? "Show your Instagram, TikTok, X and Snapchat to people who join"
                  : "Add your socials in profile settings first"}
              </p>
              {shareSocials && hasSocials && (
                <div className="mt-2">
                  <SocialLinks socials={userSocials} />
                </div>
              )}
              {!hasSocials && (
                <Link
                  href="/profile"
                  className="text-xs text-brand-orange mt-1 inline-block"
                >
                  Add socials to profile →
                </Link>
              )}
            </div>
            <button
              type="button"
              disabled={!hasSocials}
              onClick={() => setShareSocials((s) => !s)}
              className={`relative shrink-0 w-11 h-6 rounded-full transition-colors duration-200 disabled:opacity-40 ${shareSocials && hasSocials ? "bg-brand-orange" : "bg-brand-night/15"}`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${shareSocials && hasSocials ? "translate-x-5" : "translate-x-0"}`}
              />
            </button>
          </div>

          {state.error && <p className="text-xs text-red-500">{state.error}</p>}
          {state.success && (
            <p className="text-xs text-brand-lagoon">{state.success}</p>
          )}

          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 text-sm font-medium text-brand-night/60 border border-brand-night/12 rounded-xl py-2.5 hover:bg-brand-sand transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="flex-1 text-sm font-medium bg-brand-orange text-white rounded-xl py-2.5 hover:opacity-90 transition-opacity disabled:opacity-40"
            >
              {isPending ? "Saving…" : "Save changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
