import { useState } from "react";
import { Dataset } from "@portaljs/ckan";
import useSWR from "swr";
import DatasetItem from "../dataset/search/DatasetItem";
import Pagination from "./PaginationOrgGroup";
import { searchDatasets } from "@/lib/queries/dataset";


interface DatasetListProps {
  type: "organization" | "group";
  name: string;
  initialDatasets?: any;
}

export default function DatasetList({ type, name, initialDatasets }: DatasetListProps) {
  const [offset, setOffset] = useState(0);
  const [subsetOfPages, setSubsetOfPages] = useState(0);
  const limit = 10;

  const fq = type === "organization" 
    ? `(organization:${name})` 
    : `(groups:${name})`;

  const { data: searchResults, isValidating } = useSWR(
    ["entity_package_search", { fq, offset, limit }],
    async (api, options) => {
      return searchDatasets({
        fq: options.fq,
        offset: options.offset,
        limit: options.limit,
        type: "dataset",
        query: "",
        sort: "metadata_modified desc",
        groups: [],
        orgs: [],
        tags: [],
        resFormat: [],
      });
    },
    {
      fallbackData: initialDatasets || undefined,
      revalidateOnFocus: false,
    }
  );

  const datasets = searchResults?.results || [];
  const count = searchResults?.count || 0;

  const handlePageChange = (newOffset: number) => {
    setOffset(newOffset);
    if (typeof window !== "undefined") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  if (isValidating && datasets.length === 0) {
    return (
      <div className="py-8 w-full flex justify-center">
        <span className="text-gray-500">Loading datasets...</span>
      </div>
    );
  }

  if (!isValidating && datasets.length === 0) {
    return (
      <div className="py-8 w-full flex justify-center">
        <span className="text-gray-500">No datasets found.</span>
      </div>
    );
  }

  return (
    <div className="py-8 w-full flex flex-col gap-y-4">
      <div className="flex flex-col gap-y-4">
        {datasets.map((dataset: Dataset) => (
          <DatasetItem key={dataset.id} dataset={dataset} />
        ))}
      </div>
      
      {count > limit && (
        <div className="flex justify-center mt-6">
          <Pagination
            subsetOfPages={subsetOfPages}
            setSubsetOfPages={setSubsetOfPages}
            count={count}
            offset={offset}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}