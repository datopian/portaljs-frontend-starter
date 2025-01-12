import { useTheme } from "@/components/theme/theme-provider";
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
  const {
    theme: { styles },
  } = useTheme();
  return (
    <>
      <section className="row-start-1 row-span-3 col-span-full">
        <div
          className="bg-cover bg-center bg-no-repeat  pt-[60px] pb-[36px] flex flex-col"
          style={{}}
        >
          <div className="grid md:grid-cols-2 mx-auto items-center grow mx-auto custom-container bg-white">
            <div className="col-span-1">
              <h1 className="text-[55px] font-black ">{title}</h1>
            </div>
          </div>
        </div>
      </section>
      <section className={`grid row-start-3 row-span-2 col-span-full pt-4 `}>
        <div className={`custom-container bg-white ${styles.shadowMd}`}>
          <div className="">
            <form className="min-h-[70px] flex flex-col lg:flex-row bg-white pr-5 py-3 rounded-xl">
              <input
                type="text"
                placeholder={`Search for ${title}`}
                className="mx-4 grow py-3 border-0 placeholder:text-neutral-400 outline-0"
                id="search2"
                name="search"
                onChange={(e) => {
                  onChange(e.target.value);
                }}
                value={searchValue}
                aria-label={`Search ${title}`}
              />
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
/*<div className="grid md:grid-cols-2 mx-auto items-center grow custom-container grow">
      <div className="col-span-1">
        <h1 className="text-5xl font-black ">{title}</h1>
        <input
          id="search2"
          type="search"
          name="search"
          onChange={(e) => {
            onChange(e.target.value);
          }}
          value={searchValue}
          placeholder="Search..."
          aria-label="Search"
          className="w-3/4 px-3 py-4 mt-8 border border-accent rounded-md leading-none bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-accent focus:border-accent"
        />
      </div>
    </div>*/
