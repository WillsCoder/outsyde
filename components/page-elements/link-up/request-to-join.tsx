// ─── Request form ─────────────────────────────────────────────────────────────

import { useState } from "react";

export const RequestToJoin = ({
  linkUpId,
  onSent,
}: {
  linkUpId: string;
  onSent: () => void;
}) => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    const res = await fetch(`/api/linkups/${linkUpId}/request`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
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
