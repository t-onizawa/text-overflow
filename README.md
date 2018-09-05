# 3点リーダー用js

複数行に対応した3点リーダーに変更するjs

## 使用方法

HTMLにdata属性を使って行数を指定
```html
<p data-text-overflow="2">
    テキストテキストテキストテキストテキストテキストテキストテキスト
</p>
```

スマホと行数を切り替えたいときは-spで追加
```html
<p data-text-overflow="2" data-text-overflow-sp="3">
    テキストテキストテキストテキストテキストテキストテキストテキスト
</p>
```

## その他
JavaScriptファイル内の
```js
var SP_MEDIA = '(max-width:768px)';
```
の数値を書き換えでSP時の挙動を実装