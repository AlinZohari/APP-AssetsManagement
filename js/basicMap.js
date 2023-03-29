"use strict";

let mymap; //global variable to store the map

//create a custom popup as a global variable
let popup = L.popup();

//create an event detector to wait for the user's click event and then use the popup to show them where they clicked
//note that you don't need to do any complicated maths to convert screen coordinated to real world coordinates - the Leaflet API does this for you

console.log("function to show the coordinates latlong on click event");
function onMapClick(e){
	/*popup
		.setLatLng(e.latlng)
		.setContent("You clicked the map at " + e.latlng.toString())
		.openOn(mymap);*/
		// return the name of the function
	let re = /([^(]+)@|at ([^(]+) \(/g;
	let aRegexResult = re.exec(new Error().stack);
	let sCallerName = aRegexResult[1] || aRegexResult[2];
	alert("function is onMapClick and menu is called by: "+ sCallerName);

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


// Asset Condition Form
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


function getPopupHTML(){
  let id = "1272"; // this will be the asset ID
  let title = "Condition Asset Form";
  let assetName = " ";
  let installationDate = " ";
  let userID = "123"
  let conditionValue = "1";
  let previousCondition = 3;

  let htmlString = "<div id='popup" + id + "'><h2>" + title + "</h2><br>";
  htmlString += "<label for='assetName'>Asset Name</label><input type='text' size='25' id='assetName' value='" + assetName + "'/><br />";
  htmlString += "<label for='installationDate'>Installation Date</label><input type='text' size='25' id='installationDate' value='" + installationDate + "'/><br />";
  htmlString += "<label for=\"userId\">User Id</label><input type=\"text\" size=\"25\" id=\"userId\"/><br />";
  htmlString += "<p>Condition Value</p>";
  htmlString += "<input type='radio' name='conditionValue' id='1' value='1' />1- As new or in good serviceable condition<br />";
  htmlString += "<input type='radio' name='conditionValue' id='2' value='2'/>2- Deteriorating, evidence of high usage, age, additional maintenance costs and inefficiency<br />";
  htmlString += "<input type='radio' name='conditionValue' id='3' value='3' />3- Requires replacement within 5 years<br />";
  htmlString += "<input type='radio' name='conditionValue' id='4' value='4' />4- In poor condition, overdue for replacement<br />";
  htmlString += "<input type='radio' name='conditionValue' id='5' value='5' />5- Unable to determine condition (e.g. as item is hidden)<br />";
  htmlString += "<input type='radio' name='conditionValue' id='6' value='6' />6- Item does not exist<br />";
  htmlString += "<button onclick='checkCondition(" + id + ");return false;'>Submit Condition</button>";
  // now include a hidden element with the previous condition value
  htmlString += "<div id='previousCondition_" + id + "' hidden>" + previousCondition + "</div>";
  // and a hidden element with the ID of the asset so that we can insert the condition with the correct asset later
  htmlString += "<div id='asset_" + id + "' hidden>" + id + "</div>";
  htmlString += "</div>";

  return htmlString;
}

function checkCondition(){

	let asset_name = document.getElementById("asset_name").value;
	let installation_name = document.getElementById("installation_name").value;
	let user_id = document.getElementById("user_id").value;

	alert(asset_name + " "+ installation_name + " "+user_id);
	
	let postString = "asset_name="+asset_name +"&installation_name="+installation_name+"&user_id="+user_id;
	

// now get the radio button values
	let conditionValue;
	if (document.getElementById("1").checked) {
		conditionValue = 1
 		postString=postString+"&conditionValue=1";
	}
	else if (document.getElementById("2").checked) {
		conditionValue = 2
		postString=postString+"&conditionValue=2";
	}
	else if (document.getElementById("3").checked) {
		conditionValue = 3
 		postString=postString+"&conditionValue=3";
	}
	else if (document.getElementById("4").checked) {
		conditionValue = 4
 		postString=postString+"&conditionValue=4";
	}
	else if (document.getElementById("5").checked) {
		conditionValue = 5
 		postString=postString+"&conditionValue=5";
	}
	else if (document.getElementById("6").checked) {
		conditionValue = 6
 		postString=postString+"&conditionValue=6";
	}
	
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


//Asset Form -large Screen
function onMapClick(e) {
	let formHTML = basicFormHtml();
	popup .setLatLng(e.latlng)
	.setContent("You clicked the map at " + e.latlng.toString()+"<br>"+formHTML)
	.openOn(mymap);
}

function basicFormHtml() {
	let mylet = '<p> Asset Creation Form <p>'+
	'<label for="Assetname">Asset Name</label><input type="text" size="25" id="assetName"/><br />'+
	'<label for="installationDate">Installation Date</label><input type="text" size="25" id="installationDate"/><br />'+
	''+
	''+
	'<hr>'+
	'<label for="latitude">Latitude</label><input type="text" size="25" id="latitude"/><br />'+
	'<label for="longitude">Longitude</label><input type="text" size="25" id="longitude"/><br />'+
	''+
	''+
	'<p>Click here to upload the data</p>'+
	'<button id="startUpload" onclick="startDataUpload()">Start Data Upload</button>'+
	'<br />'+
	'<div id="dataUploadResult">The result of the upload goes here</div>'+
	'<br />'+
	''+
	''+
	'<hr>'+
	'<label for="deleteID">Delete ID</label><input type="text" size="25" id="deleteID"/><br />'+
	'<button id="startDelete" onclick="deleteRecord()">Delete Record</button>'+
	'<div id="dataDeleteResult">The result of the upload goes here</div>';
	
	return mylet;
}

