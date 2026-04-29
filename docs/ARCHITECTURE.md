# Architecture

この project は 1 ページの portfolio だが、将来の section 追加や motion の複雑化に備えて責務を分ける。

## Principles

- 1 page app として保つ。
- routing は入れない。
- content、section、feature、shared helper を混ぜない。
- global state は最小限にする。
- Figma に近い見た目を保ちつつ、実装は再利用可能な component に分ける。

## Directory Structure

現在の baseline:

```text
src/
  main.tsx
  app/
    app.tsx
    app.stories.tsx
  features/
    theme/
      index.ts
      lib/
        theme.ts
      model/
        theme-atoms.ts
        use-theme.ts
      ui/
        theme-sync.tsx
  lib/
    cn.ts
  styles/
    global.css
```

今後の拡張先:

```text
src/
  assets/
    icons/
  content/
    profile.ts
    links.ts
    footprints.ts
  features/
    floating-navigation/
      floating-navigation.tsx
      floating-navigation.stories.tsx
  sections/
    hero/
      hero-section.tsx
    about/
      about-section.tsx
    footprints/
      footprints-section.tsx
    contact/
      contact-section.tsx
    footer/
      footer-section.tsx
```

## Responsibilities

- `app/`: app shell と top-level composition。
- `assets/`: svg、image などの static asset。
- `content/`: portfolio に表示する structured data。
- `features/`: behavior を持つ UI。theme、floating navigation など。
- `sections/`: page を構成する content block。
- `lib/`: feature に依存しない小さな utility。
- `styles/`: reset 後の global style と design token。

## Data Flow

theme:

```text
localStorage.theme
  -> theme-mode atom
  -> resolved-theme atom
  -> theme-sync
  -> document.documentElement
```

page content:

```text
src/content/*
  -> section component
  -> app shell
```

floating navigation:

```text
section metadata
  -> navigation item
  -> active section state
  -> motion state
```

## Boundaries

theme は global state として扱う。theme は app 全体に影響し、DOM root への副作用を持つため。

floating navigation は feature として扱う。open / close は local state から始め、active section や command palette 的な挙動が増えた時点で atom 化を検討する。

content は component に直接埋め込まない。section copy は `content/` へ逃がし、layout と text を分離する。

## Build / Deploy

local build は `vp build`。CI も同じ command を使う。

deploy は Cloudflare Pages の Git integration を使う。Cloudflare Pages 側の build command は `vp build`、build output directory は `dist` にする。

## Naming

実装 file / directory は小文字 kebab-case にする。

許可:

```text
theme-sync.tsx
floating-navigation.tsx
hero-section.tsx
```

例外:

```text
README.md
AGENTS.md
DESIGN.md
FRONTEND.md
ARCHITECTURE.md
```

## Coding Rules

### File Layout

- 実装 file は責務のある directory に置く。
- page 全体の composition は `app/` に置く。
- UI behavior を持つ単位は `features/` に置く。
- page を構成する content block は `sections/` に置く。
- 表示文言や profile data は `content/` に置く。
- feature に依存しない helper は `lib/` に置く。
- global style と token 定義は `styles/` に置く。

### TypeScript

- `@tsconfig/strictest` と `@tsconfig/node24` を前提にする。
- strict な型エラーを緩めるために `any` や不要な assertion を使わない。
- `noUncheckedIndexedAccess` を前提に、array / object index access は undefined を考慮する。
- `noPropertyAccessFromIndexSignature` を前提に、index signature 由来の property は bracket access にする。
- test utilities は `vite-plus/test` から import する。

### React

- React は component boundary のために使い、routing は day one では入れない。
- component の export 名は PascalCase にする。
- component file 名は kebab-case にする。
- `useMemo` / `useCallback` は default では使わず、必要性がある場合だけ使う。
- feature local な open / close state は component local state から始める。
- app 全体へ影響する state だけ Jotai atom に置く。

### Styling

- Tailwind CSS v4 を使う。
- class の結合は `src/lib/cn.ts` の `cn` を使う。
- 色は Radix Colors の direct scale access を使う。
- `bg-gray-900`, `text-blue-600` など Tailwind default colors は使わない。
- `bg-surface`, `text-primary` など semantic color token は導入しない。
- CSS の検査は `vp run css:lint` で行う。

### Import Order

Oxfmt の import sort に従う。

1. side-effect import
2. runtime builtin
3. external library
4. project / relative import

type import は同じ group 内で value import の後に置く。

```ts
import { z } from "zod";
import type { ZodSchema } from "zod";
```

### Storybook

- component を追加したら、意味のある単位で story を追加する。
- story file は component の近くに置く。
- visual variation、theme variation、主要 interaction を catalog 化する。

### Verification

変更内容に応じて十分な検証を実行する。

```sh
vp check
vp test
vp run css:lint
```

UI component や Storybook 設定を変更した場合:

```sh
vp run storybook
```

build / deploy path に影響する場合:

```sh
vp build
```

### Cleanup

検証で生成した `dist/`, `storybook-static/`, `.tmp/`, `result` は、成果物として必要な場合を除いて削除する。
