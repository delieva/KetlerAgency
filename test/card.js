let arr = [{i:2},{j:3}]

let user = arr.find(function(itm){
	if(itm.i === 2){
		return itm;
	}
});
console.log(user);