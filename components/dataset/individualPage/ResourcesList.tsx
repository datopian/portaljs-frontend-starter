import { Resource } from "@/schemas/resource.interface";
import Link from "next/link";
import { RiDownload2Fill, RiEyeLine } from "react-icons/ri";
import ResourcesBadges from "../_shared/ResourcesBadges";

interface ResourcesListProps {
  resources: Array<Resource>;
  orgName: string;
  datasetName: string;
}
export default function ResourcesList({
  resources,
  orgName,
  datasetName,
}: ResourcesListProps) {
  return (
    <div className="py-8 w-full max-h-[600px] flex flex-col gap-4 ">
      {resources.map((resource: Resource) => (
        <div
          key={resource.id}
          className="flex flex-col md:flex-row  md:justify-between w-full gap-4  py-3 md:items-center px-2"
        >
          <article className="grid grid-cols-1 sm:grid-cols-6 gap-x-2 grow ">
            <div className="col-span-5 place-content-start flex flex-col gap-0">
              <h4 className=" md:m-0 font-semibold text-lg text-zinc-900 leading-tight line-clamp-3 pr-5">
                {resource.name || "No title"}
              </h4>
              <p className="text-sm font-normal text-stone-500 line-clamp-4">
                {resource.description || "No description"}
              </p>
              <div className="mt-2">
                <ResourcesBadges resources={[resource]} />
              </div>
            </div>
          </article>
          <div className="flex  gap-2 justify-start pt-2 sm:pt-0">
            {(["csv", "pdf", "xlsx", "xls", "geojson"].includes(
              resource.format.toLowerCase()
            ) ||
              resource?.iframe) && (
              <Link
                href={`/${orgName}/${datasetName}/r/${resource.id}`}
                className="px-2 py-1 border  h-fit shadow hover:shadow-lg transition-all text-sm  text-center text-dark rounded font-roboto font-bold border-accent-50 hover:border-accent-100 hover:bg-accent-100  duration-150 flex items-center justify-center gap-1"
              >
                <RiEyeLine />
                <span>Preview</span>
              </Link>
            )}
            {resource.url && (
              <Link
                href={resource.url}
                className="bg-accent px-2 py-1 h-fit shadow hover:shadow-lg transition-all text-sm  text-center text-white rounded font-roboto font-bold hover:bg-darkaccent hover:text-white duration-150 flex items-center justify-center gap-1"
              >
                <RiDownload2Fill />
                <span>Download</span>
              </Link>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
