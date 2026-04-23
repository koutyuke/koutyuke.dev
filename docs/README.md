# Documentation

この directory は `koutyuke.dev` の設計判断を置く場所です。環境構築の断片ではなく、実装時に参照できる恒久的な方針をまとめます。

## 読む順番

1. [DESIGN.md](./DESIGN.md)
   まず visual direction と interaction の意図を確認する。
2. [ARCHITECTURE.md](./ARCHITECTURE.md)
   次に directory structure と責務分離を確認する。
3. [FRONTEND.md](./FRONTEND.md)
   実装時の toolchain、state、styling、test の規約を確認する。
4. [presentational-container-pattern.md](./presentational-container-pattern.md)
   UI component を Presenter / Container に分離する指針を確認する。フォームや内部ロジックの置き場に迷ったらここを見る。

## 参照元

- Figma: [../.koutyuke/figma-design.md](../.koutyuke/figma-design.md)
- 旧プロジェクト: `/Users/kousuke/Desktop/projects/koutyuke/old-koutyuke.dev`
- Vite+: <https://viteplus.dev/>
- Void: <https://void.cloud/>

## ドキュメントの扱い

- docs は日本語で書く。
- 古くなった導入手順だけのメモは残さない。
- 方針変更は、変更した code と同じ pull request で更新する。
- file name は、この directory では指定どおり uppercase の Markdown file を使う。
