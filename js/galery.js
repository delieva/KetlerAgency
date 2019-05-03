
	// function filter_by_cost(value){
	// 	if(!maxCost || !minCost){
	// 		if(!maxCost && !minCost){
	// 			return true;
	// 		}
	// 		else if(!maxCost){
	// 			return value.cost >= minCost;
	// 		}
	// 		else{
	// 			return value.cost <= maxCost;
	// 		}
	// 	}
	// 	else{
	// 		return value.cost >= minCost && value.cost <= maxCost;
	// 	}
	// }
	//
	
	
	//filters for custom choose
	function filter_by_district(value){
		return value.district === document.getElementById('filter_district').value;
	}
	
	function filter_by_city(value){
		return value.city === document.getElementById('filter_city').value;
	}
	
	export function filter(someData, city, district) {
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
	