axios.post("/loadUser", {})
	.then(function(res){
		if(res){
			document.getElementsByClassName('menu')[0].innerHTML += res.data.html
			document.getElementsByClassName('burger_menu')[0].innerHTML += res.data.burger
		}
	})
	.catch(function (err) {
		console.log(err);
	});
const shareUrl = 'ketleragency.com';
function popup(url) {
	window.open(url,'','toolbar=0,status=0,width=626,height=436');
}

window.addEventListener("load", function() {
	document.getElementsByClassName('logo')[0].onclick = function () {
		window.location.href = '/'
	};
	
	document.getElementsByClassName('button_search')[0].onclick = function () {
		window.location.href = `http://localhost:8080/gallery?${document.getElementsByClassName('input_search')[0].value}`
	}
	document.getElementsByClassName('burger_button_search')[0].onclick = function () {
		window.location.href = `http://localhost:8080/gallery?${document.getElementsByClassName('input_search')[0].value}`
	}
	// axios.post("/loadUser", {})
	// 	.then(function(res){
	// 		if(res){
	// 			document.getElementsByClassName('menu')[0].innerHTML += res.data.html
	// 			// document.getElementsByClassName('burger_menu')[0].innerHTML += res.data.burger
	// 		}
	// 	})
	// 	.catch(function (err) {
	// 		console.log(err);
	// 	});
	let counter1 = 0;
	let counter2 = 0;
	document.getElementsByClassName(`burger_submenu_block`)[1].onclick = function () {
		if(counter1){
			for(let j = 0; j < document.getElementsByClassName('burger_submenu_one').length; j++){
				document.getElementsByClassName('burger_submenu_one')[j].style.display = 'none'
			}
			counter1 = 0;
		}
		else{
			for(let j = 0; j < document.getElementsByClassName('burger_submenu_one').length; j++){
				document.getElementsByClassName('burger_submenu_one')[j].style.display = 'block'
			}
			counter1 = 1;
		}
	}
	
	document.getElementsByClassName(`burger_submenu_block`)[3].onclick = function () {
		if(counter2){
			for(let j = 0; j < document.getElementsByClassName('burger_submenu_two').length; j++){
				document.getElementsByClassName('burger_submenu_two')[j].style.display = 'none'
			}
			counter2 = 0;
		}
		else{
			for(let j = 0; j < document.getElementsByClassName('burger_submenu_two').length; j++){
				document.getElementsByClassName('burger_submenu_two')[j].style.display = 'block'
			}
			counter2 = 1;
		}
	}
})
let counter1 = 0;

//document.getElementById('burger_submenu_one').innerText = 'fuuuuck'
document.getElementsByClassName('burger_submenu_one')[0].onclick = function () {
	console.log('fuuuuck')
	if(counter1){
		for(let j = 0; j < document.getElementsByClassName('burger_submenu_one').length; j++){
			document.getElementsByClassName('burger_submenu_one')[j].style.display = 'none'
		}
		counter1 = 0;
	}
	else{
		for(let j = 0; j < document.getElementsByClassName('burger_submenu_one').length; j++){
			document.getElementsByClassName('burger_submenu_one')[j].style.display = 'block'
		}
		counter1 = 1;
	}
}

// for(let i = 0; i < document.getElementsByClassName(`burger_submenu_block`).length; i++){
// 	document.getElementsByClassName(`burger_submenu_block`)[0].onclick = function () {
// 		for(let j = 0; j < document.getElementsByClassName('burger_submenu').length; j++){
// 			document.getElementsByClassName('burger_submenu')[j].style.display = 'block'
// 		}
// 	}
// }


