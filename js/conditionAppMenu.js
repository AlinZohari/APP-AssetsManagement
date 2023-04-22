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
        crossDomain:true,
        success:function(result){
            //getting the rank from the array_to_json
            var ranking = data[0].array_to_json[0].rank;
            console.log(ranking);

            //return the user ranking as an alert
            alert("Your ranking is: " + ranking);

        }//end of inner function
    });//end of ajax query
};//end of userRanking function


