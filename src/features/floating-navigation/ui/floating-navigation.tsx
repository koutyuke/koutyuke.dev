import { portfolioNavigationItems } from "../../../content/navigation";
import { socialLinks } from "../../../content/profile";
import { useTheme } from "../../theme/use-theme";
import { useFloatingNavigationPanel } from "../model/use-floating-navigation-panel";
import { FloatingNavigationUI } from "./floating-navigation.ui";
import { AboutPanelUI } from "./panels/about-panel";
import { MenuPanelUI } from "./panels/menu-panel.ui";
import { ThemePanelUI } from "./panels/theme-panel";

export function FloatingNavigation() {
  const { theme, setTheme: onThemeChange } = useTheme();
  const {
    view,
    actions: { onClose, onOpenAbout, onOpenMenu, onOpenTheme },
  } = useFloatingNavigationPanel();

  return (
    <FloatingNavigationUI
      view={view}
      actions={{ onClose, onOpenMenu }}
      slots={{
        MenuPanel: (
          <MenuPanelUI
            navigationItems={portfolioNavigationItems}
            socialLinks={socialLinks}
            actions={{
              onClose,
              onOpenAbout,
              onOpenTheme,
            }}
          />
        ),
        AboutPanel: <AboutPanelUI actions={{ onBack: onOpenMenu }} />,
        ThemePanel: <ThemePanelUI actions={{ onBack: onOpenMenu, onThemeChange }} theme={theme} />,
      }}
    />
  );
}
