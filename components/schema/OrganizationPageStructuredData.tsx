import nextSeoConfig, { imageUrl, siteTitle, url } from "@/next-seo.config";
import { BreadcrumbJsonLd, LogoJsonLd, NextSeo, WebPageJsonLd, SiteLinksSearchBoxJsonLd } from "next-seo";

export function OrganizationPageStructuredData() {
  const title = "Organizations"
  const description = "Organizations page of " + siteTitle
  return (
    <>
      <LogoJsonLd
        url={`${url}/organizations`}
        logo={`${url}/favicon.ico`}
      />
      <NextSeo
        canonical={`${url}/organizations`}
        title={`${title} | ${siteTitle}`}
        description={description}
        openGraph={{
          url: `${url}/organizations`,
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
            name: 'Organizations Page',
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