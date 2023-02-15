"use strict";

let mymap; //global variable to store the map

//create a custom popup as a global variable
let popup = L.popup();

//create an event detector to wait for the user's click event and then use the popup to show them where they clicked
//note that you don't need to do any complicated maths to convert screen coordinated to real world coordinates - the Leaflet API does this for you

console.log("function to show the coordinates latlong on click event");
function onMapClick(e){
	popup
		.setLatLng(e.latlng)
		.setContent("You clicked the map at " + e.latlng.toString())
		.openOn(mymap);

}

console.log("function to initialise and create the basemap. Also call on other functions - onMapClick(), addBasicMarkers()");
function loadLeafletMap(){
mymap = L.map('mapid').setView([51.505,-0.09],13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{
	maxZoom:19,
	attribution:'&copy;<a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(mymap);

//now add the click event detector to the map- call on the function onMapClick
mymap.on('click',onMapClick);

} //end of code lines adding the leaflet map
