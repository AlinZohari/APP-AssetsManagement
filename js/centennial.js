"use strict";

let buildingsLayer;
//let ethernet cables;
//let rooms;
//let temperatureSensors; //global varible

function getBuildingsData(){
	/*
	for (i=0;i<listOfThings.length ;i++){
		if (listOfThings[i].thingName == thingname){
			console.log("equal");
			alert("Buildings already loaded");
			return;
		} 
	} */
	
	let layerURL = document.location.origin +"/api/geojson/ucfscde/temperature_sensors/sensor_id/location";
	$.ajax({url:layerURL,crossDomain:true,success:function(result){
		console.log(result)

		
	buildingsLayer = L.geoJSON(result).addTo(mymap);
	buildingsLayer.addData(result);

	//change the map zoom so that allthe data is shown
	mymap.fitBounds(ethernetLayer.getBounds());

	}//end of the inner function
});//end of the ajax request
}//end of the getBuildingsData function



function removeBuildingsDATA(){
	try{
		alert("Buildings data will be removed");
		mymap.removeLayer(earthquakeLayer);
	}
	catch(err){
		alert("Layer doesn't exist:" + err);
	}
}
