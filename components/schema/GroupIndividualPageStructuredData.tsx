import nextSeoConfig, { imageUrl, siteTitle, url } from "@/next-seo.config";
import { Group } from "@portaljs/ckan";
import { BreadcrumbJsonLd, LogoJsonLd, NextSeo, WebPageJsonLd } from "next-seo";

export function GroupIndividualPageStructuredData({ group }: { group: Group }) {
  const title = group.title || group.name
  const groupUrl = `${url}/groups/${group.name}`
  const description = group.description || "Group page of " + title
  const image = group.image_display_url || imageUrl

  return (
    <>
      <LogoJsonLd
        url={groupUrl}
        logo={group.image_display_url || `${url}/favicon.ico`}
      />
      <NextSeo
        canonical={groupUrl}
        title={`${title} | ${siteTitle}`}
        description={description}
        openGraph={{
          url: groupUrl,
          title: `${title} | ${siteTitle}`,
          description,
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
            name: 'Groups Page',
            item: `${url}/groups`,
          },
          {
            position: 3,
            name: title,
            item: groupUrl,
          },
        ]}
      />
      <WebPageJsonLd
        id={`${groupUrl}#grouppage`}
        url={groupUrl}
        name={title}
        description={description}
      />
    </>
  );
}