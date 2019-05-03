'use strict'

const http = require('http');
const fs = require('fs')
const url = require('url');
const express = require('express')
const mime = require('mime-types')
const app = express();
const bodyParser = require('body-parser');
const multer  = require('multer')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
const session = require('express-session');
// app.use(connect.cookieParser());
app.use(session({
	name: 'sid',
	saveUninitialized: false,
	resave: false,
	secret: 'sssh, quiet! it\'s a secret!',
	cookie: {
		maxAge: 720000000,
		sameSite: true
	}
}));


function checkLoginBefore(req, res, next) {
	if (!req.session.userId) {
		res.redirect('/signIn.html')
	} else {
		next();
	}
}
function checkLoginAfter(req, res, next) {
	if (req.session.userId) {
		res.redirect('/')
	} else {
		next();
	}
}

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'media/preAdvPhotos')
	},
	filename: function (req, file, cb) {
		let ext = file.originalname;
		let i = ext.lastIndexOf('.');
		ext = ext.substr(i+1, ext.length);
		cb(null, `${Date.now()}.${ext}`)
	}
})











const upload = multer({ storage: storage});

let obj = JSON.parse(fs.readFileSync("JSON/adverts.json"));
let users = JSON.parse(fs.readFileSync("JSON/users.json"));

app.get('/account', checkLoginBefore, (req, res) => {
	res.sendFile('account.html', { root: '.' })
});

app.post('/get_user_acc', (req, res) => {
	users.forEach((item) => {
		console.log('wat')
		if(item.userId === req.session.userId){
			res.send(item)
		}
	});
});

app.post('/get_user_adverts', (req, res) => {
	let arr = [];
	
	obj.forEach((item) => {
		if(item.userId === req.session.userId){
			arr.push(item)
		}
	});
	res.send(arr)
});

app.post('/get_user_reviews', (req, res) => {
	let arr = [];
	let forReview = JSON.parse(fs.readFileSync("JSON/for_review.json"));
	forReview.forEach((item) => {
		if(item.wantReview === req.session.userId){
			arr.push(item)
		}
	});
	res.send(arr)
});

app.get('/logout', checkLoginBefore, (req, res) => {
	req.session.destroy(err => {
		// if(err){
		//
		// }
		res.clearCookie('sid');
		res.redirect('/')
	})
});

app.get('/gallery', (req, res) => {
	res.sendFile('galery.html', { root: '.' })
});

app.get('/', (req, res) => {
	res.sendFile('main.html', { root: '.' })
});

app.get('/advert*', (req, res) => {
	res.sendFile('advert.html', { root: '.' })
});

app.post('/advert', (req, res) => {
	obj.forEach((item) => {
		if(item.id === req.body.id){
			res.send(item)
		}
	});
});

app.post('/for_review', (req, res) => {
	let forReview = JSON.parse(fs.readFileSync("JSON/for_review.json"));
	obj.forEach((item) => {
		if(item.id === req.body.id){
			if(req.body.telephone){
				// console.log(req.body.telephone);
				
				item.wantReview = req.body.telephone;
			}
			else{
				let user = users.find(function(itm){
					console.log(itm)
					if(itm.userId === req.session.userId){
						return itm;
					}
				});
				console.log(user);
				item.wantReview = user.telephone;
			}
			forReview.push(item);
			res.end('')
		}
	});
	fs.writeFileSync('JSON/for_review.json', JSON.stringify(forReview), 'utf8');
});

app.get('/login', checkLoginAfter, (req, res) => {
	res.sendFile('signIn.html', { root: '.' })
});

app.get('/signup', checkLoginAfter, (req, res) => {
	res.sendFile('signUp.html', { root: '.' })
});

app.get('/*', function(req, res) {
	res.sendFile(req.url.substring(1), { root: '.' })
});





app.post('/get_preadverts', (req, res) => {
	let preadverts = JSON.parse(fs.readFileSync("JSON/preadverts.json"));
	console.log(preadverts)
	res.send(preadverts);
	
});




app.post('/get_wantreviews', (req, res) => {
	let forReview = JSON.parse(fs.readFileSync("JSON/for_review.json"));
	res.send(forReview)
});















