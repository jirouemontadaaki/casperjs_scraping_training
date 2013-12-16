// ログインIDとパスワード
var loginId = 'tonarinomutugorou';
var loginPSWD = 'llAkcwB92';
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
        var totalCats = 37;
        for(var i=1; i<= totalCats; i++){
                this.wait(500, (function(cnt){ 
			// ここの'(function(cnt){'から下記'})(i)'までが即時実行関数とかいうものらしい。
			// 英語ではImmediately-Invoked Function Expression、略してIIFE。
                        var numStr = '0'+String(cnt)+'0';
                        var inputId = 'input#ctck'+numStr.substring(numStr.length-3, numStr.length);
                        return function(){
                                this.click(inputId);
				// HTMLタグとかCSSプロパティの指定は別に変数にしてもいいらしい
                                }
                })(i));
        }
});
// ループ成功

casper.then(function() {
	this.capture('program_categories_all_clicked.png' , {
		top: 0, left: 0,
		width: viewX, height: viewY
	});
});

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

itemAllLast=0;
itemCurrentLast=0;
casper.then(function(){
		this.emit('A8searchresult.loaded');
});

casper.on('A8searchresult.loaded', function(){
	this.wait(10000, function(){
			var bannerText = this.getHTML('span.pagebanner');
			//　　　　　　　　=　4607件該当しました。1から20件まで表示します。　だよね？
			this.echo('bannerText = '+ bannerText);
			var pattern = /[^0-9]+/; // 数字（\d）だけとりだす
			var valuesArray = bannerText.split(pattern);  // bannerTextから数値だけとりだして、配列に格納	
			itemAllLast = parseInt(valuesArray[0]);
			itemCurrentLast = parseInt(valuesArray[2]);
			this.echo('total ='+ valuesArray[0]+' , ' + 'current till ' + valuesArray[2]);
			this.capture('search_result'+String(valuesArray[2])+'.png', {
				top: 0, left: 0,
				width: viewX, height: viewY
			}); //  スクショ
			this.click('span.pagelinks a:nth-child(9)'); 
			this.emit('A8searchresult.nextpage');
	});
});

casper.on('A8searchresult.nextpage', function(){
		if (itemAllLast > itemCurrentLast){
			this.emit('A8searchresult.loaded');
		}
});
	

casper.run();
