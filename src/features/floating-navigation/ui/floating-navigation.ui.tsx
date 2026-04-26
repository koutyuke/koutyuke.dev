import { MenuIcon } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useId, useRef, type ReactNode } from "react";

import { cn } from "../../../lib/cn";
import { isOpen, type FloatingNavigationView } from "../model/panel-state";

type FloatingNavigationUIProps = {
  view: FloatingNavigationView;

  actions: {
    onClose: () => void;
    onOpenMenu: () => void;
  };
  slots: {
    MenuPanel: ReactNode;
    AboutPanel: ReactNode;
    ThemePanel: ReactNode;
  };
};

export const FloatingNavigationUI = ({
  view,
  actions: { onClose, onOpenMenu },
  slots: { AboutPanel, MenuPanel, ThemePanel },
}: FloatingNavigationUIProps) => {
  const panelId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const wasOpenRef = useRef(false);

  // Move focus into the panel when it opens; restore to the trigger when it closes.
  useEffect(() => {
    const open = isOpen(view);
    if (open && !wasOpenRef.current) {
      panelRef.current?.focus();
    } else if (!open && wasOpenRef.current) {
      triggerRef.current?.focus();
    }
    wasOpenRef.current = open;
  }, [view]);

  return (
    <>
      {isOpen(view) && <div aria-hidden="true" className="fixed inset-0 z-40" onClick={onClose} />}
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
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{
                ease: "easeIn",
                duration: 0.3,
              }}
            >
              {MenuPanel}
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
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{
                ease: "easeIn",
                duration: 0.3,
              }}
            >
              {AboutPanel}
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
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{
                ease: "easeIn",
                duration: 0.3,
              }}
            >
              {ThemePanel}
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
              className="flex size-10 items-center justify-center"
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{
                ease: "easeIn",
                duration: 0.3,
              }}
              onClick={onOpenMenu}
            >
              <MenuIcon aria-hidden="true" className="size-6 text-slate-12" />
            </motion.button>
          )}
        </div>
      </div>
    </>
  );
};
