import { Dispatch, SetStateAction, useState } from "react";
import useSWR from "swr";
import { PackageSearchOptions } from "@portaljs/ckan";
import { CKAN } from "@portaljs/ckan";
import Pagination from "./Pagination";
import DatasetCard from "./DatasetCard";

export default function ListOfDatasets({
  options,
  setOptions,
}: {
  options: PackageSearchOptions;
  setOptions: Dispatch<SetStateAction<PackageSearchOptions>>;
}) {
  return (
    <div className="grid grid-cols-1 gap-4 homepage-padding">
      <ListItems setOptions={setOptions} options={options} />
      <div style={{ display: "none" }}>
        <ListItems
          setOptions={setOptions}
          options={{ ...options, offset: options.offset + 5 }}
        />
      </div>
    </div>
  );
}

function ListItems({
  options,
  setOptions,
}: {
  options: PackageSearchOptions;
  setOptions: Dispatch<SetStateAction<PackageSearchOptions>>;
}) {
  const { data } = useSWR(["package_search", options], async () => {
    const DMS = process.env.NEXT_PUBLIC_DMS;
    const ckan = new CKAN(DMS);
    return ckan.packageSearch({
      ...options,
      orgs: [process.env.NEXT_PUBLIC_ORG],
    });
  });
  //Define which page buttons are going to be displayed in the pagination list
  const [subsetOfPages, setSubsetOfPages] = useState(0);

  return (
    <>
      <h2 className="text-4xl capitalize font-bold text-zinc-900">
        {data?.count} Datasets
      </h2>
      {data?.datasets?.map((dataset) => (
        <DatasetCard key={dataset.id} dataset={dataset} />
      ))}
      {data?.count && (
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
