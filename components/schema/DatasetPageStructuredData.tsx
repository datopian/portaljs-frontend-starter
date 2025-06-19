import nextSeoConfig, { url } from "@/next-seo.config";
import { BreadcrumbJsonLd, LogoJsonLd, NextSeo, DatasetJsonLd } from "next-seo";

export function DatasetPageStructuredData({ dataset }) {
  const title = dataset.title || dataset.name
  const ownerOrg = dataset?.organization?.name || "Organization"
  const datasetUrl = `${url}/@${ownerOrg}/${dataset.name}`
  const description = dataset.notes || "Dataset page of " + title

  return (
    <>
      <LogoJsonLd
        url={datasetUrl}
        logo={`${url}/favicon.ico`}
      />
      <NextSeo
        canonical={datasetUrl}
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
            name: ownerOrg,
            item: `${url}/@${ownerOrg}`,
          },
          {
            position: 3,
            name: title,
            item: datasetUrl
          },
        ]}
      />
      <DatasetJsonLd
        id={`${datasetUrl}#webpage`}
        url={datasetUrl}
        name={title}
        description={description}
      />
    </>
  );
}