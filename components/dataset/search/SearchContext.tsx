import { PackageSearchOptions } from "@portaljs/ckan";
import { useRouter } from "next/router";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

type Tab = "datasets" | "insights";

type setQueryParamFn<T> = (value: T) => void;

interface SearchStateContext {
  searchFacets: any;
  options: PackageSearchOptions;
  setOptions: setQueryParamFn<Partial<PackageSearchOptions>>;
  setSearchFacets: Dispatch<SetStateAction<{}>>;
}

export const SearchStateContext = createContext<SearchStateContext | null>(
  null
);

export const useSearchState = () => useContext(SearchStateContext);

export const SearchStateProvider = ({
  children,
  facets,
}: {
  children: React.ReactNode;
  facets: any;
}) => {
  const router = useRouter();
  const { query } = router;
  const [searchFacets, setSearchFacets] = useState(facets);

  const setQueryParam = (
    partial:
      | {
          [k: string]: string | Array<string>;
        }
      | Partial<PackageSearchOptions>
  ) => {
    router.push({ query: { ...query, ...partial } }, undefined, {
      shallow: true,
    });
  };

  const options: PackageSearchOptions = {
    offset: query?.offset ? parseInt(query?.offset as string) : 0,
    limit: 10,
    tags: parseArQueryParam(query?.tags),
    groups: parseArQueryParam(query?.groups),
    orgs: parseArQueryParam(query?.orgs),
    resFormat: parseArQueryParam(query?.resFormat),
    query: (query?.query as string) ?? "",
    sort: (query?.sort as string) ?? "score desc",
  };

  const value: SearchStateContext = {
    options,
    setOptions: (options) => setQueryParam(options),
    searchFacets,
    setSearchFacets,
  };

  return (
    <SearchStateContext.Provider value={value}>
      {children}
    </SearchStateContext.Provider>
  );
};

const parseArQueryParam = (queryParam: any) => {
  if (Array.isArray(queryParam)) {
    return queryParam;
  }

  if (!!queryParam) {
    return [queryParam];
  }

  return [];
};
