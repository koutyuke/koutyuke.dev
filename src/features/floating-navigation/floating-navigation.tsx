import { portfolioNavigationItems } from "../../content/navigation";
import { socialLinks } from "../../content/profile";
import { useTheme } from "../theme/use-theme";
import { FloatingNavigationUi } from "./floating-navigation.ui";

export function FloatingNavigation() {
  const { resolvedTheme, setTheme, theme } = useTheme();

  return (
    <FloatingNavigationUi
      navigationItems={portfolioNavigationItems}
      resolvedTheme={resolvedTheme}
      socialLinks={socialLinks}
      theme={theme}
      onThemeChange={setTheme}
    />
  );
}
