import type { InferGetServerSidePropsType } from "next";
import { SWRConfig, unstable_serialize } from "swr";
import Layout from "@/components/_shared/Layout";
import DatasetSearchForm from "@/components/dataset/search/DatasetSearchForm";
import DatasetSearchFilters from "@/components/dataset/search/DatasetSearchFilters";
import ListOfDatasets from "@/components/dataset/search/ListOfDatasets";
import { searchDatasets } from "@/lib/queries/dataset";
import HeroSection from "@/components/_shared/HeroSection";
import { useTheme } from "@/components/theme/theme-provider";
import {
  SearchStateProvider,
  useSearchState,
} from "@/components/dataset/search/SearchContext";
import { PackageSearchOptions } from "@portaljs/ckan";
import { SearchPageStructuredData } from "@/components/schema/SearchPageStructuredData";

export async function getServerSideProps() {
  // TODO: this doesn't work properly. It must read the params from the URL.
  const initialRequestOption: PackageSearchOptions = {
    offset: 0,
    limit: 10,
    tags: [],
    groups: [],
    orgs: [],
    resFormat: [],
  };

  const search_result = await searchDatasets(initialRequestOption);

  return {
    props: {
      fallback: {
        [unstable_serialize(["package_search", initialRequestOption])]:
          search_result,
      },
      searchFacets: {
        ...search_result.search_facets,
      },
    },
  };
}

export default function DatasetSearch({
  fallback,
  searchFacets,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  return (
    <>
      <SearchPageStructuredData />

      <SWRConfig value={{ fallback }}>
        <SearchStateProvider facets={searchFacets}>
          <SearchPageContent />
        </SearchStateProvider>
      </SWRConfig>
    </>
  );
}

function SearchPageContent() {
  const { options } = useSearchState();
  const {
    theme: { styles },
  } = useTheme();

  return (
    <Layout>
      <div className="grid grid-rows-searchpage-hero">
        <HeroSection title="Search" titleAccent={`${options.type}s`} />
        <section className={`grid row-start-3 row-span-2 col-span-full pt-4 `}>
          <div className={`custom-container bg-white ${styles.shadowMd}`}>
            <DatasetSearchForm />
          </div>
        </section>
      </div>
      <div className="custom-container bg-white">
        <article className="grid grid-cols-1 lg:grid-cols-9 gap-x-6 xl:gap-x-12 pt-[30px] pb-[30px]">
          <div className="lg:col-span-3  lg:sticky top-3 h-fit">
            <DatasetSearchFilters />
          </div>
          <div className="lg:col-span-6">
            <ListOfDatasets />
          </div>
        </article>
      </div>
    </Layout>
  );
}
