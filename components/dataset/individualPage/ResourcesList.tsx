import { Resource } from "@portaljs/ckan";
import ResourceCard from "../_shared/ResourceCard";
import Link from "next/link";

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
    <div className="py-8 w-full max-h-[600px]">
      {resources.map((resource: Resource) => (
        <div
          key={resource.id}
          className="flex flex-col sm:flex-row justify-between w-full pb-4"
        >
          <article className="grid grid-cols-1 sm:grid-cols-6 gap-x-2 grow">
            <ResourceCard resource={resource} />
            <div className="col-span-5 place-content-start flex flex-col gap-0">
              <h4 className="m-auto md:m-0 font-semibold text-lg text-zinc-900 leading-tight line-clamp-3 pr-5">
                {resource.name || "No title"}
              </h4>
              <p className="text-sm font-normal text-stone-500 line-clamp-4">
                {resource.description || "No description"}
              </p>
            </div>
          </article>
          <div className="flex sm:flex-col gap-2 justify-start pt-2 sm:pt-0">
            {resource.url && (
              <Link
                href={resource.url}
                className="bg-accent h-auto py-2 px-4 text-sm text-gray-800 rounded-xl font-roboto font-bold hover:bg-cyan-800 hover:text-white duration-150 flex items-center gap-1"
              >
                Download
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                  />
                </svg>
              </Link>
            )}
            {["csv", "pdf", "xlsx", "xls"].includes(
              resource.format.toLowerCase()
            ) && (
              <Link
                href={`/${orgName}/${datasetName}/r/${resource.id}`}
                className="bg-lightaccent h-auto py-2 px-4 text-sm text-gray-800 rounded-xl font-roboto font-bold hover:bg-accent duration-150 flex items-center gap-1"
              >
                Preview{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </Link>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
