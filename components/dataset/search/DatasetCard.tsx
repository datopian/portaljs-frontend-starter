import Link from "next/link";
import { format } from "timeago.js";
import { Dataset } from "@portaljs/ckan";
import MultipleResourcesCard from "../_shared/MultipleResourcesCard";
import { resourceBgColors } from "../_shared/FormatsColors";

const mainOrg = process.env.NEXT_PUBLIC_ORG;

export default function DatasetCard({
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

  function DatasetInformations() {
    return (
      <div className="flex align-center gap-2 flex-wrap">
        {(dataset.resources.length > 0 && dataset.resources[0].format && (
          <>
            {showOrg !== false && (
              <span
                className={`${
                  resourceBgColors[
                    dataset.resources[0].format?.toUpperCase() as keyof typeof resourceBgColors
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
                  dataset.resources[0].format?.toUpperCase() as keyof typeof resourceBgColors
                ]
              } px-2 py-1 rounded-full text-xs flex items-center gap-1`}
            >
              <img src="/images/icons/clock.svg" alt="" />
              {dataset.metadata_modified && format(dataset.metadata_modified)}
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
              {dataset.metadata_modified && format(dataset.metadata_modified)}
            </span>
          </>
        )}
      </div>
    );
  }

  const datasetName =
    dataset.name?.indexOf(`${mainOrg}--`) >= 0
      ? dataset.name?.split(`${mainOrg}--`)[1]
      : dataset.name;

  return (
    <Link href={`/@${dataset.organization.name}/${datasetName}`} className="">
      <article className="grid grid-cols-1 md:grid-cols-7 gap-x-2 mb-6">
        <MultipleResourcesCard resources={dataset.resources} />
        <div className="col-span-6 place-content-start flex flex-col gap-1 mt-4 lg:mt-0 ml-0 lg:ml-4">
          <h1 className="  font-semibold text-lg text-[#202020] break-words">
            {dataset.title || "No title"}
          </h1>

          <p className="text-sm font-normal text-[#575757]  line-clamp-2  overflow-y-hidden mb-1">
            {dataset.notes?.replace(/<\/?[^>]+(>|$)/g, "") || "No description"}
          </p>
          <DatasetInformations />
        </div>
      </article>
    </Link>
  );
}
