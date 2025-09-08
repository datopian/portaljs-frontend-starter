import { searchDatasets } from "@/lib/queries/dataset";
import { PackageSearchOptions } from "@/schemas/dataset.interface";
import { useRouter } from "next/router";
import { createContext, useContext } from "react";
import useSWR from "swr";
import { useRef, useEffect, useCallback } from "react";

type setQueryParamFn<T> = (value: T) => void;

interface SearchStateContext {
  packageSearchFacets: any;
  options: PackageSearchOptions;
  setOptions: setQueryParamFn<Partial<PackageSearchOptions>>;
  packageSearchResults: any;
  isLoadingPackageSearchResults: boolean;
  visualizationsSearchResults: any;
  isLoadingVisualizations: boolean;
  visualizationsSearchFacets: any;
  searchResults: any;
  searchFacets: any;
  isLoading: boolean;
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
    type: (query?.type as string) ?? "dataset",
  };

  const packagesOptions = {
    ...options,
    rows: options.type === "dataset" ? options.limit : 0,
    type: "dataset",
  };
  const {
    data: packageSearchResults,
    isValidating: isLoadingPackageSearchResults,
  } = useSWR(
    ["package_search", packagesOptions],
    async (api, options) => {
      return searchDatasets(options);
    },
    { use: [laggy] }
  );

  const visualizationsOptions = {
    ...options,
    resFormat: [],
    rows: options.type === "visualization" ? options.limit : 0,
    type: "visualization",
  };
  const {
    data: visualizationsSearchResults,
    isValidating: isLoadingVisualizations,
  } = useSWR(
    ["visualization_package_search", visualizationsOptions],
    async (api, options) => {
      return searchDatasets(options);
    },
    { use: [laggy] }
  );

  const searchResults =
    options.type === "visualization"
      ? visualizationsSearchResults
      : packageSearchResults;
  const isLoading =
    options.type === "visualization"
      ? isLoadingVisualizations
      : isLoadingPackageSearchResults;

  const packageSearchFacets = packageSearchResults?.search_facets ?? {};
  const visualizationsSearchFacets =
    visualizationsSearchResults?.search_facets ?? {};
  const searchFacets =
    options.type === "visualization"
      ? visualizationsSearchFacets
      : packageSearchFacets;


  const value: SearchStateContext = {
    options,
    setOptions: (options) => setQueryParam(options),
    packageSearchFacets: packageSearchFacets,
    packageSearchResults,
    isLoadingPackageSearchResults,
    visualizationsSearchResults,
    isLoadingVisualizations,
    visualizationsSearchFacets,
    searchResults,
    searchFacets,
    isLoading,
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

// This is a SWR middleware for keeping the data even if key changes.
function laggy(useSWRNext) {
  return (key, fetcher, config) => {
    // Use a ref to store previous returned data.
    const laggyDataRef = useRef();

    // Actual SWR hook.
    const swr = useSWRNext(key, fetcher, config);

    useEffect(() => {
      // Update ref if data is not undefined.
      if (swr.data !== undefined) {
        laggyDataRef.current = swr.data;
      }
    }, [swr.data]);

    // Expose a method to clear the laggy data, if any.
    const resetLaggy = useCallback(() => {
      laggyDataRef.current = undefined;
    }, []);

    // Fallback to previous data if the current data is undefined.
    const dataOrLaggyData =
      swr.data === undefined ? laggyDataRef.current : swr.data;

    // Is it showing previous data?
    const isLagging =
      swr.data === undefined && laggyDataRef.current !== undefined;

    // Also add a `isLagging` field to SWR.
    return Object.assign({}, swr, {
      data: dataOrLaggyData,
      isLagging,
      resetLaggy,
    });
  };
}
