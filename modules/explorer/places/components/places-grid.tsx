"use client";

import { Place } from "@/lib/const/types/places";
import PlaceCard from "./place-card";

export default function PlacesGrid({ places, savedPlaces }: { places: Place[], savedPlaces: string[] }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-1.5 md:gap-4">
      {places.map((place, i) => (
        <PlaceCard key={place.id} place={place} featured={i === 0} isSaved={savedPlaces.includes(place.id)} />
      ))}
    </div>
  );
}
