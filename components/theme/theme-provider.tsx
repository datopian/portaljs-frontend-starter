import _ThemeBase from "../../themes/default/layout";
import { DefaultTheme } from "../../themes/default";
import { LighterTheme } from "../../themes/lighter";
import { createContext, FC, ReactNode, useContext, useState } from "react";
import { Theme } from "@/types/theme";

const themes: Record<string, Theme> = {
  lighter: LighterTheme,
  default: DefaultTheme,
};

interface ThemeContextProps {
  theme: Theme;
  setTheme: (themeName: string) => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

const ThemeProvider: FC<{ children: ReactNode; themeName?: string }> = ({
  children,
  themeName = "default",
}) => {
  const [theme, setTheme] = useState<Theme>(
    themes[themeName] || themes.default
  );

  const switchTheme = (themeName: string) => {
    setTheme(themes[themeName] || themes.default);
  };

  const themeDefinition = themes[themeName] || themes.default;
  const ThemeBase = themeDefinition.layout || _ThemeBase;

  return (
    <ThemeContext.Provider value={{ theme, setTheme: switchTheme }}>
      <ThemeBase
        Header={themeDefinition?.header}
        Sidebar={themeDefinition?.sidebar}
        Footer={themeDefinition?.footer}
      >
        {children}
      </ThemeBase>
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export default ThemeProvider;
