"use strict";

/**
 * THIS IS THE MAIN FILE TO MAKE THE FUNCTIONS IN BOOTSTRAP WORK
 * The function include:
 * 
 * Basic functionality for the bootStrap.html:
 * - loadLeafMap()
 * - setMapClickEvent() : getting the window size
 * 
 * Functions to make Asset Creation Form works (In Order):
 * 1) onMapClick() : getting the latlng from user's click on map
 * 2) basicFormHtml(latlng) : asset creation form
 * 3) checkText() : as an accesory and quality check to make sure users dont put blank when completing the asset form creating :typing parts
 * 4) saveNewAsset() : saving new asset by putting it to postString and relay to dataUploaded
 * 5) dataUploaded() : (endpoints: /insertAssetPoint)
 * 
 * Functions to make Condition Assesment Form works (In Order):
 * 1) setUpPointClick() : setting up Form Pop-Up to Collect Condition Reports of the user (endpoints: userAssets/:user_id)
 * 2) getPopupHTML(feature) : condition assesment form, also will trigger checkCondition() function
 * 3) checkCondition() : giving alert when the condition assement submitted has changed or not been changed
 * 4) saveCondition() : (endpoint: /insertConditionInformation)
 * 5) countSubmission() :Uploading to the server AND alerting the num_reports the user had submitted so far (endpoint: /userConditionReports)
 * 
 */

//global variable
let mymap;
let width; //from week8 oractical4 part3- Step2: Modifying the Leaflet Map Behaviour
let mapPoint; //store the geoJSON feature so that we can remove it if the screen is resized
let popup = L.popup();

let assetLayer;
let conditionLayer;

//mapPoint in previously are change to:
let phone;
let desktop;


//--------------------------------------------------------------------------------------------------------------
/**
 * Basic Functionality for the bootStrap.html
 *  loadLeafMap()
 *  setMapClickEvent()
 */

// loadLeafMap() -------------------------------------------
console.log("function to initialise and create the basemap.")
function loadLeafletMap(){
	if (mymap) {
		mymap.remove();
  	}

	//initialize a new map
	mymap = L.map('mapid').setView([51.505,-0.09],13);
	L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{
		maxZoom:19,
		attribution:'&copy;<a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
		
	}).addTo(mymap);

	//now add the click event detector to the map
	mymap.on('click',setMapClickEvent());

} //end of loadLeafMap() function

// setMapClickEvent() -----------------------------------------
/**
 * this function will includes:
 * - what form would pop up depending on the screen size, 
 * - marker from setUpPointClick function need to appear in small screen 
 * - refreshing the page in interval to make sure all the points appear
 * - making the table close and the graph close
*/
function setMapClickEvent() {
	// get the window width
	width = $(window).width();
	
	//Reference: https://getbootstrap.com/docs/4.0/layout/grid/
	// when the screen is small
	if (width < 992) { 

		if(phone == 1){
			return false;
		}
		   
		else { 
			mymap.off('click', onMapClick);
			if (assetLayer){
				 mymap.removeLayer(assetLayer);// removing assets layer as soon as the window is resized to large
	
			}

		    //When the screen is large on desktop this functions is called
			setUpPointClick(); //condition assessment
			trackLocation();
			
			closeGraph();
			closeTable();

		   phone = 1;
		   desktop = 0;
	
			}
		}
	
		 
	//else of the (width < 922)		
	else {
		if(desktop == 1 ){
			return false;
		}
			
		else{
		if  (conditionLayer){
			mymap.removeLayer(conditionLayer);}//removing condition layer soon as the window is resized to small
			mymap.on('click', onMapClick);//asset creation form

			//When the screen is small on phone this functions is called - closed
				if  (closestAssetsLayer){
			mymap.removeLayer(closestAssetsLayer);}
			if  (lastFiveReportsLayer){
			mymap.removeLayer(lastFiveReportsLayer);}
			if  ( notRatedLayer ){
			mymap.removeLayer(notRatedLayer);}  

				phone = 0;
				desktop = 1;
	
	
			}
		}
}//end of setMapClickEvent() function
	 


//--------------------------------------------------------------------------------------------------------------
/**
 * Functions to make Asset Creation Form works (In Order):
 * 1) onMapClick() : getting the latlng from user's click on map
 * 2) basicFormHtml(latlng) : asset creation form
 * 3) checkText() : as an accesory and quality check to make sure users dont put blank when completing the asset form creating :typing parts
 * 4) saveNewAsset() : saving new asset by putting it to postString and relay to dataUploaded
 * 5) dataUploaded() : (endpoints: /insertAssetPoint)
 */

// onMapClick() -------------------------------------------
function onMapClick(e) {
	let formHTML = basicFormHtml();
	popup 
	.setLatLng(e.latlng)
	.setContent("You clicked the map at " + e.latlng.toString()+"<br>"+formHTML)
	.openOn(mymap);
}

// basicFormHtml() -------------------------------------------
function basicFormHtml() {

	//getting the user latlng when they click on map
	let latitude = latlng.lat;
	let longitude = latlng.lng;

	let mylet = '<p> Asset Creation Form <p>'+
	''+
	''+
	'<label for="Assetname">Asset Name</label><input type="text" size="25" id="assetName"/><br />'+
	'<label for="installationDate">Installation Date</label><input type="text" size="25" id="installationDate"/><br />'+
	''+
	''+
	'<hr>'+
	'<label for="latitude">Latitude</label><input type="text" size="25" id="latitude"/><br />'+
	'<label for="longitude">Longitude</label><input type="text" size="25" id="longitude"/><br />'+
	''+
	''+
	'<button id="saveAsset" onclick="checkText()">Save Asset</button>'
	
	return mylet;
}

// checkText() -------------------------------------------
function checkText(){
    let asset_name = document.getElementById("assetName").value;
    let installation_date = document.getElementById("installationDate").value;

    if 
        (asset_name == "" || asset_name == null){
        alert("Asset Name field cannot be blank");
        return false;
    }
    else if 
        (installation_date == "" || installation_date == null){
        alert("Installation Date field cannot be blank");
        return false;
    }
    else{
        saveNewAsset();
        return true;

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





