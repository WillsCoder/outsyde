"use client";

import { useState } from "react";
import Link from "next/link";
import {
  IconSearch,
  IconEdit,
  IconTrash,
  IconPlus,
  IconChevronUp,
  IconChevronDown,
} from "@tabler/icons-react";
import { useTransition } from "react";

type Column<T> = {
  key: string;
  label: string;
  render: (row: T) => React.ReactNode;
  sortable?: boolean;
};

type Props<T extends { id: string }> = {
  title: string;
  data: T[];
  columns: Column<T>[];
  newHref: string;
  editHref: (row: T) => string;
  onDelete: (id: string) => Promise<void>;
  searchKeys?: (keyof T)[];
};

export default function AdminTable<T extends { id: string }>({
  title,
  data,
  columns,
  newHref,
  editHref,
  onDelete,
  searchKeys = [],
}: Props<T>) {
  const [q, setQ] = useState("");
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [isPending, startTransition] = useTransition();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filtered = data.filter(
    (row) =>
      searchKeys.length === 0 ||
      q === "" ||
      searchKeys.some((k) =>
        String(row[k]).toLowerCase().includes(q.toLowerCase()),
      ),
  );

  const handleDelete = (id: string) => {
    if (!confirm("Delete this item? This cannot be undone.")) return;
    setDeletingId(id);
    startTransition(async () => {
      await onDelete(id);
      setDeletingId(null);
    });
  };

  const handleSort = (key: string) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-brand-night">{title}</h1>
        <Link
          href={newHref}
          className="inline-flex items-center gap-1.5 text-xs font-medium bg-brand-orange text-white rounded-lg px-3 py-2 hover:opacity-90 transition-opacity"
        >
          <IconPlus size={13} /> New
        </Link>
      </div>

      {/* Search */}
      <div className="relative">
        <IconSearch
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-night/30 pointer-events-none"
        />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={`Search ${title.toLowerCase()}…`}
          className="w-full h-9 bg-white border border-brand-night/10 rounded-lg pl-8 pr-4 text-sm text-brand-night placeholder:text-brand-night/30 outline-none focus:border-brand-orange transition-colors"
        />
      </div>

      {/* Table */}
      <div className="bg-white border border-brand-night/8 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-brand-night/7 bg-brand-sand/50">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    onClick={() => col.sortable && handleSort(col.key)}
                    className={`text-left px-4 py-3 text-xs font-semibold text-brand-night/50 uppercase tracking-wider ${col.sortable ? "cursor-pointer hover:text-brand-night" : ""}`}
                  >
                    <span className="flex items-center gap-1">
                      {col.label}
                      {col.sortable &&
                        sortKey === col.key &&
                        (sortDir === "asc" ? (
                          <IconChevronUp size={12} />
                        ) : (
                          <IconChevronDown size={12} />
                        ))}
                    </span>
                  </th>
                ))}
                <th className="text-right px-4 py-3 text-xs font-semibold text-brand-night/50 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-night/5">
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length + 1}
                    className="px-4 py-12 text-center text-sm text-brand-night/40"
                  >
                    {q ? "No results found" : `No ${title.toLowerCase()} yet`}
                  </td>
                </tr>
              ) : (
                filtered.map((row) => (
                  <tr
                    key={row.id}
                    className={`hover:bg-brand-sand/30 transition-colors ${deletingId === row.id ? "opacity-40" : ""}`}
                  >
                    {columns.map((col) => (
                      <td
                        key={col.key}
                        className="px-4 py-3 text-brand-night/70"
                      >
                        {col.render(row)}
                      </td>
                    ))}
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={editHref(row)}
                          className="w-7 h-7 rounded-lg flex items-center justify-center text-brand-night/40 hover:text-brand-night hover:bg-brand-sand transition-all"
                        >
                          <IconEdit size={13} />
                        </Link>
                        <button
                          onClick={() => handleDelete(row.id)}
                          disabled={isPending}
                          className="w-7 h-7 rounded-lg flex items-center justify-center text-brand-night/40 hover:text-red-500 hover:bg-red-50 transition-all disabled:opacity-40"
                        >
                          <IconTrash size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-2.5 border-t border-brand-night/7 bg-brand-sand/30">
          <p className="text-xs text-brand-night/40">
            {filtered.length} of {data.length} {title.toLowerCase()}
          </p>
        </div>
      </div>
    </div>
  );
}
