import LighterThemeHeader from "./header";
import LighterThemeLayout from "./layout";
import styles from "./styles.module.scss";
import { Theme } from "@/types/theme";
import LighterThemeFooter from "./footer";

const LighterTheme: Theme = {
  styles,
  layout: LighterThemeLayout,
  header: LighterThemeHeader,
  footer: LighterThemeFooter,
};

export { LighterTheme };
