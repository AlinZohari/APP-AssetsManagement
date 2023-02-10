"use strict";

//function to request and map Earthquake data
let airQualitySensorsLayer; //global variable

function getAirQualitySensorsData(){
	let layerURL = document.location.origin + "/app/data/air_quality_sensors.geojson";
	$.ajax({url:layerURL,crossDomain:true,success:function(result){
			console.log(result);//check the data is correct

			//add the JSON layer onto the map
			airQualitySensorsLayer = L.geoJson(result).addTo(mymap);

			//change the map zoom so that all the data is shown
			mymap.fitBounds(airQualitySensorsLayer.getBounds());
		}//end of the inner function

	});//end of the ajax request

}//end of getAirQualitySensorsData function



