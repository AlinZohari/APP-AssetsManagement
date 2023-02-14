"use strict"

//let menuLayer; //global variable

function showAlert(id){

	document.getElementById(id).onclick = function(){
	alert("Hi! This is AlinZohari own message when click on " + id);
	}
}
