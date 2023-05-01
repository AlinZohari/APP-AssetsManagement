"use strict"

/**
 * This file will contain function as follows:
 * - trackLocation()
 * - errorPosition()
 * - showPositionData()
 * - removePositionData()
 * - removeTracks()
 * - userAssets()
 * 
 */

//global variable------------------------

let trackLocationLayer = []; // create an array to store all the location tracking points
let geoLocationID;// store the ID of the location tracker so that it can be used to switch the location tracking off
let user_id; 


function trackLocation(){

	if(navigator.geolocation){
		geoLocationID = navigator.geolocation.watchPosition(showPositionData, errorPosition, options);
		}
		else {
		document.getElementById('showLocation').innerHTML = "Geolocation is not supported by this browser.";
	}
}


function showPositionData(position) {
	// add the new point into the array
	// the 'push' command

	document.getElementById('latitude').innerHTML = position.coords.latitude; 
	document.getElementById('longitude').innerHTML = position.coords.longitude;
	console.log(document.getElementById('latitude').innerHTML);

	trackLocationLayer.push(L.marker([position.coords.latitude,position.coords.longitude]).addTo(mymap));
	console.log("getting latlng");

}


function removePositionPoints() {
	// disable the location tracking so that a new point won't be added while you are removing the old points
	// use the geoLocationID to do this
	navigator.geolocation.clearWatch(geoLocationID);
	removeTracks();
}


function removeTracks() {
	// now loop through the array and remove any points
	// note that we start with the last point first as if you remove point 1 then point 2 becomes point 1 so
	// a loop doesn't work
	// also we use -1 as arrays in javascript start counting at 0
	for (let i=trackLocationLayer.length-1; i > -1;i--) {
		console.log("removing point " +i + " which has coordinates " + trackLocationLayer[i].getLatLng());
		mymap.removeLayer(trackLocationLayer[i]);
	}

}

// userId (endpoint: userId) --------------------------------------------------------------
function userId(){

	let serviceUrl = document.location.origin + "/api/userId";

	$.ajax({
		url: serviceUrl,
		async: false,
		crossDomain: true,
		success: function(result){
			user_id = result.user_id;
			console.log(user_id);
		}
     });
};

// for A2 (Advanced Functionality 1) ----------------------------------------------------------------------
// condition form pop up automaticlly proximity alert) when the user is close to ONE OF THEIR OWN asset points
// adapted from the getDistance.js exercise in practical class of CEGE0043

//code adapted from https://www.htmlgoodies.com/beyond/javascript/calculate-the-distance-between-two-points-in-your-web-apps.html
function calculateDistance(lat1, lon1, lat2, lon2,unit){
	
	//first convert all the degree values into radians
	//1 radian is the angle created in a circle when the arc is equal length to the radius
	let radlat1 = Math.PI * lat1/180;
	let radlat2 = Math.PI * lat2/180;
	let radlon1 = Math.PI * lon1/180;
	let radlon2 = Math.PI * lon2/180;

	//find the difference in longitude and convert to radians
	let theta = lon1-lon2;
	let radtheta = Math.PI * theta/180;

	//then calculate the distance
	let subAngle = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
	subAngle = Math.acos(subAngle);
	subAngle = subAngle * 180/Math.PI; // convert the degree value returned by acos back to degrees from radians
	let dist = (subAngle/360) * 2 * Math.PI * 3956; // ((subtended angle in degrees)/360) * 2 * pi * radius)
	if (unit=="K") { dist = dist * 1.609344 ;} // convert miles to km
	if (unit=="N") { dist = dist * 0.8684 ;} // convert miles to nautical miles
	return dist;

}