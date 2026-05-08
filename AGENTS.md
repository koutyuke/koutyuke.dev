# AGENTS.md

## Basic Policy

- 日本語で対応する。
- 技術用語、package 名、file path、command、code identifier は原語のまま書く。
- 空虚な称賛や曖昧な同意は避け、技術的な根拠に基づいて判断する。
- 不確かな仕様、依存関係、外部サービスの挙動は確認してから扱う。
- 変更後は、変更内容に見合う検証を実行し、実施した検証と未実施の検証を分けて報告する。

## Project Overview

この repository は `koutyuke.dev` の personal portfolio site である。

- 1 ページ構成にする。
- UI は React component として実装する。
- floating navigation はボタンからメニューへ拡大する連続的な motion を持つ。
- theme switching は `system | light | dark` を扱う。
- deploy は Void / Cloudflare を前提にする。

## Toolchain

この project は Vite+ を中心にする。日常操作は原則 `vp` から行う。

- install: `vp install`
- dev server: `vp dev`
- format / lint / type-check: `vp check`
- test: `vp test`
- Storybook build: `vp run sb:build`
- production build: `vp build`
- CSS lint: `vp run css:lint`

直接 `pnpm`, `vite`, `vitest`, `oxlint`, `oxfmt` を主導線にしない。Vite+ が wrap している tool は Vite+ 経由で使う。

## Dependencies

- runtime は Node.js v24。
- package manager は pnpm。
- `node`, `pnpm`, `git`, `nixfmt-rfc-style` は Nix shell で提供する。
- `vp` はまだ Nix 管理していないため、各 developer が公式 installer で用意する。
- 一時的な CLI が必要な場合は、永続 install ではなく `nix shell` または `vp dlx` を優先する。

## Coding Rules

- 実装 file / directory は小文字 kebab-case にする。
- 例外は `README.md`, `AGENTS.md`, `DESIGN.md` など、慣習または明示指定された documentation file に限る。
- React component の export 名は PascalCase のままでよい。
- TypeScript は `@tsconfig/strictest` と `@tsconfig/node24` を基礎にし、strict な型を維持する。
- test utilities は `vite-plus/test` から import する。
- class の結合は `src/lib/cn.ts` の `cn` を使う。
- theme state は Jotai atom で扱い、DOM 反映は `theme-sync.tsx` に閉じる。

## Styling

- Tailwind CSS v4 を使う。
- Tailwind default colors は使わず、`@radix-ui/colors` を `@theme inline` で公開する。
- 色は `bg-slate-1`, `text-slate-12`, `bg-iris-9` のような direct scale access にする。
- `surface`, `primary`, `muted` のような semantic color token は導入しない。
- reset CSS は `the-new-css-reset` を使う。
- CSS の検査は Stylelint で行う。

## Documentation

ドキュメントは日本語で書く。この project の主要ドキュメントは次の構成にする。

- `README.md`: project の入口。目的、stack、主要 command を短く示す。
- `docs/README.md`: docs の index。
- `docs/DESIGN.md`: visual design、theme、motion、accessibility の方針。
- `docs/FRONTEND.md`: frontend の実装規約、toolchain、Storybook、test。
- `docs/ARCHITECTURE.md`: directory structure、data flow、責務分離、coding rules。
- `docs/presentational-container-pattern.md`: Presenter / Container Pattern の責務、依存方向、フォーム設計指針。

環境構築だけの一時メモを `docs/` に残さない。方針が変わった場合は、該当する恒久ドキュメントへ反映する。

## Safety

- secret、token、credential を hardcode しない。
- 不要な依存関係を追加しない。
- user が明示していない破壊的操作をしない。
- Codex が生成した **git追跡外になっていないの一時成果物**、( `.tmp/`, `result`) は、検証後に不要なら削除する。
