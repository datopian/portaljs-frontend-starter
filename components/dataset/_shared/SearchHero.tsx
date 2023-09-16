import { Dispatch, SetStateAction } from "react";

export default function SearchHero({
  title,
  searchValue,
  onChange,
}: {
  title: string;
  searchValue: string;
  onChange: Dispatch<SetStateAction<string>>;
}) {
  return (
    <div className="grid md:grid-cols-2 mx-auto items-center grow custom-container grow">
      <div className="col-span-1">
        <h1 className="text-5xl font-black text-white">{title}</h1>
        <input
          id="search2"
          type="search"
          name="search"
          onChange={(e) => {
            onChange(e.target.value);
          }}
          value={searchValue}
          placeholder="Education"
          aria-label="Search"
          className="w-3/4 px-3 py-4 my-8 border border-accent rounded-md leading-none bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-accent focus:border-accent"
        />
      </div>
    </div>
  );
}
