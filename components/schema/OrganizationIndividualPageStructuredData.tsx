import nextSeoConfig, { imageUrl, siteTitle, url } from "@/next-seo.config";
import { Organization } from "@portaljs/ckan";
import { BreadcrumbJsonLd, LogoJsonLd, NextSeo, WebPageJsonLd } from "next-seo";

export function OrganizationIndividualPageStructuredData({ org }: { org: Organization }) {
  const encodedOrgName = encodeURIComponent(org.name || org.title || '')
  const orgUrl = `${url}/@${encodedOrgName}`
  const title = org.title || org.name
  const description = org.description || "Organization page of " + title
  const image = org.image_display_url || imageUrl
  return (
    <>
      <LogoJsonLd
        url={orgUrl}
        logo={org.image_display_url || `${url}/favicon.ico`}
      />
      <NextSeo
        canonical={orgUrl}
        title={`${title} | ${siteTitle}`}
        description={description}
        openGraph={{
          url: orgUrl,
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
            item: orgUrl,
          },
        ]}
      />
      <WebPageJsonLd
        id={`${orgUrl}#webpage`}
        url={orgUrl}
        name={title}
        description={description}
      />
    </>
  );
}