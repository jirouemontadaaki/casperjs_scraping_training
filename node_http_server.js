var http = require('http'),
	mysql = require('../nodejs/node_modules/mysql');
var con = mysql.createConnection({
		host: 'localhost',
		database: 'db_nodejs',
		user: 'webapp',
		password: 'webpass567'
});
var query = "";

http.createServer(function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('Hello World\n');
	req.setEncoding('utf8');
	if (req.method == 'POST'){
		req.on('data', function(chunk){
			var columns = decodeURIComponent(chunk.toString()).replace(/csv=/, "").split(' ^Z ');
			var insertQry = "insert into programdetail ( sponser, progname, progid, device, reward, campaign, sensorship, vperiod, gmeasure, keywords, icon1, relinfo, teikei, checkbox) values('"+columns[0]+"', '"+columns[1]+"','"+columns[2]+"','"+columns[3]+"','"+columns[4]+"','"+columns[5]+"','"+columns[6]+"','"+columns[7]+"','"+columns[8]+"','"+columns[9]+"','"+columns[10]+"','"+columns[11]+"','"+columns[12]+"','"+columns[13]+"');";
			console.log('create new row : ' + insertQry);
			query = con.query(insertQry); // query 発行
			query
  				.on('error', function(err) {console.log('err is: ', err );})
  				.on('result', function(rows) {console.log('The res is: ', rows );})
  				.on('end_insert', function() {connection.destroy()}) //終了
		
								    	
		});
		
	}
}).listen(1234, '127.0.0.1');


console.log('Server running at http://127.0.0.1:1234/');

