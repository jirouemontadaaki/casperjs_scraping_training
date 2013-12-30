try{
	var Spooky = require('spooky');
} catch (e) {
	var Spooky = require('../lib/spooky');
}
var spooky = new Spooky({
        child: {
            transport: 'http'
        },
        casper: {
            logLevel: 'debug',
            verbose: true
        }
}, function(err) {
        if (err) {
            e = new Error('Failed to initialize SpookyJS');
            e.details = err;
            throw e;
        }
	var url = 'file:///あなたの/保存した/ファイル.html';

	//var url = 'http://www.google.co.jp/';

	spooky.start(url);

	//spooky.thenEvaluate(function(){
	//	console.log(document.querySeledtor('title'));
	//});
	
	spooky.then(function() {
		this.emit('csv', this.evaluate(function(){
			var csvLines=[];
			var tableObj = document.querySelector('table.programSearch:not(#element)').tBodies[0];
			for (var i=0; i< 20; i++){
				//console.log('loop : ' + i);
				var oneLine = tableObj.rows[i];
				csvLines[i]= (function(obj) {
				var line = "csvline :"; 
				line += obj.cells[0].innerHTML.replace(/\n/g, "").replace(/\t/g, "").replace(/\ +/g, " ").replace(/\"/g, "&dq;").replace(/\'/g, "&sq;");
				line += " , ";
				var detailTableObj = obj.cells[1].getElementsByTagName("table")[0];
				var j=0;
		
					line += detailTableObj.rows[j++].cells[1].innerHTML.replace(/\n/g, "").replace(/\t/g, "").replace(/\ +/g, " ").replace(/\"/g, "&dq;").replace(/\'/g, "&sq;");
					line += " , ";
					line += detailTableObj.rows[j].cells[1].innerHTML.replace(/\n/g, "").replace(/\t/g, "").replace(/\ +/g, " ").replace(/\"/g, "&dq;").replace(/\'/g, "&sq;");
					line += " , ";
					line += /(s\d{14})/.exec(detailTableObj.rows[j++].cells[1].innerHTML.replace(/\n/g, "").replace(/\t/g, "").replace(/\ +/g, " ").replace(/\"/g, "&dq;").replace(/\'/g, "&sq;"))[0];
					line += " , ";
					line += detailTableObj.rows[j++].cells[1].innerHTML.replace(/\n/g, "").replace(/\t/g, "").replace(/\ +/g, " ").replace(/\"/g, "&dq;").replace(/\'/g, "&sq;");
					line += " , ";
					line += detailTableObj.rows[j++].cells[1].innerHTML.replace(/\n/g, "").replace(/\t/g, "").replace(/\ +/g, " ").replace(/\"/g, "&dq;").replace(/\'/g, "&sq;");
					line += " , ";
					var imgObj = detailTableObj.rows[j].cells[0].getElementsByTagName('img')[0];
					if (imgObj != null && /campaign\.gif/.test(imgObj.src) == true){
						line += detailTableObj.rows[j++].cells[1].innerHTML.replace(/\n/g, "").replace(/\t/g, "").replace(/\ +/g, "").replace(/\"/g, "").replace(/\'/g, "&sq;");
					}
					line += ' , ';
					line += detailTableObj.rows[j].cells[1].innerHTML.replace(/\n/g, "").replace(/\t/g, "").replace(/\ +/g, " ").replace(/\"/g, "&dq;").replace(/\'/g, "&sq;");
					line += " , ";
					line += detailTableObj.rows[j].cells[3].innerHTML.replace(/\n/g, "").replace(/\t/g, "").replace(/\ +/g, " ").replace(/\"/g, "&dq;").replace(/\'/g, "&sq;");
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
				return line;
				})(oneLine);
			}
			return csvLines.join("\n");
				})
		);
	});

	spooky.run();
});

spooky.on('error', function (e, stack) {
    console.error(e);

    if (stack) {
        console.log(stack);
    }
});

spooky.on('log', function (log) {
    if (log.space === 'remote') {
        console.log(log.message.replace(/ \- .*/, ''));
    }
});

//spooky.on('console', function(line){
	//console.log(line);
//});

spooky.on('csv', function(csvLine){
	console.log(csvLine);
});
