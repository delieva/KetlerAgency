// window.addEventListener('load', async function(){
	axios.post('/get_preadverts', {})
		.then( function(res){
			if(res.data){
				for(let i = 0; i < res.data.length; i++){
					//
					let parNode  = document.getElementsByClassName('account_preadverts_wrapper')[0];
					let currNode = document.createElement('div');
					currNode.className= "card_block";
					parNode.appendChild(currNode);
					//
					parNode  = document.getElementsByClassName('card_block')[i];
					currNode = document.createElement('div');
					currNode.className= "card";
					parNode.appendChild(currNode);
					//
					parNode  = document.getElementsByClassName('card_block')[i];
					currNode = document.createElement('div');
					currNode.className= "button_add button";
					currNode.setAttribute('id', 'button')
					currNode.innerText = 'add';
					parNode.appendChild(currNode);
					//
					parNode  = document.getElementsByClassName('card_block')[i];
					currNode = document.createElement('div');
					currNode.className= "button_remove_adv button";
					currNode.innerText = 'remove';
					parNode.appendChild(currNode);
					
					
					
					//
					parNode = document.getElementsByClassName('card')[i]
					currNode = document.createElement('div');
					currNode.className= "card_photo";
					currNode.style.backgroundImage = `url(${res.data[i].photos[0]})`;
					parNode.appendChild(currNode);
					//
					currNode = document.createElement('div');
					currNode.className= "card_description";
					parNode.appendChild(currNode);
					//
					parNode = document.getElementsByClassName('card_photo')[i]
					currNode = document.createElement('div');
					currNode.className= "card_photo_cover";
					parNode.appendChild(currNode);
					//
					parNode = document.getElementsByClassName('card_photo_cover')[i]
					currNode = document.createElement('span');
					currNode.className= "cost";
					currNode.innerHTML = res.data[i].cost + '$';
					parNode.appendChild(currNode);
					//
					parNode = document.getElementsByClassName('card_description')[i]
					currNode = document.createElement('div');
					currNode.className= "short_description text";
					currNode.innerHTML = res.data[i].city + ', ' + res.data[i].district + ' district, ' + res.data[i].address + ', ' + res.data[i].rooms + ' rooms, ' + res.data[i].square + ' m2';
					parNode.appendChild(currNode);
					//
					parNode = document.getElementsByClassName('card_description')[i]
					currNode = document.createElement('div');
					currNode.className= "card_id";
					currNode.innerHTML = `ID: ${res.data[i].id}`;
					parNode.appendChild(currNode);
				}
			}
			
		})
		.catch(function(err){
			console.log(err);
		});
	axios.post('/get_wantreviews', {})
		.then( function(res){
			if(res.data){
				const start = document.getElementsByClassName('card').length;
				for(let i = start; i < res.data.length + start; i++){
					//
					let parNode  = document.getElementsByClassName('account_reviews_wrapper')[0];
					let currNode = document.createElement('div');
					currNode.className= "card_block";
					parNode.appendChild(currNode);
					//
					parNode  = document.getElementsByClassName('card_block')[i];
					currNode = document.createElement('div');
					currNode.className= "card";
					parNode.appendChild(currNode);
					//
					parNode  = document.getElementsByClassName('card_block')[i];
					currNode = document.createElement('div');
					currNode.className= "button_remove_review button";
					currNode.innerText = 'remove';
					parNode.appendChild(currNode);
					//
					parNode  = document.getElementsByClassName('card_block')[i];
					currNode = document.createElement('div');
					currNode.className= "who_want button";
					currNode.innerText = `Who want: ${res.data[i-start].wantReview}`;
					parNode.appendChild(currNode);
					
					
					//
					parNode = document.getElementsByClassName('card')[i]
					currNode = document.createElement('div');
					currNode.className= "card_photo";
					currNode.style.backgroundImage = `url(${res.data[i - start].photos[0]})`;
					parNode.appendChild(currNode);
					//
					currNode = document.createElement('div');
					currNode.className= "card_description";
					parNode.appendChild(currNode);
					//
					parNode = document.getElementsByClassName('card_photo')[i]
					currNode = document.createElement('div');
					currNode.className= "card_photo_cover";
					parNode.appendChild(currNode);
					//
					parNode = document.getElementsByClassName('card_photo_cover')[i]
					currNode = document.createElement('span');
					currNode.className= "cost";
					currNode.innerHTML = res.data[i - start].cost + '$';
					parNode.appendChild(currNode);
					//
					parNode = document.getElementsByClassName('card_description')[i]
					currNode = document.createElement('div');
					currNode.className= "short_description text";
					currNode.innerHTML = res.data[i - start].city + ', ' + res.data[i - start].district + ' district, ' + res.data[i - start].address + ', ' + res.data[i - start].rooms + ' rooms, ' + res.data[i - start].square + ' m2';
					parNode.appendChild(currNode);
					//
					parNode = document.getElementsByClassName('card_description')[i]
					currNode = document.createElement('div');
					currNode.className= "card_id";
					currNode.innerHTML = `ID: ${res.data[i - start].id}`;
					parNode.appendChild(currNode);
				}
			}
			
		})
		.catch(function(err){
			console.log(err);
		});
	
	
	// for(let i = 0; i < document.getElementsByClassName('button_add').length; i++){
	// 	console.log(i)
	// 	document.getElementsByClassName('button_add')[0].onclick = function(){
	// 		console.log('wroooong	')
	// 		axios.post('/add_advert', {
	// 			num: 'e'
	// 		})
	// 			.then(function(res){
	// 				alert('yes')
	// 			})
	// 			.catch(function(err){
	// 				console.log(err);
	// 			});
	// 	};
	// }
	// for(let i = 0; i < document.getElementsByClassName('button_add').length; i++){
	// 	window.getElementsByClassName('button_add')[0].onclick = function(){
	// 		console.log('wroooong	');
	// 		axios.post('/add_advert', {
	// 			num: 0
	// 		})
	// 			.then(function(res){
	// 				alert('yes')
	// 			})
	// 			.catch(function(err){
	// 				console.log(err);
	// 			});
	// 	};
	// }
