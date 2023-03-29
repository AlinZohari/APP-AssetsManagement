"use strict";

let mymap; //global variable to store the map

//create a custom popup as a global variable
let popup = L.popup();

//create an event detector to wait for the user's click event and then use the popup to show them where they clicked
//note that you don't need to do any complicated maths to convert screen coordinated to real world coordinates - the Leaflet API does this for you

console.log("function to show the coordinates latlong on click event");
function onMapClick(e){
	popup
		.setLatLng(e.latlng)
		.setContent("You clicked the map at " + e.latlng.toString())
		.openOn(mymap);

} 

console.log("function to initialise and create the basemap.")
function loadLeafletMap(){
	  if (mymap) {
    // If a map already exists, remove it from the DOM
    mymap.remove();
  }

  //initialize a new map
mymap = L.map('mapid').setView([51.505,-0.09],13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{
	maxZoom:19,
	attribution:'&copy;<a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(mymap);

//now add the click event detector to the map- call on the function onMapClick
mymap.on('click',setMapClickEvent());

} //end of code lines adding the leaflet map



//from week8 oractical4 part3- Step2: Modifying the Leaflet Map Behaviour
let width;
//let popup; 
let mapPoint; // store the geoJSON feature so that we can remove it if the screen is resized

function setMapClickEvent() {
// get the window width
width = $(window).width();

// we use the bootstrap Medium and Large options for the asset location capture
	if (width < 992) {
//the condition capture –
//anything smaller than 992px is defined as 'medium' by bootstrap
// remove the map point if it exists
		if (mapPoint){
			mymap.removeLayer(mapPoint);
		}
		// cancel the map onclick event using off ..
		mymap.off('click',onMapClick)
		// set up a point with click functionality
		// so that anyone clicking will add asset condition information
		setUpPointClick();
	}
	else { // the asset creation page
		// remove the map point if it exists
		if (mapPoint){
			mymap.removeLayer(mapPoint);
		}
	// the on click functionality of the MAP should pop up a blank asset creation form
	mymap.on('click', onMapClick);
	}
}


//Step3 - Setting Up the Form Pop-Up to Collect Condition Reports
function setUpPointClick() {
// create a geoJSON feature (in your assignment code this will be replaced
// by an AJAX call to load the asset points on the map
	let geojsonFeature = {
		"type": "Feature",
		"properties": {
			"name": "London",
			"popupContent": "This is where UCL is based"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [-0.13263, 51.522449]
		}
	};

// the on click functionality of the POINT should pop up partially populated condition form so that the user can select the condition they require
	let popUpHTML = getPopupHTML;
	console.log(popUpHTML);

// and add it to the map and zoom to that location
// use the mapPoint variable so that we can remove this point layer on
	mapPoint= L.geoJSON(geojsonFeature).addTo(mymap).bindPopup(popUpHTML);
	mymap.setView([51.522449,-0.13263], 12)


}


//CONDITION FORM- WINDOW SMALL
function getPopupHTML(id){
// (in the final assignment, all the required values for the asset pop-up will be
//derived from feature.properties.xxx – see the Earthquakes code for how this is done)


let title = "Asset Form";
let assetName = " ";
let installationDate=" ";
let userID = "1272"

let previousCondition = 3;

let htmlString = "<div id='popup'>" + "<h3>"+title+ "</h3><br>";
htmlString = htmlString + "<h2><label for='assetName'>Asset name</label><input type='text' size='5'/></h2><br>";
htmlString = htmlString + "<h2><label for='installationDate'>Installation Date</label><input type='text' size='5'/></h2><hr><br>";
htmlString = htmlString + "<h2><label for='latitude'>Latitude</label><input type='text' size='3' id='latitude'/></h2><br>";
htmlString = htmlString + "<h2><label for='longitude'>Longitude</label><input type='text' size='3' id='longitude'/></h2><br>";
htmlString = htmlString + "<h3>"+"User ID:" + userID+ "</h3><br>";
htmlString = htmlString + "<p>Click here to upload the data</p>";
htmlString = htmlString + "<button onclick='checkCondition(" + id + ");return false;'>Start Data Upload</button>";
htmlString = htmlString + "<p>The result of the upload goes here</p>";

// now include a hidden element with the previous condition value
htmlString = htmlString + "<div id=previousCondition_" + id + " hidden>"+previousCondition+"</div>";
// and a hidden element with the ID of the asset so that we can insert the condition with the correct asset later
htmlString = htmlString + "<div id='asset_" + id + "' hidden>"+id+"</div>";
htmlString = htmlString + "</div>";
return htmlString;
}


function checkCondition(){

//for the hidden field
	//1)hold previous condition value(for comparison)
	let previousConditionValue = document.getElementById("previousConditionValue").value;
	if (conditionValue == previousConditionValue) {
	    alert('The current condition is the same as previous condition');
	} else {
	    alert('The current condition is different than previous condition');
	}

//update previous condition value
	document.getElementById("previousConditionValue").value = conditionValue;


//for the hidden field
	//2)hold ID of the asset
	let assetID = document.getElementById("assetID").value;
	alert(assetID);
	postString = postString+ "&assetID="+assetID;

	processData(postString);

}

//upload
function processData(postString) {
	alert(postString);

	let serviceUrl=  document.location.origin + "/api/testCRUD";
   $.ajax({
    url: serviceUrl,
    crossDomain: true,
    type: "POST",
    data: postString,
    success: function(data){console.log(data); dataUploaded(data);}
	}); 

}

// create the code to process the response from the data server
function dataUploaded(data) {
    // change the DIV to show the response
    document.getElementById("conditionResult").innerHTML = JSON.stringify(data);
}

