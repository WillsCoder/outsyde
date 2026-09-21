import { IconStar, IconStarFilled } from "@tabler/icons-react";

export const StarRating = ({ score }: { score: number }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((i) =>
      i <= Math.round(score) ? (
        <IconStarFilled key={i} size={12} className="text-brand-gold" />
      ) : (
        <IconStar key={i} size={12} className="text-brand-night/20" />
      ),
    )}
  </div>
);
