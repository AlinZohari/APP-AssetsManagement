"use strict";
function saveConditionInformation() {
	alert ("start data upload");

	let asset_name = document.getElementById("asset_name").value;
	let installation_name = document.getElementById("installation_name").value;
	let user_id = document.getElementById("user_id").value;

	alert(asset_name + " "+ installation_name + " "+user_id);
	
	let postString = "asset_name="+asset_name +"&installation_name="+installation_name+"&user_id="+user_id;
	

// now get the radio button values
	let conditionValue;
	if (document.getElementById("1").checked) {
		conditionValue = 1
 		postString=postString+"&conditionValue=1";
	}
	else if (document.getElementById("2").checked) {
		conditionValue = 2
		postString=postString+"&conditionValue=2";
	}
	else if (document.getElementById("3").checked) {
		conditionValue = 3
 		postString=postString+"&conditionValue=3";
	}
	else if (document.getElementById("4").checked) {
		conditionValue = 4
 		postString=postString+"&conditionValue=4";
	}
	else if (document.getElementById("5").checked) {
		conditionValue = 5
 		postString=postString+"&conditionValue=5";
	}
	else if (document.getElementById("6").checked) {
		conditionValue = 6
 		postString=postString+"&conditionValue=6";
	}
	
//for the hidden field
	//1)hold previous condition value(for comparison)
	let previousConditionValue = document.getElementById("previousConditionValue").value;
	if (conditionValue == previousConditionValue) {
	    alert('The current condition is the same as previous condition');
	} else {
	    alert('The current condition is different than previous condition');
	}

//update previous condition value
	document.getElementById("previousConditionValue").value = conditionValue;


//for the hidden field
	//2)hold ID of the asset
	let assetID = document.getElementById("assetID").value;
	alert(assetID);
	postString = postString+ "&assetID="+assetID;

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