# Presenter/Container Pattern

## 目的

Presenter/Container Pattern は、UI の表示責務とアプリケーションロジック・副作用の責務を分離するための設計方針である。
このパターンを採用する目的は以下のとおり。

- UI とロジックの責務を明確に分離する
- UI を Storybook や Test で独立して検証しやすくする
- データ取得や副作用の位置を限定し、保守性を高める
- 依存関係を明確にし、変更影響を局所化する
- UI を再利用しやすくする
  本ドキュメントでは、Presenter / Container の責務、依存方向、命名規則、公開方針を定義する。

---

## 基本方針

- **Presenter** は表示責務に専念する
- **Container** はロジック・副作用・依存注入を担当する
- Container から Presenter に値とイベントを渡して描画する
- 外部の component を注入する場合は Composition props として `slots.*` にまとめる
- event handler を渡す場合は `actions.on*` にまとめる
- Presenter の中に Container を直接配置しない
- Container を差し込みたい場合は **Composition** で注入する
- アプリケーションロジックは原則として hooks に切り出し、Container から利用する
- Presenter の Storybook は、外部 Container を import せず、`args` に mock / fixture を渡す

---

## FSD での配置

この project では Feature-Sliced Design の layer / slice / segment に合わせて配置する。

- `pages` / `widgets` / `features` / `entities` は slice を切り、その下の `ui` segment に component を置く
- `app` / `shared` は slice を持たず、`styles` / `lib` / `ui` のような segment 直下に置く
- 上位 layer から参照する公開入口は各 slice の `index.ts` に寄せる

Presenter / Container Pattern を適用する layer:

- 適用する: `features`, `widgets`, `pages`
- 適用しない: `app`, `entities`, `shared`

`entities` / `shared`:

- 基本的に副作用を持つロジックを含まない。含ませてもいけない
- 公開される component はすべて Presenter として扱う
- Presenter として Storybook や test の対象にする
- Container として扱うべき component は `features` / `widgets` / `pages` に配置する

`app`:

- UI を伴う component 実装は行わない
- app shell、global style、provider、application-wide configuration を扱う
- Presenter / Container として管理する必要はない

`features` / `widgets` / `pages`:

- 原則として公開入口は Container にする
- 上位 layer は公開入口から得た component を、実装が Presenter であっても Container として扱う
- Presenter は Storybook / test / slice 内部の検証対象として扱う
- Presenter の Storybook では、`features` / `widgets` / `pages` の公開 component を slot に入れない
- slot が必要な Presenter の Storybook では、story-local な mock component または private fixture element を `slots.*` に渡す

例:

```text
src/widgets/about/
  index.ts
  ui/
    about-section.tsx
    about-section.ui.tsx
```

---

## Presenter とは

Presenter は、**表示責務に限定された UI コンポーネント**である。
アプリケーションロジックや外部副作用を持たず、受け取った props をもとに表示を行う。

### やってよいこと

- props の表示
- UI 固有の状態を持つこと
  - 例: 開閉、hover、選択中、フォーカス、ローカルな入力状態
- 同層・下層の Presenter / UI コンポーネントのレンダリング
- 表示に閉じた hooks の利用
  - 例: `useState`, `useMemo`, `useCallback`, `useId`

### やってはいけないこと

- データ取得や更新などの副作用
  - 例: API 呼び出し、routing/navigation、副作用を伴う store 更新
- アプリケーションロジックを含む custom hook の実行
- グローバル状態や外部 I/O への直接依存
- `Date.now()` / `Math.random()` / `window` / `localStorage` など、参照透過性を崩す要素に依存した描画制御
- props や外部データの破壊的変更
- Container の import / render

### Presenter の責務イメージ

Presenter は以下を担当する。

- 何を表示するか
- どのような見た目で表示するか
- ユーザー操作を props のイベントとして外に通知すること
  Presenter は、**見た目を作ることに専念するコンポーネント**として扱う。

### Presenter が持ってよい「内部ロジック」

Presenter は state を持たない（stateless）という意味ではない。
ここで禁止されるのは **副作用・業務ロジック** であり、**UI に閉じた状態遷移** は Presenter の責務として許容する。

以下は Presenter に閉じるロジックとして許容する。

