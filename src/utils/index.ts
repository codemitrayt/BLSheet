import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { MatricsType } from "../types";

export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

export const currencyFormate = (value: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
  }).format(value);
};

export const calculateProfilt = (matrics: MatricsType[]) => {
  const income = matrics
    .filter((m) => m.type === "income")
    .reduce((acc, curr) => acc + curr.total, 0);
  const expense = matrics
    .filter((m) => m.type !== "income")
    .reduce((acc, curr) => acc + curr.total, 0);
  return income - expense;
};

export function strSlice(str: string, num: number = 250): string {
  const length = str.length;
  if (length > num) return str.slice(0, num) + "...";
  return str;
}

export function capitalizeFirstLetter(str: string) {
  return str.replace(/^./, str[0].toUpperCase());
}

export const getDaysDiff = (startDate: Date, endDate: Date) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  let differenceInTime = end.getTime() - start.getTime();
  let differenceInDays = Math.round(differenceInTime / (1000 * 3600 * 24));
  return differenceInDays;
};
