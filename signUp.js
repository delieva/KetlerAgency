//let formData = new FormData();
const form  = document.getElementsByTagName('form')[0];
const email = document.getElementById('email');
const error = document.getElementById('error');
const pass = document.getElementById('pass');
const checkpass = document.getElementById('checkpass');
const telephone = document.getElementById('telephone');
const fname = document.getElementById('firstname');
const sname = document.getElementById('secondname');
const login = document.getElementById('login');




email.addEventListener("input", function (event) {
	error.innerHTML = ""; // Сбросить содержимое сообщения
	error.className = "error"; // Сбросить визуальное состояние сообщения
	// Каждый раз, когда пользователь вводит что-либо, мы проверяем,
	// является ли корректным поле электронной почты.
	if (email.validity.valid) {
		// В случае появления сообщения об ошибке, если поле
		// является корректным, мы удаляем сообщение об ошибке.
		error.innerHTML = ""; // Сбросить содержимое сообщения
		error.className = "error"; // Сбросить визуальное состояние сообщения
	}
}, false);

const regexp = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8})$/

form.addEventListener("submit", function (event) {
	// Каждый раз, когда пользователь пытается отправить данные, мы проверяем
	// валидность поля электронной почты.
	//let test = email.value.length === 0 || emailRegExp.test(email.value);
	alert('sjflsfjlskjf')
	// console.log(pass.value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)
	if (!email.validity.valid) {
		
		// Если поле невалидно, отображается пользовательское
		// сообщение об ошибке.
		error.innerHTML = "I expect an e-mail, darling!";
		error.className = "error active";
		// И мы предотвращаем отправку формы путем отмены события
		event.preventDefault();
	}
	// else if (!pass.value.length || !regexp.test(pass.value)){
	// 	error.innerHTML = "Invalid password!";
	// 	error.className = "error active";
	// 	// И мы предотвращаем отправку формы путем отмены события
	// 	event.preventDefault();
	// }
	else if (pass.value !== checkpass.value){
		error.innerHTML = "Confirming password is not the same password!";
		error.className = "error active";
		// И мы предотвращаем отправку формы путем отмены события
		event.preventDefault();
	}
	else if(!pass.value || !checkpass.value || !login.value || !email.value || !telephone.value || !fname.value || !sname.value){
		error.innerHTML = "All * fields are required!";
		error.className = "error active";
		// И мы предотвращаем отправку формы путем отмены события
		event.preventDefault();
	}
	else{
		axios.post('/signUp.html', formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})
			.catch(function (err) {
				console.log(err);
			});
	}
}, false);