# Codex 依頼ブリーフ — HOKENA CRM LP 仕上げ作業

## 0. 前提（必読）

**プロジェクト**: 株式会社グラスト（GRUST.inc）が開発する保険代理店向けCRM「HOKENA CRM」のサービスサイト。2026年6月施行の改正保険業法（顧客本位／意向把握義務厳格化）に追いつけていない代理店向けのLPを作成中。

- **リポパス**: `/Users/shojiyuya/Desktop/仕事/グラスト/案件/G-DX/N -LIC/CRM/hokena-crm-lp`
- **スタック**: Next.js 16 (App Router) + React 19 + TS strict + Tailwind v4 + Lucide React + Noto Sans JP
- **起動**: `pnpm dev --port 3300`（既に常駐中の可能性あり、その場合はそのまま使用）
- **ドメイン（公開予定）**: hokena-crm.jp

---

## 1. 絶対遵守ルール（G-DX全体ルール準拠）

1. **生成AIっぽさ禁止** — グラデーション、過剰角丸（rounded-xl以上）、ガラス風、ネオモーフィズム、紫ピンク配色、巨大ヒーロー、絵文字、ストック写真の若者笑顔は一切使用禁止。Hubble / LegalForce 系の「法務SaaS調」を維持。
2. **HEX直書き禁止** — `src/app/globals.css` で定義済のCSS変数（`--color-primary` `--color-fg` 等）を使う。新規HEXは globals.css のトークン定義に追加してから参照。
3. **アイコンは Lucide React のみ** — 他アイコンライブラリ追加禁止。
4. **フォントは Noto Sans JP のみ**。
5. **新規パッケージ追加は最小限** — 必要なら理由を明記してから追加。
6. **絵文字をUIに出さない**。
7. **既存コンポーネント設計を踏襲** — 特に `src/components/browser-frame.tsx`（静止画/動画両対応に拡張済）、`src/components/sections/*` の構造、`src/components/ui/{button,link-button}.tsx` のvariantルール。

---

## 2. 依頼タスク（優先度順）

### タスク A: TrustBar の実ロゴ収集と差し込み【最優先】

`src/components/sections/trust-bar.tsx` は主要ロゴを表示済み。掲載意図と注記が、提携・推奨を断定しない表現になっているかを維持する。

**制約**:
- 実ロゴは**著作権・商標問題があるため、公式プレスキット or Wikipedia上のCC/Public Domain SVG**から取得すること。スクレイピング・無断転載禁止。
- ダウンロード元URLを必ず**SVGコメントとコード上のコメント両方に記載**すること。
- LP上には、掲載ロゴが提携・推奨を意味しない旨の注記を残す。
- 取得できなかったロゴは**現状のテキストプレースホルダーを残し**、無理にダミー画像を作らない。

**対象**:
1. **連携保険会社（日本市場の主要6社程度）** — 日本生命、第一生命、明治安田生命、東京海上日動、SOMPOホールディングス、MS&ADインシュアランス あたりが候補。Wikipediaの企業ページにあるSVGロゴ（Public Domain や CC）をまず探す。
2. **連携ツール（5種）** — Lark、Google Workspace、Microsoft 365、Slack、freee。各社の公式 Brand Assets / Press Kit から SVG 取得を試みる。
3. **補助金・認証バッジ（4種）** — デジタル化・AI導入補助金2026、業務改善助成金（厚労省）、Pマーク、ISMS。各公式サイトの提供素材を確認。

**配置**:
- `public/logos/insurers/{企業名}.svg`
- `public/logos/tools/{ツール名}.svg`
- `public/logos/badges/{バッジ名}.svg`

**コンポーネント改修**:
- `src/components/sections/trust-bar.tsx` の `INSURERS` `TOOLS` `BADGES` を `{ name: string; src: string | null; href: string }` 構造に拡張。
- `<svg>` または `<Image>` で表示。
- ロゴが `null`（取得不可）の場合のみテキストフォールバック。
- 全ロゴはモノクロ化（`grayscale`）＋hover時カラー復元の挙動を維持。

---

### タスク B: ファビコン・OG画像の生成

