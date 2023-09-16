import Link from "next/link";

export default function GroupNavCrumbs({
  group,
}: {
  group: { name?: string; title?: string };
}) {
  return (
    <nav>
      <ul className="flex gap-x-8 mx-auto custom-container">
        <li className="flex gap-x-2 align-center flex-col sm:flex-row">
          <Link
            href="/groups"
            className="font-semibold text-white"
            style={{ minWidth: "fit-content" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 text-white inline"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
            Groups
          </Link>
          {group.name && group.title && (
            <Link
              href={`/groups/${group.name}`}
              className="font-semibold text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 text-white inline"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
              <span>{group.title}</span>
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
