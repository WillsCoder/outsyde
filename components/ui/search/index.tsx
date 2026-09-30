import React from "react";
import { IconSearch, IconX } from "@tabler/icons-react";

interface Props {
  get: (key: string) => string;
  set: (key: string, value: string) => void;
}
export const SearchBar = ({ get, set }: Props) => {
  return (
    <div className="relative">
      <IconSearch
        size={16}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-night/40 pointer-events-none"
      />
      <input
        type="text"
        defaultValue={get("q")}
        onChange={(e) => set("q", e.target.value)}
        placeholder="Search bars, restaurants, beaches in Lagos…"
        className="w-full h-12 bg-white border border-brand-night/12 rounded-xl pl-10 pr-24 text-sm text-brand-night placeholder:text-brand-night/35 outline-none focus:border-brand-orange transition-colors"
      />
      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
        {get("q") && (
          <button
            onClick={() => set("q", "")}
            className="text-brand-night/40 hover:text-brand-night transition-colors"
          >
            <IconX size={14} />
          </button>
        )}
        <span className="text-[11px] text-brand-night/30 bg-brand-sand border border-brand-night/10 rounded-md px-1.5 py-0.5 hidden sm:block">
          ⌘K
        </span>
      </div>
    </div>
  );
};

