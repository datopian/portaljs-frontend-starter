import nextSeoConfig, { imageUrl, siteTitle, url } from "@/next-seo.config";
import { Dataset } from "@portaljs/ckan";
import { BreadcrumbJsonLd, LogoJsonLd, NextSeo, DatasetJsonLd } from "next-seo";

export function DatasetPageStructuredData({ dataset }: { dataset: Dataset }) {
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
        title={`${title} | ${siteTitle}`}
        description={description}
        openGraph={{
          url: datasetUrl,
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
      <DatasetJsonLd
        id={`${datasetUrl}#dataset`}
        url={datasetUrl}
        name={title}
        description={description}
        creator={{
          '@type': 'Organization',
          name: ownerOrg,
        }}
        keywords={dataset.tags?.map(tag => tag.name) || []}
        license={dataset.license_title}
        distribution={
          dataset.resources?.map(res => ({
            '@type': 'DataDownload',
            encodingFormat: res.format,
            contentUrl: res.url,
            name: res.name,
          })) || []
        }
      />
    </>
  );
}