- フォームの入力値保持（`useState`）と onChange ハンドラ
- 表示用バリデーション（必須、形式、文字数）と `canSubmit` の導出
- 表示整形（日時のフォーマット、トリム、表示順のソート / フィルタ）
- タブ切替、モーダル開閉、ホバー、フォーカスなどの短命 state
- dialog / popover / menu の開閉、active panel、focus management、Escape key による close などの UI interaction
- 親から渡された `onSubmit` / `onClick` を純粋に呼ぶだけのハンドラ

判断基準は以下のとおり。

- **外界（API, routing, storage, グローバル state）に触れるか**
  - 触れる場合は Container に切り出す
- **同じ入力で同じ UI を得られるか（参照透過性）**
  - 保たれる場合は Presenter に閉じてよい
- **コンポーネントを閉じて再起動したら消えてよい state か**
  - 消えてよい場合は Presenter の state として持ってよい
- **モックの作成が必要になるか**
  - 必要になる依存（API, storage, router 等）は Container 側で吸収する

「state を持つかどうか」ではなく「副作用を持つかどうか」で分離することで、UI に閉じたロジックまで Container に押し出して Props が肥大化することを避ける。

例: floating navigation の `closed` / `menu` / `about` / `theme` のような view state は、その component を閉じれば消えてよい UI-local state である。
そのため Presenter 内に置いてよい。
一方で theme の永続化や global state との接続は `features/theme` の責務なので Container から Presenter に渡す。

---

## Container とは

Container は、**データ取得・副作用・状態変換・依存注入**を担当するコンポーネントである。
Presenter を描画するために必要な値やイベントハンドラを組み立てて渡す。

### やってよいこと

- Presenter に props を渡して描画する
- データ取得や更新処理の実行
- 副作用を持つ処理の記述
- アプリケーションロジックを含む hooks の実行
- 表示に必要な状態の組み立て
  - 例: `isLoading`, `canSubmit`, `errorMessage`, `items`

### やってはいけないこと

- UI の詳細な見た目を記述すること
  - 例: 細かいレイアウト構造、スタイル指定、装飾表現
- Presenter の代わりに UI 実装を抱え込むこと
- 「表示に必要な状態の決定」を超えて、見た目の詳細まで持つこと

### Container の責務イメージ

Container は以下を担当する。

- どこからデータを取得するか
- どのロジックを適用するか
- Presenter にどの props を渡すか
- どの Presenter / Container を組み合わせるか
  Container は、**表示そのものではなく、表示を成立させるための結線を行う**。

---

## 責務の判断基準

| 項目                                       | Presenter | Container |
| ------------------------------------------ | --------- | --------- |
| 見た目の定義                               | ✅        | ❌        |
| 細かいレイアウト構造                       | ✅        | ❌        |
| props の表示                               | ✅        | ❌        |
| UI 固有の local state                      | ✅        | △         |
| フォーム入力値の保持                       | ✅        | △         |
| 表示用バリデーション（必須・形式・文字数） | ✅        | ❌        |
| `canSubmit` 等の UI 派生値の導出           | ✅        | △         |
| 業務バリデーション（API 越しの重複など）   | ❌        | ✅        |
| 送信処理の実行                             | ❌        | ✅        |
| API 呼び出し                               | ❌        | ✅        |
| routing / navigation の実行                | ❌        | ✅        |
| custom hook による業務ロジック             | ❌        | ✅        |
| グローバル状態の参照                       | ❌        | ✅        |
| 表示用 props の組み立て                    | ❌        | ✅        |
| Storybook で単体検証する対象               | ✅        | △         |
| Test 用の表示検証対象                      | ✅        | △         |

> `△` は状況によって許容されるが、原則は Presenter 優先または Container 優先で考えること。

---

## 依存関係のルール

### 許可される関係

| 関係                  | 許可 | 備考                               |
| --------------------- | ---- | ---------------------------------- |
| Presenter → Presenter | ✅   | 同層・下層の UI を組み合わせてよい |
| Container → Presenter | ✅   | 基本形                             |
| Container → Container | ✅   | 画面や機能の結線として許可         |
| Presenter → Container | ❌   | Composition で注入する             |

### 原則

