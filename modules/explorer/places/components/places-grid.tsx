"use client";

import PlaceCard from "./place-card";

export default function PlacesGrid({ places }: { places: any[] }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
      {places.map((place, i) => (
        <PlaceCard key={place.id} place={place} featured={i === 0} />
      ))}
    </div>
  );
}
