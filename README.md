# Milien株式会社 コーポレートLP

化粧品の商品企画・開発支援（Milien株式会社）の公式サイトです。
本番：https://www.milien.jp/ （Vercel配信）

---

## ファイル構成

```
cosmetic-consulting-lp/
├── index.html        # トップページ
├── css/
│   └── style.css     # 全スタイル定義
├── js/
│   └── main.js       # インタラクション（スクロール・アコーディオン・フォーム送信）
├── column/           # コラム記事
│   ├── cosmetic-product-planning-3steps/
│   └── cosmetic-development-consulting/
├── 404.html
├── robots.txt
├── sitemap.xml
└── README.md
```

---

## ブラウザでの開き方

`index.html` をダブルクリック、またはブラウザにドラッグ＆ドロップで表示できます。
ローカルサーバーで確認する場合：

```
python3 -m http.server 4599
```

---

## セクション構成（トップページ）

| # | セクション | id |
|---|---|---|
| 1 | ファーストビュー | `#top` |
| 2 | 支援対象となる企業 | `#target` |
| 3 | 支援によって起こる変化（Before / After） | `#change` |
| 4 | 主力サービス | `#service` |
| 5 | Milienが支援できる理由 | `#strength` |
| 6 | 代表プロフィール | `#profile` |
| 7 | Message | `#message` |
| 8 | 支援の進め方と対応範囲 | `#flow` |
| 9 | 向いている企業・向いていないご依頼 | `#fit` |
| 10 | よくあるご質問 | `#faq` |
| 11 | 会社概要 | `#company` |
| 12 | 相談するタイミング | `#timing` |
| 13 | お問い合わせ | `#contact` |
| 14 | コラム | `#column` |

---

## 色・文言の変更箇所

### カラー変更

`css/style.css` 冒頭の `:root { }` ブロックで一括変更できます。

```css
:root {
  --color-base:   #FDFAF7;   /* ベース（ミルキーベージュ） */
  --color-base-2: #F8F2ED;
  --color-base-3: #F2E8DF;
  --color-main:   #D8A7B7;   /* メイン（ダスティローズ） */
  --color-accent: #9D8AB3;   /* アクセント（ラベンダーモーブ） */
  --color-text:   #3D3040;   /* 本文テキスト */
  /* ... */
}
```

### 主要な文言変更

| 項目 | 場所 |
|---|---|
| ロゴ・タグライン | `index.html` → `.hdr__logo` / `.ftr__logo` |
| ファーストビュー見出し | `index.html` → `.hero__title` |
| 対象表記 | `index.html` → `.hero__label` |
| 主力サービス | `index.html` → `.supp__card`（`#service`） |
| プロフィール本文・経歴 | `index.html` → `.prof__desc` / `.prof__timeline` |
| SEOタイトル・description | `index.html` → `<head>` 内 `<title>` / `<meta name="description">` |
| 構造化データ | `index.html` → `<head>` 内 `application/ld+json`（Organization） |

### CSSキャッシュについて

`index.html` の `css/style.css?v=NN` と `js/main.js?v=NN` はキャッシュバスターです。
**CSS・JSを変更したら必ず番号を上げてください。** 上げないとVercelのキャッシュで旧ファイルが配信される場合があります。

---

## 問い合わせフォームについて

**Formspree に接続済みで、実際に送信されます。**

- 送信先：`https://formspree.io/f/mbdezpye`（`index.html` の `<form action>`）
- 送信処理：`js/main.js` の `contactForm` submit イベント（`fetch` で非同期POST）
- 必須項目：`name` / `company` / `email` / `message`
- 送信成功時：フォームを隠し `#contactThanks` を表示
- 送信失敗時：`#formError` のみ表示（通常時は `display:none`）

送信される項目：`name` / `company` / `dept` / `email` / `url` / `industry` / `phase` / `support_type`（複数可） / `message`

---

## 画像を追加する場合の推奨場所

| 追加したい画像 | 推奨場所 |
|---|---|
| ヒーロービジュアル（商品写真等） | `.hero__visual` 内、CSS装飾カードと差し替え or 追加 |
| プロフィール写真 | `.prof__av-in` を `<img>` タグで差し替え |
| OGP画像 | `<head>` に `og:image` を追加（**現在未設定**） |

画像ファイルは `images/` ディレクトリを作成して配置することを推奨します。

---

## 対応ブラウザ

- Chrome / Safari / Firefox / Edge（最新版）
- スマートフォン：iOS Safari / Android Chrome
