"use client"
import React from 'react'
import AdminTable from '@/components/page-elements/admin/table';
import { PlaceDetail } from "@/lib/const/types/places";
import { formatDistanceToNow } from 'date-fns';

interface Props {
  places: PlaceDetail[];
  deletePlace: (id: string) => Promise<void>;
}
const AdminPlaceIndex = ({ places, deletePlace }: Props) => {
  return (
    <AdminTable
      title="Places"
      data={places}
      newHref="/admin/places/new"
      editHref={(p) => `/admin/places/${p.id}`}
      onDelete={deletePlace}
      searchKeys={["name", "city", "address"]}
      columns={[
        {
          key: "name",
          label: "Name",
          sortable: true,
          render: (p) => (
            <div>
              <p className="font-medium text-brand-night">{p.name}</p>
              <p className="text-xs text-brand-night/40">{p.address}</p>
            </div>
          ),
        },
        {
          key: "category",
          label: "Category",
          render: (p) => (
            <span className="text-xs font-medium bg-brand-sand text-brand-night/60 rounded-full px-2.5 py-1">
              {p?.category?.name}
            </span>
          ),
        },
        {
          key: "costLevel",
          label: "Cost",
          render: (p) => (
            <span className="text-brand-gold">{"₦".repeat(p.costLevel)}</span>
          ),
        },
        {
          key: "stats",
          label: "Reviews",
          render: (p) => (
            <span className="text-xs text-brand-night/50">
              {p._count.ratings} reviews
            </span>
          ),
        },
        {
          key: "isPublished",
          label: "Status",
          sortable: true,
          render: (p) => (
            <span
              className={`text-[10px] font-medium rounded-full px-2.5 py-1 ${p.isPublished ? "bg-brand-lagoon/10 text-brand-lagoon" : "bg-brand-night/7 text-brand-night/40"}`}
            >
              {p.isPublished ? "Live" : "Draft"}
            </span>
          ),
        },
        {
          key: "createdAt",
          label: "Added",
          sortable: true,
          render: (p) => (
            <span className="text-xs text-brand-night/40">
              {formatDistanceToNow(new Date(p.createdAt), { addSuffix: true })}
            </span>
          ),
        },
      ]}
    />
  );
}

export default AdminPlaceIndex