import { useState } from "react";
import Pagination from "./Pagination";
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
  const { options, setOptions, searchResults, isLoading } = useSearchState();

  const [subsetOfPages, setSubsetOfPages] = useState(0);

  return (
    <>
      <div className="flex justify-between flex-col md:flex-row md:items-center flex-wrap gap-3">
        <div className="flex gap-2">
          <h2 className="text-[23px] leading-[28px] capitalize font-bold  ">
            {searchResults?.count}{" "}
            {options.type === "visualization" ? "Visualizations" : "Datasets"}
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
        {searchResults?.results?.map((dataset) => (
          <DatasetItem key={dataset.id} dataset={dataset} />
        ))}
      </div>

      <div className="mt-10">
        <PackagePagination
          isLoading={isLoading}
          count={searchResults?.count}
          subsetOfPages={subsetOfPages}
          setSubsetOfPages={setSubsetOfPages}
        />
      </div>
    </>
  );
}

function FilterBadges() {
  const { options, setOptions, searchFacets } = useSearchState();

  const getActiveFilters = (optionKey: string, facetKey: string) => {
    if (
      options.hasOwnProperty(optionKey) &&
      searchFacets.hasOwnProperty(facetKey)
    ) {
      const activeFilters = options[optionKey]
        .map((af) =>
          searchFacets[facetKey].items.find((item) => item.name === af)
        )
        .filter((item) => !!item);
      return activeFilters ?? [];
    }
    return [];
  };

  const filters = {
    resFormat: getActiveFilters("resFormat", "res_format"),
    orgs: getActiveFilters("orgs", "organization"),
    groups: getActiveFilters("groups", "groups"),
    tags: getActiveFilters("tags", "tags"),
  };

  const activeFiltersCount = Object.keys(filters)
    .map((fk) => filters[fk]?.length ?? 0)
    .reduce((a, v) => {
      return a + v;
    }, 0);

  return (
    <div className="border-b border-gray-100 pb-2">
      {!!activeFiltersCount && (
        <span className="text-xs  text-gray-800 mb-2 inline-block">
          Applied Filters{" "}
          <span className="font-[600]">
            ({activeFiltersCount}
            ):
          </span>
        </span>
      )}

      <div className="flex gap-2 flex-wrap">
        {filters.orgs.length > 0 &&
          filters.orgs.map((org) => (
            <ActiveFilter
              key={org.name}
              label={org.display_name}
              onClick={() => {
                setOptions({
                  orgs: options.orgs.filter((item) => item !== org.name),
                });
              }}
            />
          ))}

        {filters.groups.length > 0 &&
          filters.groups.map((g) => (
            <ActiveFilter
              key={g.name}
              label={g.display_name}
              onClick={() => {
                setOptions({
                  groups: options.groups.filter((item) => item !== g.name),
                });
              }}
            />
          ))}

        {filters.tags.length > 0 &&
          filters.tags.map((t) => (
            <ActiveFilter
              key={t.name}
              label={t.display_name}
              onClick={() => {
                setOptions({
                  tags: options.tags.filter((item) => item !== t.name),
                });
              }}
            />
          ))}

        {filters.resFormat.length > 0 &&
          filters.resFormat.map((f) => (
            <ActiveFilter
              key={f.name}
              label={f.display_name}
              onClick={() => {
                setOptions({
                  resFormat: options.resFormat.filter(
                    (item) => item !== f.name
                  ),
                });
              }}
            />
          ))}

        {(!!activeFiltersCount) && (
          <span
            onClick={() => {
              setOptions({
                resFormat: [],
                groups: [],
                orgs: [],
                tags: []
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

function ActiveFilter({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <span
      onClick={() => {
        onClick();
      }}
      className="inline-flex items-center cursor-pointer gap-x-0.5 rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10"
    >
      {label}
      <button
        type="button"
        className="group relative -mr-1 size-3.5 rounded-sm hover:bg-gray-500/20"
      >
        <XMarkIcon width={14} />
        <span className="absolute -inset-1"></span>
      </button>
    </span>
  );
}
