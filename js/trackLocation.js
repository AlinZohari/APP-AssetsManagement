"use strict";

function trackLocation(){
	if(navigator.geolocation){
		navigator.geolocation.watchPosition(showPosition);
	}
	else{
		document.getElementById('showLocation').innerHTML = "Geolocation is not supported by this browser.";
	}
}


function showPosition(position){
	document.getElementById('showLocation').innerHTML =
	"Latitude: " + position.coords.latitude +
	"<br>Longitude: " + position.coords.longitude;

	showPositionData(position);
}


//function to request and map showPosition data
let showPositionLayer; //global variable

function showPositionData(position){

			let testMarkerGreen= L.AwesomeMarkers.icon({
				icon:'play',
				markerColor:'green'
			});

			// Create a GeoJSON point for the new location
			let newPoint = {
				"type": "Feature",
				"geometry": {
					"type": "Point",
					"coordinates": [position.coords.longitude, position.coords.latitude]
				},
				"properties": {
					"name": "New Location"
				}
			};
			
			//add the JSON layer onto the map
			showPositionLayer = L.geoJson(newPoint,{
				pointToLayer:function(feature,latlng){
					return L.marker(latlng,{icon:testMarkerGreen})
					.bindPopup("<b>"+"This is your location" + "<br>Latitude: " + position.coords.latitude +
					"<br>Longitude: " + position.coords.longitude + "<b>");
				}//end of pointToLayer
			}).addTo(mymap);

			// Add the new point to the GeoJSON layer
			showPositionLayer.addData(newPoint);

}//end of showPosition function


