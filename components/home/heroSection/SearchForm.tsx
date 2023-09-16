import { FormEvent, useState } from "react";
import { useRouter } from "next/router";

const SearchForm: React.FC = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (e) {
      e.preventDefault();
    }
    router.push({
      pathname: "/search",
      query: { q: searchQuery },
    });
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="items-center flex flex-row gap-4"
    >
      <input
        id="search2"
        type="search"
        name="search"
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
        placeholder="GDP data..."
        aria-label="Search"
        className="w-3/4 pl-3 py-4 border border-accent rounded-md leading-none bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-accent focus:border-accent"
      />
      <button
        type="submit"
        className="text-lg uppercase font-medium px-10 py-4 leading-none border bg-accent rounded-md text-white border-accent lg:mt-0 focus:bg-darkaccent hover:bg-darkaccent"
      >
        Search
      </button>
    </form>
  );
};

export default SearchForm;
