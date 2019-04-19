(function(){
	let config = {
			max_results: 25,
			max_per_page: 6,
			page: 1
		},
		no_of_pages = Math.ceil( config.max_results / config.max_per_page ) + 1,
		results = [];
	
	async function request(i, start) {
		try {
			// let images = [];
			const json = await axios.post('/galery.html', {
			})
				.then(function (response) {
						//
						let parNode  = document.getElementsByClassName('card_container')[0];
						let currNode = document.createElement('div');
						currNode.className= "card";
						parNode.appendChild(currNode);
						//
						parNode = document.getElementsByClassName('card')[i]
						currNode = document.createElement('div');
						currNode.className= "card_photo";
						// currNode.setAttribute('background-image', response.data[i + start].photos[0])
						
							axios.get(response.data[i].photos[0], {})
								.then((response) => {
									console.log(encodeURI(response.data));
									document.getElementsByClassName('card_photo')[i].style.backgroundImage = `url( + ${encodeURI(response.data)} + )`;
								});
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
						currNode.innerHTML = response.data[i + start].cost;
						parNode.appendChild(currNode);
						//
						parNode = document.getElementsByClassName('card_description')[i]
						currNode = document.createElement('div');
						currNode.className= "short_description text";
						currNode.innerHTML = response.data[i + start].city + ', ' + response.data[i + start].district + ' district, ' + response.data[i + start].address + ', ' + response.data[i + start].rooms + ' rooms, ' + response.data[i + start].square + ' m2';
						parNode.appendChild(currNode);
						//
						parNode = document.getElementsByClassName('card_description')[i]
						currNode = document.createElement('div');
						currNode.className= "card_telephone text";
						currNode.innerHTML = response.data[i + start].telephone;
						parNode.appendChild(currNode);
						// for( let j = 0; j < json.data[i].photos.length; j++){
						
				})
				.catch(function (error) {
					console.log(error);
				});
			
			
		} catch (e) {
			console.log(e)
		}
	}
	
	function init(){
		console.log('hello')
		for( var x = 0; x < config.max_results; x++ ){
			results[x] = "Result " + x;
		}
		document.getElementsByClassName("next")[0].onclick = function() {
			pager("next");
			return false;
		};
		document.getElementsByClassName("next")[1].onclick = function() {
			pager("next");
			return false;
		};
		document.getElementsByClassName("previous")[0].onclick = function() {
			pager("previous");
			return false;
		};
		document.getElementsByClassName("previous")[1].onclick = function() {
			pager("previous");
			return false;
		};
		document.getElementsByClassName("page_nav")[0].onclick = function(e) {
			let page = e.target.getAttribute("data-page");
			if(page){
				pager("goto", page);
			}
			return false;
		};
		document.getElementsByClassName("page_nav")[1].onclick = function(e) {
			let page = e.target.getAttribute("data-page");
			if(page){
				pager("goto", page);
			}
			return false;
		};
		update_page();
	}
	
	
	function pager(action, page) {
		switch (action) {
			case "next":
				if( (config.page + 1) < no_of_pages ){
					++config.page;
				}
				break;
			
			case "previous":
				if( (config.page - 1) >= 1 ){
					--config.page;
				}
				break;
			
			case "goto":
				config.page = page;
				break;
			
			default:
				break;
		}
		update_page();
	}
	function build_nav() {
		var i,
			page_nav = "";
		
		for( i = 1; i < no_of_pages; i++ ){
			page_nav += "<li class='pagination_page'><a data-page=" + i + ">" + i + "</a></li>\n";
		}
		return page_nav;
	}
	function build_results(){
		document.getElementsByClassName('pagination_page')[config.page-1].style.backgroundColor = "#4e8984"
		document.getElementsByClassName('pagination_page')[config.page-1 + no_of_pages - 1].style.backgroundColor = "#4e8984"
		document.getElementsByClassName('card_container')[0].innerHTML = '';
		// var i,
			let start = ( config.page !== 1 )? (config.page - 1) * config.max_per_page : 0;
			let end;
			if(config.max_results - start < config.max_per_page){
				end = config.max_results;
			}
			else {
					end = config.max_per_page + start;
			}
		// 	result;
		//
		console.log(start + " " + end)
		for(let i = 0; i < end - start; i++){
			request(i, start);
		}
		// axios.post('/galery.html', {
		// })
		// 	.then(function (response) {
		//
		// 		for(let i = 0; i < end - start; i++){
		// 			// console.log(i);
		// 			let parNode  = document.getElementsByClassName('card_container')[0];
		// 			let currNode = document.createElement('div');
		// 			currNode.className= "card";
		// 			parNode.appendChild(currNode);
		// 			//
		// 			parNode = document.getElementsByClassName('card')[i]
		// 			currNode = document.createElement('div');
		// 			currNode.className= "card_photo";
		// 			currNode.setAttribute('background-image', response.data[i + start].photos[0])
		// 			parNode.appendChild(currNode);
		// 			//
		// 			currNode = document.createElement('div');
		// 			currNode.className= "card_description";
		// 			parNode.appendChild(currNode);
		// 			//
		// 			parNode = document.getElementsByClassName('card_photo')[i]
		// 			currNode = document.createElement('div');
		// 			currNode.className= "card_photo_cover";
		// 			parNode.appendChild(currNode);
		// 			//
		// 			parNode = document.getElementsByClassName('card_photo_cover')[i]
		// 			currNode = document.createElement('span');
		// 			currNode.className= "cost";
		// 			currNode.innerHTML = response.data[i + start].cost;
		// 			parNode.appendChild(currNode);
		// 			//
		// 			parNode = document.getElementsByClassName('card_description')[i]
		// 			currNode = document.createElement('div');
		// 			currNode.className= "short_description text";
		// 			currNode.innerHTML = response.data[i + start].city + ', ' + response.data[i + start].district + ' district, ' + response.data[i + start].address + ', ' + response.data[i + start].rooms + ' rooms, ' + response.data[i + start].square + ' m2';
		// 			parNode.appendChild(currNode);
		// 			//
		// 			parNode = document.getElementsByClassName('card_description')[i]
		// 			currNode = document.createElement('div');
		// 			currNode.className= "card_telephone text";
		// 			currNode.innerHTML = response.data[i + start].telephone;
		// 			parNode.appendChild(currNode);
		// 			console.log(response);
		// 		}
		// 	})
		// 	.catch(function (error) {
		// 		console.log(error);
		// 	});
	}
	function update_page(){
		document.getElementsByClassName("page_nav")[0].innerHTML = build_nav();
		document.getElementsByClassName("page_nav")[1].innerHTML = build_nav();
		build_results()
	}
	window.addEventListener("load", function() {
		init();
	});
})();