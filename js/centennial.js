"use strict";
//Building, Ethernet cabes, Rooms, Temperature Sensors


//Buildings
let listOfBuildings = []
let buildingsLayer;
function getBuildingsData(buildingsname){
	
/*	for (let i=0;i<listOfBuildings.length ;i++){
		if (listOfBuildings[i].buildingsName == buildingsname){
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


	let buildingsNewThing = result; 
	listOfBuildings.push(buildingsNewThing);

	}//end of the inner function
});//end of the ajax request */

	// return the name of the function
	let re = /([^(]+)@|at ([^(]+) \(/g;
	let aRegexResult = re.exec(new Error().stack); let sCallerName = aRegexResult[1] || aRegexResult[2];
	alert("function is getBuildingsData and menu is called by: "+ sCallerName);

}//end of the getBuildingsData function

function listAllThings() {
	console.log("*********************************");
	console.log("********Current Things *********");
	for (let i=0;i<listOfBuildings.length;i++){
		console.log(listOfBuildings[i].buildingsName);
	}
	console.log("*********************************");
}

function removeBuildingsData(buildingsname){
/*	for (let i=0;i<listOfBuildings.length ;i++){
		if (listOfBuildings[i].buildingsName == buildingsname){
			try{
				alert("Buildings data will be removed");
			mymap.removeLayer(buildingsLayer);
			}
			catch(err){
				alert("Layer doesn't exist:" + err);
			}
			console.log("remove data");
			listOfBuildings.splice(i,1);
			break;
		}
	}*/

	// return the name of the function
	let re = /([^(]+)@|at ([^(]+) \(/g;
	let aRegexResult = re.exec(new Error().stack); let sCallerName = aRegexResult[1] || aRegexResult[2];
	alert("function is removeBuildingsData and menu is called by: "+ sCallerName);
}


//Ethernet Cables
let listOfCables = []
let ethernetCablesLayer;
function getEthernetCablesData(cablesname){
	
/*	for (let i=0;i<listOfCables.length ;i++){
		if (listOfCables[i].cablesName == cablesname){
			console.log("equal");
			alert("Ethernet Cables already loaded");
			return;
		} 
	} 
	let layerURL = document.location.origin +"/api/geojson/ucfscde/ethernet_cables/ethernet_id/location";
	$.ajax({url:layerURL,crossDomain:true,success:function(result){
		console.log(result)


	ethernetCablesLayer = L.geoJSON(result).addTo(mymap);
	ethernetCablesLayer.addData(result);
	mymap.fitBounds(ethernetCablesLayer.getBounds());

	let cablesNewThing = result; 
	listOfCables.push(cablesNewThing);

	}//end of the inner function
});//end of the ajax request */

		
	// return the name of the function
	let re = /([^(]+)@|at ([^(]+) \(/g;
	let aRegexResult = re.exec(new Error().stack); let sCallerName = aRegexResult[1] || aRegexResult[2];
	alert("function is getEthernetCablesData and menu is called by: "+ sCallerName);


}//end of the getBuildingsData function

function listAllThings() {
	console.log("*********************************");
	console.log("********Current Things *********");
	for (let i=0;i<listOfCables.length;i++){
		console.log(listOfCables[i].cablesName);
	}
	console.log("*********************************");
}

function removeEthernetCablesData(cablesname){
/*	for (let i=0;i<listOfCables.length ;i++){
		if (listOfCables[i].cablesName == cablesname){
			try{
				alert("Ethernet Cables data will be removed");
			mymap.removeLayer(ethernetCablesLayer);
			}
			catch(err){
				alert("Layer doesn't exist:" + err);
			}
			console.log("remove data");
			listOfCables.splice(i,1);
			break;
		}
	}*/

	// return the name of the function
	let re = /([^(]+)@|at ([^(]+) \(/g;
	let aRegexResult = re.exec(new Error().stack); let sCallerName = aRegexResult[1] || aRegexResult[2];
	alert("function is removeEthernetCablesData and menu is called by: "+ sCallerName);
}


//Rooms
let listOfRooms = []
let roomsLayer;
function getRoomsData(roomname){
/*	for (let i=0;i<listOfRooms.length ;i++){
		if (listOfRooms[i].roomName == roomname){
			console.log("equal");
			alert("Rooms already loaded");
			return;
		} 
	} 
	let layerURL = document.location.origin +"/api/geojson/ucfscde/rooms/room_id/location";
	$.ajax({url:layerURL,crossDomain:true,success:function(result){
		console.log(result)


	roomsLayer = L.geoJSON(result).addTo(mymap);
	roomsLayer.addData(result);
	mymap.fitBounds(roomsLayer.getBounds());

	let roomsNewThing = result; 
	listOfRooms.push(roomsNewThing);

	}//end of the inner function
});//end of the ajax request
*/
	// return the name of the function
	let re = /([^(]+)@|at ([^(]+) \(/g;
	let aRegexResult = re.exec(new Error().stack); let sCallerName = aRegexResult[1] || aRegexResult[2];
	alert("function is getRoomsData and menu is called by: "+ sCallerName);

}//end of the getBuildingsData function

function listAllThings() {
	console.log("*********************************");
	console.log("********Current Things *********");
	for (let i=0;i<listOfRooms.length;i++){
		console.log(listOfRooms[i].roomName);
	}
	console.log("*********************************");
}

function removeRoomsData(roomsname){
/*	for (let i=0;i<listOfRooms.length ;i++){
		if (listOfRooms[i].roomsName == roomsname){
			try{
				alert("Rooms data will be removed");
			mymap.removeLayer(roomsLayer);
			}
			catch(err){
				alert("Layer doesn't exist:" + err);
			}
			console.log("remove data");
			listOfRooms.splice(i,1);
			break;
		}
	}*/
	// return the name of the function
	let re = /([^(]+)@|at ([^(]+) \(/g;
	let aRegexResult = re.exec(new Error().stack); let sCallerName = aRegexResult[1] || aRegexResult[2];
	alert("function is removeRoomsData and menu is called by: "+ sCallerName);
}


//Temperature Sensors
let listOfSensors = []
let sensorsLayer;
function getSensorsData(sensorsname){
/*		for (let i=0;i<listOfSensors.length ;i++){
		if (listOfSensors[i].sensorsName == sensorsname){
			console.log("equal");
			alert("Temperature Sensors already loaded");
			return;
		} 
	} 
	let layerURL = document.location.origin +"/api/geojson/ucfscde/temperature_sensors/sensor_id/location";
	$.ajax({url:layerURL,crossDomain:true,success:function(result){
		console.log(result)


	sensorsLayer = L.geoJSON(result).addTo(mymap);
	sensorsLayer.addData(result);
	mymap.fitBounds(sensorsLayer.getBounds());


	let sensorsNewThing = result; 
	listOfSensors.push(sensorsNewThing);

	}//end of the inner function
});//end of the ajax request */

	// return the name of the function
	let re = /([^(]+)@|at ([^(]+) \(/g;
	let aRegexResult = re.exec(new Error().stack); let sCallerName = aRegexResult[1] || aRegexResult[2];
	alert("function is getSensorsData and menu is called by: "+ sCallerName);

}//end of the getBuildingsData function

function listAllThings() {
	console.log("*********************************");
	console.log("********Current Things *********");
	for (let i=0;i<listOfSensors.length;i++){
		console.log(listOfSensors[i].sensorsName);
	}
	console.log("*********************************");
}

function removeSensorsData(sensorsname){
/*	for (let i=0;i<listOfSensors.length ;i++){
		if (listOfSensors[i].sensorsName == sensorsname){
			try{
				alert("Temperature Sensors data will be removed");
			mymap.removeLayer(sensorsLayer);
			}
			catch(err){
				alert("Layer doesn't exist:" + err);
			}
			console.log("remove data");
			listOfSensors.splice(i,1);
			break;
		}
	}*/
	// return the name of the function
	let re = /([^(]+)@|at ([^(]+) \(/g;
	let aRegexResult = re.exec(new Error().stack); let sCallerName = aRegexResult[1] || aRegexResult[2];
	alert("function is removeSensorsData and menu is called by: "+ sCallerName);
}
