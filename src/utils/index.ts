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
