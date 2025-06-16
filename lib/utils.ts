import { format } from "timeago.js";

export function getDatasetName(name: string) {
  const mainOrg = process.env.NEXT_PUBLIC_ORG;
  const datasetName =
    name?.indexOf(`${mainOrg}--`) >= 0 ? name?.split(`${mainOrg}--`)[1] : name;

  return datasetName;
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