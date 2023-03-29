
//Asset Creation Form -Large Screen 
function startDataUpload() {
	alert ("start data upload");

	let assetName = document.getElementById("assetName").value;
	let installationDate = document.getElementById("installationDate").value;

	alert(assetName + " "+ installationDate);
	
	let postString = "assetName="+assetName +"&installationDate="+installationDate;
	

	// now get the geometry values
	let latitude = document.getElementById("latitude").value;
	let longitude = document.getElementById("longitude").value;
	postString = postString + "&latitude=" + latitude + "&longitude=" + longitude;
	
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
    success: function(data){console.log(data); startDataUpload(data);}
	}); 

}

// create the code to process the response from the data server
function startDataUploaded(data) {
    // change the DIV to show the response
    document.getElementById("dataUploadedResult").innerHTML = JSON.stringify(data);
}



//delete
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
    document.getElementById("dataDeleteResult").innerHTML = JSON.stringify(data);
}
