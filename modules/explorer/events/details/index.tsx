import React from 'react'
import Link from 'next/link';
import { EventDetail } from "@/lib/const/types/event";
import { formatNaira } from '@/lib/utils/format-money';
import ReviewSection from '../../places/details/components/review';


interface Props {
    event: EventDetail;
}
const EventDetailsIndex = async({ event }: Props) => {
    
    const start = new Date(event.startTime);
    const end = event.endTime ? new Date(event.endTime) : null;
    const venue = event.place?.name ?? event.address ?? "Venue TBA";

    const mapsUrl =
      event.lat != null && event.lng != null
        ? `https://www.google.com/maps/dir/?api=1&destination=${event.lat},${event.lng}`
        : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${venue} ${event.city}`)}`;
    
    const dateStr = start.toLocaleDateString("en-NG", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    const timeStr = start.toLocaleTimeString("en-NG", {
      hour: "numeric",
      minute: "2-digit",
    });
    const endTimeStr = end
      ? end.toLocaleTimeString("en-NG", { hour: "numeric", minute: "2-digit" })
      : null;

   return (
     <main className="min-h-screen bg-brand-sand pb-20">
       {/* ── hero ── */}
       <div className="relative aspect-16/10 w-full overflow-hidden bg-brand-night sm:aspect-21/9">
         {event.imageUrl ? (
           // eslint-disable-next-line @next/next/no-img-element
           <img
             src={event.imageUrl}
             alt={event.title}
             className="h-full w-full object-cover"
           />
         ) : (
           <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-brand-orange/30 to-brand-gold/20 text-6xl">
             🎉
           </div>
         )}
         <div className="cover-gradient absolute inset-0" />

         {/* top bar */}
         <div className="absolute inset-x-0 top-0">
           <div className="box flex items-center justify-between py-4!">
             <Link
               href="/events"
               className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-brand-night backdrop-blur transition-transform hover:scale-105"
               aria-label="Back to events"
             >
               ←
             </Link>
             <div className="flex gap-2">
               {event.isFeatured && (
                 <span className="rounded-full bg-brand-gold px-3 py-1.5 text-xs font-bold text-brand-night">
                   ⭐ Featured
                 </span>
               )}
               <span className="rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-brand-night backdrop-blur">
                 {event.category}
               </span>
             </div>
           </div>
         </div>

         {/* title overlay */}
         <div className="absolute inset-x-0 bottom-0">
           <div className="box pb-8">
             <h1 className="max-w-3xl font-display text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
               {event.title}
             </h1>
             <p className="mt-2 text-sm font-medium text-white/80">
               {start.toLocaleDateString("en-NG", {
                 weekday: "short",
                 day: "numeric",
                 month: "short",
               })}
               {" · "}
               {timeStr}
               {endTimeStr ? ` – ${endTimeStr}` : ""} · {venue}
             </p>
           </div>
         </div>
       </div>

       {/* ── body ── */}
       <div className="box mt-8">
         <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
           {/* main column */}
           <div className="min-w-0">
             <h2 className="text-xs font-semibold uppercase tracking-widest text-brand-orange">
               About this event
             </h2>
             <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-brand-night/80 sm:text-base">
               {event.description}
             </p>

             {/* venue */}
             <h2 className="mt-10 text-xs font-semibold uppercase tracking-widest text-brand-orange">
               Location
             </h2>
             <div className="mt-3 flex items-center justify-between gap-4 rounded-2xl border border-brand-night/10 bg-white p-5">
               <div className="flex min-w-0 items-start gap-3">
                 <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-orange/10 text-brand-orange">
                   <svg
                     width="16"
                     height="16"
                     viewBox="0 0 24 24"
                     fill="none"
                     stroke="currentColor"
                     strokeWidth="2"
                   >
                     <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                     <circle cx="12" cy="10" r="3" />
                   </svg>
                 </span>
                 <div className="min-w-0">
                   <p className="truncate font-display text-sm font-bold text-brand-night">
                     {venue}
                   </p>
                   <p className="mt-0.5 text-xs text-brand-night/60">
                     {event.address ?? event.city}
                   </p>
                 </div>
               </div>
               <a
                 href={mapsUrl}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="shrink-0 rounded-full border border-brand-night/15 px-4 py-2 text-xs font-bold text-brand-night transition-colors hover:border-brand-orange hover:text-brand-orange"
               >
                 Directions
               </a>
             </div>

             {/* comments */}
             <div className="mt-10">
               {/* <CommentSection
                 eventId={event.id}
                 slug={event.slug}
                 comments={event.comments}
                 isLoggedIn={!!session?.user}
               /> */}
               <ReviewSection
                 placeId={event.id}
                 ratings={[]}
                 comments={event.comments}
                 avgRating={0}
               />
             </div>
           </div>

           {/* sidebar */}
           <aside className="lg:sticky lg:top-24 lg:self-start">
             <div className="rounded-2xl border border-brand-night/10 bg-white p-6">
               <div className="flex items-baseline justify-between">
                 {event.ticketType === "FREE" ? (
                   <span className="font-display text-2xl font-extrabold text-brand-lagoon">
                     Free
                   </span>
                 ) : (
                   <span className="font-display text-2xl font-extrabold text-brand-night">
                     {event.ticketPrice != null
                       ? formatNaira(event.ticketPrice)
                       : "Paid"}
                   </span>
                 )}
                 <span className="text-xs text-brand-night/50">per person</span>
               </div>

               <div className="mt-5 space-y-3 border-t border-brand-night/10 pt-5 text-sm">
                 <p className="flex justify-between gap-4">
                   <span className="text-brand-night/50">Date</span>
                   <span className="text-right font-semibold text-brand-night">
                     {dateStr}
                   </span>
                 </p>
                 <p className="flex justify-between gap-4">
                   <span className="text-brand-night/50">Time</span>
                   <span className="text-right font-semibold text-brand-night">
                     {timeStr}
                     {endTimeStr ? ` – ${endTimeStr}` : ""}
                   </span>
                 </p>
                 <p className="flex justify-between gap-4">
                   <span className="text-brand-night/50">Venue</span>
                   <span className="text-right font-semibold text-brand-night">
                     {venue}
                   </span>
                 </p>
               </div>

               {event.ticketUrl ? (
                 <a
                   href={event.ticketUrl}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="mt-6 flex h-12 w-full items-center justify-center rounded-full bg-brand-orange text-sm font-bold text-brand-night transition-transform hover:scale-[1.02] active:scale-[0.98]"
                 >
                   {event.ticketType === "FREE" ? "RSVP" : "Get tickets →"}
                 </a>
               ) : (
                 <button
                   disabled
                   className="mt-6 h-12 w-full cursor-not-allowed rounded-full bg-brand-night/10 text-sm font-bold text-brand-night/40"
                 >
                   Tickets coming soon
                 </button>
               )}

               <p className="mt-3 text-center text-[11px] text-brand-night/40">
                 Always confirm event details with the venue before heading out.
               </p>
             </div>
           </aside>
         </div>
       </div>
     </main>
   );
}

export default EventDetailsIndex