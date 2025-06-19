import nextSeoConfig, { url } from "@/next-seo.config";
import { BreadcrumbJsonLd, LogoJsonLd, NextSeo, WebPageJsonLd } from "next-seo";

export function GroupIndividualPageStructuredData({ group }) {
  const title = group.name || group.title
  const groupUrl = `${url}/groups/${group.name}`
  const description = group.description || "Group page of " + title
  return (
    <>
      <LogoJsonLd
        url={groupUrl}
        logo={group.image_display_url || `${url}/favicon.ico`}
      />
      <NextSeo
        canonical={groupUrl}
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
        id={`${groupUrl}#webpage`}
        url={groupUrl}
        name={title}
        description={description}
      />
    </>
  );
}