import "@portaljs/components/styles.css";
import "@/styles/globals.scss";
import "@/styles/tabs.scss";

import type { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";

import SEO from "../next-seo.config";

import Loader from "../components/_shared/Loader";

import ThemeProvider from "../components/theme/theme-provider";

import { Inter, Montserrat, Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-poppins",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat"
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
});

function MyApp({ Component, pageProps }: AppProps) {
  const theme = pageProps.theme || "lighter";
  return (
    <div className={cn(poppins.variable, montserrat.variable, inter.variable)}>
      <ThemeProvider themeName={theme}>
        <DefaultSeo {...SEO} />
        <Loader />
        <Component {...pageProps} />
      </ThemeProvider>
    </div>
  );
}

export default MyApp;
