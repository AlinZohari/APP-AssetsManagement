"use strict";

/**
 * THIS IS THE MAIN FILE TO MAKE THE FUNCTIONS IN BOOTSTRAP WORK
 * The function include:
 * 
 * Basic functionality for the bootStrap.html:
 * - loadLeafMap()
 * - loadAssetPoint(): this is to load all the asset point that have been created as soon as possible onto the map will be use in setMapClickEvent() and dataUploaded - when creating the asset to make the asset appear (endpoint:/userAssets/:user_id)
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
 *  loadAssetPoint()
 *  setMapClickEvent()
 */

// loadLeafletMap() -------------------------------------------
console.log("function to initialise and create the basemap.")
function loadLeafletMap(){

	//initialize a new map
	mymap = L.map('mapid').setView([51.505,-0.09],13);
	L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{
		maxZoom:20,
		attribution:'&copy;<a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
		
	}).addTo(mymap);

	window.addEventListener('resize',setMapClickEvent);
	setMapClickEvent();

} //end of loadLeafletMap() function


//loadAssetPoint() -------------------------------------------
function loadAssetPoint(){
    
	let serviceUrl = document.location.origin + "/api/userAssets/"+user_id;
	
		$.ajax({
			url: serviceUrl,
			async: false,
			crossDomain: true,
			success: function(result){
			console.log(result);

			//loading it without any colour different but still having its condition
			let testMarkerBlue = L.AwesomeMarkers.icon({
			icon: 'play', markerColor: 'blue'});
		

			let assets = result[0];
			console.log(assets);

		//add the JSON layer onto the map - it will appear using the default icons, blue
		assetLayer = L.geoJson(assets, {
			pointToLayer: function(feature, latlng) {

				if (feature.properties.condition_description == "Element is in very good condition")
					{
					return L.marker(latlng, {icon:testMarkerBlue}).bindPopup("Asset Name: " +feature.properties.asset_name+ "<br>Installation Date: " +feature.properties.installation_date+ "<br>Latest Condition Information:   <b>" + feature.properties.condition_description +"</b>");}

				else if (feature.properties.condition_description == "Some aesthetic defects, needs minor repair")
					{
					return L.marker(latlng, {icon:testMarkerBlue}).bindPopup("Asset Name: " +feature.properties.asset_name+ "<br>Installation Date: " +feature.properties.installation_date+ "<br>Latest Condition Information:  <b>" +feature.properties.condition_description +"</b>");}

				else if (feature.properties.condition_description == "Functional degradation of some parts, needs maintenance")
					{ 
					return L.marker(latlng, {icon:testMarkerBlue}).bindPopup("Asset Name: " +feature.properties.asset_name+ "<br>Installation Date: " +feature.properties.installation_date+ "<br>Latest Condition Information:  <b>" +feature.properties.condition_description +"</b>");}

				else if (feature.properties.condition_description == "Not working and maintenance must be done as soon as reasonably possible")
					{ 
					return L.marker(latlng, {icon:testMarkerBlue}).bindPopup("Asset Name: " +feature.properties.asset_name+ "<br>Installation Date: " +feature.properties.installation_date+ "<br>Latest Condition Information:  <b>" +feature.properties.condition_description +"</b>");}

				else if (feature.properties.condition_description == "Not working and needs immediate, urgent maintenance")
					{
					return L.marker(latlng, {icon:testMarkerBlue}).bindPopup("Asset Name: " +feature.properties.asset_name+ "<br>Installation Date: " +feature.properties.installation_date+ "<br>Latest Condition Information:  <b>" +feature.properties.condition_description +"</b>");}

				else //Unknown
					{
					return L.marker(latlng, {icon:testMarkerBlue}).bindPopup("Asset Name: " +feature.properties.asset_name+ "<br>Installation Date: " +feature.properties.installation_date+ "<br>Latest Condition Information: <b> Unknown</b>");}
			},

		}).addTo(mymap);

		//changing map zoom so that all the data is shown
		mymap.fitBounds(assetLayer.getBounds());
		
		}//end of inner function
	}); //end og ajax request
}// end of loadAssetPoint() function


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

		if(phone == true){
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
			
			//setTimeout : executes a function after a specifies delay in miliseconds
			//closestPointForm function which pop up when user is within a specific dstance of an asset point based on calculate Distance function are delayed for 300 milliseconds 
			//reason: to ensure that all the necessary data (user location tracked and points plotted) is loaded before the closetPointForm is executed
			//Reference: https://javascript.info/settimeout-setinterval
			setTimeout(closestPointForm,300);
		
			closeGraph();
			closeTable();

		   phone = true;
		   desktop = false;
	
			}
		}
	
		 
	//else of the (width < 922)		
	else {
		if(desktop == true ){
			return false;
		}
			
		else{
		if  (conditionLayer){
			mymap.removeLayer(conditionLayer);}//removing condition layer soon as the window is resized to small
			mymap.on('click', onMapClick);//asset creation form
			
			//loading asset that the user have created so far and 
			loadAssetPoint();
			removePositionPoints(); // and also will remove the tracks


			//When the screen is small on phone this functions is called - closed
				if  (closestAssetsLayer){ //closestAssetsLayer is from condition Menu S2 -userFiveClosestAssets
			mymap.removeLayer(closestAssetsLayer);}
			if  (lastFiveReportsLayer){
			mymap.removeLayer(lastFiveReportsLayer);}
			if  ( notRatedLayer ){
			mymap.removeLayer(notRatedLayer);}  

				phone = false;
				desktop = true;
	
	
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
	let formHTML = basicFormHtml(e.latlng);
	popup 
	.setLatLng(e.latlng)
	.setContent("You clicked the map at " + e.latlng.toString()+"<br>"+formHTML)
	.openOn(mymap);
	console.log("popup Form")
}

// basicFormHtml() -------------------------------------------
function basicFormHtml(latlng) {

	//getting the user latlng when they click on map
	let latitude = latlng.lat;
	let longitude = latlng.lng;

	let mylet = '<p><b><center> Asset Creation Form </center></b><p>'+
	''+
	''+
	'<label for="Assetname">Asset Name</label><input type="text" size="25" id="asset_name"/><br />'+
	'<br>'+
	'<label for="installationDate">Installation Date</label><input type="text" size="25" id="installation_date"/><br />'+
	''+
	''+
    '<div id="latitude" style="display: none;">'+ latitude + '</div>' + 
    '' +
    '' +
    '<div id="longitude" style="display: none;">'+ longitude + '</div>' + 
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
        processAsset();
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

		//to show the point that recently been created immediately
		loadAssetPoint();
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
		var testMarkerOrange = L.AwesomeMarkers.icon({icon: 'play', markerColor: 'orange'});
		var testMarkerRed = L.AwesomeMarkers.icon({icon: 'play', markerColor: 'red'});
		var testMarkerDarkRed = L.AwesomeMarkers.icon({icon: 'play', markerColor: 'darkred'});
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
					return L.marker(latlng, {icon:testMarkerOrange}).bindPopup(popUpHTML);}

				else if (feature.properties.condition_description == "Not working and maintenance must be done as soon as reasonably possible")
					{var popUpHTML = getPopupHTML(feature); 
					return L.marker(latlng, {icon:testMarkerRed}).bindPopup(popUpHTML);}

				else if (feature.properties.condition_description == "Not working and needs immediate, urgent maintenance")
					{var popUpHTML = getPopupHTML(feature); 
					return L.marker(latlng, {icon:testMarkerDarkRed}).bindPopup(popUpHTML);}

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

	let htmlString = '<p><b><center> Asset Condition Form </center></b></p>';

	htmlString += "<label for 'asset_name'><b>Asset Name: </label></b>" + "<div id = 'asset_name_" + asset_id + "'" + ">" + asset_name + "</div><br>";
	htmlString += "<label for 'installation_date'><b>Installation Date: </label></b>"  + "<div id='installation_date_" + asset_id + "'" + ">" + installation_date + "</div><br>";

	//hidden element previous_condition and asset_id
	htmlString += "<div id = 'previous_condition_" + asset_id + "' hidden>" + previous_condition + "</div>";
	htmlString += "<div id = 'asset_id_" + asset_id  + "' hidden>" + asset_id + "</div>";

	//rating the asset condition
	htmlString += '<p><b> Rate Asset Condition</b></p>'
	htmlString += "<input type='radio' name='condition' id='condition" + asset_id + "_1' value='Element is in very good condition' />1: Element is in very good condition<br />";
	htmlString += "<input type='radio' name='condition' id='condition" + asset_id + "_2' value='Some aesthetic defects, needs minor repair'/>2: Some aesthetic defects, needs minor repair<br />";
	htmlString += "<input type='radio' name='condition' id='condition" + asset_id + "_3' value='Functional degradation of some parts, needs maintenance' />3: Functional degradation of some parts, needs maintenance<br />";
	htmlString += "<input type='radio' name='condition' id='condition" + asset_id + "_4' value='Not working and maintenance must be done as soon as reasonably possible' />4: Not working and maintenance must be done as soon as reasonably possible<br />";
	htmlString += "<input type='radio' name='condition' id='condition" + asset_id + "_5' value='Not working and needs immediate, urgent maintenance' />5: Not working and needs immediate, urgent maintenance<br />";
	htmlString += "<input type='radio' name='condition' id='condition" + asset_id + "_6' value='Unknown' />6: Unknown<br />";

	//button
	htmlString += "<button onclick='checkCondition(" + asset_id + ");return false;'>Submit Condition</button>";

	htmlString += "</div>";

	return htmlString;

}//end of getPopupHTML() function




// checkCondition() -------------------------------------------
function checkCondition(asset_id) {
	let condition_description = "";
	let condition = "";

	asset_id = document.getElementById("asset_id_" + asset_id).innerHTML;

	let asset_name = document.getElementById("asset_name_" + asset_id).innerHTML;
	let installation_date = document.getElementById("installation_date_" + asset_id).innerHTML;
	let previous_condition = document.getElementById("previous_condition_" + asset_id).innerHTML;
	let postString = "asset_id=" + asset_id + "&asset_name=" + asset_name + "&installation_date=" + installation_date + "&user_id=" + user_id;

	condition = previous_condition; // initialize condition with previous_condition value

	let conditions = [];
	for (let i = 1; i <= 6; i++) {
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
	  alert('CONDITION SUBMITTED HAS CHANGED\n \n Previous Condition: ' + previous_condition + "\n New Condition: " + condition_description);
	} 
	else if (condition == previous_condition){
	  alert('CONDITION SUBMITTED HAS NOT CHANGED\n \n Previous Condition: ' + previous_condition + "\n New Condition: " + condition_description);
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

