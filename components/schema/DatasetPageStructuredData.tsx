import nextSeoConfig, { url } from "@/next-seo.config";
import { BreadcrumbJsonLd, LogoJsonLd, NextSeo, WebPageJsonLd, SiteLinksSearchBoxJsonLd, DatasetJsonLd } from "next-seo";

export function DatasetPageStructuredData({ dataset }) {
  const title = dataset.title || dataset.name
  const description = dataset.notes || "Dataset page of " + title
  const owner_org = dataset.organization.name || ""
  return (
    <>
      <LogoJsonLd
        url={`${url}/@${owner_org}/${title}`}
        logo={`${url}/favicon.ico`}
      />
      <NextSeo
        canonical={`${url}/@${owner_org}/${title}`}
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
            item: `${url}/@${owner_org}/${title}`
          },
        ]}
      />
      <DatasetJsonLd
        id={`${url}/@${owner_org}/${title}#webpage`}
        url={`${url}/@${owner_org}/${title}`}
        name={title}
        description={description}
      />
    </>
  );
}