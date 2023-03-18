"use strict";
function saveConditionInformation() {
	alert ("start data upload");

	let asset_name = document.getElementById("asset_name").value;
	let installation_name = document.getElementById("installation_name").value;
	let user_id = document.getElementById("user_id").value;

	alert(asset_name + " "+ installation_name + " "+user_id);
	
	let postString = "asset_name="+asset_name +"&installation_name="+installation_name+"&user_id="+user_id;
	
	
	// now get the checkbox values - separate them with a | so that they can be // split later on if necessary
	let checkString = "";
	for (let i = 1;i< 5;i++){
		if (document.getElementById("check"+i).checked === true) {
			checkString = checkString + document.getElementById("check"+i).value + "||"
		}

	}

// now get the radio button values
	if (document.getElementById("1").checked) {
 		 postString=postString+"&condition_value=1";
	}
	if (document.getElementById("2").checked) {
 		 postString=postString+"&condition_value=2";
	}
		if (document.getElementById("3").checked) {
 		 postString=postString+"&condition_value=3";
	}
		if (document.getElementById("4").checked) {
 		 postString=postString+"&condition_value=4";
	}
		if (document.getElementById("5").checked) {
 		 postString=postString+"&condition_value=5";
	}
		if (document.getElementById("6").checked) {
 		 postString=postString+"&condition_value=6";
	}
	

//for the hidden field
	//1)hold previous condition value(for comparison)
	let previousConditionValue = document.getElementById("previousConditionValue").value;
	//2)hold ID of the asset
	let  assetID = document.getElementById("assetID").value;

	alert(previousConditionValue + " "+ assetID);
	postString = postString + "&previousConditionValue=" + previousConditionValue + "&assetID=" + assetID;

//compare 


	processData(postString);

}

//upload
function processData(postString) {
	alert(postString);

	let serviceUrl=  document.location.origin + "/api/testCRUD";
   $.ajax({
    url: serviceUrl,
    crossDomain: true,
    type: "POST",
    data: postString,
    success: function(data){console.log(data); dataUploaded(data);}
	}); 

}

// create the code to process the response from the data server
function dataUploaded(data) {
    // change the DIV to show the response
    document.getElementById("conditionResult").innerHTML = JSON.stringify(data);
}