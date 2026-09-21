import { IconMapPin } from "@tabler/icons-react";

export default function PlaceMap({
  lat,
  lng,
  name,
  address,
}: {
  lat: number;
  lng: number;
  name: string;
  address: string;
}) {
  const src = `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${lat},${lng}&zoom=16`;

  return (
    <div className="bg-white rounded-2xl p-5">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-semibold text-brand-night">Location</h2>
        <a
          href={`https://maps.google.com/?q=${lat},${lng}`}
          target="_blank"
          className="text-xs text-brand-orange font-medium"
        >
          Open in Maps →
        </a>
      </div>
      <div className="w-full h-52 rounded-xl overflow-hidden">
        <iframe
          src={src}
          width="100%"
          height="100%"
          loading="lazy"
          className="border-0"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <p className="text-sm text-brand-night/60 mt-3 flex items-start gap-1.5">
        <IconMapPin
          size={14}
          className="text-brand-orange flex-shrink-0 mt-0.5"
        />
        <span>
          {address} · {name}
        </span>
      </p>
    </div>
  );
}
