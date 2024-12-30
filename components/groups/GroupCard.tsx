import getConfig from "next/config";
import Image from "next/image";
import Link from "next/link";
import { Group } from "@portaljs/ckan";
import { useTheme } from "../theme/theme-provider";
import { ArrowRightIcon } from "@heroicons/react/20/solid";

type GroupCardProps = Pick<
  Group,
  "display_name" | "image_display_url" | "description" | "name"
>;

export default function GroupCard({
  display_name,
  image_display_url,
  description,
  name,
}: GroupCardProps) {
  const { theme } = useTheme();
  const url = image_display_url ? new URL(image_display_url) : undefined;
  return (
    <Link
      href={`/groups/${name}`}
      className={`bg-white hover:bg-accent-50 group border-b-[4px] border-white hover:border-accent p-8 col-span-3 rounded-lg block h-full text-accent  ${theme.styles.shadowSm}`}
    >
      <Image
        src={
          image_display_url &&
          url &&
          (getConfig().publicRuntimeConfig.DOMAINS ?? []).includes(url.hostname)
            ? image_display_url
            : "/images/logos/datasets.png"
        }
        alt={`${name}-collection`}
        width="54"
        height="54"
      ></Image>
      <div className={`text-black`}>
        <h3 className="font-inter font-semibold text-lg mt-4 group-hover:text-accent">
          {display_name}
        </h3>
        <p className="font-inter font-medium text-sm mt-1 mb-6 line-clamp-2">
          {description}
        </p>
      </div>
      <span
        className={` font-inter font-medium text-sm flex items-center gap-2`}
      >
        View collection
        <ArrowRightIcon width={16} />
      </span>
    </Link>
  );
}
