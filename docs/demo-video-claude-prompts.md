# HOKENA CRM デモ動画作成用 Claude Code 指示集

このドキュメントは、Claude Code にそのまま貼り付けて使うための個別指示集です。
目的は、LP 用のデモ動画を「ローディングを見せず」「機能別に短く」「業務SaaSらしい落ち着いた動き」で再作成することです。

## 0. 共通方針

すべての動画で守ること:

- ログイン画面、ローディング画面、長いスピナー、空の表、エラー画面を録画に入れない。
- 既存の LP コンポーネントは原則触らない。動画生成に必要な変更は `scripts/record-demo.mjs` または `scripts/record-features.mjs` と `public/demo/*` の更新に限定する。
- `.env.local` は作成・変更しない。認証情報は既存スクリプトの `CRM_URL` `CRM_EMAIL` `CRM_PASSWORD` 環境変数対応を使う。
- `insurance-crm` 側のコードは変更しない。必要なら起動済み URL を `CRM_URL` に指定するだけにする。
- 新規パッケージを追加しない。Playwright と ffmpeg だけで完結させる。
- 音声なし、1440x900、`webm` と `mp4` と `poster.jpg` を必ず出力する。
- マウス操作はゆっくり、少なめ。派手なクリック連打、ランダムなホバー、フォームの大量入力はしない。
- 実データの保存・削除・送信はしない。フォーム入力は途中まで、保存ボタンは押さない。
- 動画は各 8〜12 秒程度、ヒーローのみ 18〜24 秒程度まで許容する。
- webm はできれば 1.5MB 前後、mp4 は 3MB 前後を目安にする。画質が破綻する場合はサイズより視認性を優先する。

## 1. ローディング対策の共通指示

Claude Code には最初にこの共通指示を渡す。

```text
このリポジトリで HOKENA CRM LP 用デモ動画を再作成してください。

最重要: ローディングアニメーションやログイン画面を動画に入れないでください。

既存スクリプト `scripts/record-demo.mjs` と `scripts/record-features.mjs` を確認し、必要なら録画品質改善のためだけに修正してください。LP 側の `src/components/browser-frame.tsx`, `src/components/sections/hero.tsx`, `src/components/sections/solution.tsx`, `src/components/sections/screens-gallery.tsx` は変更しないでください。

ローディング対策として、以下を必ず実装・確認してください。

1. ログインは一度だけ行い、`storageState` を使って各動画でログイン画面をスキップする。
2. 各ルートは録画前に非録画コンテキストで一度ウォームアップする。
3. 録画対象ページでは `domcontentloaded` と `networkidle` を待ち、さらに本文・表・フォーム・チャートなど、その画面固有の安定セレクタが見えるまで待つ。
4. `ローディング`, `読み込み中`, `Loading`, `aria-busy="true"`, `.animate-pulse`, skeleton 系の要素が見えている間は操作を始めない。
5. Playwright の `recordVideo` はコンテキスト作成直後から録画されるため、ffmpeg 変換時に先頭 1.0〜2.5 秒を `-ss` でトリムし、ロード中のフレームを消す。トリム秒数は raw 動画を確認して調整する。
6. poster はトリム後の 1.0〜1.5 秒付近から切り出す。ローディングや空画面を poster にしない。
7. 出力後、LP を `pnpm build` してから `next start` で確認し、対象ページの動画がブラウザ内で再生されることを Playwright か目視で確認する。

完了時は、変更ファイル、出力した動画ファイル、各動画の長さとサイズ、ローディングが入っていないことの確認結果を報告してください。
```

## 2. 共通実装の追加指示

機能別に撮る前に、まずスクリプト品質を安定させるための指示。

