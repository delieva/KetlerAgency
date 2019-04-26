
const form  = document.getElementsByTagName('form')[0];
const email = document.getElementById('email');
const error = document.getElementById('error');
const pass = document.getElementById('pass');
const checkpass = document.getElementById('checkpass');
const telephone = document.getElementById('telephone');
const fname = document.getElementById('firstname');
const sname = document.getElementById('secondname');
const login = document.getElementById('login');


form.addEventListener("submit", function (event) {
	//validation of the input information from user
	event.preventDefault();
	console.log(email.value)
	console.log(email.validity.valid)
	
	if (!email.validity.valid) {
		error.innerHTML = "Ivalid email!";
		error.className = "error active";
		event.preventDefault();
	}
	else if (!pass.value.match(/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/)){
		error.innerHTML = "Invalid password!";
		error.className = "error active";
		event.preventDefault();
	}
	else if (pass.value !== checkpass.value){
		error.innerHTML = "Confirming password is not the same password!";
		error.className = "error active";
		event.preventDefault();
	}
	//in case the standart check is not working
	else if(!pass.value || !checkpass.value || !login.value || !email.value || !telephone.value || !fname.value || !sname.value){
		error.innerHTML = "All * fields are required!";
		error.className = "error active";
		event.preventDefault();
	}
	else{
		event.preventDefault();
		
		let bodyFormData = {};
		bodyFormData.firstname  = fname.value;
		bodyFormData.secondname = sname.value;
		bodyFormData.email      = email.value;
		bodyFormData.password   = pass.value;
		bodyFormData.login      = login.value;
		bodyFormData.telephone = telephone.value;
		console.log(bodyFormData);
		axios({
			method: 'post',
			url: '/signUp.html',
			data: bodyFormData,
			config: { headers: {'Content-Type': 'multipart/form-data' }}
		})
		
		.then(function (response) {
			console.log(response)
			if(response.data.startsWith('Sorry')){
				document.getElementById('error').innerHTML = response.data;
			}
			else{
				console.log('we are winners')
			}
			console.log(response);
			
		})
		.catch(function (error) {
			console.log(error);
		});
	}
}, false);