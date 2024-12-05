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
        id="search-form-input"
        type="search"
        name="search"
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
        placeholder="GDP data..."
        aria-label="Search"
        className="w-3/4  rounded-[10px] bg-[var(--input-bg)] p-4 border rounded-md leading-none placeholder-gray-500"
      />
      <button
        type="submit"
        className="text-lg rounded-[10px] bg-[var(--dark)] text-[var(--text-light)] uppercase font-medium px-10 py-4 leading-none   lg:mt-0 "
      >
        Search
      </button>
    </form>
  );
};

export default SearchForm;
