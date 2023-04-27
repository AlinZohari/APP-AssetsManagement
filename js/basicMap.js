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
 * 1) setUpPointClick() : setting up Form Pop-Up to Collect Condition Reports of the user (endpoints: /userId)
 * 2) getPopupHTML(feature) : condition assesment form, also will trigger checkCondition() function
 * 3) checkCondition() : giving alert when the condition assement submitted has changed or not been changed
 * 4) processCondition() : (endpoint: /insertConditionInformation) ---adapted from processData() from previously
 * 5) countSubmission() :Uploading to the server AND alerting the num_reports the user had submitted so far (endpoint: /userConditionReports)
 * 
 * 
 * endpoints list that will be use:
 * - /userId : setPointClick()
 * A0 - /conditionDetails : 
 * A1 - /insertAssetPoint : dataUploaded() -uploading asset creation to the server
 * A1 - /insertConditionInformation : processCondition()
 * A2 - /userAssets/:user_id : 
 * A3 - /userConditionReports/:user_id ; countSubmission()
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

// loadLeafletMap() -------------------------------------------
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
	mymap.on('click',setMapClickEvent);

} //end of loadLeafletMap() function

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
	//button
	'<button id="saveAsset" onclick="checkText()">Submit Asset</button>'
	
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

	let serviceUrl=  document.location.origin + "/api/insertAssetPoint";

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
 * 1) setUpPointClick() : setting up Form Pop-Up to Collect Condition Reports of the user (endpoints: userId)
 * 2) getPopupHTML(feature) : condition assesment form
 * 3) checkCondition() : giving alert when the condition assement submitted has changed or not been changed
 * 4) processCondition() : (endpoint: /insertConditionInformation) ---adapted from processData() from previously
 * 5) countSubmission() :Uploading to the server AND alerting the num_reports the user had submitted so far (endpoint: /userConditionReports)
 */

// setUpPointClick() -------------------------------------------
//Setting Up the Form Pop-Up to Collect Condition Reports
function setUpPointClick() {

	let serviceUrl=  document.location.origin + "/api/userAssets/"+ user_id;

	// by an AJAX call to load the asset points on the map
	$.ajax({
		url: serviceUrl,
		crossDomain: true,
		async: false, //need to use this async. same as in userId function
		success: function(result){
		console.log(result); //checking the data
	
		var testMarkerDarkGreen = L.AwesomeMarkers.icon({icon: 'play', markerColor: 'darkgreen'});
		var testMarkerGreen = L.AwesomeMarkers.icon({icon: 'play', markerColor: 'green'});
		var testMarkerDarkRed = L.AwesomeMarkers.icon({icon: 'play', markerColor: 'darkred'});
		var testMarkerOrange = L.AwesomeMarkers.icon({icon: 'play', markerColor: 'orange'});
		var testMarkerRed = L.AwesomeMarkers.icon({icon: 'play', markerColor: 'red'});
		var testMarkerWhite = L.AwesomeMarkers.icon({icon: 'play', markerColor: 'white'});

		let json = result[0]; 
		console.log(json);

		//adding condition form as pop up by clicking on point to all the assets created by a specific user.
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
					return L.marker(latlng, {icon:testMarkerDarkRed}).bindPopup(popUpHTML);}

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

	});// end of ajax request
};//end of setUpPointClick() function


