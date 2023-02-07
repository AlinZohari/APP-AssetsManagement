"use strict";

//function to request and map busstops data
let busstopsLayer; //global variable

//uses if/else statement-Eploring Symbology Alternatives
function getBusstopsData(){
	let layerURL = document.location.origin +"/app/data/busstops.geojson";
	$.ajax({url:layerURL,crossDomain:true,success:function(result){
		console.log(result);//check if data is correct

		let testMarkerRed = L.AwesomeMarkers.icon({
			icon:'play',
			markerColor:'red'
		});

		let testMarkerGray = L.AwesomeMarkers.icon({
			icon:'play',
			markerColor:'gray'
		});

		let testMarkerPink = L.AwesomeMarkers.icon({
			icon:'play',
			markerColor:'pink'
		});

		let testMarkerBlue = L.AwesomeMarkers.icon({
			icon:'play',
			markerColor:'blue'
		});

		let testMarkerPurple = L.AwesomeMarkers.icon({
			icon:'play',
			markerColor:'purple'
		});

		let testMarkerGreen = L.AwesomeMarkers.icon({
			icon:'play',
			markerColor:'green'
		});

		let testMarkerBlack= L.AwesomeMarkers.icon({
			icon:'play',
			markerColor:'black'
		});

		let testMarkerOrange = L.AwesomeMarkers.icon({
			icon:'play',
			markerColor:'orange'
		});

		//load the geoJSON layer
		busstopsLayer = L.geoJSON(result,{

			//use point to layer to create the points
			pointToLayer:function(feature,latlng){
				//look at the GeoJSON file - specifically at the properties -to see the busstops type
				if(feature.properties.IIT_METHOD=='1'){
					return L.marker(latlng,{icon:testMarkerGray}).bindPopup("<b>"+feature.properties.ITT_METHOD+"<b>");
				}
				else if(feature.properties.IIT_METHOD=='2'){
					return L.marker(latlng,{icon:testMarkerOrange}).bindPopup("<b>"+feature.properties.ITT_METHOD+"<b>");
				}
				else if(feature.properties.IIT_METHOD=='3'){
					return L.marker(latlng,{icon:testMarkerPurple}).bindPopup("<b>"+feature.properties.ITT_METHOD+"<b>");
				}
				else if(feature.properties.IIT_METHOD=='4'){
					return L.marker(latlng,{icon:testMarkerPink}).bindPopup("<b>"+feature.properties.ITT_METHOD+"<b>");
				}
				else if(feature.properties.IIT_METHOD=='9'){
					return L.marker(latlng,{icon:testMarkerBlue}).bindPopup("<b>"+feature.properties.ITT_METHOD+"<b>");
				}
				else{
					return L.marker(latlng,{icon:testMarkerBlack}).bindPopup("<b>"+feature.properties.ITT_METHOD+"<b>");;
				}
			}//end of pointToLayer
		}).addTo(mymap);

		//change the map zoom so that allthe data is shown
		mymap.fitBounds(busstopsLayer.getBounds());

	}//end of the inner function
});//end of the ajax request
}//end of the getBusstopsData function

//function to removeBusstopsData
function removeBusstopsData(){
	try{
		alert("Bus stops data will be removed");
		mymap.removeLayer(busstopsLayer);
	}
	catch (err){
		alert("Layer doesn't exist" + err);
	}
}