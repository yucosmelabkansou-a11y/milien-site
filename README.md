# YUN Cosmetic Brand Consulting LP

化粧品企画コンサルタントの公式LPです。

---

## ファイル構成

```
cosmetic-consulting-lp/
├── index.html        # メインHTMLファイル
├── css/
│   └── style.css     # 全スタイル定義
├── js/
│   └── main.js       # インタラクション（スクロール・FAQ・フォーム等）
└── README.md
```

---

## ブラウザでの開き方

`index.html` をダブルクリック、またはブラウザにドラッグ＆ドロップするだけで表示できます。  
サーバーなしでローカルファイルとして開けます。

```
open cosmetic-consulting-lp/index.html   # macOS
```

---

## 色・文言の変更箇所

### カラー変更
`css/style.css` の冒頭 `:root { }` ブロックで一括変更できます。

```css
:root {
  --color-main: #C98F8F;      /* メインカラー（ローズ系） */
  --color-accent: #5C4438;    /* アクセント（ダークブラウン） */
  --color-gold: #B89B6A;      /* ゴールド */
  --color-text: #3A2E2A;      /* 本文テキスト */
  /* ... */
}
```

### 主要な文言変更
| 項目 | 場所 |
|---|---|
| ブランド名 | `index.html` → `.header__logo`、フッター `.footer__logo` |
| メインコピー | `index.html` → `.hero__title` |
| SNS実績数値 | `index.html` → `.hero__stats` |
| プロフィール本文 | `index.html` → `.profile__desc` |
| SEOタイトル・description | `index.html` → `<head>` 内 `<title>` / `<meta name="description">` |

---

## 問い合わせフォームについて

**現在は仮実装です。** フォーム送信時にモーダルのサンクス画面が表示されますが、  
実際にはデータが送信・保存されません。

本番運用時には以下のいずれかと連携してください：
- **Formspree** / **Netlify Forms** → HTMLのみで送信先を設定可能
- **Google Forms** → iframeで埋め込み可能
- **バックエンドAPI** → `main.js` の `contactForm submit` イベント内に `fetch()` を追加

---

## 画像を追加する場合の推奨場所

| 追加したい画像 | 推奨場所 |
|---|---|
| ヒーロービジュアル（商品写真等） | `.hero__visual` 内、CSS装飾カードと差し替え or 追加 |
| プロフィール写真 | `.profile__avatar` を `<img>` タグで差し替え |
| コラムサムネイル | `.column__card` 上部に `<img>` を追加 |

画像ファイルは `images/` ディレクトリを作成して配置することを推奨します。

---

## 対応ブラウザ

- Chrome / Safari / Firefox / Edge（最新版）
- スマートフォン：iOS Safari / Android Chrome
