var http = require('http');
http.createServer(function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('Hello World\n');
	req.setEncoding('utf8');
	if (req.method == 'POST'){
		req.on('data', function(chunk){
			console.log(decodeURI(chunk.replace(/csv=/, "")).replace(/%2C/,",").replace(/%2F/, "/"));
		});
		
	}
}).listen(1234, '127.0.0.1');


console.log('Server running at http://127.0.0.1:1234/');
