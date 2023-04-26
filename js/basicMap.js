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
 * 4) processCondition() : (endpoint: /insertConditionInformation) ---adapted from processData() from previously
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
 * 4) processAsset() : processing the new insert asset, putting it to postString and relay to dataUploaded
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
	'<label for="Assetname">Asset Name</label><input type="text" size="25" id="asset_name"/><br />'+
	'<label for="installationDate">Installation Date</label><input type="text" size="25" id="installation_date"/><br />'+
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
    let asset_name = document.getElementById("asset_name").value;
    let installation_date = document.getElementById("installation_date").value;

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

// processAsset() -------------------------------------------
// processing the data inserted by user and  giving them to dataUploaded() function to be upload to the server
function processAsset() {

	let asset_name = document.getElementById("asset_name").value;
	let installation_date = document.getElementById("installation_date").value;
	let latitude = document.getElementById("latitude").innerHTML;
	let longitude = document.getElementById("longitude").innerHTML;
	
	var postString = "asset_name="+asset_name +"&installation_date="+installation_date+"&latitude="+latitude +"&longitude="+longitude +"&user_id="+user_id;

	dataUploaded(postString);
}

// dataUploaded() -------------------------------------------
function dataUploaded(postString) {
	alert(postString);

	let serviceUrl=  document.location.origin + "/api/inserAssetPoint";

   $.ajax({
	url: serviceUrl,
    crossDomain: true,
    type: "POST",
    data: postString,

    success: function(data){
		console.log(data);
	alert("New Asset Submitted \n" +JSON.stringify(data));
	console.log("New Asset Submitted")

	//removing the asset creation form when form is submitted
	mymap.removeLayer(popup);
	if (mymap.hasLayer(assetLayer)){
		mymap.removeLayer(assetLayer);}
	},
	
	//when error from the database - meaning the asset name is not unique
	//Reference: https://stackoverflow.com/questions/1637019/how-to-get-the-jquery-ajax-error-response-text
	error : function(){
        alert("Unique Error. This asset name already exists. Try using different name");
    }

	}); //end of ajax request query

} //end of dataUploaded() function




//--------------------------------------------------------------------------------------------------------------
/**
 * Functions to make Condition Assesment Form works (In Order):
 * 1) setUpPointClick() : setting up Form Pop-Up to Collect Condition Reports of the user (endpoints: userAssets/:user_id)
 * 2) getPopupHTML(feature) : condition assesment form, also will trigger checkCondition() function
 * 3) checkCondition() : giving alert when the condition assement submitted has changed or not been changed
 * 4) processCondition() : (endpoint: /insertConditionInformation) ---adapted from processData() from previously
 * 5) countSubmission() :Uploading to the server AND alerting the num_reports the user had submitted so far (endpoint: /userConditionReports)
 */

// setUpPointClick() -------------------------------------------
//Setting Up the Form Pop-Up to Collect Condition Reports
function setUpPointClick() {

	let serviceUrl=  document.location.origin + "/api/userAssets/" + user_id;

	// by an AJAX call to load the asset points on the map
	$.ajax({
		url: serviceUrl,
		crossDomain: true,
		success: function(result){
		console.log(result); //checking the data
	
		var testMarkerDarkGreen = L.AwesomeMarkers.icon({icon: 'play', markerColor: 'darkgreen'});
		var testMarkerGreen = L.AwesomeMarkers.icon({icon: 'play', markerColor: 'green'});
		var testMarkerYellow = L.AwesomeMarkers.icon({icon: 'play', markerColor: 'yellow'});
		var testMarkerOrange = L.AwesomeMarkers.icon({icon: 'play', markerColor: 'orange'});
		var testMarkerRed = L.AwesomeMarkers.icon({icon: 'play', markerColor: 'red'});
		var testMarkerWhite = L.AwesomeMarkers.icon({icon: 'play', markerColor: 'white'});

		json = result[0];
		console.log(json);

		//adding condition form as pop up by clickong on point to all the assets created by a specific user.
		conditionLayer = L.geoJson(json, {
			pointToLayer: function(feature, latlng) {

				if (feature.properties.condition_description == "Element is in very good condition")
					{var popUpHTML = getPopupHTML(feature); 
					return L.marker(latlng, {icon:testMarkerDarkGreen}).bindPopup(popUpHTML);}

				else if (feature.properties.condition_description == "Some aesthetic defects, needs minor repair")
					{var popUpHTML = getPopupHTML(feature); 
					return L.marker(latlng, {icon:testMarkerGreen}).bindPopup(popUpHTML);}

				else if (feature.properties.condition_description == "Functional degradation of some parts, needs maintenance")
					{var popUpHTML = getPopupHTML(feature); 
					return L.marker(latlng, {icon:testMarkerYellow}).bindPopup(popUpHTML);}

				else if (feature.properties.condition_description == "Not working and maintenance must be done as soon as reasonably possible")
					{var popUpHTML = getPopupHTML(feature); 
					return L.marker(latlng, {icon:testMarkerOrange}).bindPopup(popUpHTML);}

				else if (feature.properties.condition_description == "Not working and needs immediate, urgent maintenance")
					{var popUpHTML = getPopupHTML(feature); 
					return L.marker(latlng, {icon:testMarkerRed}).bindPopup(popUpHTML);}

				else //Unknown
					{var popUpHTML = getPopupHTML(feature); 
					return L.marker(latlng, {icon:testMarkerWhite}).bindPopup(popUpHTML);}

				}, //pointToLayer

			
		}).addTo(mymap);
		conditionLayer.addData(json);

		//changing the map zoom
		mymap.fitBounds(conditionLayer.getBounds());

		} //success function in the ajax request
	});// end os ajax request
};//end of setUpPointClick() function


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







