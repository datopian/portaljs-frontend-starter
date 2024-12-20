import Link from "next/link";
import { format } from "timeago.js";
import { Dataset } from "@portaljs/ckan";
import ResourceCard from "./ResourceCard";
import MultipleResourcesCard from "../_shared/MultipleResourcesCard";
import { ClockIcon } from "@heroicons/react/20/solid";
import { resourceBgColors } from "../_shared/FormatsColors";
import ResourcesBadges from "../_shared/ResourcesBadges";
import { RiMapPinTimeLine, RiOrganizationChart } from "react-icons/ri";

const mainOrg = process.env.NEXT_PUBLIC_ORG;

export default function DatasetItem({
  dataset,
  showOrg = true,
}: {
  dataset: Dataset;
  showOrg?: boolean;
}) {
  const resourceBgColorsProxy = new Proxy(resourceBgColors, {
    get: (obj, prop) => {
      if (prop in obj) {
        return obj[prop];
      }
      return "bg-lightaccent";
    },
  });

  const datasetName =
    dataset.name?.indexOf(`${mainOrg}--`) >= 0
      ? dataset.name?.split(`${mainOrg}--`)[1]
      : dataset.name;

  return (
    <Link
      href={`/@${dataset.organization.name}/${datasetName}`}
      className="flex items-start gap-4"
    >
      <span className="min-w-[5px] min-h-[5px] bg-accent rounded-full mt-3"></span>
      <div className="w-full">
        <div className="text-lg font-semibold text-gray-900">
          {dataset.title}
        </div>

        <p className="text-sm font-normal  mb-2 line-clamp-2  overflow-y-hidden mb-1">
          {dataset.notes?.replace(/<\/?[^>]+(>|$)/g, "") || "No description"}
        </p>
        <div className="text-sm flex gap-2 flex-col md:flex-row md:flex-wrap">
          <div className="flex items-center gap-2 ">
            <RiOrganizationChart className="text-accent" />
            <span className=" text-gray-500">{dataset.organization.title}</span>
          </div>
          <div className="flex items-center gap-2 ">
            <RiMapPinTimeLine className="text-accent" />
            <span className=" text-gray-500">
              {dataset.metadata_modified && format(dataset.metadata_modified)}
            </span>
          </div>
        </div>
        <div className="mt-2">
          <ResourcesBadges resources={dataset.resources} />
        </div>
      </div>
    </Link>
  );
}
