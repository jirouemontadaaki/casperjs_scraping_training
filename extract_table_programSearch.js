// ������ID�ȥѥ����
var loginId = '���ʤ���ID';
var loginPSWD = '���ʤ��Υѥ����';
//var kaiinId = '���ID'; // AsID��������ID��¿ʬ�Ĥ���ʤ�
//var targetUrl='http://www.a8.net/';
var targetUrl='file:///home/madabang/casperjs_scripts/a8/search_result/asSearchAction.do.html';
var viewX = 1024; // viewport�����ꡧ��
var viewY = 768;  // viewport�����ꡧ�⤵
var flag = 0; // �ڡ������ɻ���ư����ꡣ
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
casper.userAgent("Mozilla/5.0 (X11; Linux i686; rv:17.0) Gecko/20130402 Firefox/17.0"); // Linux���Ѥ��Ƥ��Ǥ����ʤäƤޤ���Ŭ���ѹ��ͤ����ޤ�


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
	// ������ʬ�Υǡ�������
	var tableObj = document.querySelector('table.programSearch:not(#element)').tBodies[0];
	var csvLines=[];
	for (var i=0; i< 20; i++){
		//console.log('loop : ' + i);
		var oneLine = tableObj.rows[i];
		csvLines[i]= (function(obj) {
		var line = "csvline :"; 
		line += obj.cells[0].innerHTML.replace(/\n/g, "").replace(/\t/g, "").replace(/\ +/g, " ").replace(/\"/g, "&dq;").replace(/\'/g, "&sq;");
		line += " , ";
		var detailTableObj = obj.cells[1].getElementsByTagName("table")[0]; //.querySelector('table');// �ܺ٥ơ��֥�����
		var j=0;
		
			line += detailTableObj.rows[j++].cells[1].innerHTML.replace(/\n/g, "").replace(/\t/g, "").replace(/\ +/g, " ").replace(/\"/g, "&dq;").replace(/\'/g, "&sq;");
			line += " , ";
			line += detailTableObj.rows[j++].cells[1].innerHTML.replace(/\n/g, "").replace(/\t/g, "").replace(/\ +/g, " ").replace(/\"/g, "&dq;").replace(/\'/g, "&sq;");
			line += " , ";
			line += detailTableObj.rows[j++].cells[1].innerHTML.replace(/\n/g, "").replace(/\t/g, "").replace(/\ +/g, " ").replace(/\"/g, "&dq;").replace(/\'/g, "&sq;");
			line += " , ";
			line += detailTableObj.rows[j++].cells[1].innerHTML.replace(/\n/g, "").replace(/\t/g, "").replace(/\ +/g, " ").replace(/\"/g, "&dq;").replace(/\'/g, "&sq;");
			line += " , ";
			var imgObj = detailTableObj.rows[j].cells[0].getElementsByTagName('img')[0];
			if (imgObj != null && /campaign\.gif/.test(imgObj.src) == true){
				line += detailTableObj.rows[j++].cells[1].innerHTML.replace(/\n/g, "").replace(/\t/g, "").replace(/\ +/g, "").replace(/\"/g, "").replace(/\'/g, "&sq;");
				line += ' , ';
			}else {
				line += ' , ';
			}
			line += detailTableObj.rows[j].cells[1].innerHTML.replace(/\n/g, "").replace(/\t/g, "").replace(/\ +/g, " ").replace(/\"/g, "&dq;").replace(/\'/g, "&sq;");
			line += " , ";
			line += detailTableObj.rows[j].cells[3].innerHTML.replace(/\n/g, "").replace(/\t/g, "").replace(/\ +/g, " ").replace(/\"/g, "&dq;").replace(/\'/g, "&sq;");
			//console.log('��ˬ�����');
			line += " , ";
			line += detailTableObj.rows[j++].cells[5].innerHTML.replace(/\n/g, "").replace(/\t/g, "").replace(/\ +/g, " ").replace(/\"/g, "&dq;").replace(/\'/g, "&sq;");
			line += " , ";
			line += detailTableObj.rows[j++].cells[1].innerHTML.replace(/\n/g, "").replace(/\t/g, "").replace(/\ +/g, " ").replace(/\"/g, "&dq;").replace(/\'/g, "&sq;");
			line += " , ";
			line += detailTableObj.rows[j++].cells[0].innerHTML.replace(/\n/g, "").replace(/\t/g, "").replace(/\ +/g, " ").replace(/\"/g, "&dq;").replace(/\'/g, "&sq;");
			line += " , ";
		
		line += obj.cells[2].innerHTML.replace(/\n/g, "").replace(/\t/g, "").replace(/\ +/g, " ").replace(/\"/g, "&dq;").replace(/\'/g, "&sq;");
			line += " , ";
		line += obj.cells[3].innerHTML.replace(/\n/g, "").replace(/\t/g, "").replace(/\ +/g, " ").replace(/\"/g, "&dq;").replace(/\'/g, "&sq;");
			line += " , ";
		line += obj.cells[4].innerHTML.replace(/\n/g, "").replace(/\t/g, "").replace(/\ +/g, " ").replace(/\"/g, "&dq;").replace(/\'/g, "&sq;");
		
		//console.log(line)

		return line;
		})(oneLine);

	}
		//return Array.prototype.map.call(csvLines, function(e){
		//		return e;
		//	});
			 
		return csvLines;

}

casper.start(targetUrl);

casper.then(function(){
	csvs = this.evaluate(getLines);
	this.echo(csvs.join('\n'));
	/*
	*/
	// ��������csv��ɽ��
});

casper.run();
