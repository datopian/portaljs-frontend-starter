import nextSeoConfig, { imageUrl, siteTitle, url } from "@/next-seo.config";
import { BreadcrumbJsonLd, LogoJsonLd, NextSeo, SiteLinksSearchBoxJsonLd } from "next-seo";
import Script from "next/script";

export function SearchPageStructuredData() {
  const title = "Search datasets"
  const description = "Browse through multiple datasets available on " + siteTitle
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
        title={`${title} | ${siteTitle}`}
        description={description}
        openGraph={{
          url: `${url}/search`,
          title: `${title} | ${siteTitle}`,
          description: description,
          images: [
            {
              url: imageUrl,
              alt: title,
              width: 1200,
              height: 627,
            },
          ],
          site_name: siteTitle,
        }}
        twitter={nextSeoConfig.twitter}
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
      >
        {JSON.stringify(jsonLd)}
      </Script>
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