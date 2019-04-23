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
	
	
	function filter_by_district(value){
		return value.district === document.getElementsByClassName('filter_district')[0].value;
	}
	
	function filter_by_city(value){
		return value.city === document.getElementsByClassName('filter_city')[0].value;
	}
	
	function filter(someData, city, district) {
		console.log(city);
		if(city){
			let sdata = someData.filter(filter_by_city);
			if(district){
				sdata = sdata.filter(filter_by_district);
				return sdata
			}
			return sdata;
		}
		else if(!city && district){
			alert('Please, choose the city before choosing district')
			return someData;
		}
		else{
			return someData;
		}
	}
	
	let config = {
			max_results: 1,
			max_per_page: 6,
			page: 1
		},
		nOfPages = Math.ceil( config.max_results / config.max_per_page );


	function changeConfigs(someData){
		config = {
				max_results: someData.length,
				max_per_page: 6,
				page: 1
			},
			nOfPages = Math.ceil( config.max_results / config.max_per_page );
	}


	//Function for initialisation the number of the page and pages controller
	function init(someData){
		document.getElementsByClassName("page_nav")[0].innerHTML = build_nav(someData);
		document.getElementsByClassName("page_nav")[1].innerHTML = build_nav(someData);
		
		document.getElementsByClassName("next")[0].onclick = function() {
			pager("next", someData);
			return false;
		};
		document.getElementsByClassName("next")[1].onclick = function() {
			pager("next", someData);
			return false;
		};
		document.getElementsByClassName("previous")[0].onclick = function() {
			pager("previous", someData);
			return false;
		};
		document.getElementsByClassName("previous")[1].onclick = function() {
			pager("previous", someData);
			return false;
		};
		document.getElementsByClassName("page_nav")[0].onclick = function(e) {
			let page = e.target.getAttribute("data-page");
			if(page){
				pager("goto", someData, page);
			}
			return false;
		};
		document.getElementsByClassName("page_nav")[1].onclick = function(e) {
			let page = e.target.getAttribute("data-page");
			if(page){
				pager("goto", someData, page);
			}
			return false;
		};
		
		update_page(someData);
	}

	//Work with next/prev/goto
	function pager(action, someData, page) {
		document.getElementsByClassName('pagination_page')[config.page-1].style.backgroundColor = "#ffffff";
		document.getElementsByClassName('pagination_page')[config.page-1 + nOfPages].style.backgroundColor = "#ffffff";
		switch (action) {
			case "next":
				if( (config.page + 1) < nOfPages){
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
		update_page(someData);
	}

	//renew the page
	function update_page(someData){
		build_results(someData);
		document.getElementsByClassName('pagination_page')[config.page-1].style.backgroundColor = "#81aaa7";
		document.getElementsByClassName('pagination_page')[config.page-1 + nOfPages].style.backgroundColor = "#81aaa7"
	}

	//Building navigation bar
	function build_nav() {
		let page_nav = "";
		for(let i = 1; i <= nOfPages; i++ ){
			page_nav += "<li class='pagination_page'><a data-page=" + i + ">" + i + "</a></li>\n";
		}
		return page_nav;
	}

	function build_results(someData) {
		document.getElementsByClassName('card_container')[0].innerHTML = '';
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
			currNode.style.backgroundImage = `url(${someData[i + start].photos[0]})`;
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
			currNode.innerHTML = someData[i + start].cost;
			parNode.appendChild(currNode);
			//
			parNode = document.getElementsByClassName('card_description')[i]
			currNode = document.createElement('div');
			currNode.className= "short_description text";
			currNode.innerHTML = someData[i + start].city + ', ' + someData[i + start].district + ' district, ' + someData[i + start].address + ', ' + someData[i + start].rooms + ' rooms, ' + someData[i + start].square + ' m2';
			parNode.appendChild(currNode);
			//
			parNode = document.getElementsByClassName('card_description')[i]
			currNode = document.createElement('div');
			currNode.className= "card_telephone text";
			currNode.innerHTML = someData[i + start].telephone;
			parNode.appendChild(currNode);
		}
	}
	
	//window.addEventListener("load", function() {
		axios.post("./galery.html", {})
			.then(function(res){
				let set = new Set();
				res.data.forEach((obj) => {
					set.add(obj.city)
				})
				for(let item of set){
					let parNode  = document.getElementsByClassName('filter_city')[0];
					let currNode = document.createElement('option');
					currNode.innerText = item;
					currNode.className= "filter_city_option";
					parNode.appendChild(currNode);
				}
				changeConfigs(res.data);
				init(res.data);
			})
			.catch(function (err) {
				console.log(err);
			});
	//});
	
	
	document.getElementsByClassName('filter_city')[0].onchange = function(){
		axios.post("./galery.html", {})
			.then(function(res){
				let set = new Set();
				res.data = res.data.filter(filter_by_city)
				console.log(res.data)
				res.data.forEach((obj) => {
					set.add(obj.district)
				})
				document.getElementsByClassName('filter_district')[0].innerHTML = '<option></option>';
				for(let item of set){
					let parNode  = document.getElementsByClassName('filter_district')[0];
					let currNode = document.createElement('option');
					currNode.innerText = item;
					currNode.className= "filter_district_option";
					parNode.appendChild(currNode);
				}
			})
			.catch(function (err) {
				console.log(err);
			});
	};
	
	document.getElementsByClassName("filter_button")[0].onclick = function(){
		axios.post("./galery.html", {})
			.then(function(res){
				let filteredData = filter(res.data, document.getElementsByClassName('filter_city')[0].value, document.getElementsByClassName('filter_district')[0].value);
				changeConfigs(filteredData);
				init(filteredData);
			})
			.catch(function (err) {
				console.log(err);
			});
	}
})();