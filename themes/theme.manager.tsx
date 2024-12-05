import _ThemeBase from "./default/layout";
import { DefaultTheme } from "./default";
import { LighterTheme } from "./lighter";

const templates = {
  default: DefaultTheme,
  lighter: LighterTheme,
};

const ThemeManager = ({ themeName = "lighter", children }) => {
  const themeDefinition = templates[themeName] || templates.default;
  const ThemeBase = themeDefinition.layout || _ThemeBase;
  return (
    <ThemeBase
      Header={themeDefinition?.header}
      Siderbar={themeDefinition?.sidebar}
      Footer={themeDefinition?.footer}
    >
      {children}
    </ThemeBase>
  );
};

export default ThemeManager;
