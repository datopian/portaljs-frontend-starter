import { useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import Pagination from "./Pagination";
import DatasetCard from "./DatasetCard";
import { searchDatasets } from "@/lib/queries/dataset";
import Image from "next/image";
import { useRouter } from "next/router";

import { useSearchState } from "./SearchContext";
import { XMarkIcon } from "@heroicons/react/20/solid";
import DatasetItem from "./DatasetItem";

export default function ListOfDatasets() {
  return (
    <div className="grid grid-cols-1 gap-[13px] homepage-padding">
      <ListItems />
    </div>
  );
}

function ListItems() {
  const { options, setOptions, setSearchFacets, searchFacets } =
    useSearchState();
  const { data: packageSearchResults, isValidating } = useSWR(
    ["package_search", JSON.stringify(options)],
    async () => {
      return searchDatasets(options);
    }
  );

  const [subsetOfPages, setSubsetOfPages] = useState(0);

  useEffect(() => {
    if (packageSearchResults?.search_facets)
      setSearchFacets(packageSearchResults.search_facets);
  }, [packageSearchResults, setSearchFacets]);

  return (
    <>
      <div className="flex justify-between flex-col md:flex-row md:items-center flex-wrap gap-3">
        <div className="flex gap-2">
          <h2 className="text-[23px] leading-[28px] capitalize font-bold  ">
            {packageSearchResults?.count} Datasets
          </h2>
        </div>
        <div className="flex gap-2 cursor-pointer">
          <div className="font-normal text-[14px]">
            Sort by:{" "}
            <select
              aria-label="Sort datasets by"
              value={options.sort ?? "score desc"}
              onChange={(e) => {
                const value = e.target.value;
                setOptions({ sort: value });
              }}
            >
              <option value="score desc">Most relevant</option>
              <option value="title_string asc">Name ascending</option>
              <option value="title_string desc">Name descending </option>
              <option value="metadata_modified desc">Last updated</option>
            </select>
          </div>
        </div>
      </div>

      <FilterBadges />
      <div className="flex flex-col gap-8 mt-4">
        {packageSearchResults?.datasets?.map((dataset) => (
          <DatasetItem key={dataset.id} dataset={dataset} />
        ))}
      </div>

      <div className="mt-10">
        <PackagePagination
          isLoading={isValidating}
          count={packageSearchResults?.count}
          subsetOfPages={subsetOfPages}
          setSubsetOfPages={setSubsetOfPages}
        />
      </div>
    </>
  );
}

function FilterBadges() {
  const { options, setOptions, setSearchFacets, searchFacets } =
    useSearchState();
  return (
    <div className="border-b border-gray-100 pb-2">
      {(options.resFormat?.length > 0 ||
        options.groups?.length > 0 ||
        options.orgs?.length > 0) && (
        <span className="text-xs  text-gray-800 mb-2 inline-block">
          Applied Filters{" "}
          <span className="font-[600]">
            (
            {options.resFormat?.length +
              options.orgs?.length +
              options.groups?.length}
            ):
          </span>
        </span>
      )}

      <div className="flex gap-2 flex-wrap">
        {options.orgs.length > 0 &&
          options.orgs.map((org) => (
            <span
              key={org}
              onClick={() => {
                setOptions({
                  orgs: options.orgs.filter((item) => item !== org),
                });
              }}
              className="inline-flex items-center cursor-pointer gap-x-0.5 rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10"
            >
              {
                searchFacets.organization?.items.find((i) => i.name === org)
                  ?.display_name
              }
              <button
                type="button"
                className="group relative -mr-1 size-3.5 rounded-sm hover:bg-gray-500/20"
              >
                <XMarkIcon width={14} />
                <span className="absolute -inset-1"></span>
              </button>
            </span>
          ))}

        {options.groups.length > 0 &&
          options.groups.map((g) => (
            <span
              key={g}
              className="inline-flex items-center cursor-pointer gap-x-0.5 rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10"
              onClick={() => {
                setOptions({
                  groups: options.groups.filter((item) => item !== g),
                });
              }}
            >
              {
                searchFacets.groups?.items.find((i) => i.name === g)
                  ?.display_name
              }
              <button
                type="button"
                className="group relative -mr-1 size-3.5 rounded-sm hover:bg-gray-500/20"
              >
                <XMarkIcon width={14} />
                <span className="absolute -inset-1"></span>
              </button>
            </span>
          ))}

        {options.resFormat.length > 0 &&
          options.resFormat.map((f) => (
            <span
              key={f}
              onClick={() => {
                setOptions({
                  resFormat: options.resFormat.filter((item) => item !== f),
                });
              }}
              className="inline-flex items-center cursor-pointer gap-x-0.5 rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10"
            >
              {
                searchFacets.res_format?.items.find((i) => i.name === f)
                  ?.display_name
              }
              <button
                type="button"
                className="group relative -mr-1 size-3.5 rounded-sm hover:bg-gray-500/20"
              >
                <XMarkIcon width={14} />
                <span className="absolute -inset-1"></span>
              </button>
            </span>
          ))}
        {(options.resFormat?.length > 0 ||
          options.groups?.length > 0 ||
          options.orgs?.length > 0) && (
          <span
            onClick={() => {
              setOptions({
                resFormat: [],
                groups: [],
                orgs: [],
              });
            }}
            className="inline-flex h-fit w-fit cursor-pointer ml-auto items-center gap-x-0.5 rounded-md bg-gray-900 px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-gray-500/10"
          >
            clear all
            <button
              type="button"
              className="group relative -mr-1 size-3.5 rounded-sm hover:bg-gray-500/20"
            >
              <XMarkIcon width={14} />
              <span className="absolute -inset-1"></span>
            </button>
          </span>
        )}
      </div>
    </div>
  );
}

function PackagePagination({
  isLoading,
  count,
  subsetOfPages,
  setSubsetOfPages,
}) {
  if (isLoading) return null;

  if (count > 0) {
    return (
      <Pagination
        subsetOfPages={subsetOfPages}
        setSubsetOfPages={setSubsetOfPages}
        count={count}
      />
    );

    return <ResultsNotFound />;
  }

  // make a pagination component once insights are added
  return null;
}

function ResultsNotFound() {
  const router = useRouter();

  const clearFilters = () => {
    router.push("/search", undefined, { shallow: true });
  };
  return (
    <div className="mt-5 flex flex-col items-center rounded-[20px] border border-[#F7F7F7] bg-white gap-4 px-20">
      <Image
        src={"/images/search/noDatasets.svg"}
        height={269}
        width={358}
        alt="no datasets found"
      />
      <div className="flex flex-col items-center gap-2">
        <span className="text-[#313131] font-medium text-[18px] leading-[23px]">
          No datasets found.
        </span>
        <span className="text-[#4C4C4C] text-center font-normal text-[15px] leading-[20px]">
          It looks like no datasets match your current search criteria. Try
          reducing the number of filters or broadening your search terms and
          give it another go.
        </span>
      </div>
      <div
        onClick={clearFilters}
        className="cursor-pointer rounded-[20px] w-[118px] h-[41px] bg-[linear-gradient(90deg,_#489FA9_0%,_#803D6E_100%)] flex items-center justify-center"
      >
        <span className="text-white font-medium text-[16px] leading-normal">
          Clear fitlers
        </span>
      </div>
    </div>
  );
}
