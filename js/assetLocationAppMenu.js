"use strict";

/**
 * This file contain the function for the Menu for Asset Location App (Large Screen).
 * This include function:
 *
 *  L1: assetInGreatCondition()
 *     List of Assets in Best Condition - TABLE
 * 
 * L2: dailyParticipationRates()
 *     Daily Reporting Rates Graph - BAR GRAPH
 */

//-----------------------------------------------------------------------------------
//L1: assetInGreatCondition() -TABLE
//Reference: Claire Ellul's ucl-geospatial/cege0043-app-examples repository
// Week 9: Branch- week9-datatables

let table = false;

function assetsInGreatCondition(){
    if (table == false){

document.getElementById("tableWrapper").style.top = "300px"; 
document.getElementById("tableWrapper").style.top="15%"; 

const width= document.getElementById("tableWrapper").offsetWidth;
const height = document.getElementById("tableWrapper").offsetHeight;
console.log(width +", "+height); 

document.getElementById("tableWrapper").innerHTML= document.getElementById("tableWrapper").innerHTML+'<div class="h-75 w-75"><svg width="'+width+'" height="'+height+'"></svg></div>'

    let serviceUrl =  document.location.origin + "api/assetsInGreatCondition/";
        
        $.ajax({ 
            url: serviceUrl,
            crossDomain: true,
            success: function(result){
            console.log(result);

            var features = result[0].array_to_json;

            // building the table
            let tableHTML = `
            <table id="data3" class="display" style="margin:1%" border="2" color="black">
                <h6><b>List of Assets in Best Condition</b></h6>
                <h7><b>(at least once at any point in time)</b></h7>
                <tr>
                <h2><b>
                    <td> Asset ID </td>
                    <td> Asset Name </td>
                    <td>Installation Date</td>
                    <td>User ID </td>
                    <td> Timestamp </td>
                </b></h2>
                </tr>
            `;
            
            //loop
            for (i=0;i< features.length;i++) {
                // add a new row
                tableHTML += "<tr>";

                // add a new column 
                tableHTML +="<td>";
                // add the table name
                tableHTML +=features[i].id;
                // close the column
                tableHTML +="</td>";


                // add a new column 
                tableHTML +="<td>";
                // add the feature type
                tableHTML +=features[i].asset_name;
                // close the column
                tableHTML +="</td>";

                // add a new column 
                tableHTML +="<td>";  
                tableHTML +=features[i].installation_date;
                // close the column
                tableHTML +="</td>";

                // add a new column 
                tableHTML +="<td>";  
                tableHTML +=features[i].user_id;
                // close the column
                tableHTML +="</td>";

                // add a new column 
                tableHTML +="<td>";  
                tableHTML +=features[i].timestamp;
                // close the column
                tableHTML +="</td>";
                
                //close the row
                tableHTML +="</tr>";

                } // end of the for loop
                
                //does a close button really necessary? or just by clicking to places other than the tableWrapper
                tableHTML +='<td> <button type="button" class="close" label= "Close" style= "background-color: white; text-align: center; width:100px ; right:0%; top: 0%;" onclick="closeTable();"> X </button></td>';
                //Reference: https://stackoverflow.com/questions/51380509/add-buttons-in-a-dynamically-generated-table-with-js 

                // close the table
                tableHTML +="</table>";

                // update the DIV
                document.getElementById("tableWrapper").innerHTML = tableHTML;
                }
        });

        table = true;}
        else {
            alert("Table: List of Assets in Best Condition had already been loaded")
        }
}

//--------------------
function closeTable() { 
    if (table == true){
	document.getElementById("tableWrapper").style.top = "-9999px"; 
    table = false;}

}


//-----------------------------------------------------------------------------------
//L2: dailyParticipationRates() -Graph