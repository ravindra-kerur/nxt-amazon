import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// export const formatNumberWithDecimal = (num: number): string => {
//   const [int, decimal] = num.toString().split(".");
//   return decimal ? `${int}.${decimal.padEnd(2, "0")}` : int;
// };

export const formatNumberWithDecimal = (
  value: number | string,
  decimals = 2,
): string => {
  const number = Number(value);
  if (isNaN(number)) return "0.00";

  return number.toFixed(decimals);
};

export const toSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
};
