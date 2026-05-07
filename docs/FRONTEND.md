# Frontend

frontend は Vite+ と React を中心に構成する。目的は heavy framework を作ることではなく、1 ページの portfolio を component と motion で保守しやすくすること。

## Commands

基本操作は `vp` に集約する。

```sh
vp install
vp dev
vp check
vp test
vp run css:lint
vp run sb:build
vp build
```

`pnpm`, `vite`, `vitest`, `oxlint`, `oxfmt` を直接主導線にしない。Vite+ が持っている機能は Vite+ から使う。

deploy は Cloudflare Pages の Git integration に委譲する。Cloudflare Pages 側では build command を `vp build`、build output directory を `dist` に設定する。

## TypeScript

`tsconfig.json` は `@tsconfig/strictest` と `@tsconfig/node24` を基礎にする。

- strict mode を前提にする。
- `noUncheckedIndexedAccess` と `noPropertyAccessFromIndexSignature` を避けずに受け入れる。
- DOM の index signature は `dataset["theme"]` のように明示的にアクセスする。
- test utilities は `vite-plus/test` から import する。

## React

React は routing のためではなく component boundary のために使う。

- client-side router は day one では入れない。
- page composition は `pages/`、section 相当の大きな UI block は `widgets/` に分ける。
- behavior を持つ再利用可能な product feature は `features/` に分ける。
- domain data と domain UI は `entities/` に置く。
- shared helper は `shared/lib/` に置く。
- component 名は PascalCase、file 名は kebab-case にする。

## State

global state は必要なものだけ Jotai に置く。

- theme mode: `theme-mode-atom`
- system theme: `system-theme-atom`
- resolved theme: derived atom

現状の実装では `src/features/theme/model/theme-atoms.ts` に theme state を置き、DOM 反映は `src/features/theme/ui/theme-sync.tsx` に閉じる。

floating navigation の open / close など局所 UI state は、まず component local state に置く。複数 feature を跨いで共有する必要が出るまで global 化しない。

## Styling

Tailwind CSS v4 を使う。

- global stylesheet は `src/app/styles/global.css`。
- reset CSS は `the-new-css-reset`。
- color は `@radix-ui/colors` を `@theme inline` で公開する。
- default Tailwind colors は使わない。
- class merge は `src/shared/lib/cn.ts` の `cn` を使う。

```tsx
import { cn } from "src/shared/lib/cn";

<button className={cn("bg-iris-9 text-slate-1", isActive && "bg-iris-10")} />;
```

## Import Sort

Oxfmt の import sort に従う。

1. side-effect import
2. runtime builtin
3. external library
4. project / relative import

type import は同じ group 内で value import の後に置く。
`import { type Foo } from "foo"` の inline type import は使わず、value import と type import を別 import declaration に分ける。

```ts
import { z } from "zod";
import type { ZodSchema } from "zod";
```

## Storybook

Storybook は component catalog として使う。

```sh
vp run sb
vp run sb:build
```

story は component の近くに置く。
ただし `app` layer は application-wide configuration と shell の責務なので、Storybook は置かない。

```text
src/widgets/hero/ui/hero-section.ui.tsx
src/widgets/hero/ui/hero-section.stories.tsx
```

## Test

pure helper は unit test を書く。UI は Storybook と必要最小限の interaction test から始める。

- test file は対象 file の近くに置く。
- `expect`, `test`, `vi` は `vite-plus/test` から import する。
- TDD が有効な変更では Red → Green → Refactor を守る。

## Lint / Format

- JS / TS / JSON / Markdown: `vp check`
- CSS: `vp run css:lint`
- staged files: `vp staged`

Oxfmt / Oxlint / Vitest は直接 install しない。
