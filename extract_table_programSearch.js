// ログインIDとパスワード
var loginId = 'あなたのID';
var loginPSWD = 'あなたのパスワード';
//var kaiinId = '会員ID'; // AsIDいわゆる会員ID、多分つかわない
//var targetUrl='http://www.a8.net/';
var targetUrl='file:///あなたの/保管した/ふぁいる.html';
var viewX = 1024; // viewportの設定：幅
var viewY = 768;  // viewportの設定：高さ
var flag = 0; // ページロード時の動作指定。

var casper = require('casper').create({
	verbose: true,
	logLevel: "debug"
});

casper.userAgent("Mozilla/5.0 (X11; Linux i686; rv:17.0) Gecko/20130402 Firefox/17.0"); // Linux使用してるんでこうなってます。適宜変更ねがいます


casper.start(targetUrl);

casper.then(function(){
	this.echo(this.getHTML('table.programSearch:not(#element) thead').replace(/^/g, "caspered  "));
});
casper.then(function(){
	this.echo(this.getHTML('table.programSearch:not(#element) tbody').replace(/\n/g, ";z;").replace(/^/, "caspered  ").replace(/(;z;)/g, ";z;caspered  ").replace(/(;z;)/g, "\n"));
	// １。改行をすべて";z;"に代える
	// ２。先頭に"caspered  "を挿入
	// ３。";z;"の後ろに"caspered  "を挿入
	// ４。";z;"を改行に戻す
	// を行う
});

casper.run();
