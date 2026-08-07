# Milien株式会社 コーポレートLP（2026-08-05 リニューアル作業コピー）

化粧品の商品企画・開発支援（Milien株式会社）の公式サイトです。
本番：https://www.milien.jp/ （Vercel配信 / GitHub `yucosmelabkansou-a11y/milien-site` の `main` から自動デプロイ）

> **このディレクトリは本番リポジトリから切り離した作業コピーです。**
> `.git` を削除してあるため、ここから誤って本番へ push されることはありません。
> 本番反映は、確認完了後に本番リポジトリ側でブランチを切って行ってください。

---

## ファイル構成

```
cosmetic-consulting-lp-refresh-20260805/
├── index.html        # トップページ（9セクション）
├── privacy/
│   └── index.html    # プライバシーポリシー（新規）
├── css/
│   └── style.css     # 全スタイル定義（末尾に2026-08-05リニューアル分を追記）
├── js/
│   └── main.js       # インタラクション（スクロール・アコーディオン・フォーム・CTAプリセット）
├── column/           # コラム記事
│   ├── cosmetic-product-planning-3steps/
│   └── cosmetic-development-consulting/
├── images/
│   ├── profile-400/800.jpg / .webp   # 代表写真
│   └── ogp.png                       # OGP画像（新規・1200x630）
├── 404.html
├── robots.txt
├── sitemap.xml
└── README.md
```

---

## セクション構成（トップページ）

| # | セクション | id | 備考 |
|---|---|---|---|
| 1 | ファーストビュー | `#top` | メインコピーは従来どおり |
| 2 | Milienが入る位置（図） | `#position` | 新規 |
| 3 | 支援内容（相談軸A / B-1〜B-3 / 補足） | `#service` | 期間・料金・成果物を掲載 |
| 4 | 支援後、手元に残るもの | `#deliverables` | 新規 |
| 5 | Milienができる理由＋代表プロフィール | `#strength`（`#profile`） | 旧2セクションを統合 |
| 6 | 支援の進め方・秘密保持・対応しない範囲 | `#flow` | 否定表現はここ1箇所に集約 |
| 7 | 会社概要・よくあるご質問 | `#company`（`#faq`） | 旧2セクションを統合 |
| 8 | お問い合わせ | `#contact` | 同意チェック追加 |
| 9 | コラム | `#column` | |

旧サイトから削除・統合したid：`#problem` `#merit` `#target` `#change` `#fit`
`#faq` `#company` `#profile` は外部リンク互換のため id として維持しています。

---

## 色・文言の変更箇所

### カラー変更

`css/style.css` 冒頭の `:root { }` ブロックで一括変更できます。

```css
:root {
  --color-base:   #FAF8F6;   /* ベース */
  --color-base-2: #F2EFEC;   /* サブ背景 */
  --color-main:   #B9A2A6;   /* ローズグレージュ */
  --color-accent: #5B2F42;   /* ディーププラム（CTA・強調） */
  --color-text:   #2A2529;   /* 本文 */
  --color-border: #E2DCD9;   /* 罫線 */
}
```

CTAはディーププラムの単色です（グラデーションは廃止）。

### 主要な文言変更

| 項目 | 場所 |
|---|---|
| ロゴ・タグライン | `index.html` → `.hdr__logo` / `.ftr__logo`（全ページで統一） |
| ファーストビュー見出し | `index.html` → `.hero__title` |
| サブコピー | `index.html` → `.hero__sub` |
| 支援内容・期間・料金 | `index.html` → `.plan`（`#service`） |
| 成果物 | `index.html` → `.dv__card`（`#deliverables`） |
| 秘密保持 | `index.html` → `.nda`（`#flow`） |
| 対応しない範囲 | `index.html` → `.scope-no`（`#flow`） |
| SEOタイトル・description | `index.html` → `<head>` |

### CSSキャッシュについて

`css/style.css?v=NN` と `js/main.js?v=NN` はキャッシュバスターです。
**CSS・JSを変更したら必ず番号を上げてください。** 現在は `style.css?v=22` / `main.js?v=14` です。

---

## 問い合わせフォームについて

**Formspree に接続済みで、実際に送信されます。**（確認作業では送信しないでください）

- 送信先：`https://formspree.io/f/mbdezpye`
- 必須項目：`name` / `company` / `email` / `message` / `privacy_agree`
- `privacy_agree`：プライバシーポリシー同意チェック（2026-08-05 追加）
- サービス別CTA（`data-preset`）をクリックすると、「相談したい支援」の該当チェックが自動でONになります

---

## 対応ブラウザ

- Chrome / Safari / Firefox / Edge（最新版）
- スマートフォン：iOS Safari / Android Chrome

確認済みブレークポイント：1440px / 1024px / 768px / 375px
