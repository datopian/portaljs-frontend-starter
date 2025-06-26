/* eslint-disable import/no-anonymous-default-export */

export const siteTitle = "PortalJS Open Data Portal";
export const title = "PortalJS";
export const description =
  "Discover thousands of datasets, publish your own, and request data via Portal – an open data platform powered by PortalJS.";

export const url = "https://portaljs-cloud-frontend-template.vercel.app";
export const imageUrl = `${url}/images/portaljs-frontend.png`;

export default {
  defaultTitle: `${siteTitle} | ${title}`,
  siteTitle,
  description,
  canonical: url,
  openGraph: {
    siteTitle,
    description,
    type: "website",
    locale: "en_US",
    url,
    site_name: siteTitle,
    images: [
      {
        url: imageUrl,
        alt: siteTitle,
        width: 1200,
        height: 627,
        type: "image/png",
      },
    ],
  },
  twitter: {
    handle: "@datopian",
    site: "@PortalJS_",
    cardType: "summary_large_image",
  },
  additionalMetaTags: [
    {
      name: "keywords",
      content: "PortalJS, open data, datasets, data portal, Portal, datopian, frontend template",
    },
    {
      name: "author",
      content: "Datopian / PortalJS",
    },
    {
      property: "og:image:width",
      content: "1200",
    },
    {
      property: "og:image:height",
      content: "627",
    },
    {
      property: "og:locale",
      content: "en_US",
    },
  ],
  additionalLinkTags: [
    {
      rel: "icon",
      href: "/favicon.ico",
    },
    {
      rel: "apple-touch-icon",
      href: "/apple-touch-icon.png",
      sizes: "180x180",
    },
    {
      rel: "manifest",
      href: "/site.webmanifest",
    },
  ]
};
