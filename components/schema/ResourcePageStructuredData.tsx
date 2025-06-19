import nextSeoConfig, { url } from "@/next-seo.config";
import { BreadcrumbJsonLd, LogoJsonLd, NextSeo, DatasetJsonLd } from "next-seo";
import Script from "next/script";

export function ResourcePageStructuredData({ resource, orgName, dataset }) {
  const title = resource.name
  const resourceUrl = `${url}/@${orgName}/${dataset}/r/${resource.id}`
  const description = resource.description || "Resource page of " + title

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DataDownload",
    "name": resource.name,
    "encodingFormat": resource.format,
    "contentUrl": resource.url,
    "description": description,
  };

  return (
    <>
      <LogoJsonLd
        url={resourceUrl}
        logo={`${url}/favicon.ico`}
      />
      <NextSeo
        canonical={resourceUrl}
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
            name: 'Organization',
            item: `${url}/@${orgName}`,
          },
          {
            position: 3,
            name: 'Dataset',
            item: `${url}/@${orgName}/${dataset}`,
          },
          {
            position: 4,
            name: 'Resource',
            item: resourceUrl
          },
        ]}
      />
      <Script
        id="datadownload-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}