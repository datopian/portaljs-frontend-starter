import nextSeoConfig, { url } from "@/next-seo.config";
import { BreadcrumbJsonLd, LogoJsonLd, NextSeo, WebPageJsonLd } from "next-seo";

export function OrganizationIndividualPageStructuredData({ org }) {
  const title = org.name || org.title
  const description = org.notes || "Organizations page of " + title
  return (
    <>
      <LogoJsonLd
        url={`${url}/@${title}`}
        logo={org.image_display_url || `${url}/favicon.ico`}
      />
      <NextSeo
        canonical={`${url}/@${title}`}
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