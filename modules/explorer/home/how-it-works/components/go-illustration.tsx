export const GoIllustration = () => (
  <div className="absolute inset-0 p-5 overflow-hidden">
    {/* Map with route */}
    <div className="absolute top-6 left-4 right-4 bg-brand-night/5 rounded-2xl overflow-hidden h-44">
      <svg
        className="w-full h-full"
        viewBox="0 0 300 176"
        preserveAspectRatio="xMidYMid slice"
      >
        <rect width="300" height="176" fill="#1D2B1F" />
        <line
          x1="0"
          y1="60"
          x2="300"
          y2="60"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="10"
        />
        <line
          x1="0"
          y1="110"
          x2="300"
          y2="110"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="8"
        />
        <line
          x1="100"
          y1="0"
          x2="100"
          y2="176"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="10"
        />
        <line
          x1="200"
          y1="0"
          x2="200"
          y2="176"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="8"
        />
        <rect
          x="10"
          y="10"
          width="80"
          height="42"
          rx="4"
          fill="rgba(255,255,255,0.04)"
        />
        <rect
          x="110"
          y="10"
          width="80"
          height="42"
          rx="4"
          fill="rgba(255,255,255,0.04)"
        />
        <rect
          x="10"
          y="68"
          width="80"
          height="34"
          rx="4"
          fill="rgba(255,255,255,0.04)"
        />
        {/* Route dots */}
        <circle cx="60" cy="140" r="5" fill="#F5A623" />
        <circle cx="80" cy="120" r="3" fill="rgba(245,166,35,0.5)" />
        <circle cx="100" cy="100" r="3" fill="rgba(245,166,35,0.5)" />
        <circle cx="130" cy="80" r="3" fill="rgba(245,166,35,0.5)" />
        <circle cx="160" cy="65" r="3" fill="rgba(245,166,35,0.5)" />
        {/* Destination pin */}
        <circle cx="180" cy="50" r="14" fill="rgba(255,92,43,0.3)" />
        <circle cx="180" cy="50" r="8" fill="#FF5C2B" />
        <circle cx="180" cy="50" r="3" fill="white" />
      </svg>
    </div>

    {/* Review card */}
    <div className="absolute top-55 left-4 right-4 bg-white/70 backdrop-blur-sm border border-brand-night/8 rounded-xl p-3">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-7 h-7 rounded-full bg-brand-orange flex items-center justify-center text-white text-xs font-bold">
          A
        </div>
        <div className="flex-1">
          <p className="text-xs font-semibold text-brand-night">Adaeze O.</p>
          <p className="text-[10px] text-brand-gold">★★★★★</p>
        </div>
        <span className="text-[10px] text-brand-night/30">2d ago</span>
      </div>
      <p className="text-[11px] text-brand-night/60 leading-relaxed">
        Great vibes, best cocktails in VI. Will definitely be back! 🔥
      </p>
    </div>

    {/* Second review */}
    <div className="absolute top-70 left-8 right-0 bg-white/60 backdrop-blur-sm border border-brand-night/8 rounded-xl p-3 mt-2">
      <div className="flex items-center gap-2 mb-1">
        <div className="w-6 h-6 rounded-full bg-brand-lagoon flex items-center justify-center text-white text-[10px] font-bold">
          K
        </div>
        <p className="text-xs font-semibold text-brand-night">Kunle B.</p>
        <p className="text-[10px] text-brand-gold ml-1">★★★★☆</p>
      </div>
      <p className="text-[11px] text-brand-night/60">
        Solid spot for a Saturday evening 👌
      </p>
    </div>

    {/* Third review */}
    <div className="absolute top-86 left-11 right-0 bg-white/60 backdrop-blur-sm border border-brand-night/8 rounded-xl p-3 mt-2">
      <div className="flex items-center gap-2 mb-1">
        <div className="w-6 h-6 rounded-full bg-brand-night flex items-center justify-center text-white text-[10px] font-bold">
          P
        </div>
        <p className="text-xs font-semibold text-brand-night">Peculiar T.</p>
        <p className="text-[10px] text-brand-gold ml-1">★★★★☆</p>
      </div>
      <p className="text-[11px] text-brand-night/60">
        Music and vibes all the way 👌
      </p>
    </div>
  </div>
);