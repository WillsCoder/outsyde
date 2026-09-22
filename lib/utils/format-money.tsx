const nairaFormatter = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
});

export const formatNaira = (value: string | undefined | number | null) => {
  if (value == null || value === "") return "₦0";

  const kobo = Number(value);

  if (!Number.isFinite(kobo)) return "₦0";

  return nairaFormatter.format(kobo / 100);
};
