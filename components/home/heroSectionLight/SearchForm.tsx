import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import { useTheme } from "@/components/theme/theme-provider";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

const SearchForm: React.FC = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const { theme } = useTheme();
  const { styles } = theme;

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
        placeholder="Search datasets..."
        aria-label="Search datasets"
        className={`w-3/4  rounded-[10px] border-1 bg-white  py-3 px-4 md:py-4 md:px-4 border leading-none placeholder-gray-500 ${styles.shadowMd}`}
      />
      <button
        type="submit"
        className={`text-lg border-b-[4px] border-accent rounded-[10px] ${styles.bgDark}  uppercase font-medium px-3 py-3 md:px-10 md:py-4 leading-none lg:mt-0 ${styles.textLight} `}
      >
        <MagnifyingGlassIcon width={24} className="sm:hidden" />
        <span className="hidden sm:block">Search</span>
      </button>
    </form>
  );
};

export default SearchForm;
