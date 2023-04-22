/**This file contain the function for the Menu for Condition App (Small Screen).
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
};//end of userRanking function

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
            alert("Five Closest Assets had already been loaded");
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
}//end of addLayerClosestAssets()


//-------------------------------
//S2: removeLayerClosestAssets()
function removeLayerClosestAssets(){

    if(mymap.hasLayer(closestAssetsLayer) == true){  
        mymap.removeLayer(closestAssetsLayer);
    }
    
    else {
        alert("There are no layer to remove" );
    }
}
