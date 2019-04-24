"use strict"


const fs = require('fs');

let obj = JSON.parse(fs.readFileSync("../JSON/adverts.json"))
console.log(obj)


// window.addEventListener("load", (e) => { //showing list of downloaded files
// 	e.preventDefault();
window.onload = () => {alert("hello")
	document.getElementById('cost').innerHTML = `${obj.cost}`;
}
// });