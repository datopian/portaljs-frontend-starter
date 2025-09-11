import { capitalizeFirstLetter } from "@/lib/utils";
import Link from "next/link";
import { RiHome3Line } from "react-icons/ri";

export default function DatasetNavCrumbs({
  datasetType = "dataset",
  datasetsLinkHref = "/search",
  org,
  dataset,
}: {
  datasetType: string;
  datasetsLinkHref: string,
  org: { name?: string; title?: string };
  dataset: { name: string; title: string };
}) {
  return (
    <nav>
      <ul className="flex gap-x-8 mx-auto custom-container">
        <li className="flex gap-x-2 items-center py-2 flex-nowrap overflow-x-auto whitespace-nowrap">
          <Link
            href="/"
            className="font-semibold flex items-center  text-[18px] "
            style={{ minWidth: "fit-content" }}
          >
            <RiHome3Line />
            <span className="sr-only">Home</span>
          </Link>
          <Link
            href={datasetsLinkHref}
            className="font-semibold "
            style={{ minWidth: "fit-content" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4  inline"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
            <span className="first-letter:uppercase">
                {capitalizeFirstLetter(datasetType)}s
            </span>
          </Link>
          <Link href={`/@${org.name}`} passHref className="font-semibold ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4  mx-0 inline"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
            {org.title || org.name}
          </Link>
          <span className="font-semibold ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4  mx-0 inline"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
            {dataset.title || dataset.name}
          </span>
        </li>
      </ul>
    </nav>
  );
}
