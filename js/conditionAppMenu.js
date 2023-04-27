
"use strict";

/**
 * This file contain the function for the Menu for Condition App (Small Screen).
 * This include function:
 * S1: userRanking()
 * S2: addLayerClosestAssets()
 * S2: removeLayerClosestAssets()
 * S3: addLayerLastFiveReports()
 * S3: removeLayerLastFiveReports()
 * S4: addLayerNotRated()
 * S4: removeLayerNotRated()
*/

//Global variables for this function
let userRankingLayer; //endpoint: /userRanking/:user_id
let closestAssetsLayer; //endpoint: /userFiveClosestAssets/:latitude/:longitude
let lastFiveReportsLayer; //endpoint: /lastFiveConditionReports/:user_id
let notRatedLayer; //endpoint: /conditionReportMissing/:user_id

//-----------------------------------------------------------------
//S1: userRanking()
function userRanking(){

    let serviceUrl = document.location.origin + "api/userRanking/" + user_id;

    $.ajax({
        url:serviceUrl,
        crossDomain: true,
        success:function(result){
            //getting the rank from the array_to_json
            var ranking = result[0].array_to_json[0].rank;
            console.log(ranking);

            //return the user ranking as an alert
            alert("Your ranking is: " + ranking);

        }//end of inner function
    });//end of ajax query
};//end of userRanking() function



//-----------------------------------------------------------------
//S2: addLayerClosestAssets()
function addLayerClosestAssets(){

    //latitude and longitude
    let latitude = document.getElementById('latitude').innerHTML;
    let longitude = document.getElementById('longitude').innerHTML;
    
    console.log(latitude);
    console.log(longitude);

    let serviceUrl = document.location.origin + "api/userFiveClosestAssets/" + latitude + "/" + longitude;

        //alert if there are a layer that is still on
        if (mymap.hasLayer(closestAssetsLayer)){ //hasLayer reference: https://leafletjs.com/reference.html#map-methods-for-layers-and-controls
            alert("Five Closest Assets Layer had already been loaded");
        }
        else{
            //if no layer alrdy loaded then continue with ajax query
            $.ajax({
                url: serviceUrl,
                crossDomain: true,
                success: function(result){
                    console.log(result);
                    
                    var closestAssets = result[0];
                    console.log(closestAssets);
        
                    //adding the JSON layers onto the map - default icons
                    closestAssetsLayer = L.geoJson(closestAssets, {pointToLayer: function(feature, latlng) {

                                //returning the asset_id, asset_name and installation_name as pop up when clicking on the marker
                                return L.marker(latlng, {icon:testMarkerBlue}).bindPopup("<b> Asset ID: " +feature.properties.id+
                                "<br> Asset Name: " +feature.properties.asset_name+
                                "<br> Installation Date: " +feature.properties.installation_date+ "</b>");
                        },
                    }).addTo(mymap);
                    
                    closestAssetsLayer.addData(closestAssets);
        
                    //map zoom to include all 5 markers
                    mymap.fitBounds(closestAssetsLayer.getBounds());            
                    }//end of the inner function
            
            }); //end of ajax query
        }
}//end of addLayerClosestAssets() function


//------------------------
//S2: removeLayerClosestAssets()
function removeLayerClosestAssets(){

    if(mymap.hasLayer(closestAssetsLayer) == true){  
        mymap.removeLayer(closestAssetsLayer);
    }
    
    else {
        alert("There are no Closest Assets Layer to be remove" );
    }
}



