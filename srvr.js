'use strict'

const http = require('http');
const fs = require('fs')
const url = require('url');


let obj = JSON.parse(fs.readFileSync("AdvertsJSON/adverts.json"))


http.createServer((req, res) => {
	console.log(req.method);
	if(req.url === '/' || req.url === "") {
		req.url = 'main.html'
	}
	fs.readFile('./' + req.url, function(err, data) {
		if (!err) {
			let dotoffset = req.url.lastIndexOf('.');
			let mimetype = dotoffset == -1
				? 'text/plain'
				: {
					'.html' : 'text/html',
					'.ico' : 'image/x-icon',
					'.jpg' : 'image/jpeg',
					'.png' : 'image/png',
					'.gif' : 'image/gif',
					'.css' : 'text/css',
					'.js' : 'text/javascript'
				}[ req.url.substr(dotoffset) ];
			res.setHeader('Content-type' , mimetype);
			if(req.method === 'POST' && req.url === '/galery.html'){
				res.end(JSON.stringify(obj), data);
				// console.log(req.url)
			}
			else {
				res.end(data);
			}
			// console.log( req.url, mimetype );
		}
		else {
			console.log ('file not found: ' + req.url);
			res.writeHead(404, "Not Found");
			res.end();
		}
	});
	
}).listen(8080)