- Presenter は Container を知らない
- Container は Presenter を使ってよい
- Container 同士の組み合わせは、画面や機能の結線のために許可する
- Presenter に Container を入れたい場合は、親 Container から注入する
- `entities` / `shared` の component は Presenter として扱うため、Presenter の中で直接使用してよい
- `features` / `widgets` / `pages` の公開 component を Presenter で使う場合は、Composition で注入する

## Storybook の方針

Storybook は Presenter を副作用なしで検証するための場所である。
そのため、Presenter story は実際の Container composition を再現しない。

- `features` / `widgets` / `pages` の Presenter story は `*.ui.tsx` を対象にする
- props / slots / 表示状態は Storybook の `args` で渡す
- event handler は `actions.on*` に `storybook/test` の `fn()` を渡す
- provider や context が必要な場合は decorator で mock する
- import module の差し替えが必要な場合は Storybook の module mock を使う
- API request が必要な場合は MSW を使う
- `features` / `widgets` / `pages` の公開 component は Container として扱うため、Presenter story から import しない
- `entities` / `shared` の component は Presenter として扱うため、必要なら story の中で直接使ってよい
- production data をそのまま使うより、表示状態が明確な fixture を優先する
- 複数 story / test で再利用する fixture は `*.fixtures.ts(x)` に切り出す
- `*.fixtures.ts(x)` は story / test のための private helper とし、slice の `index.ts` から公開しない
- `__DEV_*` のような開発時用 public API は、この project では原則として作らない

page Presenter のように slot で widget を受け取る story では、実 widget を入れず、layout を検証するための mock element を渡す。
実 widget を入れると、story が page Presenter の検証ではなく、複数 Container の integration preview になってしまうためである。

---

## Composition による注入

Presenter が Container を直接 import / render してはならない。
Container を組み込みたい場合は、**親 Container が Presenter に要素として注入する**。

ただし `entities` / `shared` の component は Presenter として扱うため、Presenter の中で直接使用してよい。
これらまで Composition で注入すると props が過剰に増えるためである。

`features` / `widgets` / `pages` で公開されている component は Container として扱う。
これらを Presenter に組み込みたい場合は、親 Container から `slots.*` で注入する。
event handler は `actions.on*` で渡す。

### 例

```tsx
// Presenter
type ScreenUIProps = {
  actions: {
    onSubmit: () => void;
  };
  slots: {
    Header: React.ReactNode;
    Form: React.ReactNode;
  };
};

export const ScreenUI = ({ actions: { onSubmit }, slots: { Header, Form } }: ScreenUIProps) => {
  return (
    <View>
      {Header}
      {Form}
      <Button onPress={onSubmit}>送信</Button>
    </View>
  );
};

// Container
export const Screen = () => {
  return (
    <ScreenUI
      actions={{ onSubmit: handleSubmit }}
      slots={{ Header: <UserHeader />, Form: <LoginForm /> }}
    />
  );
};
```

このように、Presenter はあくまで受け取った要素を配置するだけに留める。
Container の選択や組み立ては親 Container が担当する。

⸻

hooks の方針

Presenter で使ってよい hooks

Presenter では、表示に閉じた hooks のみ使用してよい。

- useState
- useEffect (表示と interaction に閉じたもののみ)
- useMemo
- useCallback
- useId
- useRef

用途は以下に限定する。

- UI 固有の開閉状態
- focus management や keyboard interaction などの accessibility behavior
- 入力補助
- 一時的な表示制御
- 描画上の軽微な最適化

`useEffect` は無条件に禁止しない。
ただし Presenter で許可するのは、DOM focus の移動、Escape key の処理、animation / measurement など、表示と interaction に閉じたものだけである。
API request、storage、analytics、global store 連携、routing など外界へ影響する処理は Container または lower layer の hook に置く。

Presenter で使ってはいけない hooks

- データ取得系 hook
- 副作用を伴う custom hook
- 業務ロジックを含む custom hook
- navigation / routing 系 hook
- グローバル store 接続 hook

Container で使う hooks

Container では、アプリケーションロジックを含む hooks を使用する。

- データ取得
- 更新処理
- 状態遷移
- バリデーション
- 権限制御
- イベント処理の組み立て

アプリケーションロジックは、原則として hooks に切り出して再利用可能にする。

⸻

命名規則

