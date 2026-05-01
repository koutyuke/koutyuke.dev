import type { ComponentProps } from "react";

import type { FootprintsSectionUI } from "./footprints-section.ui";

type FootprintsSectionUIItems = ComponentProps<typeof FootprintsSectionUI>["footprints"];

export const mockFootprints = [
  {
    date: "Apr 2026",
    title: "ポートフォリオサイトを公開",
    description: "Storybook で見た目を確認するための短い説明文。",
  },
  {
    date: "Aug 2025",
    title: "インターンに参加",
    description: "timeline の余白と縦線を確認するための fixture。",
  },
  {
    date: "Apr 2025",
    title: "新しい環境へ進学",
    description: "最後の item で timeline line が消えることを確認する。",
  },
] as const satisfies FootprintsSectionUIItems;
