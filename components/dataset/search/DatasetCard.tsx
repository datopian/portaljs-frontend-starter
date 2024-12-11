import Link from "next/link";
import { format } from "timeago.js";
import { Dataset } from "@portaljs/ckan";
import ResourceCard from "./ResourceCard";
import MultipleResourcesCard from "../_shared/MultipleResourcesCard";
import { ClockIcon } from "@heroicons/react/20/solid";

export default function DatasetCard({
  dataset,
  showOrg = true,
}: {
  dataset: Dataset;
  showOrg?: boolean;
}) {
  const resourceBgColors = {
    PDF: "bg-[#C9EEEF]",
    CSV: "bg-[#E0DBDE]",
    JSON: "bg-[#DBC9EB]",
    ODS: "bg-amber-400",
    XLS: "bg-[#C9DAEB]",
    XLSX: "bg-[#C9DAEB]",
    DOC: "bg-red-300",
    SHP: "bg-purple-400",
    HTML: "bg-pink-300",
  };

  const resourceBgColorsProxy = new Proxy(resourceBgColors, {
    get: (obj, prop) => {
      if (prop in obj) {
        return obj[prop];
      }
      return "bg-amber-400";
    },
  });

  function DatasetInformations() {
    return (
      <div className="flex align-center gap-2">
        {(dataset.resources.length > 0 && dataset.resources[0].format && (
          <>
            {showOrg !== false && (
              <span
                className={`${
                  resourceBgColors[
                    dataset.resources[0].format as keyof typeof resourceBgColors
                  ]
                } px-2 py-1 rounded-full text-xs flex items-center gap-1`}
              >
                <img src="/images/icons/org.svg" alt="" />
                {dataset.organization
                  ? dataset.organization.title
                  : "No organization"}
              </span>
            )}
            <span
              className={`${
                resourceBgColorsProxy[
                  dataset.resources[0].format as keyof typeof resourceBgColors
                ]
              } px-2 py-1 rounded-full text-xs flex items-center gap-1`}
            >
              <img src="/images/icons/clock.svg" alt="" />
              {dataset.metadata_created && format(dataset.metadata_created)}
            </span>
          </>
        )) || (
          <>
            {showOrg !== false && (
              <span className="bg-gray-200 px-4 py-1 rounded-full text-xs">
                {dataset.organization
                  ? dataset.organization.title
                  : "No organization"}
              </span>
            )}
            <span className="bg-gray-200 px-4 py-1 rounded-full text-xs">
              {dataset.metadata_created && format(dataset.metadata_created)}
            </span>
          </>
        )}
      </div>
    );
  }

  return (
    <article className="grid grid-cols-1 md:grid-cols-7 gap-x-2">
      <MultipleResourcesCard resources={dataset.resources} />
      <div className="col-span-6 place-content-start flex flex-col gap-1 mt-4 lg:mt-0 ml-0 lg:ml-4">
        <Link href={`/${dataset.organization.name}/${dataset.name}`}>
          <h1 className="m-auto md:m-0 font-semibold text-lg text-[#202020]">
            {dataset.title || "No title"}
          </h1>
        </Link>
        <p className="text-sm font-normal text-[#575757]  line-clamp-2 h-[44px] overflow-y-hidden ">
          {dataset.notes?.replace(/<\/?[^>]+(>|$)/g, "") || "No description"}
        </p>
        <DatasetInformations />
      </div>
    </article>
  );
}
