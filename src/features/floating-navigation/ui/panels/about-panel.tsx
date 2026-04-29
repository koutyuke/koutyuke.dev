import { ExternalLink } from "lucide-react";

import { FigmaIcon, GithubIcon, KoutyukeIcon } from "../../../../components/icons";
import { links } from "../../../../content/profile";
import { PanelFooterAction, PanelItem, PanelSeparator } from "./parts";

type AboutPanelUIProps = {
  actions: {
    onBack: () => void;
  };
};

export function AboutPanelUI({ actions: { onBack } }: AboutPanelUIProps) {
  return (
    <div className="flex size-full flex-col">
      <div className="flex flex-1 flex-col gap-2 p-1">
        <div className="light grid size-12 place-items-center overflow-hidden rounded-md bg-slate-1 text-slate-12">
          <KoutyukeIcon className="size-12" />
        </div>
        <p className="text-base font-medium text-slate-12">
          インターネットの片隅にある小さな個人サイトです。
          日々の記録や思ったことをそっと置いています。
        </p>
      </div>

      <PanelSeparator />

      <PanelItem
        as="a"
        href={links.siteSourceCode}
        target="_blank"
        rel="noreferrer"
        LeftContent={<GithubIcon className="size-6" />}
        RightContent={<ExternalLink aria-hidden="true" className="size-5 shrink-0" />}
      >
        Source Code
      </PanelItem>
      <PanelItem
        as="a"
        href={links.siteDesign}
        target="_blank"
        rel="noreferrer"
        LeftContent={<FigmaIcon className="size-6" />}
        RightContent={<ExternalLink aria-hidden="true" className="size-5 shrink-0" />}
      >
        Design
      </PanelItem>

      <div className="h-1.5" />
      <PanelFooterAction type="back" onClick={onBack} />
    </div>
  );
}
