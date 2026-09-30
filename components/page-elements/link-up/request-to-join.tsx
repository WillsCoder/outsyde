// ─── Request form ─────────────────────────────────────────────────────────────

import { UserSocials } from "@/lib/const/types/link-up";
import { SocialLinks } from "@/modules/explorer/user/link-ups/components/social-links";
import { IconShare } from "@tabler/icons-react";
import { useState } from "react";

export const RequestToJoin = ({
  linkUpId,
  onSent,
  creatorSocials,
}: {
  linkUpId: string;
  onSent: () => void;
  creatorSocials?: Partial<UserSocials> | null;
}) => {
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [shareSocials, setShareSocials] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async () => {
    setLoading(true);
    const res = await fetch(`/api/linkups/${linkUpId}/request`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, shareSocials }),
    });
    setLoading(false);
    if (res.ok) onSent();
    else {
      const d = await res.json();
      setError(d.error);
    }
  };

  return (
    <div className="flex flex-col gap-2 mt-3 pt-3 border-t border-brand-night/7">
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Say something about yourself (optional)"
        rows={2}
        className="w-full border border-brand-night/12 rounded-xl px-3 py-2 text-sm text-brand-night placeholder:text-brand-night/30 outline-none focus:border-brand-orange transition-colors resize-none"
      />
      {/* Share socials toggle */}
      <div className="flex items-center justify-between bg-brand-sand rounded-xl px-3 py-2.5">
        <div>
          <p className="text-xs font-medium text-brand-night">
            Share my socials
          </p>
          <p className="text-[10px] text-brand-night/50">
            Let the creator see your Instagram, TikTok etc.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShareSocials((s) => !s)}
          className={`relative w-9 h-5 rounded-full transition-colors ${shareSocials ? "bg-brand-orange" : "bg-brand-night/15"}`}
        >
          <span
            className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${shareSocials ? "translate-x-4" : "translate-x-0"}`}
          />
        </button>
      </div>

      {/* Creator's socials preview (if they shared) */}
      {creatorSocials && Object.values(creatorSocials).some(Boolean) && (
        <div className="flex items-center gap-2 bg-brand-sand rounded-xl px-3 py-2.5">
          <IconShare size={12} className="text-brand-night/30" />
          <span className="text-[10px] text-brand-night/50">
            Creator shared their socials:
          </span>
          <SocialLinks socials={creatorSocials} />
        </div>
      )}

      {error && <p className="text-xs text-red-500">{error}</p>}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="text-xs font-medium bg-brand-night text-white rounded-full px-4 py-1.5 hover:opacity-80 transition-opacity disabled:opacity-40 w-fit"
      >
        {loading ? "Sending…" : "Send request"}
      </button>
    </div>
  );
};
