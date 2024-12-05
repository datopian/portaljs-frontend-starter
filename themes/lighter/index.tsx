import Footer from "@/components/_shared/FooterLight";
import LighterThemeHeader from "./header";
import LighterThemeLayout from "./layout";
import styles from "./styles.module.scss";
import { Theme } from "@/types/theme";

const LighterTheme: Theme = {
  styles,
  layout: LighterThemeLayout,
  header: LighterThemeHeader,
  footer: Footer,
};

export { LighterTheme };
