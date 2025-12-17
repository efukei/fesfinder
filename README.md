# Fes Finder

## 概要
即売会・展示会などのイベント情報を  
日程・地域・ジャンルから検索できるWebアプリケーションです。

## デモ / 公開URL
※ 現在開発中  
（将来的に Vercel 等で公開予定）

## 主な機能
- イベント検索（条件指定）
- イベント詳細ページ
- お気に入り機能（LocalStorage）
- 閲覧履歴の保存
- SPA（Vue Router）

## 使用技術
- Frontend: Vue 3 / Vite
- State Management: Pinia
- Routing: Vue Router
- Styling: CSS（※ 今後 TailwindCSS 導入予定）
- Hosting: Vercel（予定）

## ディレクトリ構成
src/
├─ components/ # 共通UIコンポーネント
├─ views/ # ページ単位のコンポーネント
├─ stores/ # Pinia ストア
├─ router/ # ルーティング設定
└─ assets/ # 画像・静的ファイル

## セットアップ方法
以下の手順でローカル起動できます。

```bash
npm install
npm run dev
```

## 補足
- 本プロジェクトは個人開発です
- 初期フェーズでは、更新性と運用コストを考慮し、  
  WordPress + ACF をイベント管理用の CMS として採用しています
- 将来的な API / DB 連携を前提に、拡張しやすい構成を意識しています
