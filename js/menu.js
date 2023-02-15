"use strict"


function showAlert(id){

	let re = /([^(]+)@|at ([^(]+) \(/g;
	let aRegexResult = re.exec(new Error().stack);
	let sCallerName = aRegexResult[1] || aRegexResult[2];

	document.getElementById(id).onclick = function(){
	alert("Menu number is " + id +" and it is called by: " +sCallerName);
	}
}





//This is one by one wthout making a function
/*
document.getElementById("menu3").onclick = function() {
  alert("Hi! This is AlinZohari own message when click menu 3");
};

document.getElementById("menu4").onclick = function() {
  alert("Hi! This is AlinZohari own message when click menu 4");
};

document.getElementById("menu6").onclick = function() {
  alert("Hi! This is AlinZohari own message when click menu 6");
};

document.getElementById("menu7").onclick = function() {
  alert("Hi! This is AlinZohari own message when click menu 7");
};

document.getElementById("menu9").onclick = function() {
  alert("Hi! This is AlinZohari own message when click menu 9");
};

document.getElementById("menu10").onclick = function() {
  alert("Hi! This is AlinZohari own message when click menu 10");
};
*/