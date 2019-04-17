'use strict'

const http = require('http');
const fs = require('fs')
const url = require('url');


let obj = JSON.parse(fs.readFileSync("AdvertsJSON/adverts.json"))


http.createServer((req, res) => {
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
			res.end(data);
			console.log( req.url, mimetype );
		}
		else {
			console.log ('file not found: ' + req.url);
			res.writeHead(404, "Not Found");
			res.end();
		}
	});
	
}).listen(8080)













// 'use strict';
//
// const http = require('http');
//
// const user = { name: 'jura', age: 22 };
//
// const routing = {
// 	'/': 'welcome to homepage',
// 	'/user': user,
// 	'/user/name': () => user.name,
// 	'/user/age': () => user.age,
// 	'/user/*': (client, par) => 'parameter=' + par[0],
// };
//
// const types = {
// 	object: JSON.stringify,
// 	string: s => s,
// 	number: n => n + '',
// 	undefined: () => 'not found',
// 	function: (fn, par, client) => fn(client, par),
// };
//
// const matching = [];
// for (const key in routing) {
// 	if (key.includes('*')) {
// 		const rx = new RegExp(key.replace('*', '(.*)'));
// 		const route = routing[key];
// 		matching.push([rx, route]);
// 		delete routing[key];
// 	}
// }
//
// const router = client => {
// 	let par;
// 	let route = routing[client.req.url];
// 	if (!route) {
// 		for (let i = 0; i < matching.length; i++) {
// 			const rx = matching[i];
// 			par = client.req.url.match(rx[0]);
// 			if (par) {
// 				par.shift();
// 				route = rx[1];
// 				break;
// 			}
// 		}
// 	}
// 	const type = typeof route;
// 	const renderer = types[type];
// 	return renderer(route, par, client);
// };
//
// http.createServer((req, res) => {
// 	res.end(router({ req, res }) + '');
// }).listen(8000);

