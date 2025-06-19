import nextSeoConfig, { url } from "@/next-seo.config";
import { BreadcrumbJsonLd, LogoJsonLd, NextSeo, WebPageJsonLd, SiteLinksSearchBoxJsonLd } from "next-seo";

export function OrganizationPageStructuredData() {
  const title = "Organizations page"
  const description = "Organizations page of PortalJS Open Data Portal"
  return (
    <>
      <LogoJsonLd
        url={`${url}/organizations`}
        logo={`${url}/favicon.ico`}
      />
      <NextSeo
        canonical={`${url}/organizations`}
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
            name: 'Organizations',
            item: `${url}/organizations`,
          },
        ]}
      />
      <WebPageJsonLd
        id={`${url}/organizations#webpage`}
        url={`${url}/organizations`}
        name={title}
        description={description}
      />
      <SiteLinksSearchBoxJsonLd
        url={`${url}/organizations`}
        potentialActions={[
          {
            target: `${url}/organizations`,
            queryInput: "search_term_string"
          },
        ]}
      />
    </>
  );
}