function createOverlays(){
	totalElements = getTotalElements()
	var overlays = []

	for (i = 0; i < totalElements.length; i++)  // For each element, generate an overlay div, position it, style it and append it to the document
	{	
		points = findCoordinates(totalElements, i)
		var overlayDiv = document.createElement("Div") // Create the overlayDiv
		overlayDiv.className = "overlay"


		//var width = getTextWidth(totalElements[i].textContent, "12pt open sans")	// open sans is used on joe.ie, 12pt seems to be the standard for websites. 
		overlayDiv.style.width = Math.ceil(points[3]) + "px" // set the position of the overlayDiv
		overlayDiv.style.top = Math.ceil(points[0]) + "px"
		overlayDiv.style.left = Math.ceil(points[1]) + "px"
		overlayDiv.style.height = Math.ceil(points[2]) + "px"
		overlayDiv.style.border = "3px solid black"
		overlayDiv.style.borderRadius = "5px"

		overlayDiv.style.background = "grey" // Style the overlayDiv
		overlayDiv.style.display = "none"   // Default to none, this is later changed by the turnOneoverlayDivOn() function
		overlayDiv.style.position = "fixed"
		
		overlays.push(overlayDiv)
		document.body.appendChild(overlayDiv)
		turnOneDivOn(overlays, i)

		var disableButton = document.createElement("button")	// make a button for removing the div
		disableButton.innerHTML = "Disable"
		disableButton.className = "disable"

		disableButton.style.top = "-4px"
		disableButton.style.left = "-75px"


		overlayDiv.appendChild(disableButton)


	}
	return overlays
}


function getTotalElements(){
	const elements = ["h1", "h2", "h3", "h4", "h5", "h6", "h7", "p"]
	var totalElements = []
	for (i = 0; i < elements.length; i++)  // Get all the html tags that can contain text that we can block
	{
		var list = document.getElementsByTagName(elements[i])
		totalElements.push.apply(totalElements, list)
	}
	return totalElements
}


function findCoordinates(list, index){
	var rect = list[index].getBoundingClientRect()
	var height = rect.bottom - rect.top
	var width = rect.right - rect.left
	return [rect.top, rect.left, height, width];
}

function turnOneDivOn(overlaysList, i) {
  	overlaysList[i].style.display = "block"
}

function turnOneDivOff(overlaysList, i){
	var list = document.getElementsByClassName("overlay")
	list[i].style.display = "none"
}

function disableBlocking(){		// Stops all blocking of text
	var list = document.getElementsByClassName("overlay")
	for (i = 0; i < list.length; i++)
	{
		list[i].style.display = "none"
	}
}

window.onload = function(){
	overlays = createOverlays()
}