import Link from "next/link";
import { RiHome2Line, RiHome3Line } from "react-icons/ri";

export default function OrgNavCrumbs({
  org,
}: {
  org: { name?: string; title?: string };
}) {
  return (
    <nav>
      <ul className="flex gap-x-8 mx-auto custom-container bg-white">
        <li className="flex gap-x-2 align-center flex-col sm:flex-row">
          <Link
            href="/"
            className="font-semibold flex items-center  text-[18px] "
            style={{ minWidth: "fit-content" }}
          >
            <RiHome3Line />
            <span className="sr-only">Home</span>
          </Link>
          <Link
            href="/organizations"
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
            Organizations
          </Link>
          {org.name && org.title && (
            <Link href={`/@${org.name}`} className="font-semibold ">
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
              <span>{org.title}</span>
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
