"use strict";


//function to request and map ethernet data
let ethernetLayer; //global variable

//uses switch statement-Exploring Symbology Alternatives
function getEthernetData(){
	let layerURL = document.location.origin +"/app/data/ethernet.geojson";
	$.ajax({url:layerURL,dataType:'json',success:function(result){
		console.log(result);//check if data is correct

		let style1 = {
			"color": "#ea3008",
			"weight":10,
			"opacity":0.65
		};
		let style2 = {
			"color": "#08EA3E",
			"weight":10,
			"opacity":0.65
		};
		let style3 = {
			"color": "#0811EA",
			"weight":10,
			"opacity":0.65
		};

		//load the geoJSON layer
		ethernetLayer = L.geoJSON(result).addTo(mymap);
		ethernetLayer.addData(result);

		//iterate over the lines and set style depending on district
		ethernetLayer.eachLayer(function(layer){
			console.log(layer);
			switch(layer.feature.properties.criticality){
			case 2:
				layer.setStyle(style1);
				break;
			case 3:
				layer.setStyle(style2);
				break;
			default:
				layer.setStyle(style2);
			}
		});

		//change the map zoom so that allthe data is shown
		mymap.fitBounds(ethernetLayer.getBounds());

	}//end of the inner function
});//end of the ajax request
}//end of the getEthernetData function

//function to removeEthernetData
function removeEthernetData(){
	try{
		alert("Ethernet data will be removed");
		mymap.removeLayer(ethernetLayer);
	}
	catch (err){
		alert("Layer doesn't exist" + err);
	}
}