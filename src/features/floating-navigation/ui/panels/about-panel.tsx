import { ExternalLink } from "lucide-react";

import { BrandIcon } from "../../../../components/brand-icon/brand-icon";
import { externalNavigationLinks } from "../../../../content/navigation";
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
          <BrandIcon className="size-12" name="koutyuke" />
        </div>
        <p className="text-base font-medium text-slate-12">
          インターネットの片隅にある小さな個人サイトです。
          日々の記録や思ったことをそっと置いています。
        </p>
      </div>

      <PanelSeparator />

      <PanelItem
        as="a"
        href={externalNavigationLinks.sourceCode}
        target="_blank"
        rel="noreferrer"
        LeftContent={<BrandIcon className="size-6" name="github" />}
        RightContent={<ExternalLink aria-hidden="true" className="size-5 shrink-0" />}
      >
        Source Code
      </PanelItem>
      <PanelItem
        as="a"
        href={externalNavigationLinks.design}
        target="_blank"
        rel="noreferrer"
        LeftContent={<BrandIcon className="size-6" name="figma" />}
        RightContent={<ExternalLink aria-hidden="true" className="size-5 shrink-0" />}
      >
        Design
      </PanelItem>

      <div className="h-1.5" />
      <PanelFooterAction type="back" onClick={onBack} />
    </div>
  );
}