```text
まず動画録画スクリプトの共通処理を改善してください。

対象:
- `scripts/record-demo.mjs`
- `scripts/record-features.mjs`

やること:

1. `waitForAppReady(page, options)` を追加してください。
   - `main` またはアプリの主要コンテナが visible になるまで待つ
   - 画面固有の `readyText` または `readySelector` があれば待つ
   - `ローディング`, `読み込み中`, `Loading` が消えるまで待つ
   - `[aria-busy="true"]`, `.animate-pulse`, `[data-loading="true"]` が見えている場合は消えるまで待つ
   - タイムアウトしてもすぐ録画せず、デバッグ screenshot を `.tmp-*` 配下に保存してから失敗させる

2. `warmupRoute(browser, storageState, path)` を追加してください。
   - 録画しない context で対象ルートを一度開く
   - `waitForAppReady` を通す
   - これにより初回ロード、フォント、画像、API キャッシュを温める

3. `encode()` に `trimStartSec` を追加してください。
   - デフォルトは機能別 1.4 秒、ヒーロー 1.8 秒
   - `ffmpeg -ss {trimStartSec} -i raw -t {durationSec}` の順で先頭のロード画面を落とす
   - poster は `trimStartSec + 1.2` 秒付近から取得する

4. 既存の `wait(1400)` のような固定待ちだけに頼らず、固定待ちは `waitForAppReady` 後の 300〜700ms 程度に抑えてください。

5. 生成後、`ffprobe` または `ffmpeg` の出力で動画時間とサイズをログに出してください。

この段階では動画の内容を大きく変えず、ローディング排除と録画安定化に集中してください。
```

## 3. ヒーローデモ動画

出力:

- `public/demo/hero-demo.webm`
- `public/demo/hero-demo.mp4`
- `public/demo/hero-demo-poster.jpg`

Claude Code への指示:

```text
HOKENA CRM LP のヒーロー用デモ動画を作り直してください。

対象ファイル:
- `scripts/record-demo.mjs`
- 出力: `public/demo/hero-demo.webm`, `public/demo/hero-demo.mp4`, `public/demo/hero-demo-poster.jpg`

動画の目的:
LP ファーストビューで「ダッシュボード → 顧客 → 意向把握 → 契約」までの実際の業務動線が分かる短い俯瞰動画にする。

構成:

1. ダッシュボード
   - 録画開始時点でダッシュボードが完全表示されていること
   - カード・チャート・期限超過などの管理情報を軽くホバー

2. 顧客管理
   - `/customers` へ移動
   - 顧客一覧の行を上から下へゆっくりホバー
   - 検索欄やフィルタがあれば軽くフォーカスするだけでよい

3. 意向把握ウィザード
   - `/intentions/new` へ移動
   - フォームの先頭 2〜3 項目だけ操作
   - 保存・送信はしない

4. 契約管理
   - `/contracts` へ移動
   - 契約一覧の行、ステータス、書類列が分かるようにホバー

尺:
- 18〜24 秒
- 最初のローディングは必ずトリム
- 1画面あたり 4〜5 秒程度

演出:
- カーソルは既存の控えめな円形カーソルでよい
- 操作はゆっくり、業務ツールらしく
- 不要なクリック音・音声なし
- 画面遷移直後にローディングが出る場合は、その部分を ffmpeg でトリムするか、該当ルートを録画前にウォームアップしてください

検証:
- `pnpm build` が通ること
- LP トップの BrowserFrame 内で `hero-demo.webm` が再生されること
- poster がローディング画面ではないこと
```

## 4. 意向把握ウィザード動画

出力:

- `public/demo/intention-wizard.webm`
- `public/demo/intention-wizard.mp4`
- `public/demo/intention-wizard-poster.jpg`

Claude Code への指示:

```text
意向把握ウィザードの機能別デモ動画を作り直してください。

対象:
- `scripts/record-features.mjs`
- scene name: `intention-wizard`
- path: `/intentions/new`
- 出力: `public/demo/intention-wizard.webm`, `.mp4`, `-poster.jpg`

動画の目的:
「面談中に質問、比較、推奨理由を順に入力でき、記録が残る」ことを伝える。

操作内容:
1. `/intentions/new` を開き、フォームが完全表示されるまで待つ。
2. 顧客選択、意向カテゴリ、希望条件、推奨理由など、見えている入力欄のうち 2〜3 項目だけ操作する。
3. セレクトがあれば選択、テキスト欄があれば短く `保障の見直し希望` などを入力する。
4. 次へボタンがあり、保存を伴わず安全に進めるなら 1 ステップだけ進める。
5. 最終保存・送信・PDF生成などは押さない。

尺:
- 8〜12 秒

ローディング対策:
- フォームが見える前のローディングを入れない。
- 先頭トリムを 1.4〜2.2 秒で調整する。
- poster はフォームが表示され、カーソルが自然な位置にあるフレームにする。
```

## 5. 契約・申込管理動画

出力:

- `public/demo/contracts.webm`
- `public/demo/contracts.mp4`
- `public/demo/contracts-poster.jpg`

Claude Code への指示:

