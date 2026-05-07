import { Laptop, Moon, Sun } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { AnimatedCheckIcon } from "../../../../shared/ui/icons";
import { PanelFooterAction, PanelItem } from "./parts";
import type { ThemeMode } from "../../../../features/theme";

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

export const ThemePanelUI = ({ actions: { onBack, onThemeChange }, theme }: ThemePanelUIProps) => {
  return (
    <div className="flex size-full flex-col">
      {themeOptions.map(({ icon: Icon, label, value }) => (
        <PanelItem
          key={value}
          as="button"
          onClick={() => onThemeChange(value)}
          LeftContent={<Icon aria-hidden="true" className="size-6 shrink-0" />}
          RightContent={theme === value ? <AnimatedCheckIcon className="size-5" /> : null}
        >
          {label}
        </PanelItem>
      ))}
      <div className="min-h-1.5 flex-1" />
      <PanelFooterAction type="back" onClick={onBack} />
    </div>
  );
};
