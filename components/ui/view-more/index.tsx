"use client";

import { useState } from "react";

export const ViewMore = ({ text }: { text: string }) => {
  const [expanded, setExpanded] = useState(false);

  const paragraphs = text
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <div>
      <div
        className={`text-sm leading-relaxed text-brand-night/60 ${
          expanded ? "" : "line-clamp-7"
        }`}
      >
        {paragraphs.map((paragraph, index) => (
          <p key={index} className={index > 0 ? "mt-3" : ""}>
            {paragraph}
          </p>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setExpanded((prev) => !prev)}
        className="mt-2 cursor-pointer text-sm font-bold text-brand-orange transition-colors hover:text-brand-night"
      >
        {expanded ? "View less" : "View more"}
      </button>
    </div>
  );
}
