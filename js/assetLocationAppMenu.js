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
    $("#mapWrapper").removeClass("show");
    $("#tableWrapper").addClass("show");
    $("#graphWrappper").removeClass("show");

    if (table == false){

document.getElementById("tableWrapper").style.top = "300px"; 
document.getElementById("tableWrapper").style.top="15%"; 

const widtha= document.getElementById("tableWrapper").offsetWidth;
const heighta = document.getElementById("tableWrapper").offsetHeight;
console.log(widtha +" "+heighta); 

document.getElementById("tableWrapper").innerHTML= document.getElementById("tableWrapper").innerHTML+'<div class="h-75 w-75"><svg width="'+widtha+'" height="'+heighta+'" id="svg2"></svg></div>'

let layers = [];

    let serviceUrl =  document.location.origin + "/api/assetsInGreatCondition";
        
        $.ajax({ 
            url: serviceUrl,
            crossDomain: true,
            success: function(result){
            console.log(result);

            let features = result[0].array_to_json;

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
            for (let i=0;i< features.length;i++) {
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

                } // end of for loop
                
                //does a close button really necessary? or just by clicking to places other than the tableWrapper
                tableHTML +='<td> <button type="button" class="close" aria-label= "Close" style= "background-color: white; text-align: center; color: black; width:100px ; right:0%; top: 0%; font-size:12pt; height:30px; position:absolute;" onclick="closeTable();"> X </button></td>';
                //Reference: https://stackoverflow.com/questions/51380509/add-buttons-in-a-dynamically-generated-table-with-js 

                // close the table
                tableHTML +="</table>";

                // update the DIV
                document.getElementById("tableWrapper").innerHTML = tableHTML;
                }
        });

        table = 1;}
        else {
            alert("List of Assets in Best Condition had already been loaded")
        }
}

//--------------------
function closeTable() { 
    if (table == true){
	document.getElementById("tableWrapper").style.top = "-9999px"; 
    table = false;}

}


//-----------------------------------------------------------------------------------
//L2: dailyParticipationRates() - Bar Graph
// adapted from doing the earthquake graph in practical3 of cege0043

let dailyReportLayer;
let graph = false;


//fetching the json first
function dailyReports(){
    let dailyReportLayer =  document.location.origin + "/api/dailyParticipationRates";
            
    $.ajax({
        url: dailyReportLayer,
        crossDomain: true,
        success: function(result){

        let json = result[0].array_to_json;
        console.log(json);
        
        }//end of inner function
    });
}


