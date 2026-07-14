export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "NxtAmzn";
export const APP_SLOGAN =
  process.env.NEXT_PUBLIC_APP_SLOGAN || "Spend less, enjoy more";
export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
  "An Amazon clone build with Next.js and MongoDB";

export const PAGE_SIZE = Number(process.env.PAGE_SIZE || 9);

export const FREE_SHIPPING_MIN_PRICE = Number(
  process.env.FREE_SHIPPING_MIN_PRICE || 35,
);

export const colorClasses = {
  Green: "bg-[#22c55e]",
  Red: "bg-[#dc2626]",
  Black: "bg-[#000000]",
  White: "bg-[#ffffff] border border-gray-300",
  Grey: "bg-[#6b7280]",
  Blue: "bg-[#2563eb]",
  Silver: "bg-[#c0c0c0]",
  Brown: "bg-[#8b4513]",
  Beige: "bg-[#f5f5dc]",
  Navy: "bg-[#000080]",
  Yellow: "bg-[#eab308]",
} as const;
