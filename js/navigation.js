document.getElementsByClassName('logo')[0].onclick = function () {
	window.location.href = '/'
};

window.addEventListener("load", function() {
	axios.post("/loadUser", {})
		.then(function(res){
			if(res){
				document.getElementsByClassName('menu')[0].innerHTML += res.data.html
			}
		})
		.catch(function (err) {
			console.log(err);
		});
})

document.getElementsByClassName('button_search')[0].onclick = function () {
	// axios.post("/search", {
	// 	search_word: document.getElementsByClassName('input_search')[0]
	// })
	// 	.then(function(res){
	// 		if(res){
				window.location.href = `http://localhost:8080/gallery?${document.getElementsByClassName('input_search')[0].value}`
		// 	}
		// })
		// .catch(function (err) {
		// 	console.log(err);
		// });
}