## ローカルサーバー起動方法

### 全てのアプリの起動

プロジェクトルートで以下を実行

```bash
npm i

npm run dev
```

Tasks一覧のoffice#devで、立ち上がったローカルホストを確認できる

### 各アプリを個別に起動

appsは以下のそれぞれのディレクトリに移動して、npm run devを実行

```
cd apps/アプリフォルダ
npm run dev
```

### Appとpackage

- `apps/cat`: Next.jsとTailwindcssのcatアプリ

## Visual Studio Code設定

1. `.vscode/extension`に記載されている拡張機能を全てインストールする
2. 全てインストールが完了したら、試しにコードに改行を入れて、ctrl + s (cmd + s)で自動フォーマットされることを確認する
