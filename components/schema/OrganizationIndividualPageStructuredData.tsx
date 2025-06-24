import nextSeoConfig, { imageUrl, siteTitle, url } from "@/next-seo.config";
import { BreadcrumbJsonLd, LogoJsonLd, NextSeo, WebPageJsonLd } from "next-seo";

export function OrganizationIndividualPageStructuredData({ org }) {
  const title = org.name || org.title
  const description = org.notes || "Organization page of " + title
  const image = org.image_display_url || imageUrl
  return (
    <>
      <LogoJsonLd
        url={`${url}/@${title}`}
        logo={org.image_display_url || `${url}/favicon.ico`}
      />
      <NextSeo
        canonical={`${url}/@${title}`}
        title={`${title} | ${siteTitle}`}
        description={description}
        openGraph={{
          url: `${url}/@${title}`,
          title: `${title} | ${siteTitle}`,
          description: description,
          images: [
            {
              url: image,
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
            name: title,
            item: `${url}/@${title}`,
          },
        ]}
      />
      <WebPageJsonLd
        id={`${url}/@${title}#webpage`}
        url={`${url}/@${title}`}
        name={title}
        description={description}
      />
    </>
  );
}