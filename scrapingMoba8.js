// ログインIDとパスワード
var loginId = 'あなたのID';
var loginPSWD = 'あなたのパスワード';
var kaiinId = '会員ID'; // AsIDいわゆる会員ID、多分つかわない
var targetUrl='http://moba8.net/';
//var targetUrl='file:///ローカルに/保存した/ファイル.html';

var casper = require('casper').create({
	verbose: true,
	logLevel: "debug"
});

casper.userAgent("Mozilla/5.0 (X11; Linux i686; rv:17.0) Gecko/20130402 Firefox/17.0"); // Linux使用してるんでこうなってます。適宜変更ねがいます

// デフォルトだと画面の幅が590pixelしかないので、レスポンシブWebデザイン
// により、レイアウトが変更されます。
// たぶん、Viewportの設定で画面幅が広がるとおもいますが、まだ試してないです

casper.start(targetUrl, function() {
	this.fillSelectors('form[name="asLogin"]', {
		'input[name="login"]': loginId ,
		'input[name="passwd"]': loginPSWD
	}, true);
});
//　ここでログイン

casper.then(function() {
	this.capture('logged_in.png', {
		top: 0, left: 0,
		width: 590, height: 1500
	});
});
//　画面キャプチャー。不要なら削除ねがいます。

casper.thenEvaluate(function() {
	document.querySelector('div.navbar-inner a.btn-navbar').click();
}).wait(3000);
// ここでmenuボタン（リンク）クリック。
// なにゆえwaitをいれるかというと、画面を見るとわかるのですが、この画面構成の時、
// menuボタン（リンク）をクリックすると、メニューが展開されるようになってるんですが、
// 展開にコンマ数秒かかります。展開しきった後に目的のリンクをclickしないと、どうも
// 無効になるようなんで、waitをいれて展開するのをまちました（以下同様）。

casper.then(function() {
	this.click('ul.nav li:nth-child(2) a');
}).wait(3000);
// 「プログラム検索」を押す

casper.then(function() {
	this.click('ul#Search_Menu li:nth-child(2) a');
});
// 「条件付き検索」を押す。
//　すると、条件付き検索画面にとんでいく

casper.then(function() {
	this.echo(this.getCurrentUrl());
	this.capture('detailed_search_window.png', {
		top: 0, left: 0,
		width: 590, height: 1500
});
});
//　URL出力と画面キャプチャー

casper.then(function() {
	this.mouseEvent('click', 'input[name="category"][value="2"]');
}).wait(1000);
//　「カテゴリー」チェックボックスにチェック
//　waitを入れているのは、とりあえず人が操作している風にしたかったから。

casper.then(function() {
	this.mouseEvent('click', 'input[name="firstCtgAll"]');
}).wait(1000);
//　「すべて」にチェック

casper.then(function() {
	this.mouseEvent('click', 'input[name="buttonType"]');
}).wait(1000);
//　検索開始ボタンをクリック

casper.then(function() {
	this.echo(this.getCurrentUrl());
	this.capture('detailed_search_result.png', {
		top: 0, left: 0,
		width: 590, height: 1500
	});
});
//　URL出力と画面キャプチャー

casper.run();
