export const SaveIllustration = () => (
  <div className="absolute inset-0 p-5 overflow-hidden">
    {/* Bookmarked list UI */}
    <div className="absolute top-8 left-4 right-4 flex flex-col gap-2">
      <div className="bg-white/70 backdrop-blur-sm border border-brand-night/8 rounded-xl p-3">
        <p className="text-[10px] font-medium text-brand-night/40 tracking-wider uppercase mb-2">
          My saved spots
        </p>
        {[
          {
            name: "The Backyard, VI",
            emoji: "🍹",
            saved: true,
            color: "bg-brand-orange/10 text-brand-orange",
          },
          {
            name: "Cactus Restaurant",
            emoji: "🍽",
            saved: true,
            color: "bg-brand-lagoon/10 text-brand-lagoon",
          },
          {
            name: "Afrobeat Live Night",
            emoji: "🎵",
            saved: true,
            color: "bg-brand-gold/10 text-brand-gold",
          },
        ].map((item) => (
          <div
            key={item.name}
            className="flex items-center gap-2.5 py-2 border-b border-brand-night/5 last:border-0"
          >
            <span
              className={`text-xs font-medium w-6 h-6 rounded-lg flex items-center justify-center ${item.color}`}
            >
              {item.emoji}
            </span>
            <span className="text-xs font-medium text-brand-night flex-1 truncate">
              {item.name}
            </span>
            <span
              className={`text-sm ${item.saved ? "text-brand-orange" : "text-brand-night/20"}`}
            >
              {item.saved ? "♥" : "♡"}
            </span>
          </div>
        ))}
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { n: "4", l: "Saved", c: "text-brand-orange" },
          { n: "2", l: "This wknd", c: "text-brand-lagoon" },
          { n: "1", l: "Tonight", c: "text-brand-gold" },
        ].map((s) => (
          <div
            key={s.l}
            className="bg-white/70 backdrop-blur-sm border border-brand-night/8 rounded-xl p-2 text-center"
          >
            <p className={`text-lg font-bold ${s.c}`}>{s.n}</p>
            <p className="text-[9px] text-brand-night/40 mt-0.5">{s.l}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);
