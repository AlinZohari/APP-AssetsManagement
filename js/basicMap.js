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

//now call the code to add the markers
addBasicMarkers();
} //end of code lines adding the leaflet map

console.log("function to create markers in the map");
function addBasicMarkers(){

//adding a custom marker
let testMarkerPink = L.AwesomeMarkers.icon({
	icon:'play',
	markerColor:'pink'
});

//add a circle
	L.circle([51.508,0.11],5000,{
		color:'green',
		fillColor:'#f03',
		fillOpacity:0.8
	}).addTo(mymap).bindPopup("I am a circle.");
console.log("added a circle");

//add a polygon
let myPolygon = L.polygon([
	[51.709,-0.10],
	[51.703,0.07],
	[51.22,0.07],
	[51.22,-0.057]
	],{
	color:'orange',
	fillColor:'#f03',
	fillOpacity:0.5
}).addTo(mymap).bindPopup("I am a polygon in 2022.");
console.log("added a polygon");

//creating a geoJSON feature
let geojsonFeature = {
	"type":"Feature",
	"properties":{
		"name":"London",
		"popupContent":"This is where UCL is based. We have on campus and off campus activity"
	},
	"geometry":{
		"type":"Point",
		"coordinates":[-0.133583,51.524776]
	} 
};

//adding geoJSON feature to the map
L.geoJSON(geojsonFeature,{
	pointToLayer:function(feature,latlng){
		return L.marker(latlng,{icon:testMarkerPink});
	}
}).addTo(mymap).bindPopup("<b>"+geojsonFeature.properties.name+" "+geojsonFeature.properties.popupContent+"<b>");
console.log("added a UCL pinpoint (custom pink) with bold text");

} //end of code lines adding the basic marker
console.log("base map, circle and polygon had been created");
