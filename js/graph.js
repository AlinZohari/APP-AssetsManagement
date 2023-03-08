

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


const svg =d3.select("#svg1"),
	margin ={top:20,right:20,bottom:30,left:50},
	width = +svg.attr("width") - margin.left - margin.right,
	height = +svg.attr("height") - margin.top - margin.bottom,
	x = d3.scaleBand().rangeRound([0,width]).padding(0.2),
	y = d3.scaleLinear().rangeRound([height,0]),
	g = svg.append("g")
		.attr("transform",'translate(${margin.left},${margin.top})');


// download the data and create the graph
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson").then(data => {
  data = data.features;
  x.domain(data.map (d => d.properties.place));
  y.domain(([0, d3.max(data, d => d.properties.mag)]));
  console.log(data);

g.append("g")
	.attr("class","axis axis-x")
	.attr("transform", 'translate(0,${height})')
	.call(d3.axisBottom(x));

g.append("g")
	.attr("class","axis axis-y")
	.call(d3.axisLeft(y).ticks(10).tickSize(8));

g.selectAll(".bar")
	.data(data)
	.enter().append("rect")
	.attr("x",d=>x(d.properties.place))
	.attr("y",d=>y(d.properties.mag))
	.attr("width",x.bandwidth())
	.attr("height",d=>height-y(d.properties.mag));

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