import { Organization } from "@portaljs/ckan";
import getConfig from "next/config";
import Image from "next/image";
import Link from "next/link";

import { RiArrowRightLine } from "react-icons/ri";

type OrgCardProps = Pick<
  Organization,
  "display_name" | "image_display_url" | "description" | "name"
>;

export default function GroupCard({
  display_name,
  image_display_url,
  description,
  name,
}: OrgCardProps) {
  const url = image_display_url ? new URL(image_display_url) : undefined;
  return (
    <Link
      href={`/@${name}`}
      className="border-b-[4px] p-8 border-white  bg-white hover:bg-accent-50 group block border-b-[4px] hover:border-accent rounded-lg shadow-lg"
    >
      <div className=" col-span-3  h-full  flex flex-col ">
        <Image
          src={
            image_display_url &&
            url &&
            (getConfig().publicRuntimeConfig.DOMAINS ?? []).includes(
              url.hostname
            )
              ? image_display_url
              : "/images/logos/DefaultOrgLogo.svg"
          }
          alt={`${name}-collection`}
          width="43"
          height="43"
        ></Image>
        <h3 className="font-inter font-semibold text-lg mt-4 group-hover:text-accent">
          {display_name}
        </h3>
        <p className="font-inter font-medium text-sm mt-1 mb-6 line-clamp-2">
          {description}
        </p>

        <span className="font-inter mt-auto font-medium text-sm text-accent cursor-pointer flex items-center gap-1">
          View <RiArrowRightLine />
        </span>
      </div>
    </Link>
  );
}
