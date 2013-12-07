// ログインIDとパスワード
var loginId = 'あなたのid';
var loginPSWD = 'あなたのパスワード';
//var kaiinId = '会員ID'; // AsIDいわゆる会員ID、多分つかわない
var targetUrl='http://www.a8.net/';
//var targetUrl='file:///ローカルに/保存した/ファイル.html';
var viewX = 1024; // viewportの設定：幅
var viewY = 768;  // viewportの設定：高さ


var casper = require('casper').create({
	verbose: true,
	logLevel: "debug"
});

casper.userAgent("Mozilla/5.0 (X11; Linux i686; rv:17.0) Gecko/20130402 Firefox/17.0"); // Linux使用してるんでこうなってます。適宜変更ねがいます



casper.start(targetUrl, function() {
	this.fillSelectors('form[name="asLogin"]', {
		'input[id="asLoginId"]': loginId ,
		'input[name="passwd"]': loginPSWD
	}, true);
}).viewport(viewX, viewY);
//　ここでログイン

casper.then(function() {
	this.echo('logged in...');
}).wait(15000);
// waitは適当

casper.then(function() {
	this.capture('logged_in.png', {
		top: 0, left: 0,
		width: viewX, height: viewY
	});
	
});
//　画面キャプチャー。不要なら削除ねがいます。

casper.then(function() {
	this.mouseEvent('click','div#GB_window div table.header tr td.close div img');
	// なぜかimgタグをクリックするようにしないとだめ。spanタグだと動かない？
}).wait(1000);
//  ようこそwindowを閉じる

casper.then(function() {
	this.mouseEvent('click' , 'img#Image2');
	// なぜかaタグではなくimgタグをクリックすることにしないとうごかない。。。
}).then(function() {
	this.echo('trying to click プログラム検索 menu');
});
// プログラム検索をクリック。

casper.then(function() {
	this.capture('program_search_clicked.png' , {
		top: 0, left: 0,
		width: viewX, height: viewY
	});
});




casper.then(function() {
	this.getCurrentUrl();
}).wait(10000);

casper.then(function() {
	this.click('input#ctck010');
}).wait(500);
casper.then(function() {
	this.click('input#ctck020');
}).wait(500);
casper.then(function() {
	this.click('input#ctck030');
}).wait(500);
casper.then(function() {
	this.click('input#ctck040');
}).wait(500);
casper.then(function() {
	this.click('input#ctck050');
}).wait(500);
casper.then(function() {
	this.click('input#ctck060');
}).wait(500);
casper.then(function() {
	this.click('input#ctck070');
}).wait(500);
casper.then(function() {
	this.click('input#ctck080');
}).wait(500);
casper.then(function() {
	this.click('input#ctck090');
}).wait(500);
casper.then(function() {
	this.click('input#ctck100');
}).wait(500);
casper.then(function() {
	this.click('input#ctck110');
}).wait(500);
casper.then(function() {
	this.click('input#ctck120');
}).wait(500);
casper.then(function() {
	this.click('input#ctck130');
}).wait(500);
casper.then(function() {
	this.click('input#ctck140');
}).wait(500);
casper.then(function() {
	this.click('input#ctck150');
}).wait(500);
casper.then(function() {
	this.click('input#ctck160');
}).wait(500);
casper.then(function() {
	this.click('input#ctck170');
}).wait(500);
casper.then(function() {
	this.click('input#ctck180');
}).wait(500);
casper.then(function() {
	this.click('input#ctck190');
}).wait(500);
casper.then(function() {
	this.click('input#ctck200');
}).wait(500);
casper.then(function() {
	this.click('input#ctck210');
}).wait(500);
casper.then(function() {
	this.click('input#ctck220');
}).wait(500);
casper.then(function() {
	this.click('input#ctck230');
}).wait(500);
casper.then(function() {
	this.click('input#ctck240');
}).wait(500);
casper.then(function() {
	this.click('input#ctck250');
}).wait(500);
casper.then(function() {
	this.click('input#ctck260');
}).wait(500);
casper.then(function() {
	this.click('input#ctck270');
}).wait(500);
casper.then(function() {
	this.click('input#ctck280');
}).wait(500);
casper.then(function() {
	this.click('input#ctck290');
}).wait(500);
casper.then(function() {
	this.click('input#ctck300');
}).wait(500);
casper.then(function() {
	this.click('input#ctck310');
}).wait(500);
casper.then(function() {
	this.click('input#ctck320');
}).wait(500);
casper.then(function() {
	this.click('input#ctck330');
}).wait(500);
casper.then(function() {
	this.click('input#ctck340');
}).wait(500);
casper.then(function() {
	this.click('input#ctck350');
}).wait(500);
casper.then(function() {
	this.click('input#ctck360');
}).wait(500);
casper.then(function() {
	this.click('input#ctck370');
}).wait(500);
// すべてのカテゴリーにチェック 
// かなりダサい。ループでなんとかならないものか。

casper.then(function() {
	this.mouseEvent('click' , 'table#searchTable td.searchBtn a:nth-child(1)');
});
// 「検索」ボタンを押す。

casper.viewport(viewX, 4000,function() {
	this.echo(this.getCurrentUrl());
	this.capture('program_search_result.png', {
		top: 0, left: 0,
		width: viewX, height: 4000
	});
});

casper.run();
