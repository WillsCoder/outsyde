"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import {
  IconUsers,
  IconPlus,
} from "@tabler/icons-react";
import { LinkUpCard as LinkUp } from "@/lib/const/types/link-up";
import { CreateLinkUp } from "./create-link-up";
import { LinkUpCard } from "./link-up-card";

type Props = {
  linkUps: LinkUp[];
  placeId?: string;
  eventId?: string;
};







// ─── Main section ─────────────────────────────────────────────────────────────

const LinkUpSection = ({ linkUps: initial, placeId, eventId }: Props) => {
  const { data: session } = useSession();
  const [linkUps, setLinkUps] = useState(initial);
  const [showCreate, setShowCreate] = useState(false);

  const refresh = async () => {
    const params = placeId ? `placeId=${placeId}` : `eventId=${eventId}`;
    const res = await fetch(`/api/linkups?${params}`);
    const data = await res.json();
    setLinkUps(data);
    setShowCreate(false);
  };

  return (
    <div className="bg-white rounded-2xl p-3 md:p-6 flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-brand-night flex items-center gap-2">
              <IconUsers size={16} className="text-brand-orange" />
              Link Ups
              <span className="text-sm font-normal text-brand-night/40">
                ({linkUps.length})
              </span>
            </h2>
            {session && (
              <button
                onClick={() => setShowCreate((s) => !s)}
                className="flex items-center gap-1.5 text-xs font-medium bg-brand-night text-white rounded-full px-2 py-1 md:px-3.5 md:py-2 hover:opacity-80 transition-opacity"
              >
                <IconPlus size={12} />
                {showCreate ? "Cancel" : "Create"}
              </button>
            )}
          </div>
          <p className="text-xs text-brand-night/40 mt-1">
            Find people going to the same place or event
          </p>
        </div>
      </div>

      {/* Create form */}
      {showCreate && (
        <CreateLinkUp placeId={placeId} eventId={eventId} onCreated={refresh} />
      )}

      {/* List */}
      {linkUps.length > 0 ? (
        <div className="flex flex-col gap-3">
          {linkUps.map((l) => (
            <LinkUpCard key={l.id} linkUp={l} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-brand-night/40">
          <IconUsers size={28} className="mx-auto mb-2 opacity-30" />
          <p className="text-sm">No Link Ups yet.</p>
          {session ? (
            <p className="text-xs mt-1">Be the first to create one!</p>
          ) : (
            <p className="text-xs mt-1">Sign in to create a Link Up.</p>
          )}
        </div>
      )}

      {/* Sign in prompt */}
      {!session && linkUps.length > 0 && (
        <div className="flex items-center justify-between bg-brand-sand rounded-xl px-5 py-4">
          <p className="text-sm text-brand-night/60">
            Sign in to join a Link Up
          </p>
          <a
            href="/login"
            className="text-sm font-medium bg-brand-night text-white rounded-xl px-4 py-2"
          >
            Sign in
          </a>
        </div>
      )}
    </div>
  );
};

export default LinkUpSection;
