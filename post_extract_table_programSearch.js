// UTF-8でかかれてます。
// ログインIDとパスワード
var loginId = 'あなたのID';
var loginPSWD = 'あなたのパスワード';
//var kaiinId = '会員ID'; // AsIDいわゆる会員ID、多分つかわない
//var targetUrl='http://www.a8.net/';
var targetUrl='file:///あなたの/保存した/ディレクトリ/asSearchAction.do.html';
var viewX = 1024; // viewportの設定：幅
var viewY = 768;  // viewportの設定：高さ
var flag = 0; // ページロード時の動作指定。
var csvs = [];

var casper = require('casper').create({
	verbose: true,
	logLevel: "debug"
});

/*
function getSearchResultTable() {
	var tObj = document.querySelector('table.programSearch:not(#element');
	return tObj;
}
*/
casper.userAgent("Mozilla/5.0 (X11; Linux i686; rv:17.0) Gecko/20130402 Firefox/17.0"); // Linux使用してるんでこうなってます。適宜変更ねがいます


/*
casper.on('remote.message', function(msg){
		this.echo('tableData : ' + msg);
});
*/


/*
casper.then(function(){
	this.echo(this.getHTML('table.programSearch:not(#element) thead').replace(/^/g, "caspered  "));
});
*/

//casper.wait(5000);

function getLines(){
	// ２０行分のデータ取得
	var tableObj = document.querySelector('table.programSearch:not(#element)').tBodies[0];
	var csvLines=[];
	for (var i=0; i< tableObj.rows.length; i++){
		//console.log('loop : ' + i);
		var oneLine = tableObj.rows[i];
		csvLines[i]= (function(obj) {
		//var line = "csvline :"; 
		var line = "";
		//line += obj.cells[0].innerHTML.replace(/\n/g, "").replace(/\t/g, "").replace(/\ +/g, " ").replace(/\"/g, "&dq;").replace(/\'/g, "&sq;");//行番号
		//line += " , ";
		var detailTableObj = obj.cells[1].getElementsByTagName("table")[0]; //.querySelector('table');// 詳細テーブルを取得
		var j=0;
		
			line += detailTableObj.rows[j++].cells[1].innerHTML.replace(/\n/g, "").replace(/\t/g, "").replace(/\ +/g, " ").replace(/\"/g, "&dq;").replace(/\'/g, "&sq;");//広告主
			line += " ^Z ";
			line += detailTableObj.rows[j].cells[1].innerHTML.replace(/\n/g, "").replace(/\t/g, "").replace(/\ +/g, " ").replace(/\"/g, "&dq;").replace(/\'/g, "&sq;");// プログラム名
			line += " ^Z ";
			line += /(s\d{14})/.exec(detailTableObj.rows[j++].cells[1].innerHTML.replace(/\n/g, "").replace(/\t/g, "").replace(/\ +/g, " ").replace(/\"/g, "&dq;").replace(/\'/g, "&sq;"))[0];// プログラムＩＤ
			line += " ^Z ";
			line += detailTableObj.rows[j++].cells[1].innerHTML.replace(/\n/g, "").replace(/\t/g, "").replace(/\ +/g, " ").replace(/\"/g, "&dq;").replace(/\'/g, "&sq;");// 対応デバイス
			line += " ^Z ";
			line += detailTableObj.rows[j++].cells[1].innerHTML.replace(/\n/g, "").replace(/\t/g, "").replace(/\ +/g, " ").replace(/\"/g, "&dq;").replace(/\'/g, "&sq;");// 成果報酬
			line += " ^Z ";
			var imgObj = detailTableObj.rows[j].cells[0].getElementsByTagName('img')[0];
			if (imgObj != null && /campaign\.gif/.test(imgObj.src) == true){
				line += detailTableObj.rows[j++].cells[1].innerHTML.replace(/\n/g, "").replace(/\t/g, "").replace(/\ +/g, "").replace(/\"/g, "").replace(/\'/g, "&sq;");// キャンペーン中
			}
			line += ' ^Z '; 
			line += detailTableObj.rows[j].cells[1].innerHTML.replace(/\n/g, "").replace(/\t/g, "").replace(/\ +/g, " ").replace(/\"/g, "&dq;").replace(/\'/g, "&sq;");// 提携審査
			line += " ^Z ";
			line += detailTableObj.rows[j].cells[3].innerHTML.replace(/\n/g, "").replace(/\t/g, "").replace(/\ +/g, " ").replace(/\"/g, "&dq;").replace(/\'/g, "&sq;");// 再訪問期間
			//console.log('再訪問期間');
			line += " ^Z ";
			line += detailTableObj.rows[j++].cells[5].innerHTML.replace(/\n/g, "").replace(/\t/g, "").replace(/\ +/g, " ").replace(/\"/g, "&dq;").replace(/\'/g, "&sq;");// 成果確定目安
			line += " ^Z ";
			line += detailTableObj.rows[j++].cells[1].innerHTML.replace(/\n/g, "").replace(/\t/g, "").replace(/\ +/g, " ").replace(/\"/g, "&dq;").replace(/\'/g, "&sq;");// キーワード
			line += " ^Z ";
			line += detailTableObj.rows[j++].cells[0].innerHTML.replace(/\n/g, "").replace(/\t/g, "").replace(/\ +/g, " ").replace(/\"/g, "&dq;").replace(/\'/g, "&sq;");// アイコンエリア１
			line += " ^Z ";
		
		line += obj.cells[2].innerHTML.replace(/\n/g, "").replace(/\t/g, "").replace(/\ +/g, " ").replace(/\"/g, "&dq;").replace(/\'/g, "&sq;");// 関連情報（アイコンエリア２）
			line += " ^Z ";
		line += obj.cells[3].innerHTML.replace(/\n/g, "").replace(/\t/g, "").replace(/\ +/g, " ").replace(/\"/g, "&dq;").replace(/\'/g, "&sq;");// 提携対応（アイコンエリア３）
			line += " ^Z ";
		line += obj.cells[4].innerHTML.replace(/\n/g, "").replace(/\t/g, "").replace(/\ +/g, " ").replace(/\"/g, "&dq;").replace(/\'/g, "&sq;");// 一括申し込み（ちぇっくぼっくす）
		
		//console.log(line)

		return line;

		})(oneLine);
	}

	return csvLines;

}

casper.start(targetUrl);

casper.then(function(){
	csvs = this.evaluate(getLines);
	//this.echo(csvs.join('\n'));
	this.emit('csv', csvs);
	/*
	*/
	// 取得したcsvを表示
});

casper.on('csv', function(lines){
	//this.echo(line);
	this.eachThen(lines, function(response){
		//this.echo(response.data);
		this.thenOpen('http://localhost:1234', {
				method: 'POST',
				data:  {
					'csv': response.data
				},
				headers: {
					'contentType': 'text/html; charset=UTF-8',
					'Accept-Language': 'ja,en-us;q=0.7,en;q=0.3'
				}

		});	
	});
	
});

casper.run();
