import { MenuIcon } from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent } from "react";

import { cn } from "../../../shared/lib";
import { AboutPanelUI } from "./panels/about-panel.ui";
import { MenuPanelUI } from "./panels/menu-panel.ui";
import { ThemePanelUI } from "./panels/theme-panel.ui";
import type { ThemeMode } from "../../../features/theme";

type FloatingNavigationView = "about" | "closed" | "menu" | "theme";

function isOpen(view: FloatingNavigationView) {
  return view !== "closed";
}

type FloatingNavigationUIProps = {
  actions: {
    onThemeChange: (theme: ThemeMode) => void;
  };
  initialView?: FloatingNavigationView;
  theme: ThemeMode;
};

export const FloatingNavigationUI = ({
  actions: { onThemeChange },
  initialView = "closed",
  theme,
}: FloatingNavigationUIProps) => {
  const [view, setView] = useState<FloatingNavigationView>(initialView);
  const panelId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const prevViewRef = useRef<FloatingNavigationView>("closed");

  const handleClose = useCallback(() => setView("closed"), []);
  const handleOpenMenu = useCallback(() => setView("menu"), []);
  const handleOpenAbout = useCallback(() => setView("about"), []);
  const handleOpenTheme = useCallback(() => setView("theme"), []);

  // Move focus into the panel when it opens; restore to the trigger when it closes.
  useEffect(() => {
    const prevView = prevViewRef.current;
    const open = isOpen(view);
    const prevOpen = isOpen(prevView);

    if (open && view !== prevView) {
      panelRef.current?.focus();
    } else if (!open && prevOpen) {
      triggerRef.current?.focus();
    }
    prevViewRef.current = view;
  }, [view]);

  const handlePanelKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        handleClose();
      }
    },
    [handleClose],
  );

  return (
    <>
      {isOpen(view) && (
        <div aria-hidden="true" className="fixed inset-0 z-40" onClick={handleClose} />
      )}
      <div className="dark pointer-events-none fixed right-0 bottom-8 left-0 z-50 flex w-screen items-end justify-center">
        <div
          className={cn(
            "pointer-events-auto relative",
            view === "closed" && "h-10 w-10",
            view === "menu" && "h-102 w-60",
            view === "about" && "h-74 w-80",
            view === "theme" && "h-45 w-60",
          )}
        >
          <motion.div
            layout
            aria-hidden="true"
            className={cn("absolute inset-0 -z-10 bg-slate-3 text-slate-12 shadow-md")}
            animate={{
              borderRadius: view === "closed" ? "8px" : "16px",
            }}
            transition={{
              type: "spring",
              duration: 0.4,
              bounce: 0.2,
            }}
          />
          {view === "menu" && (
            <motion.div
              key="menu"
              ref={panelRef}
              id={panelId}
              role="dialog"
              aria-modal="true"
              aria-label={"Navigation menu"}
              tabIndex={-1}
              className="flex h-102 w-60 flex-col items-start p-2 outline-none"
              onKeyDown={handlePanelKeyDown}
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{
                ease: "easeIn",
                duration: 0.3,
              }}
            >
              <MenuPanelUI
                actions={{
                  onClose: handleClose,
                  onOpenAbout: handleOpenAbout,
                  onOpenTheme: handleOpenTheme,
                }}
              />
            </motion.div>
          )}
          {view === "about" && (
            <motion.div
              key="about"
              ref={panelRef}
              id={panelId}
              role="dialog"
              aria-modal="true"
              aria-label={"About"}
              tabIndex={-1}
              className="flex h-74 w-80 flex-col items-start p-2 outline-none"
              onKeyDown={handlePanelKeyDown}
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{
                ease: "easeIn",
                duration: 0.3,
              }}
            >
              <AboutPanelUI actions={{ onBack: handleOpenMenu }} />
            </motion.div>
          )}
          {view === "theme" && (
            <motion.div
              key="theme"
              ref={panelRef}
              id={panelId}
              role="dialog"
              aria-modal="true"
              aria-label={"Theme settings"}
              tabIndex={-1}
              className="flex h-45 w-60 flex-col items-start p-2 outline-none"
              onKeyDown={handlePanelKeyDown}
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{
                ease: "easeIn",
                duration: 0.3,
              }}
            >
              <ThemePanelUI actions={{ onBack: handleOpenMenu, onThemeChange }} theme={theme} />
            </motion.div>
          )}
          {view === "closed" && (
            <motion.button
              key="closed"
              ref={triggerRef}
              type="button"
              aria-label="Open navigation"
              aria-expanded={false}
              aria-haspopup="dialog"
              aria-controls={panelId}
              className="flex size-10 cursor-pointer items-center justify-center"
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{
                ease: "easeIn",
                duration: 0.3,
              }}
              onClick={handleOpenMenu}
            >
              <MenuIcon aria-hidden="true" className="size-6 text-slate-12" />
            </motion.button>
          )}
        </div>
      </div>
    </>
  );
};
