# Design

`koutyuke.dev` は、情報を詰め込む portfolio ではなく、1 ページで印象と動きを残す portfolio として作る。

## Visual Direction

- 余白を大きく取り、section 間の呼吸を明確にする。
- typography は情報の階層を作る主役として扱う。
- card や surface を増やしすぎず、content と motion で画面を進める。
- 色は派手さよりも階調を重視し、Radix Colors の scale を直接使う。
- Figma の意図を優先し、実装都合で平均的な web layout に寄せない。

## Design Source

visual source of truth は Figma の `koutyuke.dev - design` として扱う。

- 全体: <https://www.figma.com/design/oRDua7ZeisW6ooQ6IujYpR/koutyuke.dev---design?m=dev>
- Hero: <https://www.figma.com/design/oRDua7ZeisW6ooQ6IujYpR/koutyuke.dev---design?node-id=2-2&m=dev>
- About: <https://www.figma.com/design/oRDua7ZeisW6ooQ6IujYpR/koutyuke.dev---design?node-id=53-200&m=dev>
- Footprints: <https://www.figma.com/design/oRDua7ZeisW6ooQ6IujYpR/koutyuke.dev---design?node-id=64-295&m=dev>
- Contact: <https://www.figma.com/design/oRDua7ZeisW6ooQ6IujYpR/koutyuke.dev---design?node-id=93-306&m=dev>
- Footer: <https://www.figma.com/design/oRDua7ZeisW6ooQ6IujYpR/koutyuke.dev---design?node-id=100-648&m=dev>
- Floating navigation: <https://www.figma.com/design/oRDua7ZeisW6ooQ6IujYpR/koutyuke.dev---design?node-id=100-662&m=dev>

小さな icon は [lucide](https://lucide.dev/) を `lucide-react` 経由で使う。brand icon (GitHub / Twitter / Zenn) と koutyuke 独自 icon、asterisk などの装飾は `src/shared/ui/icons/` 配下の React component (`currentColor` 化済み) を使う。section 区切り、highlight underline、timeline line は CSS / Tailwind utility で管理する。

## Color

Tailwind default colors は使わない。`@radix-ui/colors` を Tailwind v4 の `@theme inline` で公開し、direct scale access で使う。

許可する例:

```tsx
<div className="bg-slate-1 text-slate-12" />
<button className="bg-iris-9 hover:bg-iris-10" />
```

避ける例:

```tsx
<div className="bg-gray-900 text-white" />
<div className="bg-surface text-primary" />
```

semantic token を増やすと Figma と実装の距離が広がるため、現段階では `surface`, `primary`, `muted` のような token は作らない。

## Typography

Google Fonts を使用します。

- 手書き風の typography: Caveat
- その他の typography: Zen Maru Gothic

`src/app/styles/global.css` では `--font-sans` を Zen Maru Gothic、`--font-handwritten` を Caveat に割り当てる。通常の本文・UI は Zen Maru Gothic を使い、手書き風の装飾的な text だけ Caveat を使用する。

## Theme

theme は `system | light | dark` を扱う。

- mode は `localStorage.theme` に保存する。
- resolved theme は OS theme と mode から derive する。
- root element に `data-theme`, `.light`, `.dark` を反映する。
- Radix dark scale と Tailwind の dark state の両方と相性を取る。

初回 paint の flash は `applyStoredTheme()` で React render 前に抑える。

## Motion

motion は装飾ではなく、状態変化の理解を助けるために使う。

- floating navigation は閉じた button から開いた menu へ連続して見えることを重視する。
- `transform`, `opacity`, `scale`, `clip-path` を中心にする。
- layout を毎 frame 読む実装は避ける。
- `prefers-reduced-motion` を尊重する。
- Motion.dev の React API を使う場合でも、state と animation definition を分離する。

## Accessibility

- interactive element は semantic element を優先する。
- focus style は必ず visible にする。
- floating navigation は `aria-expanded`, `aria-controls`, focus return, Escape close を実装する。
- 色だけで状態を伝えない。
- animation を止めたいユーザーに配慮する。

## Storybook

Storybook は component catalog として使う。Figma の component と実装 component の対応を確認する場所にする。

- component が増えたら story を追加する。
- layout variation と theme variation を確認できるようにする。
- visual design の仕様メモは story の説明ではなく、この document に残す。
