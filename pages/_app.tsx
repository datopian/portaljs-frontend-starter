import "@portaljs/components/styles.css";
import "@/styles/globals.scss";
import "@/styles/tabs.scss";

import type { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";

import SEO from "../next-seo.config";

import Loader from "../components/_shared/Loader";

import ThemeProvider from "../components/theme/theme-provider";

import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-poppins",
});

function MyApp({ Component, pageProps }: AppProps) {
  const theme = pageProps.theme || "lighter";
  return (
    <div className={poppins.variable}>
      <ThemeProvider themeName={theme}>
        <DefaultSeo {...SEO} />
        <Loader />
        <Component {...pageProps} />
      </ThemeProvider>
    </div>
  );
}

export default MyApp;
