

//function to show the DIV when the user clicks on the Show Graph menu

function loadGraph(){

	//clear the graph contents just incase the graph is already loaded
	processWindowResize();

	let mapCollapse = document.getElementById('mapWrapper');
	let bsMapCollapse = new bootstrap.Collapse(mapCollapse, {
		toggle: false, show:false
	});
	bsMapCollapse.hide();

	let adwCollapse = document.getElementById('assetDataWrapperWrapper');
	let bsAdwCollapse = new bootstrap.Collapse(adwCollapse, {
		toggle: false, show:true
		}); 
		bsAdwCollapse.show();

		showGraph();

		// code to create the graph goes here – see below
		let widtha = document.getElementById("assetDataWrapper").clientWidth*2;
		let heighta = document.getElementById("assetDataWrapper").offsetHeight;
		console.log(widtha+" "+heighta);

		// Add the close button and an SVG element for the graph
		document.getElementById("assetDataWrapper").innerHTML=`<div class="h-100 w-100">
		<button type="button" class="btn-close float-end" aria-label="Close" onclick="closeAssetData()"></button>
		<svg fill="blue" width="`+widtha+`" height="`+heighta+`" id="svg1">
		</svg>
		</div>`

}

function showGraph(){

    let widtha = document.getElementById("assetDataWrapper").clientWidth*2;
    let heighta = document.getElementById("assetDataWrapper").offsetHeight;
    console.log(widtha+" "+heighta);

    // Add the close button and an SVG element for the graph
     document.getElementById("assetDataWrapper").innerHTML=`<div  class="h-100 w-100">
                <button type="button" class="btn-close float-end" aria-label="Close" onclick="closeAssetData()"></button>
                <svg fill="blue" width="`+widtha+`" height="`+heighta+`" id="svg1">
                </svg>
                </div>`


     // create an SVG container for the graph
     // g is a grouping element
     let marginTop = 30;
     let marginBottom = 60;
     let marginLeft = 50;
     let marginRight=20;

let dataURL = "https://data.wprdc.org/dataset/87c77ec3-db98-4b2a-8891-d9b577b4c44d/resource/d569b513-44c0-4b65-9241-cc3d5c506760/download/fields_img.geojson";


// download the data and create the graph
d3.json(dataURL).then(data => {
  data = data.features;
  console.log(data);

  // loop through the data and get the length of the x axis titles
  let xLen = 0;
  data.forEach(feature =>{
      if (xLen < feature.properties.name.length) {
        xLen = feature.properties.name.length;
      }
      console.log(xLen);
        });

  // adjust the space available for the x-axis titles, depending on the length of the text
  if (xLen > 100) {
    marginBottom = Math.round(xLen/3,0);
  }
  else {
    marginBottom = xLen + 110;  
  } //rough approximation for now
  console.log(marginBottom);
  let svg     = d3.select("#svg1"),
      margin  = {top: marginTop, right: marginRight, bottom: marginBottom, left: marginLeft},
      width   = svg.attr("width") - marginLeft - marginRight,
      height  = svg.attr("height") - marginTop - marginBottom,
      x       = d3.scaleBand().rangeRound([0, width]).padding(0.2),
      y       = d3.scaleLinear().rangeRound([height, 0]),
      g       = svg.append("g")
                   .attr("transform", `translate(${margin.left},${margin.top})`);


 x.domain(data.map(d => d.properties.name));
 y.domain([0, d3.max(data, d => d.properties.center_field_distance)]);


// adapted from: https://bl.ocks.org/mbostock/7555321 10th March 2021/
 /*g.append("g")
    .attr("class", "axis axis-x")
    .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll(".tick text")
      .call(wrap,x.bandwidth());
*/

g.append("g")
    .attr("class", "axis axis-x")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x))
    //select all text labels in the axis, then position + rotate
    .selectAll(".tick text")  
      .style("text-anchor", "end")
      .attr("dx", "-1em")
      .attr("dy", "-0.5em")
      .attr("transform", "rotate(-90)");


  g.append("g")
      .attr("class", "axis axis-y")
      .call(d3.axisLeft(y).ticks(10).tickSize(8));

  g.selectAll(".bar")
    .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", d => x(d.properties.name))
      .attr("y", d => y(d.properties.center_field_distance))
      .attr("width", x.bandwidth())
      .attr("height", d => height - y(d.properties.center_field_distance));

})
.catch(err => {
   svg.append("text")         
        .attr("y", 20)
        .attr("text-anchor", "left")  
        .style("font-size", "10px") 
        .style("font-weight", "bold")  
        .text(`Couldn't open the data file: "${err}".`);
});


}

//function to remove the DIV from the screen
//(when the user clicks on the 'button' at the top of the DIV or when the user clicks the Remove Graph menu option)

function closeAssetData(){
	let mapCollapse = document.getElementById('mapWrapper');
	let bsMapCollapse = new bootstrap.Collapse(mapCollapse, {
		toggle: false, show:false
	});
	bsMapCollapse.show();

	let adwCollapse = document.getElementById('assetDataWrapperWrapper');
	let bsAdwCollapse = new bootstrap.Collapse(adwCollapse, {
		toggle: false, show:true
	});
	bsAdwCollapse.hide();
}