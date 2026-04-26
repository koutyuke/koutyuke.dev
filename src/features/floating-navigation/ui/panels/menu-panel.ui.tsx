import { ChevronRight, ExternalLink, LineSquiggle, NotebookPen, Palette } from "lucide-react";

import { BrandIcon } from "../../../../components/brand-icon/brand-icon";
import { externalNavigationLinks, type NavigationItem } from "../../../../content/navigation";
import { PanelFooterAction, PanelItem, PanelSeparator } from "./parts";
import type { SocialLink } from "../../../../content/profile";

type MenuPanelUIProps = {
  navigationItems: readonly NavigationItem[];
  socialLinks: readonly SocialLink[];
  actions: {
    onClose: () => void;
    onOpenAbout: () => void;
    onOpenTheme: () => void;
  };
};

export function MenuPanelUI({
  navigationItems,
  socialLinks,
  actions: { onClose, onOpenAbout, onOpenTheme },
}: MenuPanelUIProps) {
  const twitterLink = socialLinks.find((link) => link.icon === "twitter");

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

      {navigationItems.map((item) => (
        <PanelItem
          as="a"
          href={item.href}
          key={item.href}
          onClick={onClose}
          LeftContent={<item.icon aria-hidden="true" className="size-6 shrink-0" />}
          RightContent={
            <span className="font-handwritten text-base whitespace-nowrap text-slate-11">
              {item.note}
            </span>
          }
        >
          {item.label}
        </PanelItem>
      ))}

      <PanelSeparator />

      <PanelItem
        as="a"
        href={externalNavigationLinks.blog}
        rel="noreferrer"
        target="_blank"
        LeftContent={<NotebookPen aria-hidden="true" className="size-6 shrink-0" />}
        RightContent={<ExternalLink aria-hidden="true" className="size-5 shrink-0" />}
      >
        My blog
      </PanelItem>
      <PanelItem
        as="a"
        href={twitterLink?.href ?? externalNavigationLinks.twitter}
        rel="noreferrer"
        target="_blank"
        LeftContent={<BrandIcon className="size-6" name="twitter" />}
        RightContent={<ExternalLink aria-hidden="true" className="size-5 shrink-0" />}
      >
        Follow Me
      </PanelItem>

      <div className="min-h-1.5 flex-1" />
      <PanelFooterAction type="close" onClick={onClose} />
    </div>
  );
}
