import getConfig from "next/config";
import Image from "next/image";
import { format } from "timeago.js";
import { Tag } from "ckan";
import { Organization } from "ckan";

export default function OrgInfo({ org }: { org: Organization }) {
  const url = org.image_display_url
    ? new URL(org.image_display_url)
    : undefined;
  return (
    <div className="flex flex-col">
      <div>
        <Image
          width={120}
          height={120}
          src={
            org.image_display_url &&
            url &&
            getConfig().publicRuntimeConfig.DOMAINS.includes(url.hostname)
              ? org.image_display_url
              : "/images/logos/DefaultOrgLogo.svg"
          }
          alt={`${org.name}-collection`}
        />
      </div>
      <div className="flex flex-col gap-y-3 mt-8">
        <span className="font-medium text-gray-500 inline">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 text-accent inline mr-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776"
            />
          </svg>
          Packages: {org.packages ? org.packages.length : 0}
        </span>
        <span className="font-medium text-gray-500 inline">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 text-accent inline mr-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
            />
          </svg>
          Created: {org.created && format(org.created)}
        </span>
      </div>
      <div className="py-4 my-4 border-y">
        <p className="text-sm font-normal text-stone-500 line-clamp-4">
          {org.description?.replace(/<\/?[^>]+(>|$)/g, "") || "No description"}
        </p>
      </div>
      <div className="flex flex-wrap gap-1">
        {org.tags?.map((tag: Tag) => (
          <span
            className="bg-accent px-4 py-1 rounded-full text-white"
            key={tag.id}
          >
            {tag.display_name}
          </span>
        ))}
      </div>
    </div>
  );
}
