export const DiscoverIllustration = () => (
  <div className="absolute inset-0 p-5 overflow-hidden">
    {/* Map grid background */}
    <svg
      className="absolute inset-0 w-full h-full opacity-10"
      viewBox="0 0 400 500"
      preserveAspectRatio="xMidYMid slice"
    >
      <line
        x1="0"
        y1="100"
        x2="400"
        y2="100"
        stroke="#111110"
        strokeWidth="1"
      />
      <line
        x1="0"
        y1="200"
        x2="400"
        y2="200"
        stroke="#111110"
        strokeWidth="1"
      />
      <line
        x1="0"
        y1="300"
        x2="400"
        y2="300"
        stroke="#111110"
        strokeWidth="1"
      />
      <line
        x1="0"
        y1="400"
        x2="400"
        y2="400"
        stroke="#111110"
        strokeWidth="1"
      />
      <line
        x1="100"
        y1="0"
        x2="100"
        y2="500"
        stroke="#111110"
        strokeWidth="1"
      />
      <line
        x1="200"
        y1="0"
        x2="200"
        y2="500"
        stroke="#111110"
        strokeWidth="1"
      />
      <line
        x1="300"
        y1="0"
        x2="300"
        y2="500"
        stroke="#111110"
        strokeWidth="1"
      />
    </svg>

    {/* Floating place cards */}
    <div className="absolute top-8 left-4 right-4 flex flex-col gap-3">
      {[
        {
          name: "The Backyard, VI",
          cat: "Bar & Lounge",
          color: "bg-brand-orange",
          rating: "4.8",
        },
        {
          name: "Tarkwa Bay Beach",
          cat: "Beach",
          color: "bg-brand-lagoon",
          rating: "4.7",
        },
        {
          name: "Quilox Club",
          cat: "Nightclub",
          color: "bg-[#534AB7]",
          rating: "4.5",
        },
      ].map((place, i) => (
        <div
          key={place.name}
          style={{ transform: `translateX(${i % 2 === 0 ? "0px" : "16px"})` }}
          className="flex items-center gap-3 bg-white/80 backdrop-blur-sm border border-brand-night/8 rounded-xl px-3 py-2.5 shadow-sm"
        >
          <div className={`w-8 h-8 rounded-lg ${place.color} shrink-0`} />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-brand-night truncate">
              {place.name}
            </p>
            <p className="text-[10px] text-brand-night/50">{place.cat}</p>
          </div>
          <span className="text-xs font-medium text-brand-gold shrink-0">
            ★ {place.rating}
          </span>
        </div>
      ))}
    </div>

    {/* Map pin */}
    <div className="absolute bottom-32 right-8 flex flex-col items-center gap-1">
      <div className="w-10 h-10 rounded-full bg-brand-orange/20 flex items-center justify-center">
        <div className="w-6 h-6 rounded-full bg-brand-orange flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-white" />
        </div>
      </div>
      <div className="w-px h-4 bg-brand-orange/40" />
      <div className="w-1.5 h-1.5 rounded-full bg-brand-orange/30" />
    </div>
  </div>
);
