import { useCallback, useEffect, useState } from "react";

import { isOpen, type FloatingNavigationView } from "./panel-state";

export function useFloatingNavigationPanel() {
  const [view, setView] = useState<FloatingNavigationView>("closed");

  const handleClose = useCallback(() => setView("closed"), []);

  const handleOpenMenu = useCallback(() => setView("menu"), []);

  const handleOpenAbout = useCallback(() => setView("about"), []);

  const handleOpenTheme = useCallback(() => setView("theme"), []);

  // Close panel on Escape key.
  useEffect(() => {
    if (!isOpen(view)) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [view, handleClose]);

  return {
    view,
    actions: {
      onClose: handleClose,
      onOpenMenu: handleOpenMenu,
      onOpenAbout: handleOpenAbout,
      onOpenTheme: handleOpenTheme,
    },
  };
}
