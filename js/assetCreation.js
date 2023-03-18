"use strict";
function startDataUpload() {
	alert ("start data upload");

	let name = document.getElementById("name").value;
	let surname = document.getElementById("surname").value;
	let module = document.getElementById("module").value;

	alert(name + " "+ surname + " "+module);
	
	let postString = "name="+name +"&surname="+surname+"&module="+module;
	
	
	// now get the checkbox values - separate them with a | so that they can be // split later on if necessary
	let checkString = "";
	for (let i = 1;i< 5;i++){
		if (document.getElementById("check"+i).checked === true) {
			checkString = checkString + document.getElementById("check"+i).value + "||"
		}

	}
		
	// now get the select box values
	let language = document.getElementById("languageselectbox").value;
	postString = postString + "&language="+language;

	// now get the geometry values
	let latitude = document.getElementById("latitude").value;
	let longitude = document.getElementById("longitude").value;
	postString = postString + "&latitude=" + latitude + "&longitude=" + longitude;

	postString = postString + "&modulelist="+checkString;


// now get the radio button values
	if (document.getElementById("morning").checked) {
 		 postString=postString+"&lecturetime=morning";
	}
	if (document.getElementById("afternoon").checked) {
 		 postString=postString+"&lecturetime=afternoon";
	}

	
	processData(postString);

}

function deleteRecord() {
	let deleteID = document.getElementById("deleteID").value;
	let deleteString = "id="+deleteID;
	let serviceUrl= document.location.origin + "/api/testCRUD";
	$.ajax({
	    url: serviceUrl,
	    crossDomain: true,
	    type: "POST",
	    success: function(data){console.log(data); deleteSingleAsset(data);},
	    data: deleteString
	});	
}

function deleteSingleAsset(data){
    document.getElementById("deleteAssetResponse").innerHTML = JSON.stringify(data);
}


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
    document.getElementById("dataUploadResult").innerHTML = JSON.stringify(data);
}


function saveNewAsset(data){
	document.getElementById("responseDIV").innerHTML = JSON.stringify(data);
}
