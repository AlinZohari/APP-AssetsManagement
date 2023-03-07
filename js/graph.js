
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

//function to show ha DIV when the user clicks on the Show Graph menu

function loadGraph(){
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

		// code to create the graph goes here – see below


}