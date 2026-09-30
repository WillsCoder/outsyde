"use client";
import React, { startTransition, useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SearchBar } from "@/components/ui";

const FilterEvent = () => {
  const searchParam = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const get = (key: string) => searchParam.get(key) ?? "";

  const set = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParam.toString());
      if (value) params.set(key, value);
      else params.delete(key);
      startTransition(() => router.push(`${pathname}?${params.toString()}`));
    },
    [searchParam, pathname, router],
  );

  return <SearchBar get={get} set={set} />;
};

export default FilterEvent;
