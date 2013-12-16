// ������ID�ȥѥ����
var loginId = '';
var loginPSWD = '';
//var kaiinId = '���ID'; // AsID��������ID��¿ʬ�Ĥ���ʤ�
var targetUrl='http://www.a8.net/';
//var targetUrl='file:///';
var viewX = 1024; // viewport�����ꡧ��
var viewY = 768;  // viewport�����ꡧ�⤵


var casper = require('casper').create({
	verbose: true,
	logLevel: "debug"
});

casper.userAgent("Mozilla/5.0 (X11; Linux i686; rv:17.0) Gecko/20130402 Firefox/17.0"); // Linux���Ѥ��Ƥ��Ǥ����ʤäƤޤ���Ŭ���ѹ��ͤ����ޤ�



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
//�����̥���ץ�㡼�����פʤ���ͤ����ޤ���

casper.then(function() {
	this.mouseEvent('click','div#GB_window div table.header tr td.close div img');
	// �ʤ���img�����򥯥�å�����褦�ˤ��ʤ��Ȥ�ᡣspan�������ư���ʤ���
}).wait(1000);
//  �褦����window���Ĥ���

casper.then(function() {
	this.mouseEvent('click' , 'img#Image2');
	// �ʤ���a�����ǤϤʤ�img�����򥯥�å����뤳�Ȥˤ��ʤ��Ȥ������ʤ�������
}).then(function() {
	this.echo('trying to click �ץ���ม�� menu');
});
// �ץ���ม��򥯥�å���

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
			// ������'(function(cnt){'���鲼��'})(i)'�ޤǤ�¨���¹Դؿ�Ȥ�������Τ餷����
			// �Ѹ�Ǥ�Immediately-Invoked Function Expression��ά����IIFE��
                        var numStr = '0'+String(cnt)+'0';
                        var inputId = 'input#ctck'+numStr.substring(numStr.length-3, numStr.length);
                        return function(){
                                this.click(inputId);
				// HTML�����Ȥ�CSS�ץ�ѥƥ��λ�����̤��ѿ�ˤ��Ƥ⤤���餷��
                                }
                })(i));
        }
});
// �롼�����

casper.then(function() {
	this.capture('program_categories_all_clicked.png' , {
		top: 0, left: 0,
		width: viewX, height: viewY
	});
});

casper.then(function() {
	this.mouseEvent('click' , 'table#searchTable td.searchBtn a:nth-child(1)');
});
// �ָ���ץܥ���򲡤���

casper.viewport(viewX, 4000,function() {
	this.echo(this.getCurrentUrl());
	this.capture('program_search_result.png', {
		top: 0, left: 0,
		width: viewX, height: 4000
	});
});



var itemAllLast = 0;
var itemCurrentLast=0;
casper.then(function() {
		 this.emit('A8searchresult.loaded');
		// �������।�٥��'A8searchresult.loaded'��ȯ��
});
	
casper.on('A8searchresult.loaded', function() {
		// casper.emit('A8searchresult.loaded');���¹Ԥ����ȡ��������¹Ԥ���ޤ���
		this.wait(5000, function(){
			var bannerText = this.getHTML('span.pagebanner');
			//����������������=��4607�ﳺ��ޤ�����1����20��ޤ�ɽ�����ޤ��������͡�
			this.echo('bannerText = '+ bannerText);
			var pattern = /[^0-9]+/; // ����\d�ˤ���Ȥ���
			var valuesArray = bannerText.split(pattern);  // bannerText������ͤ���Ȥ����ơ�����˳�Ǽ	
			//  �ǽ��valuesArray = { 4607, 1, 20,  }�ˤʤ롣4�֤�����Ǥˤʤ����뤬���ˤ��ʤ���
			this.capture('search_result'+valuesArray[2]+'.png', {
				top: 2500, left: 0,
				width: 1024, height: 764*3
			}); //  ��������
			this.echo('total ='+ valuesArray[0]+' , ' + 'current till ' + valuesArray[2]);
			//  ���ߤ�����x�濫�äơ�y��ޤ�ɽ������Ƥޤ����Ȥ���ɽ����
			itemAllLast = parseInt(valuesArray[0]); // ʸ�������ˤؤ󤫤�
			itemCurrentLast = parseInt(valuesArray[2]);
			this.click('span.pagelinks a:nth-child(9)');
			// �ּ��Υڡ����פ򥯥�å������������������������������ߡ��������ޤǤϤ����������Τ��Ȥ�ư��ؤ�
		});
		this.then(function(){
			this.emit('A8searchresult.nextpage');
			// �����ǥ������।�٥��'A8searchresult.nextpage'��ȯ�ԡ�
		});
});

casper.on('A8searchresult.nextpage', function(){
//  casper.emit('A8searchresult.nextpage')���¹Ԥ��졢�������।�٥��'A8searchresult.nextpage'��ȯ�Ԥ����ȡ��������¹Ԥ���롣
		this.then(function(){
			if (itemAllLast > itemCurrentLast){
			//  ���ߤ�ɽ���κǸ��itemCurrentLast�ˤ����κǸ�(itemAllLast)���⾮������ޤ����κǸ�ޤ�ɽ������Ƥʤ��ʤ�С��������।�٥��'A8searchresult.loaded'��ȯ�Ԥ��ơ���³�������³�ԡ�
				this.emit('A8searchresult.loaded');
			}
		});
});

casper.run();
