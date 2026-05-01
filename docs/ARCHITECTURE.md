# Architecture

この project は 1 ページ構成の personal portfolio site である。directory structure は Feature-Sliced Design v2.1 を基礎にし、単一ページの規模に合わせて薄く採用する。

## Principles

- 1 page app として保つ。
- routing は入れない。
- layer ごとの責務と依存方向を守る。
- structured data、UI、state、side effect を混ぜない。
- global state は最小限にする。
- Figma に近い見た目を保ちつつ、実装は Presenter / Container Pattern で分ける。

## FSD Layers

依存方向は上から下への一方向にする。

```text
app
  -> pages
  -> widgets
  -> features
  -> entities
  -> shared
```

下位 layer から上位 layer を import しない。同じ layer の slice 同士も直接 import しない。必要な共通要素は `shared` または `entities` に置く。

## Directory Structure

現在の baseline:

```text
src/
  main.tsx
  app/
    app.tsx
    styles/
      global.css
  pages/
    home/
      index.ts
      ui/
        home-page.tsx
        home-page.ui.tsx
        home-page.stories.tsx
  widgets/
    hero/
      index.ts
      ui/
        hero-section.tsx
        hero-section.ui.tsx
    about/
    footprints/
    contact/
    footer/
    floating-navigation/
      index.ts
      model/
      ui/
  features/
    theme/
      index.ts
      lib/
      model/
      ui/
  entities/
    profile/
      index.ts
      model/
      ui/
    footprint/
      index.ts
      model/
  shared/
    lib/
    ui/
```

`app` と `shared` は slice を持たず、segment 直下に分ける。`pages`、`widgets`、`features`、`entities` は slice を切り、その下に `ui`、`model`、`lib` などの segment を置く。

## Responsibilities

- `app/`: app shell、global style、app 全体の composition。
- `pages/`: page 単位の composition。現状は `home` のみ。
- `widgets/`: page を構成する大きな UI block。section や floating navigation を置く。
- `features/`: user action と state を持つ product feature。theme switching など。
- `entities/`: portfolio が扱う domain data と domain UI。profile、footprint など。
- `shared/`: project / domain に依存しない UI と helper。icons、`cn`、constant など。

## Data Flow

theme:

```text
localStorage.theme
  -> theme-mode atom
  -> resolved-theme atom
  -> theme-sync
  -> document.documentElement
```

page composition:

```text
app
  -> pages/home
  -> widgets/*
  -> entities/*
  -> shared/*
```

profile / footprint data:

```text
entities/*/model
  -> widget container
  -> widget presenter
```

## Presenter / Container

`widgets/*` は原則として Container と Presenter を分ける。

- Container: `*.tsx`。entity data、feature state、slot を組み立てて Presenter に渡す。
- Presenter: `*.ui.tsx`。props をもとに表示する。Storybook は Presenter を中心に作る。
- Presenter は state を持ってよい。判断基準は state の有無ではなく、外部副作用や application state へ接続するかどうかである。
- dialog / popover / menu の開閉、active panel、focus management、Escape key close などの UI-local behavior は Presenter に閉じる。
- `shared` と `entities` の小さな表示部品は、分割コストが高い場合は単一 component のままでよい。
- Presenter の Storybook は、実 Container を import せず、`args` に mock / fixture を渡す。
- 複数 story / test で再利用する fixture は近接する `*.fixtures.ts(x)` に置き、slice の `index.ts` から公開しない。

例:

```text
src/widgets/about/ui/about-section.tsx
src/widgets/about/ui/about-section.ui.tsx
```

## Public API

各 slice は原則として `index.ts` を公開入口にする。

- 上位 layer から `model/` や `ui/` の内部 file を deep import しない。
- slice 内部の近接 import は許可する。
- Storybook と test は、対象の Presenter / 内部 helper を検証する目的に限って近接 import してよい。

## Naming

実装 file / directory は小文字 kebab-case にする。

許可:

```text
home-page.tsx
floating-navigation.tsx
hero-section.ui.tsx
theme-sync.tsx
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
- class の結合は `src/shared/lib/cn.ts` の `cn` を使う。
- 色は Radix Colors の direct scale access を使う。
- `bg-gray-900`, `text-blue-600` など Tailwind default colors は使わない。
- `bg-surface`, `text-primary` など semantic color token は導入しない。
- global stylesheet は `src/app/styles/global.css` に置く。
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
- `app` layer には Storybook を置かない。UI の catalog は `shared` / `entities` / `widgets` / `features` / `pages` で行う。
- `widgets/*` は Presenter を中心に story を作る。
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
