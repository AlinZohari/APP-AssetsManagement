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
	let layerURL = document.location.origin + "/app/data/showPosition.geojson";
	$.ajax({url:layerURL,crossDomain:true,success:function(result){
			console.log(result);//check the data is correct

			let testMarkerGreen= L.AwesomeMarkers.icon({
				icon:'play',
				markerColor:'green'
			});

			//add the JSON layer onto the map
			showPositionLayer = L.geoJson(result,{
				pointToLayer:function(feature,latlng){
					return L.marker(latlng,{icon:testMarkerGreen}).bindPopup("<b>"+"This is your location: " + position + "<b>");
				}//end of pointToLayer
			}).addTo(mymap);

		}//end of the inner function

	});//end of the ajax request

}//end of showPosition function


