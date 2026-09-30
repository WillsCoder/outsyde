// ─── Link Up card ─────────────────────────────────────────────────────────────

import { useState } from "react";
import { useSession } from "next-auth/react";
import { format } from "date-fns";
import { Avatar } from "@/components/ui";
import {
  LINKUP_STATUS_COLORS,
  LINKUP_STATUS_LABELS,
  LinkUpCard as LinkUp,
} from "@/lib/const/types/link-up";
import { IconClock, IconUsers } from "@tabler/icons-react";
import { RequestToJoin } from "./request-to-join";

export const LinkUpCard = ({ linkUp }: { linkUp: LinkUp }) => {
  const { data: session } = useSession();
  const [expanded, setExpanded] = useState(false);
  const [requested, setRequested] = useState(false);

  const spotsLeft = linkUp.maxSize - 1 - linkUp._count.requests;

  return (
    <div className="border border-brand-night/7 rounded-xl p-4">
      <div className="flex items-start gap-3">
        <Avatar name={linkUp.creator.name} image={linkUp.creator.image} />
        <div className="flex-1 min-w-0">
          <div className="flex justify-between">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="text-sm font-semibold text-brand-night">
                {linkUp.creator.name}
              </p>
              <span
                className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${LINKUP_STATUS_COLORS[linkUp.status]}`}
              >
                {LINKUP_STATUS_LABELS[linkUp.status]}
              </span>
            </div>
            <div>
              {/* Join button */}
              {session && linkUp.status === "OPEN" && !requested && (
                <button
                  onClick={() => setExpanded((e) => !e)}
                  className="shrink-0 text-xs font-medium bg-brand-orange/10 text-brand-orange rounded-full px-3 py-1.5 hover:bg-brand-orange hover:text-white transition-all"
                >
                  Join
                </button>
              )}
              {requested && (
                <span className="shrink-0 whitespace-nowrap text-xs font-medium bg-brand-lagoon/10 text-brand-lagoon rounded-full px-3 py-1.5">
                  Requested ✓
                </span>
              )}
            </div>
          </div>
          <p className="text-sm text-brand-night/80 mt-1">{linkUp.title}</p>
          {linkUp.description && (
            <p className="text-xs text-brand-night/50 mt-1">
              {linkUp.description}
            </p>
          )}
          <div className="flex items-center gap-3 mt-2 flex-wrap">
            <span className="flex items-center gap-1 text-xs text-brand-night/40">
              <IconClock size={11} />{" "}
              {format(new Date(linkUp.date), "EEE, MMM d · h:mm a")}
            </span>
            <span className="flex items-center gap-1 text-xs text-brand-night/40">
              <IconUsers size={11} />
              {spotsLeft > 0
                ? `${spotsLeft} spot${spotsLeft > 1 ? "s" : ""} left`
                : "Full"}
            </span>
          </div>
        </div>
      </div>

      {expanded && !requested && (
        <RequestToJoin
          linkUpId={linkUp.id}
          onSent={() => {
            setRequested(true);
            setExpanded(false);
          }}
          creatorSocials={{
            instagramUrl: "",
            tiktokUrl: "",
            xUrl: "",
            snapchatUrl: "",
          }}
        />
      )}
    </div>
  );
};
