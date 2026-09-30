"use client";

import { useState } from "react";
import { IconHeart } from "@tabler/icons-react";

type SaveButtonProps = {
  placeId: string;
  initialSaved: boolean;
};

export const SaveButton = ({ placeId, initialSaved }: SaveButtonProps) => {
  const [saved, setSaved] = useState(initialSaved);
  const [loading, setLoading] = useState(false);

  async function handleSave() {
    if (loading) return;

    setLoading(true);

    try {
      const response = await fetch(`/api/places/${placeId}/save`, {
        method: saved ? "DELETE" : "POST",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setSaved(data.saved);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleSave}
      disabled={loading}
      className={`cursor-pointer inline-flex items-center gap-2 text-xs md:text-sm font-medium rounded-xl px-2 py-1 md:px-4 md:py-2.5 transition ${
        saved
          ? "bg-brand-orange text-white"
          : "bg-white text-brand-night hover:bg-brand-orange/10"
      }`}
      //   className="cursor-pointer inline-flex items-center gap-2 text-xs md:text-sm font-medium bg-white border border-brand-night/15 text-brand-night rounded-xl px-2 py-1 md:px-4 md:py-2.5 hover:bg-brand-night hover:text-white transition-all"
    >
      <IconHeart size={14} /> {saved ? "Saved ✓" : "Save"}
    </button>
  );
}
