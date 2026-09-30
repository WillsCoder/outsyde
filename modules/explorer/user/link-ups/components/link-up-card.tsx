// ─── Link Up card ─────────────────────────────────────────────────────────────

import { useState, useTransition } from "react";
import { deleteLinkUp } from "@/app/(main)/profile/linkups/actions";
import { LinkUp, LINKUP_STATUS_COLORS, LINKUP_STATUS_LABELS, UserSocials } from "@/lib/const/types/link-up";
import { EditModal } from "./edit-modal";
import { IconCalendar, IconChevronDown, IconChevronUp, IconClock, IconEdit, IconMapPin, IconShare, IconTrash, IconUsers } from "@tabler/icons-react";
import { format } from "date-fns";
import Link from "next/link";
import { Avatar } from "@/components/ui";
import { RequestCard } from "./request-card";

export const LinkUpCard = ({
  linkUp,
  userSocials,
}: {
  linkUp: LinkUp;
  userSocials: UserSocials;
}) => {
  const [expanded, setExpanded] = useState(false);
  const [editing, setEditing] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [deleted, setDeleted] = useState(false);

  const pending = linkUp.requests.filter((r) => r.status === "PENDING");
  const accepted = linkUp.requests.filter((r) => r.status === "ACCEPTED");
  const declined = linkUp.requests.filter((r) => r.status === "DECLINED");
  const spotsLeft = linkUp.maxSize - 1 - accepted.length;

  const handleDelete = () => {
    if (!confirm("Delete this Link Up? This can't be undone.")) return;
    startTransition(async () => {
      await deleteLinkUp(linkUp.id);
      setDeleted(true);
    });
  };

  if (deleted) return null;

  const location = linkUp.place?.name ?? linkUp.event?.title ?? "Lagos";
  const locationHref = linkUp.place
    ? `/places/${linkUp.place.slug}`
    : linkUp.event
      ? `/events/${linkUp.event.slug}`
      : "#";

  return (
    <>
      {editing && (
        <EditModal
          linkUp={linkUp}
          userSocials={userSocials}
          onClose={() => setEditing(false)}
        />
      )}

      <div className="bg-white border border-brand-night/8 rounded-2xl overflow-hidden">
        {/* Card header */}
        <div className="p-5">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <span
                  className={`text-[10px] font-medium px-2.5 py-1 rounded-full ${LINKUP_STATUS_COLORS[linkUp.status]}`}
                >
                  {LINKUP_STATUS_LABELS[linkUp.status]}
                </span>
                {pending.length > 0 && (
                  <span className="text-[10px] font-medium bg-brand-orange/10 text-brand-orange rounded-full px-2.5 py-1">
                    {pending.length} pending
                  </span>
                )}
                {linkUp.shareSocials && (
                  <span className="text-[10px] font-medium bg-brand-night/5 text-brand-night/50 rounded-full px-2.5 py-1 flex items-center gap-1">
                    <IconShare size={9} /> Socials shared
                  </span>
                )}
              </div>
              <h3 className="text-base font-bold text-brand-night leading-tight">
                {linkUp.title}
              </h3>
              {linkUp.description && (
                <p className="text-xs text-brand-night/50 mt-1 line-clamp-2">
                  {linkUp.description}
                </p>
              )}
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={() => setEditing(true)}
                className="w-8 h-8 rounded-lg border border-brand-night/10 flex items-center justify-center text-brand-night/40 hover:text-brand-night hover:border-brand-night/20 transition-all"
              >
                <IconEdit size={14} />
              </button>
              <button
                onClick={handleDelete}
                disabled={isPending}
                className="w-8 h-8 rounded-lg border border-brand-night/10 flex items-center justify-center text-brand-night/40 hover:text-red-500 hover:border-red-200 transition-all disabled:opacity-40"
              >
                <IconTrash size={14} />
              </button>
            </div>
          </div>

          {/* Meta row */}
          <div className="flex items-center gap-4 text-xs text-brand-night/50 flex-wrap">
            <span className="flex items-center gap-1">
              <IconCalendar size={12} />
              {format(new Date(linkUp.date), "EEE, MMM d · h:mm a")}
            </span>
            <span className="flex items-center gap-1">
              <IconMapPin size={12} />
              <Link
                href={locationHref}
                className="hover:text-brand-orange transition-colors"
              >
                {location}
              </Link>
            </span>
            <span className="flex items-center gap-1">
              <IconUsers size={12} />
              {accepted.length}/{linkUp.maxSize - 1} joined ·{" "}
              {spotsLeft > 0 ? `${spotsLeft} left` : "Full"}
            </span>
          </div>

          {/* Accepted members avatars */}
          {accepted.length > 0 && (
            <div className="flex items-center gap-2 mt-3">
              <div className="flex -space-x-2">
                {accepted.slice(0, 5).map((r) => (
                  <Avatar
                    key={r.id}
                    name={r.sender.name}
                    image={r.sender.image}
                  />
                ))}
                {accepted.length > 5 && (
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-brand-sand flex items-center justify-center text-[10px] font-medium text-brand-night/60">
                    +{accepted.length - 5}
                  </div>
                )}
              </div>
              <span className="text-xs text-brand-night/40">
                {accepted.length} {accepted.length === 1 ? "person" : "people"}{" "}
                joined
              </span>
            </div>
          )}
        </div>

        {/* Requests section */}
        {linkUp.requests.length > 0 && (
          <>
            <div className="border-t border-brand-night/7 px-5 py-3 bg-brand-sand/50">
              <button
                onClick={() => setExpanded((e) => !e)}
                className="flex items-center justify-between w-full text-left"
              >
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-brand-night">
                    Requests
                  </span>
                  {pending.length > 0 && (
                    <span className="w-5 h-5 rounded-full bg-brand-orange text-white text-[10px] font-bold flex items-center justify-center">
                      {pending.length}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 text-xs text-brand-night/40">
                  <span>
                    {pending.length} pending · {accepted.length} accepted ·{" "}
                    {declined.length} declined
                  </span>
                  {expanded ? (
                    <IconChevronUp size={14} />
                  ) : (
                    <IconChevronDown size={14} />
                  )}
                </div>
              </button>
            </div>

            {expanded && (
              <div className="p-4 flex flex-col gap-3 border-t border-brand-night/7">
                {/* Pending */}
                {pending.length > 0 && (
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-brand-night/40 mb-2">
                      Pending ({pending.length})
                    </p>
                    <div className="flex flex-col gap-2">
                      {pending.map((r) => (
                        <RequestCard
                          key={r.id}
                          request={r}
                          linkUpId={linkUp.id}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Accepted */}
                {accepted.length > 0 && (
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-brand-night/40 mb-2">
                      Accepted ({accepted.length})
                    </p>
                    <div className="flex flex-col gap-2">
                      {accepted.map((r) => (
                        <RequestCard
                          key={r.id}
                          request={r}
                          linkUpId={linkUp.id}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Declined */}
                {declined.length > 0 && (
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-brand-night/40 mb-2">
                      Declined ({declined.length})
                    </p>
                    <div className="flex flex-col gap-2">
                      {declined.map((r) => (
                        <RequestCard
                          key={r.id}
                          request={r}
                          linkUpId={linkUp.id}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {/* Empty requests */}
        {linkUp.requests.length === 0 && linkUp.status === "OPEN" && (
          <div className="border-t border-brand-night/7 px-5 py-4 flex items-center gap-2 text-xs text-brand-night/40">
            <IconClock size={13} />
            No requests yet — share your Link Up to get people joining
          </div>
        )}
      </div>
    </>
  );
};
