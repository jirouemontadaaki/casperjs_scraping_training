// ログインIDとパスワード
var loginId = 'あなたのID';
var loginPSWD = 'あなたのパスワード';
//var kaiinId = '会員ID'; // AsIDいわゆる会員ID、多分つかわない
var targetUrl='http://www.a8.net/';
//var targetUrl='file:///ローカルに/保存した/ファイル.html';
var viewX = 1024; // viewportの設定：幅
var viewY = 768;  // viewportの設定：高さ
var flag = 0; // ページロード時の動作指定。
var csvs = [];

var casper = require('casper').create({
	verbose: true,
	logLevel: "debug"
});

casper.userAgent("Mozilla/5.0 (X11; Linux i686; rv:17.0) Gecko/20130402 Firefox/17.0"); // Linux使用してるんでこうなってます。適宜変更ねがいます

function getLines(){
	// １ぺーじ分のデータ取得
	var tableObj = document.querySelector('table.programSearch:not(#element)').tBodies[0];
	var csvLines=[];
	for (var i=0; i< tableObj.rows.length; i++){
		//console.log('loop : ' + i);
		var oneLine = tableObj.rows[i];
		csvLines[i]= (function(obj) {
		var line = "csvline : \""; 
		line += obj.cells[0].innerHTML.replace(/\n/g, "").replace(/\t/g, "").replace(/\ +/g, " ").replace(/\"/g, "&dq;").replace(/\'/g, "&sq;");//行番号
		line += "\" , \"";
		var detailTableObj = obj.cells[1].getElementsByTagName("table")[0]; //.querySelector('table');// 詳細テーブルを取得
		var j=0;
		
			line += detailTableObj.rows[j++].cells[1].innerHTML.replace(/\n/g, "").replace(/\t/g, "").replace(/\ +/g, " ").replace(/\"/g, "&dq;").replace(/\'/g, "&sq;");//広告主
			line += "\" , \"";
			line += detailTableObj.rows[j].cells[1].innerHTML.replace(/\n/g, "").replace(/\t/g, "").replace(/\ +/g, " ").replace(/\"/g, "&dq;").replace(/\'/g, "&sq;");// プログラム名
			line += "\" , \"";
			line += /(s\d{14})/.exec(detailTableObj.rows[j++].cells[1].innerHTML.replace(/\n/g, "").replace(/\t/g, "").replace(/\ +/g, " ").replace(/\"/g, "&dq;").replace(/\'/g, "&sq;"))[0];// プログラムＩＤ
			line += "\" , \"";
			line += detailTableObj.rows[j++].cells[1].innerHTML.replace(/\n/g, "").replace(/\t/g, "").replace(/\ +/g, " ").replace(/\"/g, "&dq;").replace(/\'/g, "&sq;");// 対応デバイス
			line += "\" , \"";
			line += detailTableObj.rows[j++].cells[1].innerHTML.replace(/\n/g, "").replace(/\t/g, "").replace(/\ +/g, " ").replace(/\"/g, "&dq;").replace(/\'/g, "&sq;");// 成果報酬
			line += "\" , \"";
			var imgObj = detailTableObj.rows[j].cells[0].getElementsByTagName('img')[0];
			if (imgObj != null && /campaign\.gif/.test(imgObj.src) == true){
				line += detailTableObj.rows[j++].cells[1].innerHTML.replace(/\n/g, "").replace(/\t/g, "").replace(/\ +/g, "").replace(/\"/g, "").replace(/\'/g, "&sq;");// キャンペーン中
			}
			line += '\" , \"'; 
			line += detailTableObj.rows[j].cells[1].innerHTML.replace(/\n/g, "").replace(/\t/g, "").replace(/\ +/g, " ").replace(/\"/g, "&dq;").replace(/\'/g, "&sq;");// 提携審査
			line += "\" , \"";
			line += detailTableObj.rows[j].cells[3].innerHTML.replace(/\n/g, "").replace(/\t/g, "").replace(/\ +/g, " ").replace(/\"/g, "&dq;").replace(/\'/g, "&sq;");// 再訪問期間
			//console.log('再訪問期間');
			line += "\" , \"";
			line += detailTableObj.rows[j++].cells[5].innerHTML.replace(/\n/g, "").replace(/\t/g, "").replace(/\ +/g, " ").replace(/\"/g, "&dq;").replace(/\'/g, "&sq;");// 成果確定目安
			line += "\" , \"";
			line += detailTableObj.rows[j++].cells[1].innerHTML.replace(/\n/g, "").replace(/\t/g, "").replace(/\ +/g, " ").replace(/\"/g, "&dq;").replace(/\'/g, "&sq;");// キーワード
			line += "\" , \"";
			line += detailTableObj.rows[j++].cells[0].innerHTML.replace(/\n/g, "").replace(/\t/g, "").replace(/\ +/g, " ").replace(/\"/g, "&dq;").replace(/\'/g, "&sq;");// アイコンエリア１
			line += "\" , \"";
		
		line += obj.cells[2].innerHTML.replace(/\n/g, "").replace(/\t/g, "").replace(/\ +/g, " ").replace(/\"/g, "&dq;").replace(/\'/g, "&sq;");// 関連情報（アイコンエリア２）
			line += "\" , \"";
		line += obj.cells[3].innerHTML.replace(/\n/g, "").replace(/\t/g, "").replace(/\ +/g, " ").replace(/\"/g, "&dq;").replace(/\'/g, "&sq;");// 提携対応（アイコンエリア３）
			line += "\" , \"";
		line += obj.cells[4].innerHTML.replace(/\n/g, "").replace(/\t/g, "").replace(/\ +/g, " ").replace(/\"/g, "&dq;").replace(/\'/g, "&sq;");// 一括申し込み（ちぇっくぼっくす）
		line += "\"";
		
		//console.log(line)

		return line;
		})(oneLine);

	}
		//return Array.prototype.map.call(csvLines, function(e){
		//		return e;
		//	});
			 
		return csvLines;

}



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
	this.then(function() { flag = 1; }).mouseEvent('click' , 'table#searchTable td.searchBtn a:nth-child(1)');
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
			csvs = this.evaluate(getLines);
			this.echo(csvs.join('\n'));
			this.then(function(){
				this.emit('A8searchresult.nextpage');
			});
	});
});

casper.on('A8searchresult.nextpage', function(){
		if (itemAllLast > itemCurrentLast){
			if(itemCurrentLast <= 21){
				this.click('span.pagelinks a:nth-child(9)');
				// 一番最初の検索結果表示画面の時にクリックするリンク
			} else {
				this.click('span.pagelinks a:nth-child(11)');
				//  [次のページ]を押して表示された画面の場合にクリックするリンク
			}
			this.emit('A8searchresult.loaded');
		}
});


casper.run();


