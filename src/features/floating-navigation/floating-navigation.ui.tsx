import { useEffect, useRef, useState } from "react";
import {
  Check,
  ChevronRight,
  ExternalLink,
  Laptop,
  LineSquiggle,
  Menu,
  Moon,
  NotebookPen,
  Palette,
  Sun,
  Undo2,
  X,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { BrandIcon } from "../../components/brand-icon/brand-icon";
import { externalNavigationLinks, type NavigationItem } from "../../content/navigation";
import type { SocialLink } from "../../content/profile";
import type { ThemeMode, ResolvedTheme } from "../theme/theme";
import { cn } from "../../lib/cn";
import {
  getBackPanel,
  getNextPanel,
  type FloatingNavigationPanel,
} from "./floating-navigation-state";

type FloatingNavigationUiProps = {
  navigationItems: readonly NavigationItem[];
  onThemeChange: (theme: ThemeMode) => void;
  resolvedTheme: ResolvedTheme;
  socialLinks: readonly SocialLink[];
  theme: ThemeMode;
};

type ThemeOption = {
  icon: typeof Laptop;
  label: string;
  value: ThemeMode;
};

const themeOptions = [
  { icon: Laptop, label: "System", value: "system" },
  { icon: Sun, label: "Light", value: "light" },
  { icon: Moon, label: "Dark", value: "dark" },
] as const satisfies readonly ThemeOption[];

const springTransition = {
  damping: 24,
  mass: 0.75,
  stiffness: 290,
  type: "spring",
} as const;

function isOpen(panel: FloatingNavigationPanel) {
  return panel !== "closed";
}

export function FloatingNavigationUi({
  navigationItems,
  onThemeChange,
  resolvedTheme,
  socialLinks,
  theme,
}: FloatingNavigationUiProps) {
  const [panel, setPanel] = useState<FloatingNavigationPanel>("closed");
  const prefersReducedMotion = useReducedMotion();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelId = "floating-navigation-panel";

  const close = () => {
    setPanel("closed");
    window.requestAnimationFrame(() => triggerRef.current?.focus());
  };

  useEffect(() => {
    if (!isOpen(panel)) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [panel]);

  return (
    <motion.div
      className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2"
      layout
      style={{ transformOrigin: "50% 100%" }}
      transition={prefersReducedMotion ? { duration: 0 } : springTransition}
    >
      <button
        aria-controls={panelId}
        aria-expanded={isOpen(panel)}
        aria-label={isOpen(panel) ? "ナビゲーションを閉じる" : "ナビゲーションを開く"}
        className={cn(
          "grid size-9 place-items-center rounded-lg bg-slate-5 text-slate-12 shadow-[1px_4px_8px_rgba(0,0,0,0.25)]",
          "transition-colors hover:bg-slate-6",
          isOpen(panel) && "pointer-events-none opacity-0",
        )}
        ref={triggerRef}
        type="button"
        onClick={() => setPanel((currentPanel) => getNextPanel(currentPanel, "toggle"))}
      >
        <Menu aria-hidden="true" className="size-5" />
      </button>

      <AnimatePresence>
        {isOpen(panel) ? (
          <motion.div
            animate={{
              clipPath: "inset(0% 0% 0% 0% round 16px)",
              filter: "blur(0px)",
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            aria-label="サイトナビゲーション"
            className={cn(
              "absolute bottom-0 left-1/2 flex -translate-x-1/2 flex-col overflow-hidden rounded-2xl border border-slate-6 bg-slate-3 p-2 text-slate-12 shadow-[1px_4px_18px_rgba(0,0,0,0.3)]",
              panel === "about" && "w-[min(20rem,calc(100vw-2rem))]",
              panel === "menu" && "h-110 w-60",
              panel === "theme" && "w-60",
            )}
            exit={{
              clipPath: "inset(42% 42% 42% 42% round 8px)",
              filter: "blur(8px)",
              opacity: 0,
              scale: 0.78,
              y: 20,
            }}
            id={panelId}
            initial={{
              clipPath: "inset(42% 42% 42% 42% round 8px)",
              filter: "blur(10px)",
              opacity: 0,
              scale: 0.78,
              y: 20,
            }}
            role="dialog"
            transition={prefersReducedMotion ? { duration: 0 } : springTransition}
          >
            {panel === "menu" ? (
              <MenuPanel
                navigationItems={navigationItems}
                socialLinks={socialLinks}
                onClose={close}
                onOpenAbout={() => setPanel(getNextPanel(panel, "about"))}
                onOpenTheme={() => setPanel(getNextPanel(panel, "theme"))}
              />
            ) : null}
            {panel === "about" ? <AboutPanel onBack={() => setPanel(getBackPanel(panel))} /> : null}
            {panel === "theme" ? (
              <ThemePanel
                resolvedTheme={resolvedTheme}
                theme={theme}
                onBack={() => setPanel(getBackPanel(panel))}
                onThemeChange={onThemeChange}
              />
            ) : null}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}

type MenuPanelProps = {
  navigationItems: readonly NavigationItem[];
  onClose: () => void;
  onOpenAbout: () => void;
  onOpenTheme: () => void;
  socialLinks: readonly SocialLink[];
};

function MenuPanel({
  navigationItems,
  onClose,
  onOpenAbout,
  onOpenTheme,
  socialLinks,
}: MenuPanelProps) {
  const twitterLink = socialLinks.find((link) => link.icon === "twitter");

  return (
    <>
      <PanelButton icon={LineSquiggle} label="これはなに？" onClick={onOpenAbout}>
        <ChevronRight aria-hidden="true" className="ml-auto size-5 shrink-0" />
      </PanelButton>
      <PanelButton icon={Palette} label="Theme" onClick={onOpenTheme}>
        <ChevronRight aria-hidden="true" className="ml-auto size-5 shrink-0" />
      </PanelButton>

      <PanelSeparator />

      {navigationItems.map((item) => (
        <a
          className="flex min-h-11 items-center gap-2.5 rounded-lg px-2 pb-2 text-base font-medium text-slate-12 no-underline hover:bg-slate-4 focus-visible:bg-slate-4 focus-visible:outline-none"
          href={item.href}
          key={item.href}
          onClick={onClose}
        >
          <item.icon aria-hidden="true" className="size-6 shrink-0" />
          <span>{item.label}</span>
          <span className="ml-auto whitespace-nowrap font-handwritten text-base text-slate-11">
            {item.note}
          </span>
        </a>
      ))}

      <PanelSeparator />

      <PanelExternalLink href={externalNavigationLinks.blog} icon={NotebookPen} label="My blog" />
      <a
        className="flex min-h-11 items-center gap-2.5 rounded-lg px-2 pb-2 text-base font-medium text-slate-12 no-underline hover:bg-slate-4 focus-visible:bg-slate-4 focus-visible:outline-none"
        href={twitterLink?.href ?? externalNavigationLinks.twitter}
        rel="noreferrer"
        target="_blank"
      >
        <BrandIcon className="size-6" name="twitter" />
        <span className="flex-1">Follow Me</span>
        <ExternalLink aria-hidden="true" className="ml-auto size-5 shrink-0" />
      </a>

      <div className="flex-1" />
      <button
        aria-label="Close navigation"
        className="grid h-9 w-full place-items-center rounded-lg border border-slate-7 bg-slate-4 text-slate-12 hover:bg-slate-5 focus-visible:bg-slate-5 focus-visible:outline-none"
        type="button"
        onClick={onClose}
      >
        <X aria-hidden="true" className="size-5" />
      </button>
    </>
  );
}

type AboutPanelProps = {
  onBack: () => void;
};

function AboutPanel({ onBack }: AboutPanelProps) {
  return (
    <>
      <div className="grid gap-2 p-2">
        <div className="grid size-12 place-items-center overflow-hidden rounded-md bg-slate-1 text-slate-12">
          <BrandIcon className="size-10" name="koutyuke" />
        </div>
        <p className="m-0 text-sm font-medium leading-7 text-slate-12">
          インターネットの片隅にある小さな個人サイトです。
          <br />
          日々の記録や思ったことをそっと置いておく場所です。
        </p>
      </div>

      <PanelSeparator />
      <PanelExternalLink
        href={externalNavigationLinks.sourceCode}
        iconName="github"
        label="Source Code"
      />
      <PanelExternalLink href={externalNavigationLinks.design} iconName="figma" label="Design" />
      <BackButton onClick={onBack} />
    </>
  );
}

type ThemePanelProps = {
  onBack: () => void;
  onThemeChange: (theme: ThemeMode) => void;
  resolvedTheme: ResolvedTheme;
  theme: ThemeMode;
};

function ThemePanel({ onBack, onThemeChange, resolvedTheme, theme }: ThemePanelProps) {
  return (
    <>
      <div className="sr-only">Current resolved theme: {resolvedTheme}</div>
      {themeOptions.map((option) => (
        <button
          className="flex min-h-11 items-center gap-2.5 rounded-lg px-2 pb-2 text-start text-base font-medium text-slate-12 hover:bg-slate-4 focus-visible:bg-slate-4 focus-visible:outline-none"
          key={option.value}
          type="button"
          onClick={() => onThemeChange(option.value)}
        >
          <option.icon aria-hidden="true" className="size-6 shrink-0" />
          <span className="flex-1">{option.label}</span>
          {theme === option.value ? <Check aria-hidden="true" className="size-5 shrink-0" /> : null}
        </button>
      ))}
      <BackButton onClick={onBack} />
    </>
  );
}

type PanelButtonProps = {
  children?: React.ReactNode;
  icon: typeof LineSquiggle;
  label: string;
  onClick: () => void;
};

function PanelButton({ children, icon: Icon, label, onClick }: PanelButtonProps) {
  return (
    <button
      className="flex min-h-11 items-center gap-2.5 rounded-lg px-2 pb-2 text-start text-base font-medium text-slate-12 hover:bg-slate-4 focus-visible:bg-slate-4 focus-visible:outline-none"
      type="button"
      onClick={onClick}
    >
      <Icon aria-hidden="true" className="size-6 shrink-0" />
      <span className="flex-1">{label}</span>
      {children}
    </button>
  );
}

function PanelSeparator() {
  return <div aria-hidden="true" className="mx-2 mb-2 h-px bg-slate-9" />;
}

type PanelExternalLinkProps =
  | {
      href: string;
      icon: typeof NotebookPen;
      iconName?: never;
      label: string;
    }
  | {
      href: string;
      icon?: never;
      iconName: "figma" | "github";
      label: string;
    };

function PanelExternalLink(props: PanelExternalLinkProps) {
  return (
    <a
      className="flex min-h-11 items-center gap-2.5 rounded-lg px-2 pb-2 text-base font-medium text-slate-12 no-underline hover:bg-slate-4 focus-visible:bg-slate-4 focus-visible:outline-none"
      href={props.href}
      rel="noreferrer"
      target="_blank"
    >
      {"icon" in props ? (
        <props.icon aria-hidden="true" className="size-6 shrink-0" />
      ) : (
        <BrandIcon className="size-6" name={props.iconName} />
      )}
      <span className="flex-1">{props.label}</span>
      <ExternalLink aria-hidden="true" className="ml-auto size-5 shrink-0" />
    </a>
  );
}

type BackButtonProps = {
  onClick: () => void;
};

function BackButton({ onClick }: BackButtonProps) {
  return (
    <button
      aria-label="戻る"
      className="mt-2 grid h-9 w-full place-items-center rounded-lg border border-slate-7 bg-slate-4 text-slate-12 hover:bg-slate-5 focus-visible:bg-slate-5 focus-visible:outline-none"
      type="button"
      onClick={onClick}
    >
      <Undo2 aria-hidden="true" className="size-5" />
    </button>
  );
}
