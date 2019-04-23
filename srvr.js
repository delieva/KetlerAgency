'use strict'

const http = require('http');
const fs = require('fs')
const url = require('url');
const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const multer  = require('multer')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));


const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'media/AdvPhotos')
	},
	filename: function (req, file, cb) {
		let ext = file.originalname;
		let i = ext.lastIndexOf('.');
		ext = ext.substr(i+1, ext.length)
		cb(null, `${Date.now()}.${ext}`)
	}
})



var upload = multer({ storage: storage});

let obj = JSON.parse(fs.readFileSync("AdvertsJSON/adverts.json"))

app.set('port', (process.env.PORT || 8080));

app.get('/*', (req, res)=>{ //creating method post which will work, when user click on download
	console.log(req.url)
	try {
		if(req.url === '/' || req.url === "") {
			req.url = 'main.html'
		}
		fs.readFile('./' + req.url, function(err, data) {
			if (!err) {
				let dotoffset = req.url.lastIndexOf('.');
				let mimetype = dotoffset == -1
					? 'text/plain'
					: {
						'.html': 'text/html',
						'.ico': 'image/x-icon',
						'.jpg': 'image/jpeg',
						'.png': 'image/png',
						'.gif': 'image/gif',
						'.css': 'text/css',
						'.js': 'text/javascript'
					}[req.url.substr(dotoffset)];
				res.setHeader('Content-type', mimetype);
				if (req.method === 'POST' && req.url === '/makeAdvert.html') {
					console.log(req)
				}
				else if (req.method === 'POST' && req.url !== '/makeAdvert.html') {
					res.end(JSON.stringify(obj), data);
					console.log(req.url + 'fuuk')
				}
				else {
					res.end(data);
				}
				// console.log( req.url, mimetype );
			}
			else {
				console.log('file not found: ' + req.url);
				res.writeHead(404, "Not Found");
				res.end();
			}
		})
	}
	catch (e) {
		console.log(e);
		res.json({error: "You entered wrong information!"})
	}
});
app.listen(8080);

app.post('/galery.html', function(req, res){
	res.end(JSON.stringify(obj));
})


app.post('/makeAdvert.html', upload.array('photo', 12), function (req, res, next) {
	//console.log(req.files)
	let photoNames = [];
	req.files.forEach((item) => {photoNames.push(`../media/AdvPhotos/${item.filename}`)})
	req.body.photos = photoNames;
	obj.push(req.body);
	fs.writeFileSync('AdvertsJSON/adverts.json', JSON.stringify(obj), 'utf8');
	console.log(obj)
	// req.files - массив файлов `photos`
	// req.body сохранит текстовые поля, если они будут
});





