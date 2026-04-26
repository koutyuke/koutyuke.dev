import { Laptop, type LucideIcon, Moon, Sun } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { PanelFooterAction, PanelItem } from "./parts";
import type { ThemeMode } from "../../../theme/theme";

type ThemeOption = {
  icon: LucideIcon;
  label: string;
  value: ThemeMode;
};

const themeOptions = [
  { icon: Laptop, label: "System", value: "system" },
  { icon: Sun, label: "Light", value: "light" },
  { icon: Moon, label: "Dark", value: "dark" },
] as const satisfies readonly ThemeOption[];

type ThemePanelUIProps = {
  theme: ThemeMode;
  actions: {
    onBack: () => void;
    onThemeChange: (theme: ThemeMode) => void;
  };
};

function AnimatedCheckIcon() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.svg
      aria-hidden="true"
      className="size-5 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.14, ease: "easeOut" }}
    >
      <motion.path
        d="m4 12 5 5L20 6"
        initial={shouldReduceMotion ? false : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.22 }}
      />
    </motion.svg>
  );
}

export function ThemePanelUI({ actions: { onBack, onThemeChange }, theme }: ThemePanelUIProps) {
  return (
    <div className="flex size-full flex-col">
      {themeOptions.map(({ icon: Icon, label, value }) => (
        <PanelItem
          key={value}
          as="button"
          onClick={() => onThemeChange(value)}
          LeftContent={<Icon aria-hidden="true" className="size-6 shrink-0" />}
          RightContent={theme === value ? <AnimatedCheckIcon /> : null}
        >
          {label}
        </PanelItem>
      ))}
      <div className="min-h-1.5 flex-1" />
      <PanelFooterAction type="back" onClick={onBack} />
    </div>
  );
}
