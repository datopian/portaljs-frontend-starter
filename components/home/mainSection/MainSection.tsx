import { Dataset } from "@portaljs/ckan";
import { Group } from "@portaljs/ckan";
import GroupCard from "../../groups/GroupCard";
import PopularDatasets from "./PopularDatasets";
import ActionCard from "../actions/actionCard";
import Link from "next/link";

import { Montserrat } from "next/font/google";
import { ArrowLongRightIcon, ArrowRightIcon } from "@heroicons/react/20/solid";

const montserrat = Montserrat({
  subsets: ["latin"],
});

export default function MainSection({
  groups,
  datasets,
}: {
  groups: Array<Group>;
  datasets: Array<Dataset>;
}) {
  return (
    <section className="custom-container homepage-padding">
      <div className="flex flex-col md:flex-row md:items-start gap-8 mb-[100px]">
        {[
          {
            title: "Find Data",
            description: "Find, share, use and gain insights from data.",
            href: "/search",
            icon: "/images/icons/search.svg",
          },
          {
            title: "Add Data",
            description: "Make your dataset available on Portal.",
            href: "#",
            icon: "/images/icons/upload.png",
          },
          {
            title: "Request Data",
            description: "Send us a request for the data you didn’t find.",
            href: "#",
            icon: "/images/icons/request.svg",
          },
        ].map((item, i) => (
          <ActionCard {...item} key={i} />
        ))}
      </div>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
        <section className="col-span-1 md:pr-2">
          <PopularDatasets datasets={datasets} />
        </section>
        <section className="relative">
          <Link
            href="/groups"
            className={`${montserrat.className} flex items-center gap-1 uppercase hover:text-black ml-auto w-fit absolute right-0 top-[-30px]`}
          >
            View all categories
            <ArrowLongRightIcon width={16} />
          </Link>
          <div className="col-span-1 grid sm:grid-cols-2 gap-4 md:pl-2">
            {groups.slice(0, 4).map((group) => (
              <article key={group.id} className="col-span-1 h-fit">
                <GroupCard
                  description={group.description}
                  display_name={group.display_name}
                  image_display_url={group.image_display_url}
                  name={group.name}
                />
              </article>
            ))}
          </div>
        </section>
      </section>
    </section>
  );
}
