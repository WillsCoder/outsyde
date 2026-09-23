import Link from "next/link";
import Image from "next/image";

const costDots = (level: number) =>
  [1, 2, 3].map((i) => (
    <span
      key={i}
      className={`w-1.5 h-1.5 rounded-full ${i <= level ? "bg-brand-gold" : "bg-brand-night/15"}`}
    />
  ));

const avgRating = (ratings: { score: number }[]) =>
  ratings?.length
    ? (ratings.reduce((s, r) => s + r.score, 0) / ratings.length).toFixed(1)
    : null;

export default function PlaceCard({
  place,
  featured = false,
}: {
  place: any;
  featured?: boolean;
}) {
  const rating = avgRating(place?.ratings);

  return (
    <Link
      href={`/places/${place?.slug}`}
      className={`group bg-white rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-200 ${featured ? "col-span-2" : ""}`}
    >
      <div className={`relative overflow-hidden ${featured ? "h-56" : "h-48"}`}>
        {place?.images?.[0] ? (
          <Image
            src={place?.images?.[0]?.url}
            alt={place.name}
            width={800}
            height={800}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-brand-night/10" />
        )}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-2">
          {featured && (
            <span className="text-[10px] font-medium bg-brand-orange text-white rounded-full px-2.5 py-1">
              ⭐ Featured
            </span>
          )}
          <span className="text-[10px] font-medium bg-brand-night/70 text-white rounded-full px-2.5 py-1 backdrop-blur-sm">
            {place?.category?.name}
          </span>
        </div>
        <button
          onClick={(e) => e.preventDefault()}
          className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/90 flex items-center justify-center text-brand-night/50 hover:text-brand-orange transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        </button>
      </div>

      <div className="p-3.5">
        <p className="text-[10px] font-medium tracking-wider uppercase text-brand-night/40 mb-1">
          {place?.category?.name}
        </p>
        <h3 className="text-[15px] font-semibold text-brand-night tracking-tight mb-1.5">
          {place.name}
        </h3>
        <div className="flex items-center gap-2">
          {rating && (
            <>
              <span className="flex items-center gap-1 text-xs font-medium text-brand-night">
                ⭐ {rating}
              </span>
              <span className="text-[11px] text-brand-night/40">
                ({place?.ratings?.length} reviews)
              </span>
            </>
          )}
          <span className="ml-auto flex items-center gap-1 text-xs text-brand-night/50">
            📍 {place.city}
          </span>
        </div>
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-brand-night/7">
          <div className="flex gap-0.5">{costDots(place.costLevel)}</div>
          <span
            className={`text-[10px] font-medium rounded-full px-2 py-0.5 ${place.isPublished ? "bg-brand-lagoon/10 text-brand-lagoon" : "bg-brand-night/7 text-brand-night/40"}`}
          >
            Open now
          </span>
        </div>
      </div>
    </Link>
  );
}
