import { Dataset } from "@portaljs/ckan";
import { Group } from "@portaljs/ckan";
import GroupCard from "../../groups/GroupCard";
import PopularDatasets from "./PopularDatasets";

export default function MainSection({
  groups,
  datasets,
}: {
  groups: Array<Group>;
  datasets: Array<Dataset>;
}) {
  return (
    <section className="custom-container homepage-padding">
      <section className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
        <section className="col-span-1 md:pr-2">
          <PopularDatasets datasets={datasets} />
        </section>
        <section className="col-span-1 grid sm:grid-cols-2 gap-4 md:pl-2">
          {groups.slice(0, 4).map((group) => (
            <article key={group.id} className="col-span-1">
              <GroupCard
                description={group.description}
                display_name={group.display_name}
                image_display_url={group.image_display_url}
                name={group.name}
              />
            </article>
          ))}
        </section>
      </section>
    </section>
  );
}