// getPopupHTML(feature) -------------------------------------------
function getPopupHTML(feature){

	let asset_id = feature.properties.asset_id;
	let asset_name = feature.properties.asset_name;
    let installation_date = feature.properties.installation_date;
    let previous_condition = feature.properties.condition_description;

	let htmlString = "<div id='popup" + asset_id + "'><h2>" + asset_name + "</h2><br>";

	htmlString += "<label for='assetName'>Asset Name</label><input type='text' size='25' id='asset_name' value='" + asset_name + "'/><br />";
	htmlString += "<label for='installationDate'>Installation Date</label><input type='text' size='25' id='installation_date' value='" + installation_date + "'/><br />";

	htmlString += "<input type='radio' name='condition' id='condition" + asset_id + "_1 value='Element is in very good condition' />1: Element is in very good condition<br />";
	htmlString += "<input type='radio' name='condition' id='condition" + asset_id + "_2 value='Some aesthetic defects, needs minor repair'/>2: Some aesthetic defects, needs minor repair<br />";
	htmlString += "<input type='radio' name='condition' id='condition" + asset_id + "_3 value='Functional degradation of some parts, needs maintenance' />3: Functional degradation of some parts, needs maintenance<br />";
	htmlString += "<input type='radio' name='condition' id='condition" + asset_id + "_4 value='Not working and maintenance must be done as soon as reasonably possible' />4: Not working and maintenance must be done as soon as reasonably possible<br />";
	htmlString += "<input type='radio' name='condition' id='condition" + asset_id + "_5 value='Not working and needs immediate, urgent maintenance' />5: Not working and needs immediate, urgent maintenance<br />";
	htmlString += "<input type='radio' name='condition' id='condition" + asset_id + "_6 value='Unknown' />6: Unknown<br />";

	//button
	htmlString += "<button onclick='checkCondition(" + asset_id + ");return false;'>Submit Condition</button>";

	//hidden element previous_condition and asset_id
	htmlString += "<div id = 'previous_condition" + asset_id + "' hidden>" + previous_condition + "</div>";
	htmlString += "<div id = 'asset_id" + asset_id  + "' hidden>" + asset_id + "</div>";
	
	htmlString += "</div>";

	return htmlString;

}//end of getPopupHTML() function


// checkCondition() -------------------------------------------
function checkCondition(asset_id) {
	let condition_description;
	let condition;

	let asset_name = document.getElementById(asset_name).innerHTML;
	let installation_date = document.getElementById(installation_date).innerHTML;
	//let asset_id = document.getElementById("asset_id" + asset_id).innerHTML;
	let previous_condition = document.getElementById(previous_condition).innerHTML;
	let postString = "asset_id=" + asset_id + "&asset_name=" + asset_name + "&installation_date=" + installation_date + "&user_id=" + user_id;
  
	let conditions = [];
	for (var i = 1; i <= 5; i++) {
	  let condition = document.getElementById("condition" + asset_id + "_" + i);
	  if (condition.checked) {
		conditions.push({
		  value: condition.id.split('_').slice(-1),
		  description: condition.value
		});
	  }
	}
  
	if (conditions.length > 0) {
	  condition = conditions[0].value;
	  condition_description = conditions[0].description;
	}
  
	// compare condition to previous condition
	if (condition != previous_condition) {
	  alert('Condition assement submitted of the asset has changed\n Previous Condition: ' + previous_condition + "\n New Condition: " + condition_description);
	} else {
	  alert('Condition assesment submitted has not changed\n Previous Condition: ' + previous_condition + "\n New Condition: " + condition_description);
	}
  
	postString = postString + "&previous_condition=" + previous_condition + "&condition=" + condition + "&condition_description=" + condition_description;

	processCondition(postString);
  }
  

// processCondition() -------------------------------------------
//this will send the report to the server, close the form, and calling setUpPointClick() function to change the colour of the marker depending on the condition
function processCondition(postString){

    let serviceUrl=  document.location.origin + "/api/insertConditionInformation";

   $.ajax({
    url: serviceUrl,
    crossDomain: true,
    type: "POST",
    data: postString,
    success: function(data){
		console.log(data);

        alert("Condition Assesment Submitted."+  "\n" + JSON.stringify(data));
        console.log("Condition Assesment Submitted");

        countSubmission();  //function to tell the user the number of report submitted by the user

		//closing the Condition Assesment Form when it is successful submitted
        mymap.closePopup();
		//removing the conditionLayer
        mymap.removeLayer(conditionLayer);
        setUpPointClick();//changing the colour for the report that just been submitted
        
    }
	}); //end of ajax request query 
}; //end of the processCondition() function


// countSubmission() -------------------------------------------
//simultaneously when the user submit Condition Report an alert will pop up to tell how many report has been submitted so far
function countSubmission(){

	let serviceUrl=  document.location.origin + "/api/userConditionReports/" + user_id;
        
    $.ajax({
		url: serviceUrl,
		crossDomain: true,
		success: function(result){
			console.log(result);

		let count;
		count = result[0].array_to_json[0].num_reports;
		console.log(count);

    	alert("You have submitted " + count + " reports");
		}
	});
}; //end of function countSubmission()

