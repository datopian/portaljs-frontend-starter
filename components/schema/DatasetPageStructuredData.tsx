import nextSeoConfig, { url } from "@/next-seo.config";
import { BreadcrumbJsonLd, LogoJsonLd, NextSeo, DatasetJsonLd } from "next-seo";

export function DatasetPageStructuredData({ dataset }) {
  const title = dataset.title || dataset.name
  const datasetUrl = `${url}/@${dataset.organization.name}/${dataset.name}`
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
            name: 'Dataset',
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