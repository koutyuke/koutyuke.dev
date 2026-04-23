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
- Presenter の中に Container を直接配置しない
- Container を差し込みたい場合は **Composition** で注入する
- アプリケーションロジックは原則として hooks に切り出し、Container から利用する

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

---

## Composition による注入

Presenter が Container を直接 import / render してはならない。
Container を組み込みたい場合は、**親 Container が Presenter に要素として注入する**。

### 例

```tsx
type ScreenUIProps = {
  Header: React.ReactNode;
  Form: React.ReactNode;
};
export const ScreenUI = ({ Header, Form }: ScreenUIProps) => {
  return (
    <View>
      {Header}
      {Form}
    </View>
  );
};
export const Screen = () => {
  return <ScreenUI Header={<UserHeader />} Form={<LoginForm />} />;
};
```

このように、Presenter はあくまで受け取った要素を配置するだけに留める。
Container の選択や組み立ては親 Container が担当する。

⸻

hooks の方針

Presenter で使ってよい hooks

Presenter では、表示に閉じた hooks のみ使用してよい。

- useState
- useMemo
- useCallback
- useId

用途は以下に限定する。

- UI 固有の開閉状態
- 入力補助
- 一時的な表示制御
- 描画上の軽微な最適化

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

Presenter

Container がある場合

- ファイル名: \*.ui.tsx
- コンポーネント名: \*UI

例:

- login-form.ui.tsx
- LoginFormUI

Container がない場合

- ファイル名: \*.tsx
- コンポーネント名: 中立的な名前を使う

例:

- user-avatar.tsx
- UserAvatar

Container を持たない場合は、そのコンポーネントが内部的に Presenter であることを外部 API に露出しない。

Container

- ファイル名: \*.tsx
- コンポーネント名: 中立的な名前を使う

例:

- login-form.tsx
- LoginForm

⸻

配置方針

Presenter

- ui/ に配置する
- 表示責務のコンポーネントとして管理する

Container

- ui/ に配置してよい
- ただし役割は Presenter と明確に分ける
- hooks や model 層と結線する入口として扱う

hooks

- アプリケーションロジックを含む hooks は model/hooks/ などに配置する
- Presenter 専用の軽量な表示 hook は、必要に応じて近接配置してよい

⸻

レイヤー別の公開方針

shared / entities

- Presenter のみ公開する
- 原則として Container は置かない
- UI 部品やドメイン表示部品として再利用可能な形を保つ

features / widgets / pages

- 外部公開の入口は基本的に Containerとする
- Presenter は内部実装として扱う
- Presenter は Storybook / Test / 組み込み用途で参照可能にする
- 必要に応じて開発用 export を分ける

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
