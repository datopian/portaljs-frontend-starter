import getConfig from "next/config";
import Image from "next/image";
import Link from "next/link";
import { Organization } from "ckan";

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
    <div className="bg-white p-8 col-span-3 rounded-lg h-full shadow-lg">
      <Image
        src={
          image_display_url &&
          url &&
          getConfig().publicRuntimeConfig.DOMAINS.includes(url.hostname)
            ? image_display_url
            : "/images/logos/DefaultOrgLogo.svg"
        }
        alt={`${name}-collection`}
        width="43"
        height="43"
      ></Image>
      <h3 className="font-inter font-semibold text-lg mt-4">{display_name}</h3>
      <p className="font-inter font-medium text-sm mt-1 mb-6 line-clamp-2">
        {description}
      </p>
      <Link href={`/@${name}`}>
        <span className="font-inter font-medium text-sm text-accent cursor-pointer">
          View -&gt;
        </span>
      </Link>
    </div>
  );
}
