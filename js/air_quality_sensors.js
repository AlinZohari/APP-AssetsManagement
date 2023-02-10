"use strict";

//function to request and map Earthquake data
let airQualitySensorsLayer; //global variable

function getAirQualitySensorsData(){
	let layerURL = document.location.origin + "/app/data/air_quality_sensors.geojson";
	$.ajax({url:layerURL,crossDomain:true,success:function(result){
			console.log(result);//check the data is correct

			let testMarkerBlack = L.AwesomeMarkers.icon({
				icon:'play',
				markerColor:'black'
			});

			//add the JSON layer onto the map
			airQualitySensorsLayer = L.geoJson(result,{
				pointToLayer:function(feature,latlng){
					return L.marker(latlng,{icon:testMarkerBlack})
				}//end of pointToLayer
			}).addTo(mymap);

		}//end of the inner function

	});//end of the ajax request

}//end of getAirQualitySensorsData function



