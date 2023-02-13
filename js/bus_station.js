"use strict";

//function to request and map Earthquake data
let busStationLayer; //global variable

function getBusStationData(){
	let layerURL = document.location.origin + "/app/data/bus_station.geojson";
	$.ajax({url:layerURL,crossDomain:true,success:function(result){
			console.log(result);//check the data is correct

			//add the JSON layer onto the map
			busStationLayer = L.geoJson(result).addTo(mymap);

			//change the map zoom so that all the data is shown
			mymap.fitBounds(busStationLayer.getBounds());
		}//end of the inner function

	});//end of the ajax request

}//end of getBusStationData function

