import { format } from "timeago.js";

export function getDatasetName(name: string) {
  const mainOrg = process.env.NEXT_PUBLIC_ORG;
  const datasetName =
    name?.indexOf(`${mainOrg}--`) >= 0 ? name?.split(`${mainOrg}--`)[1] : name;

  return datasetName;
}

export function getTimeAgo(timestamp: string) {
  timestamp = timestamp.trim().endsWith('Z') ? timestamp : timestamp + 'Z';
  return format(new Date(timestamp));
}