```text
契約・申込管理の機能別デモ動画を作り直してください。

対象:
- `scripts/record-features.mjs`
- scene name: `contracts`
- path: `/contracts`
- 出力: `public/demo/contracts.webm`, `.mp4`, `-poster.jpg`

動画の目的:
申込、成立、継続、解約などのステータス管理と、契約単位で履歴を追えることを見せる。

操作内容:
1. `/contracts` を開き、契約一覧テーブルが表示されるまで待つ。
2. テーブル行をゆっくりホバーする。
3. ステータス列、募集人、保険会社、期限・更新日などが見える位置を中心にカーソルを動かす。
4. 検索欄やステータスフィルタがあればクリックまたはフォーカスのみ行う。
5. 詳細画面に遷移する場合は、ロードが長くなるなら遷移しない。詳細遷移より一覧の視認性を優先する。

尺:
- 8〜10 秒

禁止:
- 契約データの保存・編集・削除はしない。
- ローディング中の空テーブルを poster にしない。
```

## 6. 意向把握一覧・電子署名動画

出力:

- `public/demo/intentions.webm`
- `public/demo/intentions.mp4`
- `public/demo/intentions-poster.jpg`

Claude Code への指示:

```text
意向把握一覧・電子署名の機能別デモ動画を作り直してください。

対象:
- `scripts/record-features.mjs`
- scene name: `intentions`
- path: `/intentions`
- 出力: `public/demo/intentions.webm`, `.mp4`, `-poster.jpg`

動画の目的:
意向確認書、署名ステータス、対応履歴が一覧で追えることを見せる。

操作内容:
1. `/intentions` を開き、一覧またはカードが完全表示されるまで待つ。
2. 顧客名、ステータス、署名待ち、完了などの列・カードをゆっくりホバーする。
3. フィルタや検索欄があれば軽くフォーカスする。
4. 署名依頼ボタンがある場合はホバーまで。クリックして送信フローには入らない。
5. 詳細画面に遷移する場合は、ローディングが短く、署名証跡が見える場合のみ。長い場合は一覧だけで完結する。

尺:
- 8〜10 秒

注意:
- 電子署名の実送信や通知送信はしない。
- 「記録が残る」印象を出すため、ステータスや履歴が見えるフレームを poster にする。
```

## 7. 顧客管理動画

出力:

- `public/demo/customers.webm`
- `public/demo/customers.mp4`
- `public/demo/customers-poster.jpg`

Claude Code への指示:

```text
顧客管理の機能別デモ動画を作り直してください。

対象:
- `scripts/record-features.mjs`
- scene name: `customers`
- path: `/customers`
- 出力: `public/demo/customers.webm`, `.mp4`, `-poster.jpg`

動画の目的:
顧客、世帯、契約、面談履歴を一覧で確認できる業務画面として見せる。

操作内容:
1. `/customers` を開き、顧客一覧が完全表示されるまで待つ。
2. 検索欄に軽くフォーカスし、入力する場合は 2〜3 文字だけにする。
3. 顧客一覧の複数行をゆっくりホバーする。
4. 可能なら1行をクリックして詳細を開く。ただし詳細ロードが長ければクリックしない。
5. 詳細が開く場合は、世帯・契約・面談履歴のタブやカードを見せ、編集や保存はしない。

尺:
- 8〜12 秒

見せたい絵:
- 一覧テーブルが埋まっている
- 顧客名・担当者・次回対応日・ステータスが見える
- ローディングなし
```

## 8. 面談カレンダー動画

出力:

- `public/demo/calendar.webm`
- `public/demo/calendar.mp4`
- `public/demo/calendar-poster.jpg`

Claude Code への指示:

```text
面談カレンダーの機能別デモ動画を作り直してください。

対象:
- `scripts/record-features.mjs`
- scene name: `calendar`
- path: `/calendar`
- 出力: `public/demo/calendar.webm`, `.mp4`, `-poster.jpg`

動画の目的:
募集人ごとの面談予定と実施履歴をカレンダーで把握できることを見せる。

操作内容:
1. `/calendar` を開き、カレンダーグリッドと予定が表示されるまで待つ。
2. 月表示・週表示の切替がある場合は、クリックしてもよい。ただしロードが入るならホバーだけにする。
3. 予定イベントがあればゆっくりホバーする。
4. イベント詳細のポップオーバーが軽く開けるなら開く。保存・編集はしない。
5. カレンダー中央、右上の表示切替、予定イベントの順にカーソルを動かす。

尺:
- 8〜10 秒

poster:
- カレンダーの予定が見えるフレームにする。
```

## 9. レポート動画

出力:

