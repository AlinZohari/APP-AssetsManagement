"use strict";
//Building, Ethernet cabes, Rooms, Temperature Sensors

let listOfThings = []

//Buildings
let buildingsLayer;

function getBuildingsData(thingname){
	
	for (let i=0;i<listOfThings.length ;i++){
		if (listOfThings[i].thingName == thingname){
			console.log("equal");
			alert("Buildings already loaded");
			return;
		} 
	} 
	let layerURL = document.location.origin +"/api/geojson/ucfscde/buildings/building_id/location/";
	$.ajax({url:layerURL,crossDomain:true,success:function(result){
		console.log(result)


	buildingsLayer = L.geoJSON(result).addTo(mymap);
	buildingsLayer.addData(result);
	mymap.fitBounds(buildingsLayer.getBounds());


	let newThing = result; 
	listOfThings.push(newThing);

	}//end of the inner function
});//end of the ajax request
}//end of the getBuildingsData function

function listAllThings() {
	console.log("*********************************");
	console.log("********Current Things *********");
	for (let i=0;i<listOfThings.length;i++){
		console.log(listOfThings[i].thingName);
	}
	console.log("*********************************");
}

function removeBuildingsData(thingname){
	for (let i=0;i<listOfThings.length ;i++){
		if (listOfThings[i].thingName == thingname){
			try{
				alert("Buildings data will be removed");
			mymap.removeLayer(buildingsLayer);
			}
			catch(err){
				alert("Layer doesn't exist:" + err);
			}
			console.log("remove data");
			listOfThings.splice(i,1);
			break;
		}
	}
}




//Ethernet Cables
let ethernetCablesLayer;
function getEthernetCablesData(){
	/*
	for (i=0;i<listOfThings.length ;i++){
		if (listOfThings[i].thingName == thingname){
			console.log("equal");
			alert("Buildings already loaded");
			return;
		} 
	} */
	let layerURL = document.location.origin +"/api/geojson/ucfscde/ethernet_cables/ethernet_id/location";
	$.ajax({url:layerURL,crossDomain:true,success:function(result){
		console.log(result)

	ethernetCablesLayer = L.geoJSON(result).addTo(mymap);
	ethernetCablesLayer.addData(result);
	mymap.fitBounds(ethernetCablesLayer.getBounds());

	}//end of the inner function
});//end of the ajax request
}//end of the getEthernetCablesData function

function removeEthernetCablesData(){
	try{
		alert("Buildings data will be removed");
		mymap.removeLayer(ethernetCablesLayer);
	}
	catch(err){
		alert("Layer doesn't exist:" + err);
	}
}

//Rooms
let roomsLayer;
function getRoomsData(){
	/*
	for (i=0;i<listOfThings.length ;i++){
		if (listOfThings[i].thingName == thingname){
			console.log("equal");
			alert("Buildings already loaded");
			return;
		} 
	} */
	let layerURL = document.location.origin +"/api/geojson/ucfscde/rooms/room_id/location";
	$.ajax({url:layerURL,crossDomain:true,success:function(result){
		console.log(result)

	roomsLayer = L.geoJSON(result).addTo(mymap);
	roomsLayer.addData(result);
	mymap.fitBounds(roomsLayer.getBounds());

	}//end of the inner function
});//end of the ajax request
}//end of the getBuildingsData function

function removeRoomsData(){
	try{
		alert("Rooms data will be removed");
		mymap.removeLayer(roomsLayer);
	}
	catch(err){
		alert("Layer doesn't exist:" + err);
	}
}

//Temperature Sensors
let sensorsLayer;
function getSensorsData(){
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

	sensorsLayer = L.geoJSON(result).addTo(mymap);
	sensorsLayer.addData(result);
	mymap.fitBounds(sensorsLayer.getBounds());

	}//end of the inner function
});//end of the ajax request
}//end of the getBuildingsData function

function removeSensorsData(){
	try{
		alert("Temperature Sensors data will be removed");
		mymap.removeLayer(sensorsLayer);
	}
	catch(err){
		alert("Layer doesn't exist:" + err);
	}
}


