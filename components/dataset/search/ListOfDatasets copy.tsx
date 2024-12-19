import { Dispatch, SetStateAction, useEffect, useState } from "react";
import useSWR from "swr";
import { PackageSearchOptions } from "@portaljs/ckan";
import { CKAN } from "@portaljs/ckan";
import Pagination from "./Pagination";
import DatasetCard from "./DatasetCard";
import { searchDatasets } from "@/lib/queries/dataset";
import Dropdown from "../_shared/Dropdown";
import { useSearchState } from "./SearchContext";

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
        // setOptions={setOptions}
        //options={options}
        setFormats={setFormats}
      />
      <div style={{ display: "none" }}>
        <ListItems
          //setOptions={setOptions}
          //options={{ ...options, offset: options.offset + 5 }}
          setFormats={setFormats}
        />
      </div>
    </div>
  );
}

function ListItems({
  setFormats,
}: {
  setFormats: Dispatch<SetStateAction<any[]>>;
}) {
  const { options, setOptions } = useSearchState();
  const { data: packageSearchResults, isValidating: isLoading } = useSWR(
    ["package_search", JSON.stringify(options)],
    async () => {
      return searchDatasets(options);
    }
  );

  /*const { data, isValidating } = useSWR(
    ["package_search", options],
    async () => {
      return searchDatasets(options);
    }
  );*/
  //Define which page buttons are going to be displayed in the pagination list
  const [subsetOfPages, setSubsetOfPages] = useState(0);

  /*useEffect(() => {
    if (packageSearchResults?.datasets) {
      const extractedFormats = packageSearchResults.datasets.flatMap((dataset) =>
        dataset.resources.map((resource) => resource.format)
      );
      const uniqueFormats = [...new Set(extractedFormats)];
      setFormats((p) => [...new Set(p.concat(uniqueFormats))]);
    }
  }, [packageSearchResults]);*/

  return (
    <>
      <div className="flex md:items-center flex-col md:flex-row gap-4">
        <h2 className="text-[23px] leading-[28px] capitalize font-bold  ">
          {packageSearchResults?.count} Datasets
        </h2>
        <div className="md:ml-auto">
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
      {packageSearchResults?.datasets?.map((dataset) => (
        <DatasetCard key={dataset.id} dataset={dataset} showOrg={true} />
      ))}
      {/*packageSearchResults?.count > 0 && (
        <Pagination
          options={options}
          subsetOfPages={subsetOfPages}
          setSubsetOfPages={setSubsetOfPages}
          setOptions={setOptions}
          count={packageSearchResults.count}
        />
      )*/}
    </>
  );
}
