import { Dataset } from "@portaljs/ckan";
import DatasetCard from "../dataset/search/DatasetCard";

interface DatasetListProps {
  datasets: Array<Dataset>;
}
export default function DatasetList({ datasets }: DatasetListProps) {
  return (
    <div className="py-8 w-full max-h-[600px] flex flex-col gap-y-4">
      {datasets.map((dataset: Dataset) => (
        <DatasetCard key={dataset.id} dataset={dataset} />
      ))}
    </div>
  );
}
