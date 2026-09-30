"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback, useState, useTransition } from "react";
import {
  IconAdjustmentsHorizontal,
  IconArrowsUpDown,
  IconX,
} from "@tabler/icons-react";
import { SearchBar } from "@/components/ui";

const areas = [
  "Lekki",
  "Victoria Island",
  "Ikoyi",
  "Yaba",
  "Ikeja",
  "Surulere",
];
const costOptions = [
  { label: "Budget", value: "1" },
  { label: "Mid-range", value: "2" },
  { label: "Premium", value: "3" },
];
const sortOptions = [
  { label: "Newest", value: "newest" },
  { label: "Top rated", value: "rating" },
  { label: "Most reviewed", value: "reviews" },
];

export default function PlacesFilters({
  categories,
  total,
}: {
  categories: { id: string; name: string; slug: string; icon: string }[];
  total: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [showMoreFilters, setShowMoreFilters] = useState(false);

  const get = (key: string) => searchParams.get(key) ?? "";

  const set = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) params.set(key, value);
      else params.delete(key);
      startTransition(() => router.push(`${pathname}?${params.toString()}`));
    },
    [searchParams, pathname, router],
  );

  const toggle = useCallback(
    (key: string, value: string) => {
      set(key, get(key) === value ? "" : value);
    },
    [get, set],
  );

  const clearAll = () => {
    startTransition(() => router.push(pathname));
  };

  const activeCount = ["q", "category", "area", "cost", "sort"].filter((k) =>
    get(k),
  ).length;

  return (
    <div className="mb-6 flex flex-col gap-3">
      {/* Search bar */}
      <SearchBar set={set} get={get}/>

      {/* Filter row */}
      <div className="flex items-center gap-0.5 lg:gap-2 flex-wrap">
        {/* All */}
        <button
          onClick={clearAll}
          className={`text-xs font-medium px-3.5 py-1.5 rounded-full border transition-all ${
            activeCount === 0
              ? "bg-brand-night text-white border-brand-night"
              : "bg-white text-brand-night/60 border-brand-night/15 hover:border-brand-night/30"
          }`}
        >
          All
        </button>

        {/* Category pills */}
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => toggle("category", cat.slug)}
            className={`text-xs font-medium px-3.5 py-1.5 rounded-full border transition-all ${
              get("category") === cat.slug
                ? "bg-brand-orange text-white border-brand-orange"
                : "bg-white text-brand-night/60 border-brand-night/15 hover:border-brand-orange/40 hover:text-brand-orange"
            }`}
          >
            {cat.name}
          </button>
        ))}

        <div className="w-px h-5 bg-brand-night/12 mx-1 hidden sm:block" />

        {/* Area pills */}
        {/* {areas.map((area) => (
          <button
            key={area}
            onClick={() => toggle("area", area)}
            className={`text-xs font-medium px-3.5 py-1.5 rounded-full border transition-all ${
              get("area") === area
                ? "bg-brand-night text-white border-brand-night"
                : "bg-white text-brand-night/60 border-brand-night/15 hover:border-brand-night/30"
            }`}
          >
            {area}
          </button>
        ))} */}

        <div className="ml-auto flex items-center gap-2">
          {/* Cost dropdown */}
          <div className="relative">
            <select
              value={get("cost")}
              onChange={(e) => set("cost", e.target.value)}
              className={`appearance-none text-xs font-medium pl-3 pr-8 py-1.5 rounded-full border bg-white cursor-pointer outline-none transition-all ${
                get("cost")
                  ? "border-brand-orange text-brand-orange"
                  : "border-brand-night/15 text-brand-night/60"
              }`}
            >
              <option value="">💰 Cost: Any</option>
              {costOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <IconAdjustmentsHorizontal
              size={12}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-brand-night/40 pointer-events-none"
            />
          </div>

          {/* Sort dropdown */}
          <div className="relative">
            <select
              value={get("sort")}
              onChange={(e) => set("sort", e.target.value)}
              className={`appearance-none text-xs font-medium pl-3 pr-8 py-1.5 rounded-full border bg-white cursor-pointer outline-none transition-all ${
                get("sort")
                  ? "border-brand-orange text-brand-orange"
                  : "border-brand-night/15 text-brand-night/60"
              }`}
            >
              <option value="">↕ Sort</option>
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <IconArrowsUpDown
              size={12}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-brand-night/40 pointer-events-none"
            />
          </div>
        </div>
      </div>

      {/* Results + active filters summary */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-brand-night/50">
          {isPending ? (
            <span className="animate-pulse">Searching…</span>
          ) : (
            <>
              <strong className="text-brand-night">{total} places</strong>
              {get("area") ? ` in ${get("area")}` : " in Lagos"}
            </>
          )}
        </p>

        {activeCount > 0 && (
          <button
            onClick={clearAll}
            className="flex items-center gap-1.5 text-xs font-medium text-brand-orange hover:text-brand-night transition-colors"
          >
            <IconX size={12} /> Clear filters ({activeCount})
          </button>
        )}
      </div>
    </div>
  );
}
