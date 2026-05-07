import {
  ChevronRight,
  ExternalLink,
  Footprints,
  Hand,
  House,
  LineSquiggle,
  NotebookPen,
  Palette,
  User,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { links } from "../../../../entities/profile";
import { cn } from "../../../../shared/lib";
import { TwitterIcon } from "../../../../shared/ui/icons";
import { PanelFooterAction, PanelItem, PanelSeparator } from "./parts";

export type NavigationItem = {
  href: `#${string}`;
  icon: LucideIcon;
  label: string;
  note: string;
};

export const navigationItems = [
  { href: "#top", icon: House, label: "ホーム", note: "Home" },
  { href: "#about", icon: User, label: "私について", note: "About me" },
  { href: "#footprints", icon: Footprints, label: "人生の足あと", note: "Footprint" },
  { href: "#contact", icon: Hand, label: "つながり", note: "Contact" },
] as const satisfies readonly NavigationItem[];

type MenuPanelUIProps = {
  actions: {
    onClose: () => void;
    onOpenAbout: () => void;
    onOpenTheme: () => void;
  };
};

export const MenuPanelUI = ({
  actions: { onClose, onOpenAbout, onOpenTheme },
}: MenuPanelUIProps) => {
  return (
    <div className="flex size-full flex-col">
      <PanelItem
        as="button"
        onClick={onOpenAbout}
        className="group"
        LeftContent={<LineSquiggle aria-hidden="true" className="size-6" />}
        RightContent={
          <ChevronRight
            aria-hidden="true"
            className="size-5 transition-transform duration-200 group-hover:translate-x-1"
          />
        }
      >
        これはなに？
      </PanelItem>
      <PanelItem
        as="button"
        onClick={onOpenTheme}
        className="group"
        LeftContent={<Palette aria-hidden="true" className="size-6" />}
        RightContent={
          <ChevronRight
            aria-hidden="true"
            className="size-5 transition-transform duration-200 group-hover:translate-x-1"
          />
        }
      >
        Theme
      </PanelItem>

      <PanelSeparator />

      {navigationItems.map(({ href, icon: Icon, label, note }) => (
        <PanelItem
          as="a"
          href={href}
          key={href}
          onClick={onClose}
          LeftContent={
            <Icon
              aria-hidden="true"
              className={cn("size-6 shrink-0", Icon === Hand && "rotate-20")}
            />
          }
          RightContent={
            <span className="font-handwritten text-base whitespace-nowrap text-slate-11">
              {note}
            </span>
          }
        >
          {label}
        </PanelItem>
      ))}

      <PanelSeparator />

      <PanelItem
        as="a"
        href={links.blog}
        rel="noreferrer"
        target="_blank"
        LeftContent={<NotebookPen aria-hidden="true" className="size-6 shrink-0" />}
        RightContent={<ExternalLink aria-hidden="true" className="size-5 shrink-0" />}
      >
        My blog
      </PanelItem>
      <PanelItem
        as="a"
        href={links.twitterAccount}
        rel="noreferrer"
        target="_blank"
        LeftContent={<TwitterIcon aria-hidden="true" className="size-6 shrink-0" />}
        RightContent={<ExternalLink aria-hidden="true" className="size-5 shrink-0" />}
      >
        Follow Me
      </PanelItem>

      <div className="min-h-1.5 flex-1" />
      <PanelFooterAction type="close" onClick={onClose} />
    </div>
  );
};
