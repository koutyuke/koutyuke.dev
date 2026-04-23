# koutyuke.dev

`koutyuke.dev` は、1 ページで自分の輪郭を伝えるための personal portfolio site です。

Vite+ を中心に、React、Tailwind CSS、Radix Colors、Motion.dev、Jotai を組み合わせます。見た目は Figma を起点にしつつ、実装は component と state を薄く保ち、floating navigation と theme switching を気持ちよく動かすことを重視します。

## スタック

- Toolchain: Vite+ (`vp`)
- Runtime: Node.js v24
- Package manager: pnpm
- UI: React
- Styling: Tailwind CSS v4 + `@radix-ui/colors`
- Motion: Motion.dev
- State: Jotai
- Format / lint: Oxfmt / Oxlint / Stylelint
- Component catalog: Storybook
- Deploy: Void / Cloudflare
- Environment: Nix + direnv

## 開発

`vp` は現時点では Nix 管理せず、各自の環境に install します。

```sh
curl -fsSL https://vite.plus | bash
direnv allow
vp install
vp dev
```

検証は Vite+ に集約します。

```sh
vp check
vp test
vp run css:lint
vp run storybook
vp build
```

## ドキュメント

- [docs/README.md](./docs/README.md): ドキュメントの入口
- [docs/DESIGN.md](./docs/DESIGN.md): ビジュアル、motion、theme の方針
- [docs/FRONTEND.md](./docs/FRONTEND.md): frontend 実装と toolchain
- [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md): 構成、責務、data flow、coding rules
