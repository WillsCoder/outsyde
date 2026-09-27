// ─── Create form ──────────────────────────────────────────────────────────────

import { useState } from "react";
import { containsUnsafeInput } from "@/lib/utils/text-validation";
import { IconUsers } from "@tabler/icons-react";

export const CreateLinkUp = ({
  placeId,
  eventId,
  onCreated,
}: {
  placeId?: string;
  eventId?: string;
  onCreated: () => void;
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [maxSize, setMaxSize] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!title || !date) {
      setError("Title and date are required");
      return;
    }

    // Validate title
    if (containsUnsafeInput(title)) {
      setError("Title contains invalid characters or HTML.");
      return;
    }

    // Validate description
    if (containsUnsafeInput(description)) {
      setError("Description contains invalid characters or HTML.");
      return;
    }

    setLoading(true);
    const res = await fetch("/api/linkups", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description,
        date,
        maxSize,
        placeId,
        eventId,
      }),
    });
    setLoading(false);
    if (res.ok) {
      onCreated();
    } else {
      const d = await res.json();
      setError(d.error);
    }
  };;

  return (
    <div className="flex flex-col gap-3 bg-brand-sand rounded-xl p-4">
      <p className="text-sm font-semibold text-brand-night">Create a Link Up</p>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="e.g. Looking for people to vibe with tonight"
        className="w-full border border-brand-night/12 rounded-xl px-4 py-2.5 text-sm text-brand-night placeholder:text-brand-night/30 outline-none focus:border-brand-orange transition-colors"
      />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Any extra details? (optional)"
        rows={2}
        className="w-full border border-brand-night/12 rounded-xl px-4 py-2.5 text-sm text-brand-night placeholder:text-brand-night/30 outline-none focus:border-brand-orange transition-colors resize-none"
      />

      <div className="flex flex-col gap-2">
        <input
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="flex-1 border border-brand-night/12 rounded-xl px-4 py-2.5 text-sm text-brand-night outline-none focus:border-brand-orange transition-colors"
        />
        <div className="flex items-center gap-2 border border-brand-night/12 rounded-xl px-3 bg-white">
          <IconUsers size={14} className="text-brand-night/40" />
          <select
            value={maxSize}
            onChange={(e) => setMaxSize(Number(e.target.value))}
            className="text-sm text-brand-night outline-none bg-transparent py-2.5"
          >
            {[2, 3, 4, 5, 6, 8, 10].map((n) => (
              <option key={n} value={n}>
                Max {n}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && <p className="text-xs text-red-500 font-medium">{error}</p>}

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="text-sm font-medium bg-brand-orange text-white rounded-xl px-4 py-2.5 hover:opacity-90 transition-opacity disabled:opacity-40"
      >
        {loading ? "Creating…" : "Create Link Up"}
      </button>
    </div>
  );
};