1. **Favicon** — `src/components/logo.tsx` の採用ロゴ（案C: 二本柱+横木）の**マーク部分のみ**を使って 32×32, 192×192, 512×512 のPNG＋ICOを生成。`public/favicon.ico` `public/icon.png` `public/apple-icon.png` として配置。Next.js App Router の規約に従う。
2. **OG画像** — `src/app/opengraph-image.tsx` を作成。1200×630。背景は `--color-primary`、左上にロゴ、中央に「2026年6月、意向把握はもう"記憶"では守れない。」、下部に「HOKENA CRM ／ 保険代理店向け改正対応CRM」。Noto Sans JP使用。Next.js Metadata の規約に従う。
3. **Twitter image** — OG画像と同じものを `src/app/twitter-image.tsx` で再利用。

---

### タスク C: Personas セクションの視覚補強

`src/components/sections/personas.tsx` は現状テキストカードのみで寂しい。

- 各ペルソナカード上部に**抽象幾何アイコン**（Lucide React の `Building2` `Users` `Network` 等を組み合わせた小さなコンポジション）を配置。
- ストックイラストや人物写真は使わない（生成AI感回避）。
- アクセント色は `--color-accent`（金）を使い、紺ベースの中で視線誘導する。

---

### タスク D: 機能ページ（/features）の拡充

`src/app/features/page.tsx` は現状トップLPのSolution+FeaturesGridを再利用しているだけ。

- 8機能それぞれに**詳細セクション**を追加。各機能でスクショ（既存の `public/screens/*.png` から該当画面）+ 機能の詳細説明（150〜250字）+ 関連する法令対応ポイントを記載。
- `src/components/sections/feature-detail.tsx` を新規作成して再利用可能に。
- 互い違いレイアウト（Solution と同様）。

---

### タスク E: 法改正解説記事（/insights/2026-amendment）の本文執筆

`src/app/insights/2026-amendment/page.tsx` は本文執筆済み。法令・監督指針の表現は公開前に専門家確認を行う。

- 以下の構成で本文を執筆。**法令引用は出典必須・断定表現禁止**（「対応します」ではなく「対応するための機能を備えています」）。
  1. この記事の要点（3〜5点）
  2. 改正の背景（金融庁の問題意識）
  3. 代理店実務で押さえたい記録: 顧客本位の確認／意向把握の継続記録／募集記録の保全
  4. 代理店業務に与える具体的インパクト
  5. 6月までに整えるべき準備チェックリスト（15〜20項目）
  6. HOKENA CRM がどこを支援するか（軽く触れる程度・売り込みすぎない）
- 制作途中の確認コメントは公開コードに残さない。
- 文体: 法務SaaS調、敬体、中立的。

---

### タスク F: 仕上げチェック

- `pnpm exec tsc --noEmit` がエラーなく通ること
- `pnpm build` が成功すること
- 全ページ（`/`, `/features`, `/pricing`, `/company`, `/contact`, `/insights/2026-amendment`）が HTTP 200 を返すこと
- Lighthouse Performance / Accessibility / Best Practices / SEO すべて 90 以上を目指す
- スマホ実機相当（375px幅）でレイアウト崩れがないこと

---

## 3. やってはいけないこと

- 既存の `src/components/browser-frame.tsx` の構造を破壊しない（静止画/動画両対応の設計が完了済）
- 既存の `src/components/sections/hero.tsx` の動画差し込み箇所を改変しない（別チャットでデモ動画作成中、`/demo/hero-demo.{webm,mp4}` `/demo/hero-demo-poster.jpg` を待っている状態）
- ロゴを勝手にAI生成しない（取得できなければテキストプレースホルダーを残す）
- 新規パッケージを無断で追加しない（必要なら理由をコミットメッセージに明記）
- `.env.local` を触らない
- 別リポ（`insurance-crm`）のコードを変更しない（参照のみOK）

---

## 4. 完了報告フォーマット

作業完了時に以下を出力:

- 追加したファイル一覧
- 改修したファイル一覧
- ロゴ取得結果（成功/失敗の一覧、取得元URL）
- 残課題（人手で対応すべき項目）
- `pnpm build` の最終結果