`UI` suffix は Presenter / Container を分離する `features` / `widgets` / `pages` でのみ使う。
`entities` / `shared` の component は Presenter であることが layer から自明なため、component 名に `UI` を付けない。

`features` / `widgets` / `pages` の Presenter:

- ファイル名: \*.ui.tsx
- コンポーネント名: \*UI

例:

- foo.ui.tsx
- FooUI

`features` / `widgets` / `pages` の Container:

- ファイル名: \*.tsx
- コンポーネント名: \*

例:

- foo.tsx
- Foo

`Foo` という component を作る場合:

- Presenter: `FooUI`
- Container: `Foo`

`entities` / `shared` で `Foo` という component を作る場合:

- ファイル名: `foo.tsx`
- コンポーネント名: `Foo`

責務としては Presenter だが、名前で Presenter であることを表現しない。

⸻

配置方針

Presenter

- slice の `ui/` に配置する
- 表示責務のコンポーネントとして管理する

Container

- slice の `ui/` に配置してよい
- ただし役割は Presenter と明確に分ける
- hooks や model 層と結線する入口として扱う

hooks

- アプリケーションロジックを含む hooks は同じ slice の `model/` などに配置する
- Presenter 専用の軽量な表示 hook は、必要に応じて近接配置してよい

⸻

レイヤー別の公開方針

`entities` / `shared`:

- Presenter のみ公開する
- 原則として Container は置かない
- Storybook / test は Presenter として行う
- UI 部品やドメイン表示部品として再利用可能な形を保つ

`features` / `widgets` / `pages`:

- 外部公開の入口は基本的に Containerとする
- 公開されているものは、使用側からは Container として扱う
- Presenter は内部実装として扱う
- Presenter は Storybook / Test / 組み込み用途で参照可能にする
- Presenter が他の `features` / `widgets` / `pages` の公開 component を必要とする場合は `slots.*` で注入する
- handler は `actions.on*` で渡す

⸻

実装例

Presenter の実装例

フォームの入力値と表示用バリデーションは Presenter 内で完結させ、
Container へは「確定した値」と「副作用を要する処理」のみ渡す。

```tsx
// layers/features/auth/ui/login-form.ui.tsx
import { useState } from "react";
import { View, Text } from "react-native";
import { Button, TextInput } from "@/layers/shared/ui";

export type LoginFormValues = {
  email: string;
  password: string;
};

export type LoginFormUIProps = {
  isLoading: boolean;
  error: string | null;
  onSubmit: (values: LoginFormValues) => void;
};

const isValidEmail = (value: string) => /.+@.+\..+/.test(value);

export const LoginFormUI = ({ isLoading, error, onSubmit }: LoginFormUIProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const canSubmit = isValidEmail(email) && password.length > 0 && !isLoading;

  return (
    <View className="gap-4 p-4">
      <TextInput
        label="メールアドレス"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput label="パスワード" value={password} onChangeText={setPassword} secureTextEntry />
      {error && <Text className="text-red-500">{error}</Text>}
      <Button onPress={() => onSubmit({ email, password })} disabled={!canSubmit}>
        {isLoading ? "ログイン中..." : "ログイン"}
      </Button>
    </View>
  );
};
```

Container の実装例

Container は副作用（API 呼び出し、遷移）と、その結果としての表示状態（`isLoading`, `error`）だけを受け持つ。

```tsx
// layers/features/auth/ui/login-form.tsx
import { LoginFormUI, type LoginFormValues } from "./login-form.ui";
import { useLogin } from "../model/hooks/use-login";

export type LoginFormProps = {
  onSuccess?: () => void;
};

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const { isLoading, error, submit } = useLogin({ onSuccess });

  const handleSubmit = (values: LoginFormValues) => {
    submit(values);
  };

  return <LoginFormUI isLoading={isLoading} error={error} onSubmit={handleSubmit} />;
};
```

⸻

NG 例

NG 1: Presenter でデータ取得を行う

```tsx
export const UserProfileUI = () => {
const { data } = useQuery(...);
return <Text>{data.name}</Text>;
};
```

理由: Presenter が副作用やデータ取得に依存しているため。

⸻

NG 2: Presenter で navigation を実行する