//-----------------------------------------------------------------
//S3: addLayerLastFiveReports() - colour coded (6 markers)
function addLayerLastFiveReports(){

	let serviceUrl = document.location.origin + "/api/lastFiveConditionReports/" + user_id; 

    //alert if there are a layer that is still on
    if (mymap.hasLayer(lastFiveReportsLayer)){
            alert("Last Five Reports Layer had already been loaded");
    }
     else{
        
        $.ajax({
            url: serviceUrl,
            crossDomain: true,
            success: function(result){

            let lastFiveReports = result[0];
            console.log(lastFiveReports);
	
            var testMarkerDarkGreen = L.AwesomeMarkers.icon({icon: 'play', markerColor: 'darkgreen'});
            var testMarkerGreen= L.AwesomeMarkers.icon({icon: 'play', markerColor: 'green'});
            var testMarkerDarkRed = L.AwesomeMarkers.icon({icon: 'play', markerColor: 'darkred'}); //probs dont have yellow
            var testMarkerOrange = L.AwesomeMarkers.icon({icon: 'play', markerColor: 'orange'});
            var testMarkerRed = L.AwesomeMarkers.icon({icon: 'play', markerColor: 'red'});
            var testMarkerWhite = L.AwesomeMarkers.icon({icon: 'play', markerColor: 'white'});


            //add the JSON layer onto the map - it will appear using the colour coded icons
            lastFiveReportsLayer = L.geoJson(lastFiveReports, {pointToLayer: function(feature, latlng) {
                    
                if (feature.properties.condition_description == "Element is in very good condition")
                        {return L.marker(latlng, {icon:testMarkerDarkGreen}).bindPopup("Condition Description: "+ feature.properties.condition_description);}

                else if (feature.properties.condition_description == "Some aesthetic defects, needs minor repair")
                        {return L.marker(latlng, {icon:testMarkerGreen}).bindPopup("Condition Description: " + feature.properties.condition_description);}

                else if (feature.properties.condition_description == "Functional degradation of some parts, needs maintenance")
                        {return L.marker(latlng, {icon:testMarkerDarkRed}).bindPopup("Condition Description: " + feature.properties.condition_description);}

                else if (feature.properties.condition_description == "Not working and maintenance must be done as soon as reasonably possible")
                        {return L.marker(latlng, {icon:testMarkerOrange}).bindPopup("Condition Description: " + feature.properties.condition_description);}

                else if (feature.properties.condition_description == "Not working and needs immediate, urgent maintenance")
                        {return L.marker(latlng, {icon:testMarkerRed}).bindPopup("Condition Description: " + feature.properties.condition_description);}
                else 
                //Unknown
                        {return L.marker(latlng, {icon:testMarkerWhite}).bindPopup("Condition Description: " + feature.properties.condition_description);}
                
                }, //end to inner function
                }).addTo(mymap);
                lastFiveReportsLayer.addData(lastFiveReports);

                //map zoom so that all the data is shown
                mymap.fitBounds(lastFiveReportsLayer.getBounds());
                }

        }); 
    };
};//end of addLayerLastFiveReports() function

//------------------------
//S3: removeLayerLastFiveReports()
function removeLayerLastFiveReports(){

    if(mymap.hasLayer(lastFiveReportsLayer) == true){

        mymap.removeLayer(lastFiveReportsLayer);
    }
    else {
        alert("There are no Last Five Report Layer to be remove" );
    }
}



//-----------------------------------------------------------------
//S4: addLayerNotRated() 
 // function to show assets not rated in last 3 days     
 function addLayerNotRated(){
    
    let serviceUrl = document.location.origin + "/api/conditionReportMissing/" + user_id; 
        
    if (mymap.hasLayer(notRatedLayer)){
            alert("Condition Report Missing Layer had already been loaded");
        }
        else{
      $.ajax({
        url: serviceUrl,
        crossDomain: true,
        success: function(result){
            console.log(result);
            
            var notRated = result[0];
            console.log(notRated);

            var testMarkerGray = L.AwesomeMarkers.icon({icon: 'play', markerColor: 'gray'});

            //add the JSON layer onto the map - it will appear to be gray
            notRatedLayer = L.geoJson(notRated, {
                pointToLayer: function(feature, latlng) {

                    return L.marker(latlng, {icon:testMarkerGray}).bindPopup("<b> Asset ID: " +feature.properties.id+
                    "<br> Asset Name: " +feature.properties.asset_name+
                    "<br> Latest Condition Report Date: " +feature.properties.latest_condition_report_date+ 
                    "<br> Condition Description: " +feature.properties.condition_description+ "</b>");
                },
            }).addTo(mymap);
            notRatedLayer.addData(notRated);

            //map zoom so that all the data is shown
            mymap.fitBounds(notRatedLayer.getBounds());
        }//end of inner function
    
    }); 
    };
};// end of addLayerNotRated() function

//------------------------
//S4: removeLayerNotRated()
function removeLayerNotRated(){

    if(mymap.hasLayer(notRatedLayer) == true){

        mymap.removeLayer(notRatedLayer);
    }
    else {
        alert("There are no Condition Report Missing Layer to be remove" );
    }
}

