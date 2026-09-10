# Milien株式会社 コーポレートサイト

このディレクトリ `milien-site` は、Milienコーポレートサイトの正本の作業リポジトリです。
現在の作業先は `/Users/myuasa/Developer/milien-site` です。
公開サイトは [https://www.milien.jp/](https://www.milien.jp/)、
ソースリポジトリは [yucosmelabkansou-a11y/milien-site](https://github.com/yucosmelabkansou-a11y/milien-site) です。

GitHubのmainから新規cloneしたGit履歴に、8月26日の作業版と最新の運用文書を復元しています。
Google Drive内の旧 `cosmetic-consulting-lp` は保全元として残し、直接編集しません。
公開版、main、現在の作業内容は一致するとは限りません。

## 作業前に読む文書

| 文書 | 担当する情報 |
|---|---|
| [AGENTS.md](AGENTS.md) | 全AI共通の働き方・承認境界・報告 |
| [docs/design.md](docs/design.md) | デザインの意図と基準 |
| [docs/content-guidelines.md](docs/content-guidelines.md) | ブランド・サービス・文章 |
| [docs/qa-checklist.md](docs/qa-checklist.md) | 検証方法・合否・証拠 |
| [CLAUDE.md](CLAUDE.md) | Claude CodeからAGENTS.mdを読み込む入口 |

サイトの作業はこのリポジトリを開始地点にします。
ブランドやQAのルール本文は、上記の担当文書に置きます。
READMEは構成・起動・公開経路・日付付きの運用状況を扱います。

## ファイル構成

```text
milien-site/
├── AGENTS.md
├── CLAUDE.md
├── README.md
├── docs/
│   ├── design.md
│   ├── content-guidelines.md
│   └── qa-checklist.md
├── index.html
├── css/style.css
├── js/main.js
├── privacy/index.html
├── column/
│   ├── cosmetic-development-consulting/index.html
│   └── cosmetic-product-planning-3steps/index.html
├── images/
│   ├── ogp.png
│   └── profile-{400,800}.{jpg,webp}
├── 404.html
├── robots.txt
├── sitemap.xml
└── .claude/launch.json
```

- 静的HTML／CSS／JavaScriptのサイトです。
- トップは11セクション。各ページの実際の構成はHTMLを確認します。
- CSSとJSはトップ・下層ページから共通で参照しています。
- コラムは2ページ、privacyは独立ページです。
- `.claude/launch.json`はローカルpreviewの起動補助です。`.gitignore`で除外されています。
- package.json、パッケージのlockfile、npm scripts、テスト・lint・build設定、.githubのCI設定はありません。
- この文書整備で新しい実装依存やビルド工程は導入していません。

## ローカルpreview

このリポジトリを作業ディレクトリにして実行します。

```sh
python3 -m http.server 4599 --bind 127.0.0.1
```

ブラウザで [http://127.0.0.1:4599/](http://127.0.0.1:4599/) を開きます。
停止は起動したターミナルでCtrl+Cです。
既存のClaude起動補助も4599番ポートを使用するため、同時に二重起動しません。

HTML／CSS／JSを直接配信するため、ビルドは不要です。
このGoogle Drive外の作業先から起動します。
ページだけでなく、CSS・JS・画像が読み込まれていることも確認します。

## Gitの状態確認と検証

作業開始時の読み取り例：

```sh
git status --short --branch
git branch --show-current
git rev-parse HEAD
git log -6 --oneline
git diff --stat main...HEAD
git diff --stat
git diff --cached --stat
```

- `main...HEAD`はmainとの分岐点からのコミット済み差分です。
- `git diff`は未ステージ差分、`git diff --cached`はステージ差分です。
- 未追跡ファイルは通常のgit diffに出ないため、git statusと実ファイルも確認します。
- ローカルmainやorigin/mainの参照を、無条件に最新の公開状態とは扱いません。

現在利用できるJS構文確認：

```sh
node --check js/main.js
```

最終的な差分・余分な空白等の確認：

```sh
git diff --check
git diff --stat
git diff -- README.md
```

構文確認はブラウザ操作・表示・フォームの確認を代替しません。
実装後の確認項目と判定方法は [QAチェックリスト](docs/qa-checklist.md) に従います。
ドキュメントだけの変更では文書QAを行います。

## 実装上の接続点

- 問い合わせはFormspreeに接続しています。送信先の実値は`index.html`のform actionを確認します。
- 送信処理、成功・失敗表示、CTAプリセットは`js/main.js`にあります。
- サービスCTAの`data-preset`と、フォームの`support_type`のvalueが対応します。
- サービス詳細のdetailsと、FAQの開閉処理は別の仕組みです。
- 共通CSS／JS変更時はトップだけでなく下層ページも確認します。
- HTMLのCSS／JS参照には`?v=NN`のキャッシュ番号があります。
  アセット変更時は、参照している全HTMLの更新要否を確認します。
- ロゴ、ナビゲーション、フッターは各HTMLに記載されています。
  共通文言を変更する場合は各ページの参照・記載を確認します。

## 公開経路

GitHubのmainがVercelの本番配信につながる構成です。
mainへの反映が公開に影響する前提で扱います。
PreviewデプロイはProductionデプロイと区別します。

操作許可の基準は [AGENTS.md](AGENTS.md) に従います。
ローカル実装・文書整備・QAの完了を、公開操作の許可と解釈しません。
このリポジトリ内に独自のdeployコマンドやvercel.jsonはありません。
今後公開する際は、その時点の連携設定と対象コミットを確認します。

## 運用状況 — 2026-09-09確認

この節は確認日付きの記録です。次回作業時には再確認してください。

| 項目 | 確認内容 |
|---|---|
| 正本の作業先 | /Users/myuasa/Developer/milien-site |
| 作業ブランチ | recovery/value-proposition-20260909 |
| HEAD・基点main | 9b45c32dd8ec5c2fcbe8c5fcbc0d590f5d8a9106 |
| 公開版の確認記録 | 旧相談軸A／B構成。CSS v26／JS v15。今回の変更は未公開 |
| 8月26日保全版 | 新3サービスと新しい価値説明。CSS v27／JS v17 |
| 現在の作業版 | 承認済みの重複ID・Flow／Contact・Issue 1・2行目・Service 01修正を適用。CSS v27／JS v18 |
| Git復旧 | mainから新規clone。Drive側の.gitはコピーしていない。status／branch／HEAD／diffを取得可能 |
| 既存作業の保全 | 8月26日のHTML・CSS・JSと最新6文書を含む22ファイルを復元し、パッチ適用前に全SHA-256一致を確認 |
| 保全先 | /Users/myuasa/Developer/milien-site-preservation/20260909 |
| 保全内容 | source/に修正前22ファイル、migration-manifest.jsonに取得元・サイズ・SHA-256、approved-changes.patchに承認済み差分を保存。原本は編集しない |
| パッチ適用 | git apply --check成功後に適用。保全版との差分がパッチ原本と一致 |
| 今回のQA | 新作業先の実ファイルを使い、PC 1440×900／mobile 390×844、関連画面・会社名入力・CTA・送信モック・下層JSを確認。実際の外部送信なし |
| QAの範囲 | 今回の変更に関連する検証。公開前全項目のQA、Safari・実機確認は別途必要 |
| Git・公開操作 | 変更は未コミット・未ステージ。commit／push／merge／deployは行っていない |
| Production履歴 | 2026-08-09 UTC、9b45c32の成功をGitHub側で確認 |
| 別ブランチのPreview履歴 | 2026-08-13 UTC、8c913f5。Productionとは別 |
| 全社資料 | 全社skills、MASTER_HANDOVER、旧資料は未変更 |

Google DriveのFile Providerエラーが継続したため、ユーザー承認に基づきローカル作業先へ移行しました。
Drive側のファイルと.gitは変更していません。Drive APIに未反映だった運用文書6点は、ローカルに実在する最新本文から復元しています。
この復元照合と、その後の承認済みパッチ・README更新による差分を区別して扱います。

ブランド・サービス方針の正本は [content-guidelines.md](docs/content-guidelines.md) です。
公開版に旧表現が残っていることと、今後採用する方針を区別します。

### 既知の課題・次回確認事項

作業版で解消した内容と、公開版・今後の確認事項を分けて記録します。

| 対象 | 確認内容 |
|---|---|
| 作業版：解消済み | 会社名入力をcontact-companyへ変更し、label／JSも更新。会社概要の#companyと送信項目name=companyを保持 |
| 作業版：解消済み | Flow／ContactをLP・パッケージ等で伝える内容の相談へ変更し、制作代行は非対応という説明と整合 |
| 作業版：解消済み | Issue & Changeの1・2行目を依頼後の変化へ調整。3・4行目は保持 |
| 作業版：解消済み | Service 01の非対応範囲を、広範な調査・詳細な資料制作など継続的に工数を要する実作業に統一 |
| 公開版：未反映 | 上記修正は未公開。公開版のcompany ID重複は残る |
| 公開版 | ロゴの空の#リンクでquerySelectorエラーを再現。作業版にはガードが追加済み |
| 公開版 | mobile menuのaria-expanded対応が不足。作業版には対応が追加済み |
| 下層ページ | 旧フッター文言等は次回の共通変更時に整合性確認が必要。今回のJS変更はフォーム内に限定し、フォームのない3ページのv15参照は維持。読込エラーなし |
| 動き・詳細表示 | reduced motion、JS不成立時の可視性、FAQ長文、PCのdetails表示を公開前QA対象にする |
| 全社入口 | 会社共通skills READMEとMASTER_HANDOVERのサイト参照切り替えは第2段階の未実施事項 |

課題が見つかったことを実装許可と扱わず、次のGoalで対象範囲を定めます。
問題を修正・検証した際に、この日付付き一覧を更新します。

## Goalテンプレート

通常はGoalだけを渡せます。AIはAGENTS.mdに従い、調査・提案から開始します。

```markdown
## Goal
Milienの3サービスの違いが、初見でも10秒程度で理解できるようにする。
```

今回固有の条件がある場合だけ追記します。

```markdown
## Goal
Milienの3サービスの違いが、初見でも10秒程度で理解できるようにする。

## Must keep
- HERO主見出し
- 現在のデザイン方向
- 既存フォーム機能

## Success criteria
- 各サービスについて、対象・依頼できること・違いが分かる
- 詳細を開かなくても、選ぶ手がかりがある
- 390pxで文字・CTAがはみ出さない
- 新しいページは増やさない

## Do not
- 今回のサービス部分以外へ変更を広げない
```

提案への承認例：

> 提案Aを、提示されたファイルと変更範囲で実装・QAしてください。

共通ルールを毎回再掲する必要はありません。
特定AI製品のGoal機能を使わなくても、同じ流れで運用します。
