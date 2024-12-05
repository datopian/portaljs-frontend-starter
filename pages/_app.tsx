import "@portaljs/components/styles.css";
import "@/styles/globals.scss";
import "@/styles/tabs.scss";

import type { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";

import SEO from "../next-seo.config";

import Loader from "../components/_shared/Loader";

import ThemeManager from "../themes/theme.manager";

function MyApp({ Component, pageProps }: AppProps) {
  const theme = pageProps.theme || "lighter";
  return (
    <ThemeManager themeName={theme}>
      <DefaultSeo {...SEO} />
      <Loader />
      <Component {...pageProps} />
    </ThemeManager>
  );
}

export default MyApp;
