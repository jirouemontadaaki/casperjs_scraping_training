// ������ID�ȥѥ����
var loginId = '���ʤ���ID';
var loginPSWD = '���ʤ��Υѥ����';
//var kaiinId = '���ID'; // AsID��������ID��¿ʬ�Ĥ���ʤ�
var targetUrl='http://www.a8.net/';
//var targetUrl='file:///�������/��¸����/�ե�����.html';
var viewX = 1024; // viewport�����ꡧ��
var viewY = 768;  // viewport�����ꡧ�⤵
var flag = 0; // �ڡ������ɻ���ư����ꡣ
var csvs = [];

var casper = require('casper').create({
	verbose: true,
	logLevel: "debug"
});

casper.userAgent("Mozilla/5.0 (X11; Linux i686; rv:17.0) Gecko/20130402 Firefox/17.0"); // Linux���Ѥ��Ƥ��Ǥ����ʤäƤޤ���Ŭ���ѹ��ͤ����ޤ�

function getLines(){
	// ���ڡ���ʬ�Υǡ�������
	var tableObj = document.querySelector('table.programSearch:not(#element)').tBodies[0];
	var csvLines=[];
	for (var i=0; i< tableObj.rows.length; i++){
		//console.log('loop : ' + i);
		var oneLine = tableObj.rows[i];
		csvLines[i]= (function(obj) {
		var line = "csvline : \""; 
		line += obj.cells[0].innerHTML.replace(/\n/g, "").replace(/\t/g, "").replace(/\ +/g, " ").replace(/\"/g, "&dq;").replace(/\'/g, "&sq;");//���ֹ�
		line += "\" , \"";
		var detailTableObj = obj.cells[1].getElementsByTagName("table")[0]; //.querySelector('table');// �ܺ٥ơ��֥�����
		var j=0;
		
			line += detailTableObj.rows[j++].cells[1].innerHTML.replace(/\n/g, "").replace(/\t/g, "").replace(/\ +/g, " ").replace(/\"/g, "&dq;").replace(/\'/g, "&sq;");//�����
			line += "\" , \"";
			line += detailTableObj.rows[j].cells[1].innerHTML.replace(/\n/g, "").replace(/\t/g, "").replace(/\ +/g, " ").replace(/\"/g, "&dq;").replace(/\'/g, "&sq;");// �ץ����̾
			line += "\" , \"";
			line += /(s\d{14})/.exec(detailTableObj.rows[j++].cells[1].innerHTML.replace(/\n/g, "").replace(/\t/g, "").replace(/\ +/g, " ").replace(/\"/g, "&dq;").replace(/\'/g, "&sq;"))[0];// �ץ����ɣ�
			line += "\" , \"";
			line += detailTableObj.rows[j++].cells[1].innerHTML.replace(/\n/g, "").replace(/\t/g, "").replace(/\ +/g, " ").replace(/\"/g, "&dq;").replace(/\'/g, "&sq;");// �б��ǥХ���
			line += "\" , \"";
			line += detailTableObj.rows[j++].cells[1].innerHTML.replace(/\n/g, "").replace(/\t/g, "").replace(/\ +/g, " ").replace(/\"/g, "&dq;").replace(/\'/g, "&sq;");// ������
			line += "\" , \"";
			var imgObj = detailTableObj.rows[j].cells[0].getElementsByTagName('img')[0];
			if (imgObj != null && /campaign\.gif/.test(imgObj.src) == true){
				line += detailTableObj.rows[j++].cells[1].innerHTML.replace(/\n/g, "").replace(/\t/g, "").replace(/\ +/g, "").replace(/\"/g, "").replace(/\'/g, "&sq;");// �����ڡ�����
			}
			line += '\" , \"'; 
			line += detailTableObj.rows[j].cells[1].innerHTML.replace(/\n/g, "").replace(/\t/g, "").replace(/\ +/g, " ").replace(/\"/g, "&dq;").replace(/\'/g, "&sq;");// ��ȿ���
			line += "\" , \"";
			line += detailTableObj.rows[j].cells[3].innerHTML.replace(/\n/g, "").replace(/\t/g, "").replace(/\ +/g, " ").replace(/\"/g, "&dq;").replace(/\'/g, "&sq;");// ��ˬ�����
			//console.log('��ˬ�����');
			line += "\" , \"";
			line += detailTableObj.rows[j++].cells[5].innerHTML.replace(/\n/g, "").replace(/\t/g, "").replace(/\ +/g, " ").replace(/\"/g, "&dq;").replace(/\'/g, "&sq;");// ���̳����ܰ�
			line += "\" , \"";
			line += detailTableObj.rows[j++].cells[1].innerHTML.replace(/\n/g, "").replace(/\t/g, "").replace(/\ +/g, " ").replace(/\"/g, "&dq;").replace(/\'/g, "&sq;");// �������
			line += "\" , \"";
			line += detailTableObj.rows[j++].cells[0].innerHTML.replace(/\n/g, "").replace(/\t/g, "").replace(/\ +/g, " ").replace(/\"/g, "&dq;").replace(/\'/g, "&sq;");// �������󥨥ꥢ��
			line += "\" , \"";
		
		line += obj.cells[2].innerHTML.replace(/\n/g, "").replace(/\t/g, "").replace(/\ +/g, " ").replace(/\"/g, "&dq;").replace(/\'/g, "&sq;");// ��Ϣ����ʥ������󥨥ꥢ����
			line += "\" , \"";
		line += obj.cells[3].innerHTML.replace(/\n/g, "").replace(/\t/g, "").replace(/\ +/g, " ").replace(/\"/g, "&dq;").replace(/\'/g, "&sq;");// ����б��ʥ������󥨥ꥢ����
			line += "\" , \"";
		line += obj.cells[4].innerHTML.replace(/\n/g, "").replace(/\t/g, "").replace(/\ +/g, " ").replace(/\"/g, "&dq;").replace(/\'/g, "&sq;");// ��翽�����ߡʤ����ä��ܤä�����
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
//�������ǥ�����

casper.then(function() {
	this.echo('logged in...');
}).wait(15000);
// wait��Ŭ��

casper.then(function() {
	this.capture('logged_in.png', {
		top: 0, left: 0,
		width: viewX, height: viewY
	});
	
});
//�����̥���ץ��㡼�����פʤ����ͤ����ޤ���

casper.then(function() {
	this.mouseEvent('click','div#GB_window div table.header tr td.close div img');
	// �ʤ���img�����򥯥�å�����褦�ˤ��ʤ��Ȥ��ᡣspan��������ư���ʤ���
}).wait(1000);
//  �褦����window���Ĥ���

casper.then(function() {
	this.mouseEvent('click' , 'img#Image2');
	// �ʤ���a�����ǤϤʤ�img�����򥯥�å����뤳�Ȥˤ��ʤ��Ȥ������ʤ�������
}).then(function() {
	this.echo('trying to click �ץ���ม�� menu');
});
// �ץ���ม���򥯥�å���

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
			// ������'(function(cnt){'���鲼��'})(i)'�ޤǤ�¨���¹Դؿ��Ȥ�������Τ餷����
			// �Ѹ�Ǥ�Immediately-Invoked Function Expression��ά����IIFE��
                        var numStr = '0'+String(cnt)+'0';
                        var inputId = 'input#ctck'+numStr.substring(numStr.length-3, numStr.length);
                        return function(){
                                this.click(inputId);
				// HTML�����Ȥ�CSS�ץ�ѥƥ��λ�����̤��ѿ��ˤ��Ƥ⤤���餷��
                                }
                })(i));
        }
});
// �롼������

casper.then(function() {
	this.capture('program_categories_all_clicked.png' , {
		top: 0, left: 0,
		width: viewX, height: viewY
	});
});

casper.then(function() {
	this.then(function() { flag = 1; }).mouseEvent('click' , 'table#searchTable td.searchBtn a:nth-child(1)');
});
// �ָ����ץܥ���򲡤���

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
			//����������������=��4607�ﳺ�����ޤ�����1����20��ޤ�ɽ�����ޤ���������͡�
			this.echo('bannerText = '+ bannerText);
			var pattern = /[^0-9]+/; // ������\d�ˤ����Ȥ����
			var valuesArray = bannerText.split(pattern);  // bannerText������ͤ����Ȥ�����ơ�����˳�Ǽ	
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
				// ���ֺǽ�θ������ɽ�����̤λ��˥���å�������
			} else {
				this.click('span.pagelinks a:nth-child(11)');
				//  [���Υڡ���]�򲡤���ɽ�����줿���̤ξ��˥���å�������
			}
			this.emit('A8searchresult.loaded');
		}
});


casper.run();


