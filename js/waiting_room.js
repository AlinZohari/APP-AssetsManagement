"use strict";

//function to request and map Earthquake data
let waitingRoomLayer; //global variable

function getWaitingRoomData(){
	let layerURL = document.location.origin + "/app/data/waiting_room.geojson";
	$.ajax({url:layerURL,crossDomain:true,success:function(result){
			console.log(result);//check the data is correct

			//add the JSON layer onto the map
			waitingRoomLayer = L.geoJson(result).addTo(mymap);

			//change the map zoom so that all the data is shown
			mymap.fitBounds(waitingRoomLayer.getBounds());
		}//end of the inner function

	});//end of the ajax request

}//end of getWaitingRoomData function