function dailyParticipationRates(){
    $("#mapWrapper").removeClass("show");
    $("#tableWrapper").removeClass("show");
    $("#graphWrappper").addClass("show");

    if (graph == false){
        
        document.getElementById("graphWrapper").style.top = "300px"; 
        document.getElementById("graphWrapper").style.top="15%"; 

        var widtha = document.getElementById("graphWrapper").offsetWidth;
        var heighta = document.getElementById("graphWrapper").offsetHeight;
        console.log(widtha+", "+heighta);

        
        document.getElementById("graphWrapper").innerHTML=document.getElementById("graphWrapper").innerHTML+'<div class="h-75 w-75"><svg width="'+widtha+'" height="'+heighta+'" id="svg1"></svg></div>'
        
        //adapt from Week6 Lesson 1 Lecture and PDF- Creating a graph for the Eartquake data, using svg1 to store the graph
  const svg     = d3.select("#svg1"),
        margin  = {top: 10, right: 10, bottom:100, left: 50},
        width   = +svg.attr("width")  - margin.left - margin.right,
        height  = +svg.attr("height") - margin.top  - margin.bottom,
        x       = d3.scaleBand().rangeRound([0, width]).padding(0.2),
        y       = d3.scaleLinear().rangeRound([height, 0]),
        y1      = d3.scaleLinear().rangeRound([height, 0]), //not sure whats the  y1 do
        g       = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

        let dailyReportLayer =  document.location.origin + "/api/dailyParticipationRates"

        // download the data and create the graph -but in this case of bragraph we need to sort the days of the week
        d3.json(dailyReportLayer).then(data => {
            data = data[0].array_to_json;
            console.log(data);

        //sorting the data to the days of the week -when the array_to_json is fetch its not in order
        //Reference: https://copyprogramming.com/howto/how-to-sort-a-nested-object-based-on-key-name
        
        const sorter = {
            // using lower case to make the keys in the sorter object consistent with the casing of the day property.
            "monday": 1,
            "tuesday": 2,
            "wednesday": 3,
            "thursday": 4,
            "friday": 5,
            "saturday": 6,
            "sunday": 7
          }

          data.sort(function sortByDay(a, b) {
            let day1 = a.day.toLowerCase();
            let day2 = b.day.toLowerCase();
            return sorter[day1] - sorter[day2];
          });
          
          console.log(data);
          
          
            x.domain(data.map(d => d.day));
            y.domain([0, d3.max(data, d => d.reports_submitted)]);

            g.append("g")
                .attr("class","axis axis-x")
                .attr("transform", `translate(0,${height})`)
                .call(d3.axisBottom(x));

            g.append("g")
                .attr("class","axis axis-y")
                .call(d3.axisLeft(y).ticks(10).tickSize(8));

            
            //to achieve the functionality of L2: bar graph showing:-
            //  1) how many reports have been submitted 
            //  2) how many reports have been submitted with the worst condition values/ Reports with condition 'not working'
            
            
            // this is done by stacking the bar graph
            //Reference: https://d3-graph-gallery.com/graph/barplot_stacked_basicWide.html
            
            //1) reports_submitted
            g.selectAll(".bar.reports_submitted")
            .data(data)
            .enter()
            .append("rect")
            .attr("class", "bar reports_submitted")
            .style("fill","#267bd1")
            .attr("x", d => x(d.day))
            .attr("y", d => y(d.reports_submitted))
            .attr("width", x.bandwidth())
            .attr("height", d => height - y(d.reports_submitted));
              
            //2) reports_not_working
            g.selectAll(".bar.reports_not_working")
            .data(data)
            .enter().
            append("rect")
            .attr("class", "bar reports_not_working")
            .style("fill","#d42a36")
            .attr("x", d => x(d.day))
            .attr("y", d => y(d.reports_not_working))
            .attr("width", x.bandwidth())
            .attr("height", d => height - y(d.reports_not_working));

            //making the legend handmade 
            //Reference: https://d3-graph-gallery.com/graph/custom_legend.html
            svg.append("circle").attr("cx",(widtha/2 + 230)).attr("cy",( heighta - 50)).attr("r", 4).style("fill", "#267bd1")
            svg.append("circle").attr("cx",(widtha/2 + 230)).attr("cy",(heighta -35)).attr("r", 4).style("fill", "#d42a36")
            svg.append("text").attr("x", (widtha/2) +280 ).attr("y", (heighta - 60)).text("Legend").style("font-size", "13px").attr("alignment-baseline","end")
            svg.append("text").attr("x",(widtha/2 + 240)).attr("y", (heighta - 45)).text("Reports submitted").style("font-size", "12px").attr("alignment-baseline","end")
            svg.append("text").attr("x", (widtha/2 + 240)).attr("y",(heighta - 30)).text("Reports with condition 'not working'").style("font-size", "12px").attr("alignment-baseline","end")

            //labelling the axis
            //Refrence: https://d3-graph-gallery.com/graph/custom_axis.html

            svg.append("text")
            .attr("transform", "translate(" + (widtha/3 ) + " ," + (heighta-60) + ")")
            .style("text-anchor", "middle")
            .text("Days");
            svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("x", -(heighta/2))
            .attr("y", 15)
            .style("text-anchor", "middle")
            .text("Number of reports");

            }) //end of d3.json

    graph = true;
    } //end of the if (graph == false)

    else {
        alert("Graph of Daily Reporting Rates had already been loaded")
        
    }

};// end of dailyParticipationRates() function

//--------------------
function closeGraph() { 
    if (graph == true){
	document.getElementById("graphWrapper").style.top = "-9999px"; 
    graph = false;}

}

