// ������ID�ȥѥ����
var loginId = '���ʤ���ID';
var loginPSWD = '���ʤ��Υѥ����';
//var kaiinId = '���ID'; // AsID��������ID��¿ʬ�Ĥ���ʤ�
//var targetUrl='http://www.a8.net/';
var targetUrl='file:///���ʤ���/�ݴɤ���/�դ�����.html';
var viewX = 1024; // viewport�����ꡧ��
var viewY = 768;  // viewport�����ꡧ�⤵
var flag = 0; // �ڡ������ɻ���ư����ꡣ

var casper = require('casper').create({
	verbose: true,
	logLevel: "debug"
});

casper.userAgent("Mozilla/5.0 (X11; Linux i686; rv:17.0) Gecko/20130402 Firefox/17.0"); // Linux���Ѥ��Ƥ��Ǥ����ʤäƤޤ���Ŭ���ѹ��ͤ����ޤ�


casper.start(targetUrl);

casper.then(function(){
	this.echo(this.getHTML('table.programSearch:not(#element) thead').replace(/^/g, "caspered  "));
});
casper.then(function(){
	this.echo(this.getHTML('table.programSearch:not(#element) tbody').replace(/\n/g, ";z;").replace(/^/, "caspered  ").replace(/(;z;)/g, ";z;caspered  ").replace(/(;z;)/g, "\n"));
	// �������Ԥ򤹤٤�";z;"���夨��
	// ������Ƭ��"caspered  "������
	// ����";z;"�θ���"caspered  "������
	// ����";z;"����Ԥ��᤹
	// ��Ԥ�
});

casper.run();
