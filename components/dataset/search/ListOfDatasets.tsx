import { Dispatch, SetStateAction, useEffect, useState } from "react";
import useSWR from "swr";
import { PackageSearchOptions } from "@portaljs/ckan";
import { CKAN } from "@portaljs/ckan";
import Pagination from "./Pagination";
import DatasetCard from "./DatasetCard";
import { searchDatasets } from "@/lib/queries/dataset";
import Dropdown from "../_shared/Dropdown";

export default function ListOfDatasets({
  options,
  setOptions,
  setFormats,
}: {
  options: PackageSearchOptions;
  setOptions: Dispatch<SetStateAction<PackageSearchOptions>>;
  setFormats: Dispatch<SetStateAction<any[]>>;
}) {
  return (
    <div className="grid grid-cols-1 gap-8 ">
      <ListItems
        setOptions={setOptions}
        options={options}
        setFormats={setFormats}
      />
      <div style={{ display: "none" }}>
        <ListItems
          setOptions={setOptions}
          options={{ ...options, offset: options.offset + 5 }}
          setFormats={setFormats}
        />
      </div>
    </div>
  );
}

function ListItems({
  options,
  setOptions,
  setFormats,
}: {
  options: PackageSearchOptions;
  setOptions: Dispatch<SetStateAction<PackageSearchOptions>>;
  setFormats: Dispatch<SetStateAction<any[]>>;
}) {
  const { data, isValidating } = useSWR(
    ["package_search", options],
    async () => {
      return searchDatasets(options);
    }
  );
  //Define which page buttons are going to be displayed in the pagination list
  const [subsetOfPages, setSubsetOfPages] = useState(0);

  useEffect(() => {
    if (data?.datasets) {
      const extractedFormats = data.datasets.flatMap((dataset) =>
        dataset.resources.map((resource) => resource.format)
      );
      const uniqueFormats = [...new Set(extractedFormats)];
      setFormats((p) => [...new Set(p.concat(uniqueFormats))]);
    }
  }, [data]);

  return (
    <>
      <div className="flex items-center gap-4">
        <h2 className="text-[23px] leading-[28px] capitalize font-bold  ">
          {data?.count} Datasets
        </h2>
        <div className="ml-auto">
          <Dropdown
            options={["relevance", "created"]}
            defaultOption={
              options.sort === "score desc" ? "relevance" : "created"
            }
            onSelect={(selectedOption) => {
              setOptions({
                ...options,
                sort:
                  selectedOption === "relevance"
                    ? "score desc"
                    : "metadata_created desc",
              });
            }}
          />
        </div>
      </div>
      {data?.datasets?.map((dataset) => (
        <DatasetCard key={dataset.id} dataset={dataset} showOrg={true} />
      ))}
      {data?.count > 0 && (
        <Pagination
          options={options}
          subsetOfPages={subsetOfPages}
          setSubsetOfPages={setSubsetOfPages}
          setOptions={setOptions}
          count={data.count}
        />
      )}
    </>
  );
}
