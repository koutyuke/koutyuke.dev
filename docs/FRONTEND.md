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

## Cloudflare Pages deployment cleanup

Cloudflare Pages の preview deployment は `.github/workflows/cloudflare-pages-cleanup.yml` で整理する。

trigger は次の 3 種類を使う。

- `pull_request.closed`: close / merge された PR の head branch または head sha に一致する preview deployment を削除対象にする。
- `check_run.completed`: default branch の Cloudflare Pages deploy が成功したあと、preview deployment を削除対象にする。
- `workflow_dispatch`: `dry_run` と `mode` を指定して手動確認または手動削除する。

削除処理の本体は `scripts/cloudflare-pages-cleanup.sh` に置く。Cloudflare REST API を `curl` で呼び、deployment の判定は `jq` で行う。`wrangler` は CI の主導線にはしない。

必要な GitHub Secrets / Variables:

| 種別     | 名前                                | 用途                                                           |
| -------- | ----------------------------------- | -------------------------------------------------------------- |
| Secret   | `CF_API_TOKEN`                      | Cloudflare Pages deployment の list / delete を行う API token  |
| Variable | `CF_ACCOUNT_ID`                     | Cloudflare account id                                          |
| Variable | `CF_PAGES_PROJECT_NAME`             | Cloudflare Pages project name                                  |
| Variable | `CF_PAGES_PRODUCTION_BRANCH`        | production branch。未設定時は repository default branch        |
| Variable | `CF_PAGES_CLEANUP_DRY_RUN`          | `true` の場合は削除せず候補だけ表示する                        |
| Variable | `CF_PAGES_DELETE_ALIAS_DEPLOYMENTS` | `true` の場合は alias 付き preview deployment も削除対象にする |

初期導入時は `CF_PAGES_CLEANUP_DRY_RUN=true` にする。workflow log と step summary に `delete` / `skip` の判定理由が出るため、削除候補を確認してから `false` に切り替える。

production deployment、production branch の deployment、alias 付き deployment は default では削除しない。alias 付き deployment を消す場合は `CF_PAGES_DELETE_ALIAS_DEPLOYMENTS=true` を明示する。

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