- `public/demo/reports.webm`
- `public/demo/reports.mp4`
- `public/demo/reports-poster.jpg`

Claude Code への指示:

```text
レポートの機能別デモ動画を作り直してください。

対象:
- `scripts/record-features.mjs`
- scene name: `reports`
- path: `/reports`
- 出力: `public/demo/reports.webm`, `.mp4`, `-poster.jpg`

動画の目的:
募集人別の活動量、意向把握実施率、契約推移などを管理者が確認できることを見せる。

操作内容:
1. `/reports` を開き、チャートと集計カードが完全表示されるまで待つ。
2. KPI カード、棒グラフ、円グラフ、テーブルの順にゆっくりホバーする。
3. 期間フィルタや募集人フィルタがある場合はクリックまたはホバーのみ。
4. CSV 出力ボタンがあってもクリックしない。

尺:
- 8〜10 秒

見せたい絵:
- チャートが描画済み
- 数値カードが読める
- ローディングや空のグラフは入れない
```

## 10. 決算・精算管理動画

出力:

- `public/demo/settlement.webm`
- `public/demo/settlement.mp4`
- `public/demo/settlement-poster.jpg`

Claude Code への指示:

```text
決算・精算管理の機能別デモ動画を作り直してください。

対象:
- `scripts/record-features.mjs`
- scene name: `settlement`
- path: `/settlement`
- 出力: `public/demo/settlement.webm`, `.mp4`, `-poster.jpg`

動画の目的:
保険会社別CSV取込、募集人別・代理店別の精算明細、集計状況が分かる画面として見せる。

操作内容:
1. `/settlement` を開き、集計カード、チャート、テーブルが完全表示されるまで待つ。
2. 集計グラフや精算明細テーブルをゆっくりホバーする。
3. CSV取込ボタンがある場合はホバーのみ。ファイル選択・アップロードはしない。
4. 月次フィルタや保険会社フィルタがある場合はクリックして開くだけ。値変更は必要最小限。

尺:
- 8〜10 秒

poster:
- グラフか精算テーブルが見えるフレームにする。
```

## 11. 任意: Lark連携動画

現状 LP では Lark 連携の動画ファイルは直接参照していません。将来的に `/features` 側で動画化する場合のみ使います。

出力候補:

- `public/demo/lark.webm`
- `public/demo/lark.mp4`
- `public/demo/lark-poster.jpg`

Claude Code への指示:

```text
Lark連携の機能別デモ動画を作成してください。

注意:
現状 LP ではこの動画を直接参照していないため、必要なら動画生成だけ行い、LP 側の差し込みは別タスクにしてください。

対象:
- `scripts/record-features.mjs`
- scene name: `lark`
- path は実アプリに存在する連携設定画面を確認して決める。候補: `/integrations/lark`, `/settings/integrations`, `/settings`
- 出力: `public/demo/lark.webm`, `.mp4`, `-poster.jpg`

動画の目的:
面談リマインド、署名依頼、承認通知などをチャット通知に乗せられる設定画面として見せる。

操作内容:
1. Lark 連携設定画面を開く。
2. 通知種別、送信先、承認者、署名依頼などの設定項目をホバーする。
3. トグルやセレクトは安全なものだけ操作する。保存は押さない。
4. APIキー、Webhook URL、個人情報が見える場合は録画しない。マスクするか別画面を使う。

尺:
- 8〜10 秒
```

## 12. 完了報告フォーマット

Claude Code からの完了報告はこの形式にする。

```text
完了しました。

変更ファイル:
- scripts/record-demo.mjs
- scripts/record-features.mjs
- public/demo/...

生成動画:
- hero-demo.webm / hero-demo.mp4 / hero-demo-poster.jpg: xx秒, xxMB
- intention-wizard.webm / .mp4 / -poster.jpg: xx秒, xxMB
- contracts.webm / .mp4 / -poster.jpg: xx秒, xxMB
- intentions.webm / .mp4 / -poster.jpg: xx秒, xxMB
- customers.webm / .mp4 / -poster.jpg: xx秒, xxMB
- calendar.webm / .mp4 / -poster.jpg: xx秒, xxMB
- reports.webm / .mp4 / -poster.jpg: xx秒, xxMB
- settlement.webm / .mp4 / -poster.jpg: xx秒, xxMB

検証:
- ログイン画面なし
- 長いローディングなし
- poster はローディング画面ではない
- pnpm build: pass
- LP トップ / solution / screens-gallery で再生確認済み

残課題:
- もしあれば記載
```
