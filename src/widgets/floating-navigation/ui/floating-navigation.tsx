import { useTheme } from "../../../features/theme";
import { FloatingNavigationUI } from "./floating-navigation.ui";

export function FloatingNavigation() {
  const { theme, setTheme: onThemeChange } = useTheme();

  return <FloatingNavigationUI actions={{ onThemeChange }} theme={theme} />;
}