// });

window.addEventListener('load', function(){
	for(let i = 0; i < document.getElementsByClassName('button_add').length; i++){
		document.getElementsByClassName('button_add')[i].onclick = function(){
			axios.post('/add_advert', {
				num: i
			})
				.then(function(res){
					let parentElem = document.getElementsByClassName('account_preadverts_wrapper')[0]
					let elem = document.getElementsByClassName('card_block')[i]
					parentElem.removeChild(elem)
					window.location.reload()
				})
				.catch(function(err){
					console.log(err);
				});
		};
	}
	
	for(let i = 0; i < document.getElementsByClassName('button_remove_adv').length; i++){
		document.getElementsByClassName('button_remove_adv')[i].onclick = function(){
			axios.post('/remove_advert', {
				num: i
			})
				.then(function(res){
					let parentElem = document.getElementsByClassName('account_preadverts_wrapper')[0]
					let elem = document.getElementsByClassName('card_block')[i]
					parentElem.removeChild(elem)
					window.location.reload()
				})
				.catch(function(err){
					console.log(err);
				});
		};
	}
	
	for(let i = 0; i < document.getElementsByClassName('button_remove_review').length; i++){
		document.getElementsByClassName('button_remove_review')[i].onclick = function(){
			axios.post('/remove_review', {
				num: i
			})
				.then(function(res){
					let parentElem = document.getElementsByClassName('account_reviews_wrapper')[0]
					let elem = document.getElementsByClassName('card_block')[i]
					parentElem.removeChild(elem)
					window.location.reload()
				})
				.catch(function(err){
					console.log(err);
				});
		};
	}
	const cards = document.getElementsByClassName('card').length;
	for(let i = 0; i < cards; i++){
		if(document.getElementsByClassName('card_id')[i].innerHTML !== 'ID: undefined'){
			document.getElementsByClassName('card')[i].onclick = function(){
				let start = document.getElementsByClassName('card_id')[i].innerHTML.lastIndexOf('%')
				let id = document.getElementsByClassName('card_id')[i].innerHTML.substr(start)
				window.location.href = `http://localhost:8080/advert?advertId=${id}`
			}
		}
	}
});


