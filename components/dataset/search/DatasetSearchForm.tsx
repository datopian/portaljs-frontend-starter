import {  useState } from "react";
import { useTheme } from "@/components/theme/theme-provider";
import { useSearchState } from "./SearchContext";

export default function DatasetSearchForm() {
  const { theme } = useTheme();
  const { setOptions, options: searchOptions, searchFacets } = useSearchState();
  const [q, setQ] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    setOptions({
      query: q,
    });
    return false;
  };

  return (
    <form className="" onSubmit={handleSubmit}>
      <div className="min-h-[70px] flex flex-col lg:flex-row bg-white pr-5 py-3 rounded-xl">
        <input
          type="text"
          placeholder="Type in keyword..."
          className="mx-4 grow py-3 border-0 placeholder:text-neutral-400 outline-0"
          name="query"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="Search datasets"
        />

        <button
          className={`font-bold border-b-[4px] border-accent text-white px-12 py-3 rounded-lg bg-accent hover:bg-cyan-500 duration-150 ${theme.styles.bgDark}`}
          type="submit"
        >
          SEARCH
        </button>
      </div>
    </form>
  );
}
