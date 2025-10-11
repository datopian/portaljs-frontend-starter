import { format } from "timeago.js";
import clsx, {type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getTimeAgo(timestamp: string) {
  const trimmed = timestamp.trim();
  const hasTZ = /Z$|[+-]\d{2}:\d{2}$/.test(trimmed);
  const normalised = hasTZ ? trimmed : `${trimmed}Z`;

  const date = new Date(normalised);
  if (isNaN(date.getTime())) {
    return timestamp;
  }

  return format(date);
}

export function capitalizeFirstLetter(str: string) {
  if (str.length === 0) {
    return str;
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}
