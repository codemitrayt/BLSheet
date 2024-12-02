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

export function capitalizeFirstLetter(str: string | undefined) {
  if (!str) return null;
  return str.replace(/^./, str[0].toUpperCase());
}

export const getDaysDiff = (startDate: Date, endDate: Date) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  let differenceInTime = end.getTime() - start.getTime();
  let differenceInDays = Math.round(differenceInTime / (1000 * 3600 * 24));
  return differenceInDays;
};

export function getDueDateColor(dueDate: Date, isCompleted: boolean = false) {
  const today = new Date();
  const due = new Date(dueDate);

  if (isCompleted) {
    return "text-gray-500";
  }

  const timeDiff = (due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);

  if (timeDiff > 7) {
    return "text-green-500";
  } else if (timeDiff > 0 && timeDiff <= 7) {
    return "text-orange-500";
  } else if (timeDiff === 0) {
    return "text-blue-500";
  } else {
    return "text-red-500";
  }
}

export const getTimeDifference = (date: string) => {
  var date1 = new Date();
  var date2 = new Date(date);
  var timeDiff = Math.abs(date2.getTime() - date1.getTime());
  var timeDiffInSecond = Math.ceil(timeDiff / 1000);

  if (timeDiffInSecond < 60) return `${timeDiffInSecond} sec ago`;
  else if (timeDiffInSecond >= 60 && timeDiffInSecond < 3600)
    return `${Math.ceil(timeDiffInSecond / 60)} min ago`;
  else if (timeDiffInSecond >= 3600 && timeDiffInSecond < 86400)
    return `${Math.ceil(timeDiffInSecond / 3600)} hours ago`;
  else if (timeDiffInSecond >= 86400)
    return `${Math.ceil(timeDiffInSecond / 86400)} days ago`;
  return "";
};
