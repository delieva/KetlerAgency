(function(){
	let place = 'city', meaning = 'Kyiv', maxCost, minCost;
	
	
	function filter_by_cost(value){
		if(!maxCost || !minCost){
			if(!maxCost && !minCost){
				return true;
			}
			else if(!maxCost){
				return value.cost >= minCost;
			}
			else{
				return value.cost <= maxCost;
			}
		}
		else{
			return value.cost >= minCost && value.cost <= maxCost;
		}
	}
	
	
	function filter_by_place(value){
		if(place === '' && meaning === ''){
			return true;
		}
		else{
			for(let key in value){
				if(key === place){
					return value[key] === meaning;
				}
			}
		}
	}
	
	
	
	//configuration data for pagination
	// let config = {
	// 		max_results: 1,
	// 		max_per_page: 1,
	// 		page: 1
	// 	},
	// 	no_of_pages = 1;
	//
	//
	//Function for initialisation the number of the page
	// function init(){
	// 	document.getElementsByClassName("next")[0].onclick = function() {
	// 		pager("next");
	// 		return false;
	// 	};
	// 	document.getElementsByClassName("next")[1].onclick = function() {
	// 		pager("next");
	// 		return false;
	// 	};
	// 	document.getElementsByClassName("previous")[0].onclick = function() {
	// 		pager("previous");
	// 		return false;
	// 	};
	// 	document.getElementsByClassName("previous")[1].onclick = function() {
	// 		pager("previous");
	// 		return false;
	// 	};
	// 	document.getElementsByClassName("page_nav")[0].onclick = function(e) {
	// 		let page = e.target.getAttribute("data-page");
	// 		if(page){
	// 			pager("goto", page);
	// 		}
	// 		return false;
	// 	};
	// 	document.getElementsByClassName("page_nav")[1].onclick = function(e) {
	// 		let page = e.target.getAttribute("data-page");
	// 		if(page){
	// 			pager("goto", page);
	// 		}
	// 		return false;
	// 	};
	// 	update_page();
	// }
	
	// //Work with next/prev
	// function pager(action, page) {
	// 	switch (action) {
	// 		case "next":
	// 			if( (config.page + 1) < no_of_pages ){
	// 				++config.page;
	// 			}
	// 			break;
	//
	// 		case "previous":
	// 			if( (config.page - 1) >= 1 ){
	// 				--config.page;
	// 			}
	// 			break;
	//
	// 		case "goto":
	// 			config.page = page;
	// 			break;
	//
	// 		default:
	// 			break;
	// 	}
	// 	update_page();
	// }
	
	// //Building navigation bar
	// function build_nav() {
	// 	let page_nav = "";
	// 	console.log(no_of_pages)
	// 	for(let i = 1; i <= no_of_pages; i++ ){
	// 		page_nav += "<li class='pagination_page'><a data-page=" + i + ">" + i + "</a></li>\n";
	// 	}
	// 	return page_nav;
	// }
	
	//Rebuilding inner page
	function build_results(){
		document.getElementsByClassName('card_container')[0].innerHTML = '';
		
		axios.post('/galery.html', {
		})
			.then(function (response) {
				
				let data = response.data.filter(filter_by_cost);
				data = data.filter(filter_by_place);
				
				config = {
						max_results: data.length,
						max_per_page: 6,
						page: 1
					}
				no_of_pages = Math.ceil( config.max_results / config.max_per_page ) + 1
				let start = ( config.page !== 1 )? (config.page - 1) * config.max_per_page : 0;
				let end;
				if(config.max_results - start < config.max_per_page){
					end = config.max_results;
				}
				else {
					end = config.max_per_page + start;
				}
				
				
				for(let i = 0; i < end - start; i++){
					//
					let parNode  = document.getElementsByClassName('card_container')[0];
					let currNode = document.createElement('div');
					currNode.className= "card";
					parNode.appendChild(currNode);
					//
					parNode = document.getElementsByClassName('card')[i]
					currNode = document.createElement('div');
					currNode.className= "card_photo";
					currNode.style.backgroundImage = `url(${data[i + start].photos[0]})`;
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
					currNode.innerHTML = data[i + start].cost;
					parNode.appendChild(currNode);
					//
					parNode = document.getElementsByClassName('card_description')[i]
					currNode = document.createElement('div');
					currNode.className= "short_description text";
					currNode.innerHTML = data[i + start].city + ', ' + response.data[i + start].district + ' district, ' + response.data[i + start].address + ', ' + response.data[i + start].rooms + ' rooms, ' + response.data[i + start].square + ' m2';
					parNode.appendChild(currNode);
					//
					parNode = document.getElementsByClassName('card_description')[i]
					currNode = document.createElement('div');
					currNode.className= "card_telephone text";
					currNode.innerHTML = data[i + start].telephone;
					parNode.appendChild(currNode);
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}
	
	//renew the page
	// async function update_page(){
	// 	document.getElementsByClassName("page_nav")[0].innerHTML = build_nav();
	// 	document.getElementsByClassName("page_nav")[1].innerHTML = build_nav();
	// 	await build_results();
	// 	// document.getElementsByClassName('pagination_page')[config.page-1].style.backgroundColor = "#81aaa7";
	// 	// document.getElementsByClassName('pagination_page')[config.page-1 + no_of_pages - 1].style.backgroundColor = "#81aaa7"
	// }
	
	window.addEventListener("load", function() {
		init();
	});
	
	document.getElementsByClassName("filter_button")[0].onclick = function(){
		init()
	}
})();