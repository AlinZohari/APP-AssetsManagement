"use strict";

//function to request and map ethernet data
let ethernetLayer; //global variable

function getEthernetData(){
	let layerURL = document.location.origin +"/app/data/ethernet.geojson";
	$.ajax({url:layerURL,crossDomain:true,success:function(result){
		console.log(result);//check if data is correct

		//add the JSON layer onto the map -it will appear in default icons
		ethernetLayer = L.geoJSON(result).addTo(mymap);

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