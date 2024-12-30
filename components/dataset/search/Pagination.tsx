import { Dispatch, SetStateAction, useEffect } from "react";
import { useSearchState } from "./SearchContext";

export default function Pagination({
  subsetOfPages,
  setSubsetOfPages,
  count,
}: {
  subsetOfPages: number;
  setSubsetOfPages: Dispatch<SetStateAction<number>>;
  count: number;
}) {
  const { options, setOptions } = useSearchState();

  const max = 10;

  return (
    <div className="flex gap-2 align-center">
      {subsetOfPages !== 0 && (
        <button
          className="font-semibold flex items-center gap-2"
          onClick={() => setSubsetOfPages(subsetOfPages - max)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="19"
            height="16"
            viewBox="0 0 19 16"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9.15219 15.248C8.68844 15.6664 7.93656 15.6664 7.47281 15.248L0.34781 8.81938C0.12511 8.61845 -6.30829e-07 8.34593 -6.55671e-07 8.06177C-6.80513e-07 7.77761 0.12511 7.50509 0.34781 7.30415L7.47281 0.875584C7.93656 0.457164 8.68844 0.457164 9.15219 0.875584C9.61594 1.294 9.61594 1.97239 9.15219 2.39081L4.05438 6.99034L17.8125 6.99034C18.4683 6.99034 19 7.47003 19 8.06177C19 8.6535 18.4683 9.13319 17.8125 9.1332L4.05438 9.1332L9.15219 13.7327C9.61594 14.1511 9.61594 14.8295 9.15219 15.248Z"
              fill="#AAAAAA"
            />
          </svg>
          <span className="text-[#757575] text-[18px]">Prev</span>
        </button>
      )}
      {Array.from(Array(Math.ceil(count / max)).keys()).map((x) => (
        <button
          key={x}
          className={`${
            x == options.offset / max
              ? "bg-accent !h-9 !w-9 rounded-[10px] text-white"
              : ""
          } px-2 font-semibold`}
          onClick={() => {
            setOptions({ ...options, offset: x * max });
            if (typeof window !== "undefined") {
              window.scrollTo({
                top: 0,
                behavior: "smooth", // Makes the scroll smooth
              });
            }
          }}
          style={{
            display:
              x >= subsetOfPages && x < subsetOfPages + max ? "block" : "none",
          }}
        >
          {x + 1}
        </button>
      ))}
      {subsetOfPages !== Math.ceil(count / max) && count > 50 && (
        <button
          className="font-semibold flex items-center gap-2"
          onClick={() => setSubsetOfPages(subsetOfPages + max)}
        >
          <span className="text-[18px] text-[#313131]">Next</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
