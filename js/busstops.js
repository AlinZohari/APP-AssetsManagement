"use strict";

//function to request and map busstops data
let busstopsLayer; //global variable

function getBusstopsData(){
	let layerURL = document.location.origin +"/app/data/busstops.geojson";
	$.ajax({url:layerURL,crossDomain:true,success:function(result){
		console.log(result);//check if data is correct

		//add the JSON layer onto the map -it will appear in default icons
		busstopsLayer = L.geoJSON(result).addTo(mymap);

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