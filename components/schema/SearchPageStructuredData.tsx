import nextSeoConfig, { url } from "@/next-seo.config";
import { BreadcrumbJsonLd, LogoJsonLd, NextSeo, SiteLinksSearchBoxJsonLd } from "next-seo";
import Script from "next/script";

export function SearchPageStructuredData() {
  const title = "Search page"
  const description = "Browse through multiple datasets available on " + title
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DataCatalog",
    "name": title,
    "description": description,
    "url": url + "/search",
  };
  return (
    <>
      <LogoJsonLd
        url={`${url}/search`}
        logo={`${url}/favicon.ico`}
      />
      <NextSeo
        canonical={`${url}/search`}
        title={title}
        description={description}
        {...nextSeoConfig}
      />
      <BreadcrumbJsonLd
        itemListElements={[
          {
            position: 1,
            name: 'Home',
            item: url,
          },
          {
            position: 2,
            name: 'Search',
            item: `${url}/search`,
          },
        ]}
      />
      <Script
        id="datacatalog-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteLinksSearchBoxJsonLd
        url={`${url}/search`}
        potentialActions={[
          {
            target: `${url}/search?q={search_term_string}`,
            queryInput: "search_term_string"
          },
        ]}
      />
    </>
  );
}