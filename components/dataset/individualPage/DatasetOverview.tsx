import { Dataset } from "@portaljs/ckan";

export default function DatasetOverview({ dataset }: { dataset: Dataset }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-10">
      <div className=" pb-5">
        <h4 className="pb-2 text-xs label-txt tracking-wider">AUTHOR</h4>
        <p className="font-semibold">
          {dataset.author
            ? dataset.author
            : dataset.organization
            ? dataset.organization.title
            : ""}
        </p>
      </div>
      <div className="  pb-5">
        <h4 className="pb-1 text-xs label-txt tracking-wider">AUTHOR EMAIL</h4>
        <p className="font-semibold">
          {dataset.author_email ? dataset.author_email : ""}
        </p>
      </div>
      <div className="  pb-5">
        <h4 className="pb-1 text-xs label-txt tracking-wider">GROUP</h4>
        <p className="font-semibold">
          {dataset.groups.length > 0
            ? dataset.groups.map((group) => group.title).join(", ")
            : "N/A"}
        </p>
      </div>
      <div className="  pb-5">
        <h4 className="pb-1 text-xs label-txt tracking-wider">DATASET DATE</h4>
        <p className="font-semibold">
          {dataset.metadata_created
            ? new Intl.DateTimeFormat("en-GB", {
                year: "numeric",
                month: "short",
                day: "2-digit",
              }).format(new Date(dataset.metadata_created))
            : "N/A"}
        </p>
      </div>
      <div className="  pb-5">
        <h4 className="pb-1 text-xs label-txt tracking-wider">VERSION</h4>
        <p className="font-semibold">
          {dataset.version ? dataset.version : "1.0"}
        </p>
      </div>
    </div>
  );
}
