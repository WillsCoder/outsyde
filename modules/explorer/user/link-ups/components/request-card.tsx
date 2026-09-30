// ─── Request card ─────────────────────────────────────────────────────────────

import { useState, useTransition } from "react";
import { respondToRequest } from "@/app/(main)/profile/linkups/actions";
import { Request } from "@/lib/const/types/link-up";
import { Avatar } from "@/components/ui";
import { IconCheck, IconShare, IconX } from "@tabler/icons-react";
import { SocialLinks } from "./social-links";
import { format } from "date-fns";


export const RequestCard = ({
  request,
  linkUpId,
}: {
  request: Request;
  linkUpId: string;
}) => {
  const [isPending, startTransition] = useTransition();
  const [localStatus, setLocalStatus] = useState(request.status);

  const respond = (status: "ACCEPTED" | "DECLINED") => {
    startTransition(async () => {
      await respondToRequest(request.id, status);
      setLocalStatus(status);
    });
  };

  const isPending_ = localStatus === "PENDING";

  return (
    <div
      className={`rounded-xl p-4 border transition-all ${
        localStatus === "ACCEPTED"
          ? "border-brand-lagoon/20 bg-brand-lagoon/5"
          : localStatus === "DECLINED"
            ? "border-brand-night/7 bg-brand-night/2 opacity-60"
            : "border-brand-night/10 bg-white"
      }`}
    >
      <div className="flex items-start gap-3">
        <Avatar
          name={request.sender.name}
          image={request.sender.image}
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-0.5">
            <div>
              <p className="text-sm font-semibold text-brand-night">
                {request.sender.name}
              </p>
              {request.sender.username && (
                <p className="text-xs text-brand-night/40">
                  @{request.sender.username}
                </p>
              )}
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              {localStatus === "ACCEPTED" && (
                <span className="text-[10px] font-medium bg-brand-lagoon/10 text-brand-lagoon rounded-full px-2.5 py-1">
                  ✓ Accepted
                </span>
              )}
              {localStatus === "DECLINED" && (
                <span className="text-[10px] font-medium bg-brand-night/7 text-brand-night/40 rounded-full px-2.5 py-1">
                  Declined
                </span>
              )}
            </div>
          </div>

          {request.sender.bio && (
            <p className="text-xs text-brand-night/50 mt-1 line-clamp-2">
              {request.sender.bio}
            </p>
          )}

          {request.message && (
            <div className="mt-2 bg-brand-sand rounded-lg px-3 py-2">
              <p className="text-xs text-brand-night/70 leading-relaxed">
                "{request.message}"
              </p>
            </div>
          )}

          {/* Socials if shared */}
          {request.shareSocials && (
            <div className="flex items-center gap-2 mt-2">
              <IconShare size={11} className="text-brand-night/30" />
              <span className="text-[10px] text-brand-night/40">
                Shared their socials
              </span>
              <SocialLinks socials={request.sender} />
            </div>
          )}

          <p className="text-[10px] text-brand-night/30 mt-2">
            {format(new Date(request.createdAt), "MMM d, h:mm a")}
          </p>
        </div>
      </div>

      {/* Accept / Decline buttons */}
      {isPending_ && (
        <div className="flex gap-2 mt-3">
          <button
            onClick={() => respond("ACCEPTED")}
            disabled={isPending}
            className="flex-1 flex items-center justify-center gap-1.5 text-xs font-medium bg-brand-lagoon text-white rounded-xl py-2.5 hover:opacity-90 transition-opacity disabled:opacity-40"
          >
            <IconCheck size={13} /> Accept
          </button>
          <button
            onClick={() => respond("DECLINED")}
            disabled={isPending}
            className="flex-1 flex items-center justify-center gap-1.5 text-xs font-medium bg-brand-night/5 text-brand-night/60 rounded-xl py-2.5 hover:bg-brand-night/10 transition-colors disabled:opacity-40"
          >
            <IconX size={13} /> Decline
          </button>
        </div>
      )}

      {/* Undo decline */}
      {localStatus === "DECLINED" && (
        <button
          onClick={() => respond("ACCEPTED")}
          disabled={isPending}
          className="mt-2 text-xs text-brand-night/40 hover:text-brand-orange transition-colors"
        >
          Undo — accept instead
        </button>
      )}
    </div>
  );
};
