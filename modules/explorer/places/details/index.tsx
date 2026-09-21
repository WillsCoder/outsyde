import { notFound } from 'next/navigation'
import { IconMapPin, IconHeart, IconShare } from '@tabler/icons-react'
import Gallery from './components/gallery'
import PlaceMap from './components/place-map'
import ReviewSection from './components/review'
import { PlaceDetail } from '@/lib/const/types/places'


interface PlaceDetailsIndexProps {
  place: PlaceDetail;
  avgRating: string | null;
  costLabel: string;
}
const PlaceDetailsIndex = async ({ place, avgRating, costLabel }: PlaceDetailsIndexProps) => {

  return (
    <main>
      {/* Gallery */}
      <Gallery images={place.images} placeName={place.name} />

      <div className="box py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">

          {/* LEFT */}
          <div className="flex flex-col gap-8">

            {/* Header */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-medium bg-brand-orange/10 text-brand-orange rounded-full px-3 py-1">
                  {place.category?.name}
                </span>
                <span className="text-xs font-medium bg-brand-lagoon/10 text-brand-lagoon rounded-full px-3 py-1">
                  ● Open now
                </span>
                <span className="text-xs font-medium bg-brand-night/7 text-brand-night/60 rounded-full px-3 py-1">
                  ₦ {costLabel}
                </span>
              </div>

              <h1 className="text-4xl font-bold text-brand-night tracking-tight">{place.name}</h1>

              <div className="flex items-center gap-4 flex-wrap">
                {avgRating && (
                  <div className="flex items-center gap-2">
                    <span className="text-brand-gold text-lg">{'★'.repeat(Math.round(Number(avgRating)))}</span>
                    <span className="text-xl font-bold text-brand-night">{avgRating}</span>
                    <span className="text-sm text-brand-night/50">({place.ratings?.length} reviews)</span>
                  </div>
                )}
                <span className="flex items-center gap-1 text-sm text-brand-night/50">
                  <IconMapPin size={14} /> {place.address}, {place.city}
                </span>
              </div>

              <div className="flex gap-2 flex-wrap">
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lng}`}
                  target="_blank"
                  className="inline-flex items-center gap-2 text-sm font-medium bg-brand-orange text-white rounded-xl px-4 py-2.5"
                >
                  <IconMapPin size={14} /> Get directions
                </a>
                <button className="inline-flex items-center gap-2 text-sm font-medium bg-white border border-brand-night/15 text-brand-night rounded-xl px-4 py-2.5 hover:bg-brand-night hover:text-white transition-all">
                  <IconHeart size={14} /> Save
                </button>
                <button className="inline-flex items-center gap-2 text-sm font-medium bg-white border border-brand-night/15 text-brand-night rounded-xl px-4 py-2.5 hover:bg-brand-night hover:text-white transition-all">
                  <IconShare size={14} /> Share
                </button>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl p-6">
              <h2 className="text-base font-semibold text-brand-night mb-3">About this place</h2>
              <p className="text-sm text-brand-night/60 leading-relaxed">{place.description}</p>
            </div>

            {/* Map */}
            <PlaceMap lat={place.lat} lng={place.lng} name={place.name} address={place.address} />

            {/* Reviews */}
            <ReviewSection
              placeId={place.id}
              ratings={place.ratings}
              comments={place.comments}
              avgRating={Number(avgRating)}
            />
          </div>

          {/* RIGHT SIDEBAR — build as a separate QuickInfoCard component */}
        </div>
      </div>
    </main>
  )
}

export default PlaceDetailsIndex