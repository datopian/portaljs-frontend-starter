import nextSeoConfig, { url } from "@/next-seo.config";
import { BreadcrumbJsonLd, LogoJsonLd, NextSeo, WebPageJsonLd, SiteLinksSearchBoxJsonLd } from "next-seo";

export function GroupPageStructuredData() {
  const title = "Groups page"
  const description = "Groups page of " + title
  return (
    <>
      <LogoJsonLd
        url={`${url}/groups`}
        logo={`${url}/favicon.ico`}
      />
      <NextSeo
        canonical={`${url}/groups`}
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
            name: 'Groups',
            item: `${url}/groups`,
          },
        ]}
      />
      <WebPageJsonLd
        id={`${url}/groups#webpage`}
        url={`${url}/groups`}
        name={title}
        description={description}
      />
      <SiteLinksSearchBoxJsonLd
        url={`${url}/groups`}
        potentialActions={[
          {
            target: `${url}/groups`,
            queryInput: "search_term_string"
          },
        ]}
      />
    </>
  );
}