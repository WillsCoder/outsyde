"use client";
import Link from "next/link";
import { Place } from "@/lib/const/types/places";
import PlacesGrid from "../../places/components/places-grid";
import { IconMapPin, IconPlus } from "@tabler/icons-react";

interface Props {
  places: Place[];
}
const SavedPlacesIndex = ({ places }: Props) => {
  return (
    <div className="section pt-4">
      <div className="box">
        <div className="flex flex-col gap-6">
          {/* Cover */}
          <div className="relative h-32 bg-brand-night sm:h-44 rounded-2xl">
            <div className="absolute rounded-2xl inset-0 bg-linear-to-br from-brand-night via-brand-night to-brand-orange/80" />

            <div className="absolute -right-20 -top-32 h-72 w-72 rounded-full bg-brand-gold/20 blur-3xl" />
            <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-brand-lagoon/20 blur-3xl" />
            {/* Header */}
            <div className="h-full p-5 flex items-center justify-between relative text-brand-sand">
              <div>
                <h1 className="text-2xl font-bold text-brand-sand tracking-tight">
                  Saved Places
                </h1>
                <p className="text-sm text-brand-sand/50 mt-1">
                  Manage your saved places and locations
                </p>
              </div>
              <Link
                href="/places"
                className="inline-flex items-center gap-1.5 text-sm font-medium bg-brand-orange text-white rounded-xl px-4 py-2.5 hover:opacity-90 transition-opacity"
              >
                <IconPlus size={14} /> Add New Places
              </Link>
            </div>
          </div>

          <div>
            <div>
              {places.length > 0 ? (
                <PlacesGrid places={places} savedPlaces={places.map((tem) => tem.id)} />
              ) : (
                <EmptyPlaces />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavedPlacesIndex;

const EmptyPlaces = () => {
  return (
    <div className="flex min-h-100 flex-col items-center justify-center rounded-xl border border-brand-night/10 bg-brand-sand/2 px-6 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-orange/10">
        <IconMapPin className="h-6 w-6 text-brand-orange" />
      </div>

      <h3 className="text-lg font-semibold text-brand-night">
        No saved places yet
      </h3>

      <p className="mt-2 max-w-sm text-sm text-brand-night/50">
        Places you save will appear here so you can easily find them again.
      </p>
    </div>
  );
};
