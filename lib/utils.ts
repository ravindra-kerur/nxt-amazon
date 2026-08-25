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

const CURRENCY_FORMATTER = new Intl.NumberFormat("en-US", {
  currency: "USD",
  style: "currency",
  minimumFractionDigits: 2,
});

export const formatCurrency = (amount: number) => {
  return CURRENCY_FORMATTER.format(amount);
};

const NUMBER_FORMATTER = new Intl.NumberFormat("en-US");

export const formatNumber = (num: number) => {
  return NUMBER_FORMATTER.format(num);
};

export const round2 = (num: number) => {
  return Math.round(((num + Number.EPSILON) * 100) / 100);
};

export const generateId = () => {
  return Array.from({ length: 24 }, () => Math.floor(Math.random() * 10)).join(
    "",
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const formatError = (error: any): string => {
  if (error.name === "ZodError") {
    const fieldErrors = Object.keys(error.errors).map((field) => {
      const errorMessage = error.errors[field].message;
      return `${error.errors[field].path}: ${errorMessage}`;
    });
    return fieldErrors.join(", ");
  } else if (error.name === "ValidationError") {
    const fieldErrors = Object.keys(error.errors).map((field) => {
      const errorMessage = error.errors[field].message;
      return errorMessage;
    });
    return fieldErrors.join(", ");
  } else if (error.code === 11000) {
    const duplicateField = Object.keys(error.keyValue)[0];
    return `${duplicateField} already exists.`;
  } else {
    return typeof error.message === "string"
      ? error.message
      : JSON.stringify(error.message);
  }
};

export const calculateFutureDates = (days: number) => {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + days);
  return currentDate;
};

// export const getMonthName = (yearAndMonth: string) => {
//   const [year, monthNumber] = yearAndMonth.split("-");
//   const date = new Date();
//   date.setMonth(parseInt(monthNumber) - 1);
//   return new Date().getMonth() === parseInt(monthNumber) - 1
//     ? `${date.toLocaleString("default", { month: "long" })} (ongoing)`
//     : `${date.toLocaleString("default", { month: "long" })}`;
// };

export const getMonthName = (yearAndMonth: string) => {
  const [year, monthNumber] = yearAndMonth.split("-");

  const date = new Date(parseInt(year), parseInt(monthNumber) - 1);

  const currentDate = new Date();

  const isCurrentMonth =
    currentDate.getFullYear() === parseInt(year) &&
    currentDate.getMonth() === parseInt(monthNumber) - 1;

  return isCurrentMonth
    ? `${date.toLocaleString("default", { month: "long" })} (ongoing)`
    : date.toLocaleString("default", { month: "long" });
};

export const calculatePastDate = (days: number) => {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() - days);
  return currentDate;
};

export const timeUntilMidNight = (): { hours: number; minutes: number } => {
  const now = new Date();
  const midNight = new Date();
  midNight.setHours(24, 0, 0, 0); // Set to 12:00 AM (next day)

  const diff = midNight.getTime() - now.getTime(); // Difference in milliseconds
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  return { hours, minutes };
};

export const formateDateTime = (dateString: Date) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    month: "short",
    year: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  const dateOptions: Intl.DateTimeFormatOptions = {
    month: "short",
    year: "numeric",
    day: "numeric",
  };
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  const formattedDateTime: string = new Date(dateString).toLocaleString(
    "en-US",
    dateTimeOptions,
  );
  const formattedDate: string = new Date(dateString).toLocaleString(
    "en-US",
    dateOptions,
  );

  const formattedTime: string = new Date(dateString).toLocaleString(
    "en-US",
    timeOptions,
  );
  return {
    dateTime: formattedDateTime,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
  };
};
