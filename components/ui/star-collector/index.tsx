"use client"
import { useState } from "react";
import { IconStar, IconStarFilled } from "@tabler/icons-react";

export const StarSelector = ({ value, onChange }: { value: number; onChange: (v: number) => void }) => {
  const [hovered, setHovered] = useState<number>(0)

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(i => (
        <button
          key={i}
          type="button"
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => onChange(i)}
          className="transition-transform hover:scale-110"
          aria-label={`Rate ${i} star${i > 1 ? 's' : ''}`}
        >
          {i <= (hovered || value)
            ? <IconStarFilled size={24} className="text-brand-gold" />
            : <IconStar size={24} className="text-brand-night/20" />
          }
        </button>
      ))}
    </div>
  )
}