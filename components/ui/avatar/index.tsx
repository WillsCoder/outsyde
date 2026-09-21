export const Avatar = ({
  name,
  image,
}: {
  name: string | null;
  image: string | null;
}) => {
  const initials = name?.charAt(0).toUpperCase() ?? "?";
  const colors = [
    "bg-brand-orange",
    "bg-brand-lagoon",
    "bg-brand-gold",
    "bg-[#534AB7]",
  ];
  const color = colors[(name?.charCodeAt(0) ?? 0) % colors.length];

  if (image) {
    return (
      <img
        src={image}
        alt={name ?? ""}
        className="w-8 h-8 rounded-full object-cover flex-shrink-0"
      />
    );
  }
  return (
    <div
      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold text-white flex-shrink-0 ${color}`}
    >
      {initials}
    </div>
  );
};