```tsx
export const ItemRowUI = ({ id }: { id: string }) => {
  const router = useRouter();
  return (
    <Pressable onPress={() => router.push(`/items/${id}`)}>
      <Text>詳細へ</Text>
    </Pressable>
  );
};
```

理由: routing はアプリケーションロジックであり、Presenter の責務ではない。

⸻

NG 3: Container に UI を書き込みすぎる

```tsx
export const LoginForm = () => {
  const { email, password, error, ...handlers } = useLoginForm();
  return (
    <View className="p-4 gap-4">
      <Text className="text-xl font-bold">ログイン</Text>
      ...
    </View>
  );
};
```

理由: Container が見た目の責務まで持ち始めているため。UI は Presenter に寄せる。

⸻

NG 4: Presenter が Container を直接 import する

```tsx
import { UserHeader } from "./user-header";
export const ScreenUI = () => {
  return (
    <View>
      <UserHeader />
    </View>
  );
};
```

理由: Presenter が Container に依存しており、依存方向が崩れるため。

⸻

フォームの設計指針

フォームは Presenter / Container の境界が最も議論になる領域である。
本プロジェクトでは以下を原則とする。

- 入力値・表示用バリデーション・送信可否判定は **Presenter 側** に置く
- `onSubmit(values)` の形で **確定した値だけ Container に渡す**
- 業務バリデーション（API 越しの重複チェック、社内規定チェックなど）、送信処理、遷移、永続化は **Container / hooks 側** に置く
- 入力値を 1 つずつ Props で受け渡し、Container 側で state を持つ設計（Props 祭り）は避ける
- 初期値を外から与えたい場合は `defaultValues` のような uncontrolled な初期値 props として受け取り、以降の更新は Presenter 内に閉じる

ただし以下の場合は、入力 state を Container（または hooks）に昇格してよい。

- ウィザードで複数ステップに値をまたいで保持する必要がある
- 入力中の値をリアルタイムに外部へ反映する（自動保存、他コンポーネントからのプレビュー参照など）
- 下書き保存などで `localStorage` / サーバへ永続化する必要がある

### フォームライブラリ利用時の扱い

- `useForm`, `register`, `handleSubmit`（react-hook-form など）は UI の入力制御に閉じるため **Presenter 側で使用してよい**
- zod 等の **形式バリデーションスキーマ** は Presenter 側に置いてよい
- **業務バリデーション**（API 照合、権限、社内規定）は hooks / Container 側で実行する
- ライブラリ側の `onSubmit` に業務処理を直接書かず、確定値を親の `onSubmit(values)` に渡して Container 側で処理する

⸻

例外ルール

すべてのコンポーネントを必ず Presenter / Container に分割しなければならないわけではない。

以下の条件では、単一コンポーネントとして実装してよい。

- shared / entities の単純な表示コンポーネントである
- ロジックや副作用を持たない
- 分割コストがメリットを上回るほど小さい
- 画面固有の一時的な UI であり、再利用性を要求しない

ただし、以下のいずれかが発生した場合は分離を検討すること。

- データ取得が入る
- 外部副作用が入る
- 業務ロジックが増える
- Storybook / Test で UI だけ切り出したくなる
- UI とロジックの変更頻度がずれてきた

⸻

運用上の指針

- 迷ったら、まず Presenter を先に作る
- Presenter に副作用や業務ロジックが入り始めたら Container 分離を検討する
- Container が UI を書き始めたら Presenter へ戻す
- Presenter は Storybook で検証しやすい形を保つ
- Container は「表示のための結線」として薄く保つ
- 複雑な処理は Container 自体ではなく hooks に寄せる

⸻

まとめ

Presenter/Container Pattern では、以下を守る。

- Presenter は表示責務に専念する（ただし UI に閉じた state / ロジックは保持してよい）
- Container は副作用・業務ロジック・依存注入を担当する
- 分離の基準は「state を持つか」ではなく「副作用を持つか」
- Presenter から Container へ依存しない
- Container を差し込みたい場合は Composition を使う
- 業務ロジックは hooks に切り出す
- フォームは入力 state を Presenter に閉じ、確定値を `onSubmit(values)` で Container に渡す
- features / widgets / pages では Container を公開入口とする

このルールにより、UI の再利用性、テスト容易性、保守性を高める。