app.post('/loadUser', function(req, res){
	if (!req.session.userId) {
		res.send(
			`<li class="sub_menu"><a id="login_logout" href="/login"><i class="fas fa-sign-in-alt"></i>&#160;Login</a></li>
             <li class="sub_menu"><a id="signup" href="/signup"><i class="fas fa-plus"></i>&#160;Register</a></li>`
		)
	}
	else{
		res.send(
			`<li class="sub_menu"><a id="user_home_link" class="text" href="/account"><i class="fas fa-user"></i>&#160;Homepage</a></li>
        	<li class="sub_menu"><a id="login_logout" class="text" href="/logout"><i class="fas fa-sign-out-alt"></i>Logout</a></li>`
		)
	}
});

app.listen(8080);

app.post('/galery.html', function(req, res){
	res.end(JSON.stringify(obj));
})


app.post('/makeAdvert.html', upload.array('photo', 12), function (req, res, next) {
	let preAdv = JSON.parse(fs.readFileSync("JSON/preadverts.json"));
	let photoNames = [];
	req.files.forEach((item) => {photoNames.push(`../media/preAdvPhotos/${item.filename}`)})
	req.body.photos = photoNames;
	req.id = Date.now();
	preAdv.push(req.body);
	fs.writeFileSync('JSON/preadverts.json', JSON.stringify(preAdv), 'utf8');
	// req.files - массив файлов `photos`
	// req.body сохранит текстовые поля, если они будут
});

app.post('/signUp.html', function (req, res) {
	let out = 0;
	users.forEach((item) => {
		if(item.login === req.body.login){
			res.end("Sorry, user with this login already exists");
			out++;
		}
		else if(item.email === req.body.email){
			res.end("Sorry, user with this email already exists");
			out++;
		}
		else if(item.telephone === req.body.telephone){
			res.end("Sorry, user with this telephone already exists");
			out++;
		}
	});
	if(out === 0){
		const newId = Date.now();
		req.body.userId = newId;
		users.push(req.body);
		req.session.userId = newId;
		res.end("so sad(")
		fs.writeFileSync('JSON/users.json', JSON.stringify(users), 'utf8');
	}
});


app.post('/signIn.html', function (req, res) {
	let sign = 0;
	let log = 0;
	users.forEach((item) => {
		if(item.login === req.body.login){
			log++;
			if(item.password === req.body.password){
				sign++;
				// req.session.regenerate(function(err) {
				// 	// will have a new session here
				// })
				req.session.userId = item.userId;
				res.end("we are winners");
			}
		}
	});
	if(!log){
		res.end('Sorry, your entered wrong data')
	}
	else if(!sign){
		res.end('Sorry, your password is wrong')
	}
});

app.post('/add_advert', function(req, res){
	let preAdv = JSON.parse(fs.readFileSync("JSON/preadverts.json"));
	console.log('nonono');
	const num = req.body.num;
	console.log(preAdv);
	let newPhotos = [];
	preAdv[num].photos.forEach((item) => {
		const oldPath = item.substr(3);
		const newPath = item.replace('preAdvPhotos', 'AdvPhotos').substr(3);
		newPhotos.push(item.replace('preAdvPhotos', 'AdvPhotos'));
		// fs.copyFile(oldPath, newPath, (err) => {
		// 	if (err) throw err;
		// 	console.log('source.txt was copied to destination.txt');
		// });
		
		let file = fs.readFileSync(oldPath);
		fs.writeFileSync(newPath, file, 'utf8');
		fs.unlinkSync(oldPath);
	});
	preAdv[num].id = Date.now()
	preAdv[num].photos = newPhotos;
	obj.push(preAdv[num]);
	fs.writeFileSync('JSON/adverts.json', JSON.stringify(obj), 'utf8');
	
	preAdv.splice(req.body.num, 1)
	fs.writeFileSync('JSON/preadverts.json', JSON.stringify(preAdv), 'utf8');
	
});

app.post('remove_advert', function(req, res){
	let preAdv = JSON.parse(fs.readFileSync("JSON/preadverts.json"));
	preAdv.splice(res.body.num, 1)
	fs.writeFileSync('JSON/users.json', JSON.stringify(users), 'utf8');
});
