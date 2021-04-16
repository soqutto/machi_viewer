# まちビューア(β)
町丁ごとに色分けされた地図を自動で出力し表示します.

## 利用方法
[まちビューア(β)](https://machi.tsuchiden.org/) (machi.tsuchiden.org)

## 想定利用シーン
- 地理的好奇心を満たす
- 各種配達業務を遂行する上で地理を覚える

## 動作環境
SVG/CSS Gridに対応したブラウザが必要です.  
- Google Chrome 最新版
- Mozilla Firefox 最新版
- Safari 最新版
- iOS Safari (iOS 10.3以降)
- Chrome for Android (Android 5.0以降)    
※IE11はサポート外です.

SVGを直接描画する関係上, 非常に動作が重いためご注意ください.
FirefoxまたはmacOS Safariが一番軽快に動作します.

## 開発環境

### フロントエンド
- Vue.js v2.6.12 - フレームワーク
- Leaflet v1.7.1 - 地図表示
- D3.js v6 - SVG描画
- TopoJSON - データ形式変換
- chroma.js - カラーリング
- Bootstrap v4.6 - ページデザイン

### バックエンド
- Node.js v14
- Express v4.17.1
- PostgreSQL v13.2

## アプリケーションの構成について
このアプリは以下のような構成になっています.

### フロントエンド
- Vue.js
  - AppDataStore
  - NavBar, Modal, 各種Dialogなどの画面表示コンポーネント
  - その他ヘッダー・フッターなど
- 地図表示レイヤー
  - MapViewクラス ... Vueの世界から指令を受けて地図の操作を行います.  
   地図描画ライブラリのLeafletを実装しているカスタムクラスです.
  - MapDrawerクラス ... MapViewの子クラスとしてD3.jsにより親のMapViewにSVGを描画します.  
   親のMapViewクラスからイベントリスナに登録されインタラクティブな描画を実現します.
- 状態管理
  - AppDataStoreクラス ... 主にアプリ全体の状態(ダイアログの表示状態/開いているファイルの情報)を管理します.
  - JSONDataStoreクラス ... バックエンドにリクエストを送信し結果を受け取りストアします.
- 地理情報管理
  - TownParserクラス ... このアプリの要であり, 初期に実装したものです.  
   元データの不整合(同一町丁の地域が複数IDにまたがるなど)を解決し, 市域→町域グループ→町丁といったツリー状に再構成しています.  
   主に正規表現による文字列処理と元データ由来のIDにより処理を行っています.
   ばらばらに分かれた町域を同一の町域グループにまとめるリベース機能も搭載しています.
  - TownCoordinateクラス ... ポリゴンおよびラベルテキストの座標情報を保持します.
  - TownColorizerクラス ... ポリゴンの色情報を保持します.

### バックエンド
- Node.js (Express) APIサーバ
  - prefectures ... 都道府県絞り込み用のドロップダウンメニューに必要な都道府県情報を返します.
  - search ... param: [pref, name] 市町村検索を行います.   
   Vue.js上でインクリメンタルサーチを行っているため, 現状は全件取得と都道府県の絞り込みのみに使用しています.
  - getjson ... param: [city_id] データベースにファイルパスを問い合わせてTopoJSONファイルを返します. 
- PostgreSQL

## お問い合わせ

[お問い合わせフォーム](https://forms.gle/pU36tsraTH5NkpSS8)
